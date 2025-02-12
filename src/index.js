import { readLineAsync } from "./input.js";

const getRandomNumber = (startNum, endNum) => {
  const randomNumber = Math.floor(Math.random() * endNum) + startNum;

  return randomNumber;
};

const createGameState = (startNum, endNum) => {
  let targetNumber = getRandomNumber(startNum, endNum);
  let attempts = 0;
  let guessHistory = [];

  return {
    get targetNumber() {
      return targetNumber;
    },

    get attempts() {
      return attempts;
    },

    addAttempt() {
      attempts += 1;
    },

    get guessHistory() {
      return [...guessHistory];
    },

    saveGuess(userGuess) {
      guessHistory.push(userGuess);
    },

    reset() {
      targetNumber = getRandomNumber(startNum, endNum);
      attempts = 0;
      guessHistory = [];
    },
  };
};

const validateInputValue = (inputValue) => {
  const inputNumber = Number(inputValue);
  const isNotNumber = Number.isNaN(inputNumber);
  const isNotInteger = !Number.isInteger(inputNumber);
  const isOutOfRange = inputNumber < 1 || inputNumber > 50;

  if (isNotNumber || isNotInteger || isOutOfRange) {
    throw new Error("1에서 50사이의 정수 값만 입력해주세요");
  }

  return inputNumber;
};

const handleGameResult = ({ isCorrect, targetNumber, attempts }) => {
  if (isCorrect) {
    console.log(`정답! ${attempts}번 만에 숫자를 맞추셨습니다.`);
    return true;
  }

  if (attempts >= 5) {
    console.log(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${targetNumber})`);
    return true;
  }

  return false;
};

const displayHint = ({ userNumber, randomNumber, guessHistory }) => {
  console.log(userNumber > randomNumber ? "다운" : "업");
  console.log(`이전 추측: ${guessHistory}`);
};

async function play() {
  while (true) {
    try {
      console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)");
      const minAndMaxValue = await readLineAsync("숫자 입력: ");
      const minAndMaxNumber = minAndMaxValue.trim().split(",").map(Number);

      const minAndMaxObj = {
        min: Math.min(...minAndMaxNumber),
        max: Math.max(...minAndMaxNumber),
      };

      const gameState = createGameState(minAndMaxObj.min, minAndMaxObj.max);

      console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");

      const inputValue = await readLineAsync("숫자 입력: ");
      const validNumber = validateInputValue(inputValue);
      const isCorrect = validNumber === gameState.targetNumber;

      gameState.addAttempt();
      gameState.saveGuess(validNumber);

      const gameFinished = handleGameResult({
        isCorrect,
        targetNumber: gameState.targetNumber,
        attempts: gameState.attempts,
      });

      if (gameFinished) break;

      displayHint({
        userNumber: validNumber,
        randomNumber: gameState.targetNumber,
        guessHistory: gameState.guessHistory,
      });
    } catch (error) {
      console.log(error.message);
      continue;
    }
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
  const gameState = createGameState();

  do {
    gameState.reset();
    await play();
  } while (await askToPlayAgain());

  console.log("게임을 종료합니다.");
}

upAndDownGame();
