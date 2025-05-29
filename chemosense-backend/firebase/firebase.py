from config.firebase import db
from firebase_admin import firestore
from firebase_admin import auth
from datetime import datetime
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

