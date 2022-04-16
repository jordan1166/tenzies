import React, { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  const [diceInfo, setDiceInfo] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = diceInfo.every((dice) => dice.isHeld);
    const firstValue = diceInfo[0].value;
    const allSameValue = diceInfo.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [diceInfo]);

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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
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
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
