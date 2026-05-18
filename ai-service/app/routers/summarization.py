from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.summarization_service import summarize_text

router = APIRouter(
    prefix="/analyze",
    tags=["Summarization"]
)

@router.post("/summarize")
async def summarization(payload: SentimentRequest):
    result = summarize_text(payload.text)

    return {
        "success": True,
        "data": result
    }