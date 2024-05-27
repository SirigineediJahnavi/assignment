import React from "react";
import BackButton from "./BackButton";
import "./FinalScreen.css"

const FinalScreen = ({ bananas, onRestart, onBack }) => {
  return (
    <div className="final-screen">
      <BackButton onBack={onBack} />
      
      <img src="final.png" alt="final" className="final" />
    </div>
  );
};

export default FinalScreen;
