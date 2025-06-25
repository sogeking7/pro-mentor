from pydantic import BaseModel, EmailStr
from typing_extensions import Optional

from app.schemas.user_role import UserRoleOut


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    user_role_id: Optional[int] = None


class UserCreate(UserBase):
    password: str
    pass


class UserUpdate(UserBase):
    pass


class UserOut(UserBase):
    id: int
    role: Optional[UserRoleOut] = None
    model_config = {"from_attributes": True}


class Login(BaseModel):
    username: EmailStr
    password: str
