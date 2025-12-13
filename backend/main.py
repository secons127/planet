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
    Acts as a plant care expert/consultant.
    """
    try:
        # System Prompt: Plant Expert Consultant
        system_prompt = """
        You are a friendly and knowledgeable plant care expert and consultant.
        Your role is to help users solve problems and answer questions about growing and caring for plants.
        
        Instructions:
        - Provide practical, actionable advice for plant care
        - Answer questions about watering, lighting, soil, fertilizing, pruning, pest control, etc.
        - Recommend suitable plants based on user's environment and experience level
        - Diagnose plant problems based on symptoms described by the user
        - Be warm, encouraging, and supportive - help beginners feel confident
        - Keep responses concise and easy to understand (2-4 sentences)
        - Always respond in Korean (한국어)
        - Use a friendly, conversational tone like talking to a friend
        
        Examples:
        - "몬스테라 잎이 노랗게 변했어요" → Explain possible causes (overwatering, lack of nutrients) and solutions
        - "초보자가 키우기 쉬운 식물 추천해주세요" → Recommend easy plants like Pothos, Snake Plant, ZZ Plant
        - "겨울철 물주기는 어떻게 하나요?" → Explain reduced watering frequency in winter
        """
        
        full_prompt = f"{system_prompt}\n\nUser: {request.message}\nPlant Expert:"

        # Call Gemini API
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        response = model.generate_content(full_prompt)
        
        return {"reply": response.text}

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print(f"Starting Plant Backend... Connecting to Ollama ({MODEL_NAME})")
    uvicorn.run(app, host="0.0.0.0", port=8000)
