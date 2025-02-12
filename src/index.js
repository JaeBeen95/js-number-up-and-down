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

const handleGameResult = ({ isAnswerCorrect, answer, attempts }) => {
  if (isAnswerCorrect) {
    console.log(`정답! ${attempts}번 만에 숫자를 맞추셨습니다.`);
    return true;
  }

  if (attempts >= 5) {
    console.log(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`);
    return true;
  }

  return false;
};

const displayHint = ({ guessNumber, randomNumber, guessHistory }) => {
  console.log(guessNumber > randomNumber ? "다운" : "업");
  console.log(`이전 추측: ${guessHistory}`);
};

async function play() {
  while (true) {
    try {
      console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)");
      const rangeInput = await readLineAsync("숫자 입력: ");
      const { min, max } = validateRange(rangeInput);

      const gameState = createGameState(min, max);

      console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");

      const guessInput = await readLineAsync("숫자 입력: ");
      const guessNumber = validateNumber(guessInput);
      const isAnswerCorrect = guessNumber === gameState.answer;

      gameState.addAttempt();
      gameState.saveGuess(guessNumber);

      const gameFinished = handleGameResult({
        isAnswerCorrect,
        answer: gameState.answer,
        attempts: gameState.attempts,
      });

      if (gameFinished) break;

      displayHint({
        guessNumber: guessNumber,
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
