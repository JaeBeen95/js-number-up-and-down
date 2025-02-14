import { createGameState } from "./store/createGameState.js";
import { displayGameResult, displayHint } from "./display/index.js";
import { askRange, askMaxAttempts, askToPlayAgain, askUserGuess } from "./user/index.js";

async function play(gameState) {
  console.log(
    `컴퓨터가 ${gameState.min}~${gameState.max} 사이의 숫자를 선택했습니다. ${gameState.maxAttempts}회 안에 숫자를 맞춰보세요.`
  );

  while (true) {
    try {
      const guessNumber = await askUserGuess();
      gameState.addAttempt();
      gameState.saveGuess(guessNumber);

      const gameFinished = displayGameResult({
        isAnswerCorrect: guessNumber === gameState.answer,
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

async function upAndDownGame() {
  const { min, max } = await askRange();
  const maxAttempts = await askMaxAttempts();

  const gameState = createGameState(min, max, maxAttempts);

  do {
    gameState.reset();
    await play(gameState);
  } while (await askToPlayAgain());

  console.log("게임을 종료합니다.");
}

upAndDownGame();
