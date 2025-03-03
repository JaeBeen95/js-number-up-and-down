const validateNumber = (inputValue) => {
  if (typeof inputValue !== "string" || inputValue.trim() === "") {
    throw new Error("값을 입력해주세요.");
  }

  const trimmedValue = inputValue.trim();

  const pattern = /^[1-9]\d*$/;
  if (!pattern.test(trimmedValue)) {
    throw new Error("0을 제외한 양의 정수를 입력해주세요");
  }

  return Number(trimmedValue);
};

export default validateNumber;
