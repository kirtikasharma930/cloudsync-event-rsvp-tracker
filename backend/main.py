
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, firestore
from routers.events import router as events_router
from routers.rsvp import router as rsvp_router
if not firebase_admin._apps:
    firebase_admin.initialize_app()

db = firestore.client()
app = FastAPI(
    title="CloudSync API",
    description="Event Planning and RSVP Tracker",
    version="1.0.0"
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.events import router as events_router
from routers.rsvp import router as rsvp_router

app = FastAPI(
    title="CloudSync API",
    description="Event Planning and RSVP Tracker",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
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


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
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

