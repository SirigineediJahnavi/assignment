import React, { useState, useEffect } from "react";
import "./ActivityScreen.css";
import BackButton from "./BackButton";

const fruits = ["🍎", "🥝", "🍌", "🍇", "🍒", "🍓"];
const fruitCategory = [
  "apples.jpg", // 🍎
  "kiwi.jpg", // 🥝
  "bananas.jpg", // 🍌
  "grapes.jpg", // 🍇
  "cherries.jpg", // 🍒
  "strawberries.jpg", // 🍓
];

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ActivityScreen = ({ onGameEnd, onBack }) => {
  const [leftCards, setLeftCards] = useState([]);
  const [rightCards, setRightCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const shuffledFruits = shuffleArray(fruits);
    const shuffledImages = shuffleArray(fruitCategory);
    setLeftCards(shuffledFruits);
    setRightCards(shuffledImages);
  }, []);

  useEffect(() => {
    if (matchedCards.length === leftCards.length * 2 && leftCards.length > 0) {
      onGameEnd();
    }
  }, [matchedCards, leftCards.length, onGameEnd]);

  const handleCardClick = (index, side) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.some((card) => card.index === index && card.side === side)
    ) {
      return;
    }
  
    const newFlippedCards = [...flippedCards, { index, side }];
    setFlippedCards(newFlippedCards);
  
    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
  
      const firstFruit =
        firstCard.side === "left" ? leftCards[firstCard.index] : null;
      const secondImage =
        secondCard.side === "right" ? rightCards[secondCard.index] : null;
  
      const secondCardMatch =
        fruitCategory.indexOf(secondImage) === fruits.indexOf(firstFruit);
  
      if (
        (firstFruit && secondImage && secondCardMatch) 
      ) {
        const matchedIndexes = [firstCard.index, secondCard.index];
        setMatchedCards([
          ...matchedCards,
          { index: firstCard.index, side: firstCard.side },
          { index: secondCard.index, side: secondCard.side },
        ]);
  
        matchedIndexes.forEach((index) => {
          const side = index < leftCards.length ? "left" : "right";
          const cardIndex = side === "left" ? index : index - leftCards.length;
          const selector = `.card[data-side="${side}"][data-index="${cardIndex}"]`;
          const matchedCard = document.querySelector(selector);
          if (matchedCard) {
            matchedCard.classList.add("highlighted");
          }
        });
  
        matchedIndexes.forEach((index) => {
          const side = index < leftCards.length ? "left" : "right";
          const cardIndex = side === "left" ? index : index - leftCards.length;
          const selector = `.card[data-side="${side}"][data-index="${cardIndex}"]`;
          const matchedCard = document.querySelector(selector);
          if (matchedCard) {
            matchedCard.classList.remove("highlighted");
            matchedCard.classList.add("zoomed");
          }
        });
  
        setTimeout(() => {
          matchedIndexes.forEach((index) => {
            const side = index < leftCards.length ? "left" : "right";
            const cardIndex =
              side === "left" ? index : index - leftCards.length;
            const selector = `.card[data-side="${side}"][data-index="${cardIndex}"]`;
            const matchedCard = document.querySelector(selector);
            if (matchedCard) {
              matchedCard.classList.remove("zoomed");
              matchedCard.classList.add("disappear");
            }
          });
  
          setFlippedCards([]);
        }, 10000); // Adjusted time for matched cards to appear for 1000ms
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  return (
    <div className="game">
      <BackButton onBack={onBack} />
      <div className="select-div">
        <img src="selectACard.png" className="select-top" alt="select" />
      </div>
      <div className="board">
        <div className="column">
          <div className="column">
            {leftCards.map((fruit, index) => {
              const isMatched = matchedCards.some(
                (card) => card.index === index && card.side === "left"
              );
              const isFlipped = flippedCards.some(
                (card) => card.index === index && card.side === "left"
              );

              if (isMatched) {
                return (
                  <div
                    key={index}
                    className={`card matched ${isFlipped ? "flipped" : ""}`}
                  ></div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={`card ${isFlipped ? "flipped" : ""}`}
                    onClick={() => handleCardClick(index, "left")}
                  >
                    <div className="card-front">{fruit}</div>
                    <div className="card-back">
                      <img
                        src="pinkCard.png"
                        alt="pink-card"
                        className="pink-card"
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="column">
          <div className="column">
            {rightCards.map((image, index) => {
              const isMatched = matchedCards.some(
                (card) => card.index === index && card.side === "right"
              );
              const isFlipped = flippedCards.some(
                (card) => card.index === index && card.side === "right"
              );

              if (isMatched) {
                return (
                  <div
                    key={index}
                    className={`card matched ${isFlipped ? "flipped" : ""}`}
                  ></div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={`card ${isFlipped ? "flipped" : ""}`}
                    onClick={() => handleCardClick(index, "right")}
                  >
                    <div className="card-front">
                      <img
                        src={image}
                        alt="fruit"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="card-back">
                      <img
                        src="blueCard.png"
                        alt="blue-card"
                        className="blue-card"
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="select-div">
        <img src="selectDown.png" className="select-down" alt="select" />
      </div>
    </div>
  );
};

export default ActivityScreen;
