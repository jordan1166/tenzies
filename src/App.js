import React, { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  const [diceNumbers, setDiceNumbers] = useState(allNewDice());

  function allNewDice() {
    const randomNumbersArray = Array(10)
      .fill()
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      }));
    return randomNumbersArray;
  }

  function rollDice() {
    setDiceNumbers(allNewDice());
  }

  return (
    <main>
      <div className="dice-container">
        {diceNumbers.map((number) => (
          <Die key={number.id} value={number.value} />
        ))}
      </div>
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
