from beanie import Document
from pydantic import BaseModel, EmailStr
from typing import Literal
from datetime import datetime

class User(Document):
    name: str
    email: EmailStr
    password: str
    role: Literal["admin", "agent", "end_user"]
    created_at: datetime = datetime.utcnow()

    class Settings:
        name = "users"
