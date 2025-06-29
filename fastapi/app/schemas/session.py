import uuid
from datetime import datetime

from pydantic import BaseModel


class SessionBase(BaseModel):
    user_id: int


class SessionCreate(SessionBase):
    pass


class SessionResponse(SessionBase):
    token: uuid.UUID
    created_at: datetime
    expires_at: datetime
