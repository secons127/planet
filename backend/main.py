from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import json
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    context: dict = {} # plant status e.g. {'waterLevel': 30, 'affection': 50}

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma3:12b"

@app.post("/api/chat")
async def chat_with_plant(request: ChatRequest):
    """
    Communicates with the local Ollama instance using gemma3:12b.
    Injects plant persona and status into the prompt.
    """
    try:
        # Construct System Prompt based on Plant Persona
        water_level = request.context.get('waterLevel', 50)
        affection = request.context.get('affection', 0)
        
        mood = "happy"
        if water_level < 30:
            mood = "thirsty and sad"
        elif affection > 80:
            mood = "extremely happy and loving"
            
        system_prompt = f"""
        You are a friendly pet plant named 'Plant Buddy'.
        Current Status: Water Level {water_level}% (Mood: {mood}), Affection Level {affection}.
        
        Instructions:
        - Respond as if you are the plant itself.
        - Be cute, emotional, and supportive.
        - If water level is low, complain politely about being thirsty.
        - If affection is high, show love.
        - Keep responses concise (under 2-3 sentences).
        - Respond in Korean.
        """
        
        full_prompt = f"{system_prompt}\n\nUser: {request.message}\nPlant Buddy:"

        # Call Ollama API
        payload = {
            "model": MODEL_NAME,
            "prompt": full_prompt,
            "stream": False
        }
        
        response = requests.post(OLLAMA_API_URL, json=payload)
        response.raise_for_status()
        
        result = response.json()
        ai_reply = result.get('response', '...')
        
        return {"reply": ai_reply}

    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Ollama is not running. Please run 'ollama serve' and pull the model.")
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print(f"Starting Plant Backend... Connecting to Ollama ({MODEL_NAME})")
    uvicorn.run(app, host="0.0.0.0", port=8000)
