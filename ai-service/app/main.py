from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.emotion import router as emotion_router
from app.routers.sentiment import router as sentiment_router
from app.routers.ner import router as ner_router
from app.routers.summarization import router as summarization_router
from app.routers.readability import router as readability_router
from app.routers.keywords import router as keywords_router

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
app.include_router(summarization_router)
app.include_router(readability_router)
app.include_router(keywords_router)