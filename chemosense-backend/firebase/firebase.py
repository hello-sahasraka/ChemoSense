from config.firebase import db
from firebase_admin import firestore
from firebase_admin import auth
from datetime import datetime
from firebase.fcm_service import send_fcm_notification
import logging


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def save_prediction(derived_bmi:float, input_data: list, prediction: str, max_predictions: int = 10):
    predictions_ref = db.collection("patients").document(input_data.UID).collection("predictions")

    # Add new prediction
    predictions_ref.add({
        "heart_rate": input_data.Heart_Rate,
        "body_temperature": input_data.Body_Temperature,
        "oxygen_saturation": input_data.Oxygen_Saturation,
        "risk_level": prediction,
        "derived_bmi": derived_bmi,
        "timestamp": datetime.utcnow()
    })

    # Fetch and delete older predictions if over the limit
    docs = predictions_ref.order_by("timestamp", direction=firestore.Query.DESCENDING).stream()
    docs_list = list(docs)

    if len(docs_list) > max_predictions:
        for doc in docs_list[max_predictions:]:
            doc.reference.delete()

def delete_patient_firebase(uid: str):
    logger.info(f"[delete_patient_firebase] Deleting patient with UID: {uid}")
    try:
        doc_ref = db.collection("patients").document(uid)
        doc = doc_ref.get()

        if not doc.exists:
            logger.warning(f"[delete_patient_firebase] Patient UID '{uid}' not found in Firestore.")
            return {"error": "Patient not found."}
        
        #Delete all documents in 'predictions' subcollection
        predictions_ref = doc_ref.collection("predictions")
        predictions = predictions_ref.stream()
        for doc in predictions:
            doc.reference.delete()
            logger.debug(f"[delete_patient_firebase] Deleted prediction document: {doc.id}")

        #Delete the patient document
        doc_ref.delete()
        logger.info(f"[delete_patient_firebase] Patient document deleted for UID: {uid}")

        #Delete the Firebase Auth user
        auth.delete_user(uid)
        logger.info(f"[delete_patient_firebase] Firebase Auth user deleted for UID: {uid}")

        return {"message": "Patient deleted successfully."}
    except Exception as e:
        logger.error(f"[delete_patient_firebase] Error deleting patient UID {uid}: {e}")
        return {"error": str(e)}
    

    
def delete_doctor_firebase(uid: str):
    logger.info(f"[delete_doctor_firebase] Deleting doctor with UID: {uid}")
    try:
        doc_ref = db.collection("doctors").document(uid)
        doc = doc_ref.get()

        if not doc.exists:
            logger.warning(f"[delete_doctor_firebase] Doctor UID '{uid}' not found in Firestore.")
            return {"error": "Doctor not found."}

        #Delete the doctor document
        doc_ref.delete()
        logger.info(f"[delete_doctor_firebase] Doctor document deleted for UID: {uid}")

        #Delete the Firebase Auth user
        auth.delete_user(uid)
        logger.info(f"[delete_doctor_firebase] Firebase Auth user deleted for UID: {uid}")

        return {"message": "Doctor deleted successfully."}
    except Exception as e:
        logger.error(f"[delete_doctor_firebase] Deletion failed: {e}")
        return {"error": str(e)}
    
def save_notification_token(token: str, uid: str, role: str):
    logger.info(f"[save_notification_token] Saving notification token for UID: {uid}")

    collection_name = "patients" if role == "patient" else "doctors"

    doc_ref = db.collection(collection_name).document(uid)
    doc = doc_ref.get()

    try:
        doc = doc_ref.get()
        if not doc.exists:
            logger.warning(f"[save_notification_token] Document not found for UID: {uid}")
            return {"error": "Document not found."}

        doc_ref.update({
            'fcm_token': token
        })
        logger.info(f"[save_notification_token] Token updated successfully for UID: {uid}")
        return {"message": "Token saved successfully."}

    except Exception as e:
        logger.error(f"[save_notification_token] Failed to update token: {str(e)}")
        return {"error": "Failed to save token."}


def get_patientDetails(user_uid: str):
    logger.info(f"[get_patientDetails] Fetching patient details for UID: {user_uid}")
    try:
        doc_ref = db.collection("patients").document(user_uid)
        doc = doc_ref.get()

        if not doc.exists:
            logger.warning(f"[get_patientId_and_name] Patient UID '{user_uid}' not found in Firestore.")
            return {"error": "Patient not found."}

        data = doc.to_dict()
        patient_id = data.get("admissionNo", "None")
        name = data.get("fullName", "Empty")
        contactNumber = data.get("contactNumber", "Empty")

        return {"patient_id": patient_id, "name": name, "contactNumber": contactNumber}
    except Exception as e:
        logger.error(f"[get_patientDetails] Error fetching patient details for UID {user_uid}: {e}")
        return {"error": str(e)}

def notify_high_risk_user_and_doctors(user_uid: str, title: str, body: str, data: dict = None):
    logger.info(f"[notify_high_risk_user_and_doctors] Sending notification for high-risk user UID: {user_uid}")
    # Notify user
    patient_ref = db.collection("patients").document(user_uid)
    patient_doc = patient_ref.get()
    if patient_doc.exists:
        token = patient_doc.to_dict().get("fcm_token")
        logger.info(f"[notify_high_risk_user_and_doctors] Found FCM token for patient UID: {user_uid}")
        if token:
            logger.info(f"[notify_high_risk_user_and_doctors] Sending notification to patient UID: {user_uid}")
            send_fcm_notification(token, title, body, data)
    # Notify doctors
    for doc in db.collection("doctors").stream():
        token = doc.to_dict().get("fcm_token")
        if token:
            logger.info(f"[notify_high_risk_user_and_doctors] Sending notification to doctor")
            send_fcm_notification(token, title, body, data)