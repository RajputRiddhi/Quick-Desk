from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routes import auth_routes, ticket_routes, admin_routes
from app.core.db import init_db

app = FastAPI(
    title="QuickDesk API",
    version="1.0",
    description="Support Ticketing System API",
)

# CORS config for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_routes.router, prefix="/api/auth", tags=["Auth"])
app.include_router(ticket_routes.router, prefix="/api/tickets", tags=["Tickets"])
app.include_router(admin_routes.router, prefix="/api/admin", tags=["Admin"])

# DB Init
@app.on_event("startup")
async def on_startup():
    await init_db()
