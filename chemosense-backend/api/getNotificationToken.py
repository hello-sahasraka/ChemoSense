from fastapi import APIRouter, HTTPException
from firebase.firebase import save_notification_token
from pydantic import BaseModel

class NotificationTokenRequest(BaseModel):
    token: str
    uid: str
    role: str  # Optional, can be used to specify the role of the user

router = APIRouter()

@router.post("/")
def risk_predict(request: NotificationTokenRequest):
    try:
        return save_notification_token(request.token, request.uid, request.role)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
