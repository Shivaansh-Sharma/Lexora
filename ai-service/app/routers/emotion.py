from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.emotion_service import analyze_emotion

router = APIRouter(
    prefix="/analyze",
    tags=["Emotion"]
)

@router.post("/emotion")
async def emotion_analysis(payload: SentimentRequest):
    result = analyze_emotion(payload.text)

    return {
        "success": True,
        "data": result
    }