from config.firebase import db
from firebase_admin import firestore
from datetime import datetime

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
