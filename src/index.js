import { readLineAsync } from "./input.js";

const getRandomNumber = (startNum, endNum) => {
  const randomNumber = Math.floor(Math.random() * endNum) + startNum;

  return randomNumber;
};

const gameState = {
  randomNumber: getRandomNumber(1, 50),
  attempts: 0,
  userInput: [],
};

const resetGameState = () => {
  gameState.randomNumber = getRandomNumber(1, 50);
  gameState.attempts = 0;
  gameState.userInput = [];
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

const handleGameResult = (isCorrect, randomNumber, attempts) => {
  if (isCorrect) {
    console.log(`정답! ${attempts}번 만에 숫자를 맞추셨습니다.`);
    return true;
  }

  if (attempts === 5) {
    console.log(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${randomNumber})`);
    return true;
  }

  return false;
};

const displayHint = (userNumber, randomNumber, userGuesses) => {
  console.log(userNumber > randomNumber ? "다운" : "업");
  console.log(`이전 추측: ${userGuesses.join(", ")}`);
};

async function play() {
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");

  while (true) {
    const inputValue = await readLineAsync("숫자 입력: ");
    const validNumber = validateInputValue(inputValue);
    const isCorrect = validNumber === gameState.randomNumber;

    if (!validNumber) continue;

    gameState.attempts++;
    gameState.userInput.push(validNumber);

    const gameFinished = handleGameResult(isCorrect, gameState.randomNumber, gameState.attempts);

    if (gameFinished) break;

    displayHint(validNumber, gameState.randomNumber, gameState.userInput);
  }
}

async function askToPlayAgain() {
  while (true) {
    const answer = await readLineAsync("게임을 다시 시작하시겠습니까? (yes/no): ");
    const lowerAnswer = answer.toLowerCase();

    if (lowerAnswer === "yes") {
      return true;
    }
    if (lowerAnswer === "no") {
      return false;
    }

    console.log("yes 또는 no만 입력해주세요.");
  }
}

async function upAndDownGame() {
  do {
    resetGameState();
    await play();
  } while (await askToPlayAgain());

  console.log("게임을 종료합니다.");
}

upAndDownGame();
