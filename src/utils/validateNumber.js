const validateNumber = (inputValue) => {
  const inputNumber = Number(inputValue);
  const isNotNumber = Number.isNaN(inputNumber);
  const isNotInteger = !Number.isInteger(inputNumber);

  if (isNotNumber || isNotInteger) {
    throw new Error("정수 값만 입력해주세요");
  }

  return inputNumber;
};

export default validateNumber;
