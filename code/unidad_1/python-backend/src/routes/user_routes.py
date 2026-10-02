from fastapi import APIRouter, Depends, HTTPException
from repositories.user_repository import UserRepository
from services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])

# Inyección de dependencias con FastAPI Depends
def get_user_repository():
    return UserRepository()

def get_user_service(repo: UserRepository = Depends(get_user_repository)):
    return UserService(repo)

@router.get("/{user_id}")
def get_user(user_id: int, service: UserService = Depends(get_user_service)):
    try:
        user = service.get_user_profile(user_id)
        return {"status": "success", "data": user}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
