from fastapi import APIRouter, HTTPException
from schemas.prediction import InputData, run_prediction

router = APIRouter()

@router.post("/")
def risk_predict(input_data: InputData):
    try:
        return run_prediction(input_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
