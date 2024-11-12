// src/components/HealthPredictionUI.js
import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Button from "@mui/material/Button";
function SymptomForm() {
  const [formData, setFormData] = useState({
    cold: false,
    fever: false,
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

    try {
      const response = await axios.post(
        "http://localhost:5000/submit-symptoms",
        formData
      );
      setSubmittedData(response.data); // Update with response data from server
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Select Symptoms</h2>

        <Button
          type="button"
          onClick={() => handleSymptomClick("cold")}
          // style={{ backgroundColor: formData.cold ? "lightgreen" : "" }}
          variant="contained"
        >
          Cold
        </Button>

        <button
          type="button"
          onClick={() => handleSymptomClick("fever")}
          style={{ backgroundColor: formData.fever ? "lightgreen" : "" }}
        >
          Fever
        </button>

        <br />

        <label>
          Other Symptoms:
          <input
            type="text"
            value={formData.otherSymptom}
            onChange={handleInputChange}
          />
        </label>

        <br />

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SymptomForm;
