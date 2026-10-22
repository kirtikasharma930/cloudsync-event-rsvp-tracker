
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")
    credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    if service_account_json:
        service_account_info = json.loads(service_account_json)
        cred = credentials.Certificate(service_account_info)
        firebase_admin.initialize_app(cred)

    elif credentials_path:
        cred = credentials.Certificate(credentials_path)
        firebase_admin.initialize_app(cred)

    else:
        raise ValueError(
            "Firebase credentials are missing. "
            "Set FIREBASE_SERVICE_ACCOUNT in Render."
        )

db = firestore.client()
