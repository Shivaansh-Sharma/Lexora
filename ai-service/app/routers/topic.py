from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.topic_service import (
    extract_topics,
)

router = APIRouter(
    prefix="/analyze",
    tags=["Topic Modeling"]
)

@router.post("/topic")
async def topic_analysis(
    payload: SentimentRequest
):
    result = extract_topics(payload.text)

    return {
        "success": True,
        "data": result
    }