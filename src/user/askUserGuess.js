import { getValidatedInput, validateNumber } from "../utils/index.js";

async function askUserGuess() {
  return getValidatedInput("숫자 입력: ", validateNumber);
}

export default askUserGuess;
