from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str
    pass


class UserUpdate(UserBase):
    pass


class UserOut(UserBase):
    id: int
    model_config = {"from_attributes": True}


class Login(BaseModel):
    username: EmailStr
    password: str
