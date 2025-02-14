import readLineAsync from "./input.js";
import { validateNumber } from "../utils/index.js";

async function askUserGuess() {
  while (true) {
    try {
      const guessInput = await readLineAsync("숫자 입력: ");
      return validateNumber(guessInput);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default askUserGuess;
