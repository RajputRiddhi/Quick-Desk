from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TicketCreate(BaseModel):
    subject: str
    description: str
    category: str

class TicketOut(BaseModel):
    id: int
    subject: str
    description: str
    category: str
    status: str
    created_by: int
    assigned_to: Optional[int]

    class Config:
        orm_mode = True
