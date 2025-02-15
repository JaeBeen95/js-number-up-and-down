import { createGameState } from "./createGameState";

test("게임 상태 초기화", () => {
  const gameState = createGameState(1, 50);
  gameState.reset();

  expect(gameState.attempts).toBe(0);
  expect(gameState.guessHistory).toStrictEqual([]);
});

test("게임 상태 업데이트", () => {
  const gameState = createGameState(1, 50);
  gameState.addAttempt();
  gameState.saveGuess(13);

  expect(gameState.attempts).toBe(1);
  expect(gameState.guessHistory).toStrictEqual([13]);
});
