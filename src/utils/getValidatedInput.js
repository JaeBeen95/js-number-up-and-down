import { readLineAsync } from "../user/index.js";

async function getValidatedInput(promptMessage, validatorFn) {
  while (true) {
    try {
      const input = await readLineAsync(promptMessage);
      const trimmedInput = input.toLowerCase().trim();
      return validatorFn(trimmedInput);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default getValidatedInput;
