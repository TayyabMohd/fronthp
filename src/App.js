// App.js
import React from "react";
import "./App.css";
import HealthPredictionUI from "./components/HealthPredictionUI";
import Spline from "@splinetool/react-spline";
import TypingText from "./components/TypingText"; // Import TypingText component

function App() {
  return (
    <div className="App">
      {/* Background Spline Scene */}
      <div className="background-spline">
        <Spline scene="https://prod.spline.design/fVND-LFdmTx4nzNe/scene.splinecode" />
      </div>

      <header className="App-header">
        <h1 className="doto-styles">
          <TypingText text="How can we help you?" speed={100} />
        </h1>
        <p className="doto">
          Type your symptoms and we will find what you're facing
        </p>
      </header>

      <main>
        <HealthPredictionUI />
      </main>
    </div>
  );
}

export default App;
