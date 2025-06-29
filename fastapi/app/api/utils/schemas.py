from typing import Optional, List

from pydantic import BaseModel


class ValidationErrorDetail(BaseModel):
    loc: List[str]
    msg: str
    type: str


class ErrorResponse(BaseModel):
    status: int
    message: str
    errors: Optional[List[ValidationErrorDetail]] = None
