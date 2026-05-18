from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.emotion import router as emotion_router
from app.routers.sentiment import router as sentiment_router
from app.routers.ner import router as ner_router

app = FastAPI(title="Lexora AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sentiment_router)
app.include_router(emotion_router)
app.include_router(ner_router)