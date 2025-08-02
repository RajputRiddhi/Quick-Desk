from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.user import User
from app.models.ticket import Ticket
from app.core.config import settings

async def init_db():
    client = AsyncIOMotorClient(settings.MONGO_URL)
    db = client.get_default_database()
    await init_beanie(database=db, document_models=[User, Ticket])
