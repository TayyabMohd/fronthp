import React, { useState } from "react";
import axios from "axios";
import "./HealthPredictionUI.css";

function SymptomForm() {
  const [formData, setFormData] = useState({
    fatigue: false,
    headache: false,
    fever: false,
    cough: false,
    musclePain: false,
    jointPain: false,
    shortnessOfBreath: false,
    soreThroat: false,
    congestion: false,
    dizziness: false,
    abdominalPain: false,
    backPain: false,
    lossOfAppetite: false,
    sweating: false,
    anxiety: false,
    otherSymptom: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleSymptomClick = (symptom) => {
    setFormData((prevData) => ({
      ...prevData,
      [symptom]: !prevData[symptom],
    }));
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      otherSymptom: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const filteredData = Object.keys(formData)
      .filter((key) => formData[key] === true || key === "otherSymptom")
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});

    try {
      const response = await axios.post(
        "http://localhost:5000/submit-symptoms",
        filteredData
      );
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  return (
    <div className="health-prediction-container">
      <div className="health-prediction">
        <form onSubmit={handleSubmit}>
          <h2>Select Symptoms</h2>

          <div className="symptom-buttons">
            {[
              { name: "Fatigue", key: "fatigue" },
              { name: "Headache", key: "headache" },
              { name: "Fever", key: "fever" },
              { name: "Cough", key: "cough" },
              { name: "Muscle Pain", key: "musclePain" },
              { name: "Joint Pain", key: "jointPain" },
              { name: "Shortness of Breath", key: "shortnessOfBreath" },
              { name: "Sore Throat", key: "soreThroat" },
              { name: "Congestion", key: "congestion" },
              { name: "Dizziness", key: "dizziness" },
              { name: "Abdominal Pain", key: "abdominalPain" },
              { name: "Back Pain", key: "backPain" },
              { name: "Loss of Appetite", key: "lossOfAppetite" },
              { name: "Sweating", key: "sweating" },
              { name: "Anxiety", key: "anxiety" },
            ].map((symptom) => (
              <button
                key={symptom.key}
                type="button"
                onClick={() => handleSymptomClick(symptom.key)}
                className={`symptom-button ${
                  formData[symptom.key] ? "active" : ""
                }`}
              >
                {symptom.name}
              </button>
            ))}
          </div>

          <label>
            <h3>Enter Other Symptoms:</h3>
            <input
              type="text"
              value={formData.otherSymptom}
              onChange={handleInputChange}
              placeholder="Specify other symptoms"
            />
          </label>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      {submittedData && (
        <div className="prediction-result">
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SymptomForm;
