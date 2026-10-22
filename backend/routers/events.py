

from fastapi import APIRouter

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)
from fastapi import APIRouter
from firebase_config import db

from fastapi import APIRouter, HTTPException
from firebase_config import db

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.get("/")
def get_events():
    docs = db.collection("events").stream()

    events = []
    for doc in docs:
        event = doc.to_dict()
        event["id"] = doc.id
        events.append(event)

    return {
        "message": "Events fetched successfully",
        "events": events
    }


@router.post("/")
def create_event(event: dict):
    if not event.get("title"):
        raise HTTPException(
            status_code=400,
            detail="Event title is required"
        )

    doc_ref = db.collection("events").document()
    doc_ref.set(event)

    return {
        "message": "Event created successfully",
        "id": doc_ref.id,
        "event": event
    }

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.get("/")
def get_events():
    docs = db.collection("events").stream()

    events = []
    for doc in docs:
        event = doc.to_dict()
        event["id"] = doc.id
        events.append(event)

    return {
        "message": "Events fetched successfully",
        "events": events
    }


@router.post("/")
def create_event(event: dict):
    doc_ref = db.collection("events").document()
    doc_ref.set(event)

    return {
        "message": "Event created successfully",
        "id": doc_ref.id,
        "event": event
    }


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
