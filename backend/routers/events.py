
from fastapi import APIRouter

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)

events = []


@router.get("/")
def get_events():
    return {
        "message": "Events fetched successfully",
        "events": events
    }


@router.post("/")
def create_event(event: dict):
    events.append(event)

    return {
        "message": "Event created successfully",
        "event": event
    }
