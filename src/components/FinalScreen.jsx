import React from 'react';
import BackButton from './BackButton';


const FinalScreen = ({ bananas, onRestart, onBack }) => {
  return (
    <div className="final-screen">
      <BackButton onBack={onBack} />
      <h1>Game Over</h1>
      <p>Total Matches: {bananas}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default FinalScreen;
