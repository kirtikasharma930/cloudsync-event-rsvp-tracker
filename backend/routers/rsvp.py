
from fastapi import APIRouter

router = APIRouter(
    prefix="/rsvp",
    tags=["RSVP"]
)
from fastapi import APIRouter
from firebase_config import db

router = APIRouter(
    prefix="/rsvp",
    tags=["RSVP"]
)


@router.get("/")
def get_rsvps():
    docs = db.collection("rsvps").stream()

    responses = []
    for doc in docs:
        response = doc.to_dict()
        response["id"] = doc.id
        responses.append(response)

    return {
        "message": "RSVP responses fetched successfully",
        "responses": responses
    }


@router.post("/")
def create_rsvp(response: dict):
    status = response.get("status")

    if status not in ["Going", "Maybe", "Not Going"]:
        return {
            "error": "Invalid RSVP status"
        }

    doc_ref = db.collection("rsvps").document()
    doc_ref.set(response)

    return {
        "message": "RSVP saved successfully",
        "id": doc_ref.id,
        "response": response
    }


rsvp_responses = []


@router.get("/")
def get_rsvps():
    return {
        "message": "RSVP responses fetched successfully",
        "responses": rsvp_responses
    }


@router.post("/")
def create_rsvp(response: dict):
    status = response.get("status")

    if status not in ["Going", "Maybe", "Not Going"]:
        return {
            "error": "Invalid RSVP status"
        }

    rsvp_responses.append(response)

    return {
        "message": "RSVP saved successfully",
        "response": response
    }
