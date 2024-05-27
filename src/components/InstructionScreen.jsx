import React from "react";
import BackButton from "./BackButton";
import "./InstructionScreen.css";

const InstructionScreen = ({ onNext, onBack }) => {
  return (
    <div className="instruction-screen">
      <BackButton onBack={onBack} />
      <div className="three-cards-div">
        <img src="threeCards.png" className="three-cards" alt="cards" />
        <div className="play-div">
          <img src="play.png" onClick={onNext} className="play" alt="play" />
        </div>
      </div>
    </div>
  );
};

export default InstructionScreen;
