// Card.js
import React from 'react';

const Card = ({ card, onClick, isFlipped }) => (
  <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
    <div className="card-inner">
      <div className="card-front">?</div>
      <div className="card-back">{card.content}</div>
    </div>
  </div>
);

export default Card;