from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"{request.method} {request.url}")
        body = await request.body()
        logger.debug(f"Body: {body.decode('utf-8')}")
        response = await call_next(request)
        logger.info(f"Status: {response.status_code}")
        return response
