import { GameState } from "./gameState";

describe("CreateGameState 테스트", () => {
  const min = 1;
  const max = 100;
  const maxAttempts = 5;
  let gameState;

  beforeEach(() => {
    gameState = new GameState(min, max, maxAttempts);
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

  test("새 게임을 시작할 때 상태가 리셋되는지 테스트", () => {
    gameState.addAttempt();
    gameState.saveGuess(50);

    expect(gameState.attempts).toBe(1);
    expect(gameState.guessHistory).toEqual([50]);

    gameState = new GameState(min, max, maxAttempts);

    expect(gameState.attempts).toBe(0);
    expect(gameState.guessHistory).toEqual([]);
    expect(gameState.answer).toBeGreaterThanOrEqual(min);
    expect(gameState.answer).toBeLessThanOrEqual(max);
  });
});
