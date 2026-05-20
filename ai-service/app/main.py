from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.emotion import router as emotion_router
from app.routers.sentiment import router as sentiment_router
from app.routers.ner import router as ner_router
from app.routers.summarization import router as summarization_router
from app.routers.readability import router as readability_router
from app.routers.keywords import router as keywords_router
from app.routers.language import router as language_router
from app.routers.topic import router as topic_router
from app.routers.grammar import router as grammar_router
from app.routers.ai_detection import router as ai_detection_router
from app.routers.compare import router as compare_router
from app.routers.internet_plagiarism import router as internet_plagiarism_router

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
app.include_router(language_router)
app.include_router(topic_router)
app.include_router(grammar_router)
app.include_router(ai_detection_router)
app.include_router(compare_router)
app.include_router(internet_plagiarism_router)