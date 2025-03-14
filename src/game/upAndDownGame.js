import { createGameState } from "../store/createGameState.js";
import { askRange, askMaxAttempts, askToPlayAgain } from "../user/index.js";
import play from "./play.js";

async function upAndDownGame() {
  do {
    const { min, max } = await askRange();
    const maxAttempts = await askMaxAttempts();

    const gameState = createGameState(min, max, maxAttempts);

    gameState.reset();
    await play(gameState);
  } while (await askToPlayAgain());

  console.log("게임을 종료합니다.");
}

export default upAndDownGame;
