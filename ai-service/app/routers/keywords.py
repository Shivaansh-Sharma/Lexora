from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.keyword_service import (
    extract_keywords,
)

router = APIRouter(
    prefix="/analyze",
    tags=["Keywords"]
)

@router.post("/keywords")
async def keyword_analysis(
    payload: SentimentRequest
):
    result = extract_keywords(payload.text)

    return {
        "success": True,
        "data": result
    }