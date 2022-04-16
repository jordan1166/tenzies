import React, { useState } from "react";
import Die from "./Die";

export default function App() {
  const [diceNumbers, setDiceNumbers] = useState(allNewDice());

  function allNewDice() {
    const randomNumbersArray = Array(10)
      .fill()
      .map(() => Math.ceil(Math.random() * 6));
    return randomNumbersArray;
  }

  return (
    <main>
      <div className="dice-container">
        {diceNumbers.map((number) => (
          <Die value={number} />
        ))}
      </div>
    </main>
  );
}
