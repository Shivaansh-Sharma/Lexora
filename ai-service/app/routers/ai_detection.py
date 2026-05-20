from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_detection_service import (
    detect_ai_text
)

router = APIRouter(
    prefix="/analyze",
    tags=["AI Detection"]
)

class AIDetectionRequest(BaseModel):
    text: str

@router.post("/ai-detection")
async def ai_detection(
    request: AIDetectionRequest
):
    result = detect_ai_text(
        request.text
    )

    return {
        "success": True,
        "data": result
    }