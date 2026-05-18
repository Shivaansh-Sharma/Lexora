from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.sentiment_service import analyze_sentiment

router = APIRouter(
    prefix="/analyze",
    tags=["Sentiment"]
)

@router.post("/sentiment")
async def sentiment_analysis(payload: SentimentRequest):
    result = analyze_sentiment(payload.text)

    return {
        "success": True,
        "data": result
    }