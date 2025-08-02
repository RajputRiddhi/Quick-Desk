from fastapi import APIRouter, HTTPException, Depends
from app.models.user import User
from app.models.ticket import Ticket
from app.core.auth_bearer import get_current_user
from typing import List
from pydantic import BaseModel

router = APIRouter()

# In-memory category list (use DB in real app)
CATEGORIES = ["Technical Issue", "Billing", "General Query"]

# ----- Admin Role Check -----
def require_admin(user: User):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only action.")

# ----- List All Users -----
@router.get("/users")
async def list_users(current_user: User = Depends(get_current_user)):
    require_admin(current_user)
    users = await User.find_all().to_list()
    return users

# ----- Delete User -----
@router.delete("/user/{user_id}")
async def delete_user(user_id: str, current_user: User = Depends(get_current_user)):
    require_admin(current_user)
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    await user.delete()
    return {"message": f"User {user.email} deleted"}

# ----- Add Category -----
class CategoryRequest(BaseModel):
    category: str

@router.post("/category")
async def add_category(data: CategoryRequest, current_user: User = Depends(get_current_user)):
    require_admin(current_user)
    cat = data.category.strip()
    if cat in CATEGORIES:
        raise HTTPException(status_code=400, detail="Category already exists")
    CATEGORIES.append(cat)
    return {"message": f"Category '{cat}' added successfully."}

# ----- List Categories -----
@router.get("/category")
async def list_categories(current_user: User = Depends(get_current_user)):
    return {"categories": CATEGORIES}
