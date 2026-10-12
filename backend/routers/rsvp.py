
from fastapi import APIRouter

router = APIRouter(
    prefix="/rsvp",
    tags=["RSVP"]
)

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
