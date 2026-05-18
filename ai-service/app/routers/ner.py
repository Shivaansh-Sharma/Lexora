from fastapi import APIRouter

from app.schemas.sentiment import SentimentRequest
from app.services.ner_service import analyze_entities

router = APIRouter(
    prefix="/analyze",
    tags=["NER"]
)

@router.post("/ner")
async def ner_analysis(payload: SentimentRequest):
    result = analyze_entities(payload.text)

    return {
        "success": True,
        "data": result
    }