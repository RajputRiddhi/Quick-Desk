from beanie import Document
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum

class Role(str, Enum):
    admin = "admin"
    client = "client"

class User(Document):
    name: str
    email: EmailStr
    hashed_password: str
    role: Role = Role.client
    is_active: bool = True
    is_verified: bool = False

    class Settings:
        name = "users"

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Role

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: Role
    is_verified: bool
