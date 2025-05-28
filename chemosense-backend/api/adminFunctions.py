from fastapi import APIRouter, HTTPException
from firebase.firebase import delete_patient_firebase
from pydantic import BaseModel

class DeleteRequest(BaseModel):
    uid: str

router = APIRouter()

@router.post("/delete_patient")
def delete_patient(data: DeleteRequest):
    try:
        return delete_patient_firebase(data.uid)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))