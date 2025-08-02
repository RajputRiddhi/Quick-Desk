import os
from fastapi import APIRouter, Depends, HTTPException
from app.models.ticket import TicketCreate, TicketUpdate, Ticket
from app.models.user import User
from app.utils.auth import get_current_user
from app.email_service import send_email
from beanie import PydanticObjectId

router = APIRouter()
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

@router.post("/tickets")
async def create_ticket(ticket: TicketCreate, current_user: User = Depends(get_current_user)):
    new_ticket = ticket.to_model(user_id=current_user.id)
    await new_ticket.insert()

    # Email Alert on Ticket Creation
    email_body = f"""
        <h3>New Ticket Created</h3>
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p>Visit: {FRONTEND_URL}/ticket/{new_ticket.id}</p>
    """
    await send_email(current_user.email, "Ticket Submitted", email_body)

    return {"msg": "Ticket created", "id": str(new_ticket.id)}

@router.put("/tickets/{ticket_id}")
async def update_ticket(
    ticket_id: PydanticObjectId,
    update: TicketUpdate,
    current_user: User = Depends(get_current_user)
):
    ticket = await Ticket.get(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    ticket.status = update.status
    ticket.updated_at = update.updated_at
    await ticket.save()

    # Email Alert on Ticket Status Update
    email_body = f"""
        <h3>Your Ticket Status Has Changed</h3>
        <p><strong>Ticket:</strong> {ticket.subject}</p>
        <p><strong>New Status:</strong> {update.status}</p>
        <p>Track it at: {FRONTEND_URL}/ticket/{ticket.id}</p>
    """
    await send_email(current_user.email, "Ticket Status Updated", email_body)

    return {"msg": "Ticket updated"}
