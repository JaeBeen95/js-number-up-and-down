import { getRandomNumber } from "../utils/index.js";

export const createGameState = (min, max, maxAttempts) => {
  let answer = getRandomNumber(min, max);
  let attempts = 0;
  let guessHistory = [];

  return {
    get answer() {
      return answer;
    },

    get attempts() {
      return attempts;
    },

    get min() {
      return min;
    },

    get max() {
      return max;
    },

    get maxAttempts() {
      return maxAttempts;
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
      answer = getRandomNumber(min, max);
      attempts = 0;
      guessHistory = [];
    },
  };
};
