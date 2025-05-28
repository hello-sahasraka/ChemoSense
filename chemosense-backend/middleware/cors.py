from fastapi.middleware.cors import CORSMiddleware


def add_cors_middleware(app):
    app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],            # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],            # Allow all headers
)
