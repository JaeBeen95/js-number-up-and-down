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
