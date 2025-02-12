import { validateNumber } from "./validateNumber.js";

export const validateRange = (inputValue) => {
  if (!inputValue) throw new Error("값을 입력해주세요");

  const isValidFormat = /^\d+,\d+$/.test(inputValue.trim());

  if (!isValidFormat) throw new Error("정수, 정수 형태로 입력해주세요");

  const numbers = inputValue.trim().split(",");

  const validNumbers = numbers.map((num) => validateNumber(num));

  return {
    min: Math.min(...validNumbers),
    max: Math.max(...validNumbers),
  };
};
