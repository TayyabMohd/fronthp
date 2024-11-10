import React, { useState } from "react";

function SymptomForm() {
  // State to keep track of selected symptoms and other input
  const [formData, setFormData] = useState({
    cold: false,
    fever: false,
    otherSymptom: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  // Handler to toggle button states
  const handleSymptomClick = (symptom) => {
    setFormData((prevData) => ({
      ...prevData,
      [symptom]: !prevData[symptom],
    }));
  };

  // Handler for text input
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      otherSymptom: event.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setSubmittedData(formData); // Set the submitted data
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Select Symptoms</h2>

        {/* Buttons for cold and fever */}
        <button
          type="button"
          onClick={() => handleSymptomClick("cold")}
          style={{ backgroundColor: formData.cold ? "lightgreen" : "" }}
        >
          Cold
        </button>

        <button
          type="button"
          onClick={() => handleSymptomClick("fever")}
          style={{ backgroundColor: formData.fever ? "lightgreen" : "" }}
        >
          Fever
        </button>

        <br />

        {/* Input for other symptoms */}
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

      {/* Display JSON data after submission */}
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
