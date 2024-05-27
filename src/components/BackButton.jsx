import React from 'react';
import './BackButton.css';

const BackButton = ({ onBack }) => {
  return (
    <div className='back-div'>
     
    <img src="back.png" className="back-button" onClick={onBack} alt="backbutton"/>
    
    </div>
  );
};

export default BackButton;
