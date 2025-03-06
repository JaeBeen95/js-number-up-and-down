const displayGameResult = ({ isAnswerCorrect, answer, attempts, maxAttempts }) => {
  if (isAnswerCorrect) {
    console.log(`정답! ${attempts}번 만에 숫자를 맞추셨습니다.`);
    return true;
  }

  if (attempts >= maxAttempts) {
    console.log(`${maxAttempts}회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`);
    return true;
  }

  return false;
};

export default displayGameResult;
