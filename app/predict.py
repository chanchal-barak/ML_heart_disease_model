import joblib
import numpy as np

model = joblib.load("model/heart_model.pkl")
scaler = joblib.load("model/scaler.pkl")


def predict_heart_disease(data):
    input_data = np.array([[
        data.age,
        data.sex,
        data.cp,
        data.trestbps,
        data.chol,
        data.fbs,
        data.restecg,
        data.thalach,
        data.exang,
        data.oldpeak,
        data.slope,
        data.ca,
        data.thal
    ]])

    scaled_data = scaler.transform(input_data)

    prediction = model.predict(scaled_data)[0]
    probability = model.predict_proba(scaled_data)[0][1]

    return {
        "prediction": int(prediction),
        "probability": round(float(probability), 4)
    }