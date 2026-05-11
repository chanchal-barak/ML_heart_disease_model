# CardioAI Pro — Heart Disease Prediction System

## Overview

CardioAI Pro is a full-stack Machine Learning web application that predicts the risk of heart disease using clinical patient data.

The project combines:

* **Machine Learning Model (Random Forest Classifier)**
* **FastAPI Backend (Python)**
* **React + Vite Frontend**
* **Render Deployment (Backend)**
* **Vercel Deployment (Frontend)**

It is designed as a professional healthcare prediction dashboard that helps users input medical parameters and receive heart disease risk predictions along with confidence scores and medical guidance.

---

## Live Deployment

### Frontend

[https://cardioai-two.vercel.app/](https://cardioai-two.vercel.app/)

### Backend API

[https://cardioai-backend-xbv1.onrender.com](https://cardioai-backend-xbv1.onrender.com)

### FastAPI Swagger Docs

[https://cardioai-backend-xbv1.onrender.com/docs](https://cardioai-backend-xbv1.onrender.com/docs)

---

## Features

### Machine Learning

* Data preprocessing using Cleveland Heart Disease dataset
* Missing value handling
* Feature scaling using StandardScaler
* Model comparison:

  * Logistic Regression
  * Support Vector Machine (SVM)
  * Random Forest Classifier
* Final model selection using best performance
* Model persistence using Joblib

### Backend (FastAPI)

* REST API for prediction
* Input validation using Pydantic
* Model loading from saved `.pkl` files
* Probability score generation
* CORS support for frontend integration
* Interactive API testing with Swagger UI

### Frontend (React + Vite)

* Professional dashboard UI
* Guided medical form inputs
* Dropdown-based smart fields
* Prediction confidence progress bar
* Medical guidance cards
* Doctor recommendation section
* Responsive design for desktop + mobile

---

## Project Structure

```text
ML_heart_disease_model/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── predict.py
│   ├── schemas.py
│   └── config.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── model/
│   ├── heart_model.pkl
│   └── scaler.pkl
│
├── train/
│   └── train_model.py
│
├── figures/
│   ├── confusion_matrix.png
│   ├── roc_curve.png
│   ├── feature_importance.png
│   └── model_accuracy_comparison.png
│
├── requirements.txt
├── render.yaml
├── run.py
├── README.md
└── .gitignore
```

---

## Dataset Used

### Cleveland Heart Disease Dataset

Source:
UCI Machine Learning Repository

The dataset contains clinical attributes such as:

* Age
* Sex
* Chest Pain Type
* Resting Blood Pressure
* Cholesterol
* Fasting Blood Sugar
* ECG Results
* Maximum Heart Rate
* Exercise Induced Angina
* Oldpeak
* Slope
* Number of Major Vessels
* Thalassemia

Target:

* `0` → No Heart Disease
* `1` → Heart Disease Present

---

## Model Performance

### Final Selected Model

## Random Forest Classifier

### Performance Metrics

* Accuracy: High-performance model
* Precision: Strong classification quality
* Recall: Good medical detection sensitivity
* F1 Score: Balanced overall performance

Random Forest was selected because it provided the best practical performance for classification and probability prediction.

---

## Installation (Local Setup)

## Backend Setup

```bash
pip install -r requirements.txt
python run.py
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoint

## POST `/predict`

### Request Example

```json
{
  "age": 52,
  "sex": 1,
  "cp": 2,
  "trestbps": 130,
  "chol": 240,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.2,
  "slope": 2,
  "ca": 0,
  "thal": 2
}
```

### Response Example

```json
{
  "prediction": 1,
  "probability": 0.87
}
```

---

## Deployment

### Backend Deployment

Hosted using **Render**

Start Command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend Deployment

Hosted using **Vercel**

Framework:

* Vite

Root Directory:

```text
frontend
```

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

---

## Future Improvements

Planned upgrades:

* PDF medical report generation
* AI-generated clinical summary
* Prediction history tracking
* SQLite / MongoDB integration
* User authentication system
* Admin dashboard
* Doctor portal
* Email report delivery
* Docker deployment
* CI/CD pipeline

---

## Tech Stack

### Backend

* Python
* FastAPI
* Scikit-learn
* Pandas
* NumPy
* Joblib
* Pydantic

### Frontend

* React
* Vite
* Axios
* CSS

### Deployment

* GitHub
* Render
* Vercel

---

## Author

Developed by Chanchal

Machine Learning + Full Stack Healthcare Prediction Project

Designed for portfolio, deployment, and interview presentation.

---

## License

This project is for educational and portfolio purposes.

