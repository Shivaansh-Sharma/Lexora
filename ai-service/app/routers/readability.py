from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.readability_service import (
    analyze_readability,
)

router = APIRouter(
    prefix="/analyze",
    tags=["Readability"]
)

@router.post("/readability")
async def readability_analysis(
    payload: SentimentRequest
):
    result = analyze_readability(payload.text)

    return {
        "success": True,
        "data": result
    }