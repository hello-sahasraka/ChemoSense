from fastapi import FastAPI
from api import predict, adminFunctions, getNotificationToken
from middleware.cors import add_cors_middleware
from middleware.loggingMiddleware import LoggingMiddleware

app = FastAPI()

# Add CORS middleware
add_cors_middleware(app)

# Add custom logging middleware
app.add_middleware(LoggingMiddleware)

# Include API routers
app.include_router(predict.router, prefix="/risk_predict", tags=["predict"])
app.include_router(adminFunctions.router, prefix="/admin", tags=["admin"])
app.include_router(getNotificationToken.router, prefix="/register_token", tags=["token"])
