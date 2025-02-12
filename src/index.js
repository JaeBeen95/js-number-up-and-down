import { readLineAsync } from "./input.js";
import { createGameState } from "./store/createGameState.js";
import { validateNumber, validateRange } from "./utils/index.js";
import { displayGameResult, displayHint } from "./display/index.js";

async function initializeRange() {
  while (true) {
    try {
      console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)");
      const rangeInput = await readLineAsync("숫자 입력: ");
      const { min, max } = validateRange(rangeInput);
      return { min, max };
    } catch (error) {
      console.log(error.message);
      console.log("다시 입력해주세요.");
    }
  }
}

async function initializeMaxAttempts() {
  while (true) {
    try {
      console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.");
      const attemptsInput = await readLineAsync("숫자 입력: ");
      const maxAttempts = validateNumber(attemptsInput);
      return maxAttempts;
    } catch (error) {
      console.log(error.message);
      console.log("다시 입력해주세요.");
    }
  }
}

async function play(gameState) {
  console.log(
    `컴퓨터가 ${gameState.min}~${gameState.max} 사이의 숫자를 선택했습니다. ${gameState.maxAttempts}회 안에 숫자를 맞춰보세요.`
  );

  while (true) {
    try {
      const guessInput = await readLineAsync("숫자 입력: ");
      const guessNumber = validateNumber(guessInput);
      const isAnswerCorrect = guessNumber === gameState.answer;

      gameState.addAttempt();
      gameState.saveGuess(guessNumber);

      const gameFinished = displayGameResult({
        isAnswerCorrect,
        answer: gameState.answer,
        attempts: gameState.attempts,
        maxAttempts: gameState.maxAttempts,
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
  const { min, max } = await initializeRange();
  const maxAttempts = await initializeMaxAttempts();

  const gameState = createGameState(min, max, maxAttempts);

  do {
    gameState.reset();
    await play(gameState);
  } while (await askToPlayAgain());

  console.log("게임을 종료합니다.");
}

upAndDownGame();
