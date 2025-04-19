from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Configure CORS to allow requests from your Firebase Hosting domain (adjust as needed)
origins = [
    "https://your-app-name.firebaseapp.com",
    "https://your-app-name.web.app",
    "http://localhost:3000", # For local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return JSONResponse({"message": "Welcome to the Serene Lotus Threads Backend!"})