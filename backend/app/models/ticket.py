from beanie import Document, Link
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.models.user import User

class Ticket(Document):
    subject: str
    description: str
    category: str
    status: str = "Open"
    attachment: Optional[str] = None
    created_by: Link[User]
    assigned_to: Optional[Link[User]] = None
    comments: List[str] = []
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

    class Settings:
        name = "tickets"
