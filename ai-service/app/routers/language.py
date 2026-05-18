from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.language_service import (
    detect_language,
)

router = APIRouter(
    prefix="/analyze",
    tags=["Language Detection"]
)

@router.post("/language")
async def language_analysis(
    payload: SentimentRequest
):
    result = detect_language(payload.text)

    return {
        "success": True,
        "data": result
    }