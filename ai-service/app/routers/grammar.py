from fastapi import APIRouter
from pydantic import BaseModel

from app.services.grammar_service import (
    analyze_grammar
)

router = APIRouter(
    prefix="/analyze",
    tags=["Grammar Analysis"]
)

class GrammarRequest(BaseModel):
    text: str

@router.post("/grammar")
async def grammar_analysis(
    request: GrammarRequest
):
    result = analyze_grammar(request.text)

    return {
        "success": True,
        "data": result
    }