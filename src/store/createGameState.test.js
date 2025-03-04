import { createGameState } from "./createGameState";

describe("createGameState 테스트", () => {
  const min = 1;
  const max = 100;
  const maxAttempts = 5;
  let gameState;

  beforeEach(() => {
    gameState = createGameState(min, max, maxAttempts);
  });

  test("초기 상태의 값들을 올바르게 반환하는지 테스트", () => {
    expect(gameState.answer).toBeGreaterThanOrEqual(min);
    expect(gameState.answer).toBeLessThanOrEqual(max);

    expect(gameState.attempts).toBe(0);
    expect(gameState.guessHistory).toEqual([]);
  });

  test("attempts 값 증가 테스트", () => {
    const initialAttempts = gameState.attempts;
    gameState.addAttempt();
    expect(gameState.attempts).toBe(initialAttempts + 1);
  });

  test("saveGuess가 유저의 추측을 guessHistory에 저장하는지 테스트", () => {
    expect(gameState.guessHistory).toEqual([]);

    gameState.saveGuess(50);
    expect(gameState.guessHistory).toEqual([50]);

    gameState.saveGuess(51);
    expect(gameState.guessHistory).toEqual([50, 51]);
  });

  test("reset이 gameState를 초기 상태로 리셋하는지 테스트", () => {
    gameState.addAttempt();
    gameState.saveGuess(50);

    expect(gameState.attempts).toBeGreaterThan(0);
    expect(gameState.guessHistory).toEqual([50]);

    gameState.reset();

    expect(gameState.attempts).toBe(0);
    expect(gameState.guessHistory).toEqual([]);
    expect(gameState.answer).toBeGreaterThanOrEqual(min);
    expect(gameState.answer).toBeLessThanOrEqual(max);
  });
});
