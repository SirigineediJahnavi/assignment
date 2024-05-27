// App.jsx

import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import InstructionScreen from './components/InstructionScreen';
import ActivityScreen from './components/ActivityScreen';
import FinalScreen from './components/FinalScreen';
import './App.css';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [screenHistory, setScreenHistory] = useState([]);
  const [bananas, setBananas] = useState(0);

  const handleStart = () => {
    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen('instructions');
  };

  const handleNext = () => {
    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen('activity');
  };

  const handleGameEnd = (collectedBananas) => {
    setBananas(collectedBananas);
    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen('final');
  };

  const handleRestart = () => {
    setBananas(0);
    setScreenHistory([]);
    setCurrentScreen('intro');
  };

  const handleBack = () => {
    const history = [...screenHistory];
    const previousScreen = history.pop();
    setScreenHistory(history);
    setCurrentScreen(previousScreen);
  };

  return (
    <div className="app">
      {currentScreen === 'intro' && <IntroScreen onStart={handleStart} onBack={handleBack} />}
      {currentScreen === 'instructions' && <InstructionScreen onNext={handleNext} onBack={handleBack} />}
      {currentScreen === 'activity' && <ActivityScreen onGameEnd={handleGameEnd} onBack={handleBack} />}
      {currentScreen === 'final' && <FinalScreen bananas={bananas} onRestart={handleRestart} onBack={handleBack} />}
    </div>
  );
};

export default App;
