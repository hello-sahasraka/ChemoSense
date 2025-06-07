from pydantic import BaseModel
from firebase.firebase import save_prediction, notify_high_risk_user_and_doctors
from collections import defaultdict
import numpy as np
import pandas as pd
import joblib
import os
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(os.path.join(BASE_DIR, "model", "ml_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "model", "scaler.pkl"))
columns = joblib.load(os.path.join(BASE_DIR, "model", "feature_columns.pkl"))

user_risk_counter = defaultdict(int)

class InputData(BaseModel):
    Heart_Rate: int
    Body_Temperature: float
    Oxygen_Saturation: float
    Age: int
    Gender: int
    Weight_kg: float
    Height_m: float # Optional, can be calculated if not provided
    UID: str

def run_prediction(input_data: InputData):


    logger.info(f"[run_prediction] Starting prediction for UID: {input_data.UID}")

    # Calculate Derived_BMI if not provided
    Derived_BMI = input_data.Weight_kg / (input_data.Height_m ** 2)
    

    input_dict = {
        'Heart Rate': input_data.Heart_Rate,
        'Body Temperature': input_data.Body_Temperature,
        'Oxygen Saturation': input_data.Oxygen_Saturation,
        'Age': input_data.Age,
        'Weight (kg)': input_data.Weight_kg,
        'Height (m)': input_data.Height_m,
        'Gender': input_data.Gender,
        'Derived_BMI': Derived_BMI
    }

    # input_list = [input_dict[col] for col in columns]
    # input_arr = np.array(input_list).reshape(1, -1)
    # scaled_input = scaler.transform(input_arr)
    # prediction = model.predict(scaled_input)

    # input_df = pd.DataFrame([input_dict], columns=columns)
    input_df = pd.DataFrame([input_dict]).reindex(columns=columns)
    scaled_input = scaler.transform(input_df)
    prediction = model.predict(scaled_input)[0]

    if prediction == 1:
        prediction = "High Risk"
        logger.info(f"[run_prediction] High risk detected for UID: {input_data.UID}")

        user_risk_counter[input_data.UID] += 1

        if (user_risk_counter[input_data.UID] >= 5):
            logger.warning(f"[run_prediction] High risk prediction count exceeded for UID: {input_data.UID}")

            # Notify user and doctors
            notify_high_risk_user_and_doctors(
                user_uid=input_data.UID,
                title="⚠️ High Risk Detected",
                body="A patient was flagged as high risk. Please review immediately."
            )
            logger.info(f"[run_prediction] High risk prediction count: {user_risk_counter[input_data.UID]}")
            user_risk_counter[input_data.UID] = 0

    else:
        prediction = "Low Risk"
        logger.info(f"[run_prediction] Low risk detected for UID: {input_data.UID}")
        user_risk_counter[input_data.UID] = 0

    save_prediction(derived_bmi=Derived_BMI, input_data=input_data, prediction=prediction)

    return prediction
