from fastapi import APIRouter

from pydantic import BaseModel

from app.services.compare_service import (
    compare_texts
)

router = APIRouter(
    prefix="/compare",
    tags=["Comparative Analysis"]
)

class CompareRequest(BaseModel):

    text1: str

    text2: str

@router.post("/")
async def compare_endpoint(
    request: CompareRequest
):

    result = compare_texts(
        request.text1,
        request.text2
    )

    return {
        "success": True,
        "data": result
    }