from fastapi import FastAPI
from api import predict, adminFunctions
from middleware.cors import add_cors_middleware

app = FastAPI()

add_cors_middleware(app)

app.include_router(predict.router, prefix="/risk_predict", tags=["predict"])
app.include_router(adminFunctions.router, prefix="/admin", tags=["admin"])
