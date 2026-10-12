
from fastapi import FastAPI

app = FastAPI(
    title="CloudSync API",
    description="Event Planning and RSVP Tracker",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to CloudSync!",
        "status": "Backend is ready"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
