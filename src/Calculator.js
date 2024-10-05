import React, { useState } from "react";
import styles from './Calculator.module.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [resultColor, setResultColor] = useState(false);

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const handleButtonClick = (value) => {
    setResultColor(false);
    if (displayValue === "0") {
      setDisplayValue(value);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleOperatorClick = (operator) => {
    setStoredValue(displayValue);
    setDisplayValue("0");
    setOperator(operator);
  };

  const handleEqualClick = () => {
    if (operator && storedValue !== null) {
      let result;
      const current = parseInt(displayValue);
      const previous = parseInt(storedValue);

      if (operator === "+") {
        result = previous + current;
      } else if (operator === "-") {
        result = previous - current;
      }

      setDisplayValue(result.toString());
      setStoredValue(null);
      setOperator(null);
      setResultColor(true); // Меняем цвет результата
    }
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setStoredValue(null);
    setOperator(null);
    setResultColor(false);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display} style={{ color: resultColor ? "red" : "black" }}>
        {displayValue}
      </div>
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <button key={button} onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
        <button onClick={() => handleOperatorClick("+")}>+</button>
        <button onClick={() => handleOperatorClick("-")}>-</button>
        <button onClick={handleEqualClick}>=</button>
        <button onClick={handleClearClick}>C</button>
      </div>
    </div>
  );
};

export default Calculator;

