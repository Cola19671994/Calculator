import React, { useState } from "react";
import styles from './Calculator.module.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isResult, setIsResult] = useState(false); // Новый стейт для отслеживания результата

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const handleButtonClick = (value) => {
    setIsResult(false); // Сбрасываем флаг результата
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
      setIsResult(true); // Устанавливаем флаг результата, чтобы сделать текст красным
    }
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setStoredValue(null);
    setOperator(null);
    setIsResult(false); // Сбрасываем флаг результата
  };

  return (
    <div className={styles.calculator}>
      {/* Динамически изменяем класс в зависимости от того, является ли это результатом */}
      <div className={`${styles.display} ${isResult ? styles.result : ''}`}>
        {displayValue}
      </div>
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <button key={button} onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
        <button className={styles.operator} onClick={() => handleOperatorClick("+")}>+</button>
        <button className={styles.operator} onClick={() => handleOperatorClick("-")}>-</button>
        <button className={styles.equal} onClick={handleEqualClick}>=</button>
        <button className={styles.clear} onClick={handleClearClick}>C</button>
      </div>
    </div>
  );
};

export default Calculator;

