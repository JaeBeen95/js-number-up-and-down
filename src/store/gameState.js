import { getRandomNumber } from "../utils/index.js";

export class GameState {
  #answer;
  #attempts;
  #guessHistory;

  constructor(min, max, maxAttempts) {
    this.min = min;
    this.max = max;
    this.maxAttempts = maxAttempts;
    this.#initializeState();
  }

  #initializeState() {
    this.#answer = getRandomNumber(this.min, this.max);
    this.#attempts = 0;
    this.#guessHistory = [];
  }

  get answer() {
    return this.#answer;
  }

  get attempts() {
    return this.#attempts;
  }

  get guessHistory() {
    return [...this.#guessHistory];
  }

  addAttempt() {
    this.#attempts += 1;
  }

  saveGuess(userGuess) {
    this.#guessHistory.push(userGuess);
  }
}
