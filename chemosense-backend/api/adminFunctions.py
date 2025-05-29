from fastapi import APIRouter, HTTPException
from firebase.firebase import delete_patient_firebase, delete_doctor_firebase
from pydantic import BaseModel

class DeleteRequest(BaseModel):
    uid: str

router = APIRouter()

@router.post("/delete_patient")
def delete_patient(data: DeleteRequest):
    try:
        result = delete_patient_firebase(data.uid)

        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/delete_doctor")
def delete_doctor(data: DeleteRequest):
    try:
        result = delete_doctor_firebase(data.uid)

        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))