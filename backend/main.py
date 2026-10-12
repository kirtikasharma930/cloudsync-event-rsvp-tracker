
from fastapi import FastAPI
from routers.events import router as events_router
from routers.rsvp import router as rsvp_router

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
    return {"status": "healthy"}


app.include_router(events_router)
app.include_router(rsvp_router)

