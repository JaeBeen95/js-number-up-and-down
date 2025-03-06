import { validateNumber } from "../utils/index.js";

const validateRange = (inputValue) => {
  if (!inputValue || typeof inputValue !== "string") {
    throw new Error("값을 입력해주세요");
  }

  const numbers = inputValue.split(",").map((num) => num.trim());

  const hasEmptyValue = numbers.includes("");
  if (numbers.length !== 2 || hasEmptyValue) {
    throw new Error("두 개의 정수를 입력해주세요");
  }

  const validNumbers = numbers.map((num) => validateNumber(num));

  return { min: Math.min(...validNumbers), max: Math.max(...validNumbers) };
};

export default validateRange;
