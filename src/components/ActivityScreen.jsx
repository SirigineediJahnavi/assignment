import React, { useState, useEffect } from "react";
import "./ActivityScreen.css";
import BackButton from "./BackButton";

const fruits = ["🍎", "🥝", "🍌", "🍇", "🍒", "🍓"];
const fruitCategory = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsjxOFkuA5aLT-7xUTqKBElgnxNxxzrff4eg&s", // 🍎
  "https://th.bing.com/th?id=OSAHI.C833F0D938BC138AE6CB868A6D5DF3BE&w=1144&h=568&c=1", // 🥝
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTShG4qIhsYjrY5cMQbazdVTZfvmJOS7TS4Pw&s", // 🍌
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2AVPTLlxRIaW0ybJ61rq-K-wDM3O1JYuZPg&s", // 🍇
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU6NGmWn2SqIab2vI5FT_Wsko_aOrEQhvd2A&s", // 🍒
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS629kQkbck19DgY3bEOyqMEgF3xM4YmB3MRQ&s", // 🍓
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
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    const shuffledFruits = shuffleArray(fruits);
    const shuffledImages = shuffleArray(fruitCategory);
    setLeftCards(shuffledFruits);
    setRightCards(shuffledImages);
  }, []);

  useEffect(() => {
    if (matchedCards.length === leftCards.length * 2 && leftCards.length > 0) {
      onGameEnd(matches);
    }
  }, [matchedCards, leftCards.length, onGameEnd, matches]);

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
      setAttempts(attempts + 1);
      const [firstCard, secondCard] = newFlippedCards;

      const firstFruit =
        firstCard.side === "left" ? leftCards[firstCard.index] : null;
      const secondFruit =
        secondCard.side === "left" ? leftCards[secondCard.index] : null;
      const firstImage =
        firstCard.side === "right" ? rightCards[firstCard.index] : null;
      const secondImage =
        secondCard.side === "right" ? rightCards[secondCard.index] : null;

      const firstCardMatch =
        fruitCategory.indexOf(firstImage) === fruits.indexOf(secondFruit);
      const secondCardMatch =
        fruitCategory.indexOf(secondImage) === fruits.indexOf(firstFruit);

      // Inside the handleCardClick function after determining a match
      // Inside the handleCardClick function after determining a match
      if (
        (firstFruit && secondImage && secondCardMatch) ||
        (secondFruit && firstImage && firstCardMatch)
      ) {
        // Highlight matched cards
        const matchedIndexes = [firstCard.index, secondCard.index];
        setMatchedCards([
          ...matchedCards,
          { index: firstCard.index, side: firstCard.side },
          { index: secondCard.index, side: secondCard.side },
        ]);
        setMatches(matches + 1);

        // Add a class to highlight the matched cards
        matchedIndexes.forEach((index) => {
          const side = index < leftCards.length ? "left" : "right";
          const cardIndex = side === "left" ? index : index - leftCards.length;
          const selector = `.card[data-side="${side}"][data-index="${cardIndex}"]`;
          const matchedCard = document.querySelector(selector);
          if (matchedCard) {
            matchedCard.classList.add("highlighted");
          }
        });

        // Apply zoom effect with crackers
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

        // Remove the matched cards after a brief moment
        setTimeout(() => {
          matchedIndexes.forEach((index) => {
            const side = index < leftCards.length ? "left" : "right";
            const cardIndex =
              side === "left" ? index : index - leftCards.length;
            const selector = `.card[data-side="${side}"][data-index="${cardIndex}"]`;
            const matchedCard = document.querySelector(selector);
            if (matchedCard) {
              matchedCard.classList.remove("zoomed"); // Remove zoom effect before disappearing
              matchedCard.classList.add("disappear"); // Add the disappear class to trigger the disappearance animation
            }
          });

          setFlippedCards([]);
        }, 500); // Adjust this time to control the duration of the zoom effect before disappearing
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
      <div className="stats">
        <p>Attempts: {attempts}</p>
        <p>Matches: {matches}</p>
      </div>
    </div>
  );
};

export default ActivityScreen;
