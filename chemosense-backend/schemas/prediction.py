from pydantic import BaseModel
from firebase.firebase import save_prediction
import numpy as np
import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(os.path.join(BASE_DIR, "model", "ml_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "model", "scaler.pkl"))
columns = joblib.load(os.path.join(BASE_DIR, "model", "feature_columns.pkl"))

class InputData(BaseModel):
    Heart_Rate: int
    Body_Temperature: float
    Oxygen_Saturation: float
    Age: int
    Gender: int
    Weight_kg: float
    Height_m: float
    UID: str

def run_prediction(input_data: InputData):

    # Calculate Derived_BMI if not provided
    Derived_BMI = input_data.Weight_kg / (input_data.Height_m ** 2)
    

    input_dict = {
        'Heart Rate': input_data.Heart_Rate,
        'Body Temperature': input_data.Body_Temperature,
        'Oxygen Saturation': input_data.Oxygen_Saturation,
        'Age': input_data.Age,
        'Gender': input_data.Gender,
        'Weight (kg)': input_data.Weight_kg,
        'Height (m)': input_data.Height_m,
        'Derived_BMI': Derived_BMI
    }

    input_list = [input_dict[col] for col in columns]
    input_arr = np.array(input_list).reshape(1, -1)

    scaled_input = scaler.transform(input_arr)
    prediction = model.predict(scaled_input).tolist()[0]

    if prediction == 1:
        prediction = "High Risk"
    else:
        prediction = "Low Risk"

    save_prediction(derived_bmi=Derived_BMI, input_data=input_data, prediction=prediction)

    return prediction
