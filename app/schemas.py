from datetime import datetime
from pydantic import BaseModel,EmailStr
from typing import Optional

class Application(BaseModel):
    id: int
    photo: bytes
    phone_number: str
    longitude: float
    latitude: float
    description: str
    status: str  # Добавлено поле
    created_at: datetime  # Добавлено поле

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class ApplicationCreate(BaseModel):
    photo: bytes
    phone_number: str
    longitude: float
    latitude: float
    description: str

class UpdateStatus(BaseModel):
    status: str

class Message(BaseModel):
    id: int
    phone_number: str
    name: str
    message: str

    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    phone_number: str
    name: str
    message: str

class UserBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None  # Добавлено поле для имени
    last_name: Optional[str] = None   # Добавлено поле для фамилии

class UserCreate(UserBase):
    password: str  # Поле для пароля

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class EmailVerificationCreate(BaseModel):
    email: EmailStr
    code: str

class EmailVerificationCheck(BaseModel):
    email: EmailStr
    code: str
    new_password: str