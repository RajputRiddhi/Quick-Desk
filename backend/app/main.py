from fastapi import FastAPI
from app.core.config import init_db
from app.routes import auth_routes, ticket_routes, admin_routes

app = FastAPI(title="QuickDesk - Ticketing System")

@app.on_event("startup")
async def start():
    await init_db()

app.include_router(auth_routes.router, prefix="/auth")
app.include_router(ticket_routes.router, prefix="/tickets")
app.include_router(admin_routes.router, prefix="/admin")
