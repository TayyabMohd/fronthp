import React from "react";
//import { theme } from "./theme";
import "./App.css";
import HealthPredictionUI from "./components/HealthPredictionUI";
import Spline from "@splinetool/react-spline";

function App() {
  return (
    <div className="App">
      {/* Background Spline Scene */}
      <div className="background-spline">
        <Spline scene="https://prod.spline.design/fVND-LFdmTx4nzNe/scene.splinecode" />
      </div>

      <header className="App-header">
        <h1>Health Prediction Tool</h1>
        <p>Powered by Advanced ML Predictions</p>
      </header>

      <main>
        <HealthPredictionUI />
      </main>
    </div>
  );
}

export default App;
