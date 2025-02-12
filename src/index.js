import { readLineAsync } from "./input.js";
import { validateNumber } from "./utils/validateNumber.js";
import { validateRange } from "./utils/validateRange.js";

const getRandomNumber = (startNum, endNum) => {
  const randomNumber = Math.floor(Math.random() * endNum) + startNum;

  return randomNumber;
};

const createGameState = (startNum, endNum) => {
  let answer = getRandomNumber(startNum, endNum);
  let attempts = 0;
  let guessHistory = [];

  return {
    get answer() {
      return answer;
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
      answer = getRandomNumber(startNum, endNum);
      attempts = 0;
      guessHistory = [];
    },
  };
};

const handleGameResult = ({ isAnswerCorrect, answer, attempts, maxAttempts }) => {
  if (isAnswerCorrect) {
    console.log(`정답! ${attempts}번 만에 숫자를 맞추셨습니다.`);
    return true;
  }

  if (attempts >= maxAttempts) {
    console.log(`${maxAttempts}회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`);
    return true;
  }

  return false;
};

const displayHint = ({ guessNumber, randomNumber, guessHistory }) => {
  console.log(guessNumber > randomNumber ? "다운" : "업");
  console.log(`이전 추측: ${guessHistory}`);
};

async function initializeRange() {
  try {
    console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)");
    const rangeInput = await readLineAsync("숫자 입력: ");
    const { min, max } = validateRange(rangeInput);
    return { min, max };
  } catch (error) {
    console.log(error.message);
    return initializeRange();
  }
}

async function initializeMaxAttempts() {
  try {
    console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.");
    const attemptsInput = await readLineAsync("숫자 입력: ");
    const maxAttempts = validateNumber(attemptsInput);
    return maxAttempts;
  } catch (error) {
    console.log(error.message);
    return initializeMaxAttempts();
  }
}

async function play() {
  const { min, max } = await initializeRange();
  const maxAttempts = await initializeMaxAttempts();

  const gameState = createGameState(min, max);

  console.log(
    `컴퓨터가 ${min}~${max} 사이의 숫자를 선택했습니다. ${maxAttempts}회 안에 숫자를 맞춰보세요.`
  );

  while (true) {
    try {
      const guessInput = await readLineAsync("숫자 입력: ");
      const guessNumber = validateNumber(guessInput);
      const isAnswerCorrect = guessNumber === gameState.answer;

      gameState.addAttempt();
      gameState.saveGuess(guessNumber);

      const gameFinished = handleGameResult({
        isAnswerCorrect,
        answer: gameState.answer,
        attempts: gameState.attempts,
        maxAttempts: maxAttempts,
      });

      if (gameFinished) break;

      displayHint({
        guessNumber,
        randomNumber: gameState.answer,
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
