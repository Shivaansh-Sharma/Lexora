from fastapi import APIRouter

from pydantic import BaseModel

from app.services.internet_plagiarism_service import (
    detect_internet_plagiarism
)

router = APIRouter(
    prefix="/analyze",
    tags=["Internet Plagiarism"]
)


class PlagiarismRequest(
    BaseModel
):
    text: str


@router.post("/internet-plagiarism")
def check_plagiarism(
    request: PlagiarismRequest
):

    result = detect_internet_plagiarism(
        request.text
    )

    return {
        "success": True,
        "data": result
    }