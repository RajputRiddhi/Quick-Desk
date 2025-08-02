from typing import Optional
from pydantic import BaseModel, Field
from beanie import Document
from datetime import datetime


# 🎯 Ticket Document (MongoDB)
class Ticket(Document):
    title: str
    description: str
    created_by: str  # user_id
    status: str = "open"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "tickets"  # MongoDB collection name

    class Config:
        schema_extra = {
            "example": {
                "title": "Login Issue",
                "description": "Cannot log in to the system.",
                "created_by": "user_id_123",
                "status": "open",
            }
        }


# 🎯 Schema for creating a new ticket
class TicketCreate(BaseModel):
    title: str
    description: str


# 🎯 Schema for updating a ticket
class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
