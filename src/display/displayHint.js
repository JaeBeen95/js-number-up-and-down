const displayHint = ({ guessNumber, randomNumber, guessHistory }) => {
  console.log(guessNumber > randomNumber ? "다운" : "업");
  console.log(`이전 추측: ${guessHistory}`);
};

export default displayHint;
