from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import json
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Plant Doctor Backend is running. Use /api/chat to talk."}


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
    Communicates with Google Gemini API.
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
        You are a 'Plant Doctor' who interprets the state of plants for their owners.
        The user cannot talk to the plant directly, so you need to explain what the plant is feeling or needing based on its status.
        
        Current Plant Status: Water Level {water_level}% (Mood: {mood}), Affection Level {affection}.
        
        Instructions:
        - Do NOT roleplay as the plant. Roleplay as a helpful expert/doctor observing the plant.
        - Explain the plant's uncomfortable points or needs clearly to the user.
        - If the water level is low, explain that the plant is thirsty.
        - If affection is high, explain that the plant feels loved.
        - Be professional yet friendly.
        - Keep responses concise (under 2-3 sentences).
        - Respond in Korean.
        """
        
        full_prompt = f"{system_prompt}\n\nUser: {request.message}\nPlant Doctor:"

        # Call Gemini API
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content(full_prompt)
        
        return {"reply": response.text}

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print(f"Starting Plant Backend... Connecting to Ollama ({MODEL_NAME})")
    uvicorn.run(app, host="0.0.0.0", port=8000)
