import { getRandomNumber } from "../utils/index.js";

export const createGameState = (startNum, endNum) => {
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
