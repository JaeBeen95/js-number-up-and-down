import { readLineAsync } from "./input.js";

const gameState = {
  randomNumber: Math.floor(Math.random() * 50) + 1,
  attempts: 0,
  input: [],
};

const validateInputValue = (inputValue) => {
  const inputNumber = Number(inputValue);
  const isNotNumber = Number.isNaN(inputNumber);
  const isNotInteger = !Number.isInteger(inputNumber);
  const isOutOfRange = inputNumber < 1 || inputNumber > 50;

  if (isNotNumber || isNotInteger || isOutOfRange) {
    console.log("1에서 50사이의 숫자 값만 입력해주세요");
  }

  return inputNumber;
};

async function play() {
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");

  while (true) {
    const inputValue = await readLineAsync("숫자 입력: ");
    const validNumber = validateInputValue(inputValue);

    if (!validNumber) continue;

    gameState.attempts++;

    if (validNumber === gameState.randomNumber) {
      console.log(`정답! ${gameState.attempts}번 만에 숫자를 맞추셨습니다.`);
      break;
    } else if (validNumber > gameState.randomNumber) {
      console.log("다운");
    } else {
      console.log("업");
    }
  }
}
