// server/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let latestSubmittedData = null; // Store the latest submitted data

// Route to handle POST request
app.post("/submit-symptoms", (req, res) => {
  const { cold, fever, otherSymptom } = req.body;
  latestSubmittedData = { cold, fever, otherSymptom }; // Save submitted data

  console.log("Received symptoms data:", latestSubmittedData);

  res.json({
    message: "Symptoms received successfully",
    data: latestSubmittedData,
  });
});

// New GET route to display latest submitted data
app.get("/", (req, res) => {
  if (latestSubmittedData) {
    res.send(`
      <h1>Latest Submitted Symptoms</h1>
      <pre>${JSON.stringify(latestSubmittedData, null, 2)}</pre>
    `);
  } else {
    res.send("<h1>No symptoms submitted yet</h1>");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
