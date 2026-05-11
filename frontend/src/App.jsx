import { useState } from "react";
import API from "./api";
import "./App.css";
import jsPDF from "jspdf";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fieldInfo = {
    age: "Age",
    sex: "Gender",
    cp: "Chest Pain Type",
    trestbps: "Resting BP",
    chol: "Cholesterol",
    fbs: "Fasting Blood Sugar",
    restecg: "Rest ECG",
    thalach: "Max Heart Rate",
    exang: "Exercise Angina",
    oldpeak: "Oldpeak",
    slope: "Slope",
    ca: "Major Vessels",
    thal: "Thal"
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    const payload = {};

    Object.keys(formData).forEach((key) => {
      payload[key] = parseFloat(formData[key]);
    });

    try {
      const response = await API.post("/predict", payload);
      const data = response.data;

      setResult({
        prediction: data.prediction,
        probability: (data.probability * 100).toFixed(2)
      });
    } catch {
      setResult({
        error: "Prediction failed. Check backend connection."
      });
    }

    setLoading(false);
    const downloadReport = () => {
  if (!result || result.error) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("CardioAI Medical Report", 20, 20);

    doc.setFontSize(14);
    doc.text(
      `Prediction Result: ${
        result.prediction === 1
          ? "High Risk Detected"
          : "Low Risk Detected"
      }`,
      20,
      40
    );

    doc.text(
      `Confidence Score: ${result.probability}%`,
      20,
      55
    );

    doc.text("Doctor Recommendation:", 20, 75);

    const recommendations =
      result.prediction === 1
        ? [
            "Consult cardiologist soon",
            "Schedule ECG and cholesterol tests",
            "Monitor BP regularly",
            "Maintain healthy diet and exercise"
          ]
        : [
            "Risk appears low",
            "Continue regular checkups",
            "Maintain healthy lifestyle",
            "Monitor BP and cholesterol yearly"
          ];

    let y = 90;
    recommendations.forEach((item) => {
      doc.text(`- ${item}`, 25, y);
      y += 10;
    });

    doc.save("CardioAI_Report.pdf");
  };
  };

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>CardioAI</h2>
        <p>Smart Heart Analysis</p>

        <div className="stat-card">
          <h3>Patients Checked</h3>
          <span>1,248</span>
        </div>

        <div className="stat-card">
          <h3>Accuracy</h3>
          <span>94.7%</span>
        </div>

        <div className="stat-card">
          <h3>Model Type</h3>
          <span>Random Forest</span>
        </div>
      </aside>

      <main className="main-content">
        <div className="top-header">
          <h1>Heart Disease Predictor</h1>
          <p>Professional clinical decision support dashboard</p>
        </div>

        <div className="form-section">
          <div className="form-grid">
            {Object.keys(formData).map((field) => (
              <div className="input-box" key={field}>
                <label>{fieldInfo[field]}</label>

                {field === "sex" ? (
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                  </select>
                ) : field === "exang" ? (
                  <select
                    name="exang"
                    value={formData.exang}
                    onChange={handleChange}
                  >
                    <option value="">Exercise Induced Angina</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                ) : field === "fbs" ? (
                  <select
                    name="fbs"
                    value={formData.fbs}
                    onChange={handleChange}
                  >
                    <option value="">Fasting Blood Sugar</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                ) : field === "restecg" ? (
                  <select
                    name="restecg"
                    value={formData.restecg}
                    onChange={handleChange}
                  >
                    <option value="">Select Rest ECG</option>
                    <option value="0">Normal</option>
                    <option value="1">ST-T abnormality</option>
                    <option value="2">
                      Left ventricular hypertrophy
                    </option>
                  </select>
                ) : field === "slope" ? (
                  <select
                    name="slope"
                    value={formData.slope}
                    onChange={handleChange}
                  >
                    <option value="">Select Slope</option>
                    <option value="0">Upsloping</option>
                    <option value="1">Flat</option>
                    <option value="2">Downsloping</option>
                  </select>
                ) : field === "cp" ? (
                  <select
                    name="cp"
                    value={formData.cp}
                    onChange={handleChange}
                  >
                    <option value="">Chest Pain Type</option>
                    <option value="0">Typical Angina</option>
                    <option value="1">Atypical Angina</option>
                    <option value="2">Non-anginal Pain</option>
                    <option value="3">Asymptomatic</option>
                  </select>
                ) : field === "thal" ? (
                  <select
                    name="thal"
                    value={formData.thal}
                    onChange={handleChange}
                  >
                    <option value="">Select Thal</option>
                    <option value="1">Normal</option>
                    <option value="2">Fixed Defect</option>
                    <option value="3">Reversible Defect</option>
                  </select>
                ) : (
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${fieldInfo[field]}`}
                  />
                )}
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Analyzing Patient Data..." : "Predict Heart Risk"}
          </button>
        </div>
        <div className="guidance-section">
          <h2>Medical Guidance Reference</h2>
          <p>Helpful ranges for better and more accurate input values</p>

          <div className="guidance-grid">

            <div className="guide-card">
              <h3>Cholesterol</h3>
              <p><strong>Normal:</strong> Below 200 mg/dL</p>
              <p><strong>Borderline:</strong> 200–239 mg/dL</p>
              <p><strong>High Risk:</strong> Above 240 mg/dL</p>
            </div>

            <div className="guide-card">
              <h3>Resting Blood Pressure</h3>
              <p><strong>Normal:</strong> Around 120 mm Hg</p>
              <p><strong>High:</strong> Above 140 mm Hg</p>
            </div>

            <div className="guide-card">
              <h3>Fasting Blood Sugar</h3>
              <p><strong>0:</strong> Below 120 mg/dL</p>
              <p><strong>1:</strong> Above 120 mg/dL</p>
            </div>

            <div className="guide-card">
              <h3>Max Heart Rate</h3>
              <p><strong>Example:</strong> Usually 120–170 bpm</p>
              <p>Depends on age and health condition</p>
            </div>

          </div>
        </div>

        {result && (
          <div className="result-card premium-result">
            {result.error ? (
              <h2>{result.error}</h2>
            ) : (
              <>
                <h2>
                  {result.prediction === 1
                    ? "High Risk Detected"
                    : "Low Risk Detected"}
                </h2>

                <p>AI Confidence Score</p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${result.probability}%`
                    }}
                  ></div>
                </div>

                <h3>{result.probability}%</h3>
                <div className="recommendation-box">
                  <h4>Doctor Recommendation</h4>

                  {result.prediction === 1 ? (
                    <ul>
                      <li>Consult a cardiologist as soon as possible</li>
                      <li>Schedule ECG and cholesterol profile test</li>
                      <li>Monitor blood pressure regularly</li>
                      <li>Maintain low-sodium healthy diet</li>
                      <li>Regular walking and exercise recommended</li>
                    </ul>
                  ) : (
                    <ul>
                      <li>Heart disease risk appears low</li>
                      <li>Continue regular health checkups</li>
                      <li>Maintain balanced diet and exercise</li>
                      <li>Monitor cholesterol and BP yearly</li>
                      <li>Continue healthy lifestyle habits</li>
                    </ul>
                  )}
                  <button
                    className="download-btn"
                    onClick={downloadReport}
                  >
                    Download PDF Report
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;