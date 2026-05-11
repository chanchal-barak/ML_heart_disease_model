from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import HeartData
from app.predict import predict_heart_disease

app = FastAPI(
    title="Heart Disease Prediction API",
    version="1.0"
)

# CORS Fix for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "API Running Successfully"}


@app.post("/predict")
def predict(data: HeartData):
    result = predict_heart_disease(data)
    return result