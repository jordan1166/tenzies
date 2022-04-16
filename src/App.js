import React, { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  const [diceInfo, setDiceInfo] = useState(allNewDice());

  function allNewDice() {
    const diceInfoArray = Array(10)
      .fill()
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      }));
    return diceInfoArray;
  }

  function rollDice() {
    setDiceInfo((prevDice) =>
      prevDice.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.ceil(Math.random() * 6), id: nanoid() };
      })
    );
  }

  function holdDice(id) {
    setDiceInfo((prevDice) =>
      prevDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  return (
    <main>
      <div className="dice-container">
        {diceInfo.map((dice) => (
          <Die
            key={dice.id}
            value={dice.value}
            isHeld={dice.isHeld}
            holdDice={() => holdDice(dice.id)}
          />
        ))}
      </div>
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
