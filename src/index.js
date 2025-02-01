import { readLineAsync } from "./input.js";

const gameState = {
  randomNumber: Math.floor(Math.random() * 50) + 1,
  attempts: 0,
};

async function play() {
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");

  while (true) {
    const inputValue = await readLineAsync("숫자 입력: ");

    gameState.attempts++;

    const userNumber = Number(inputValue);

    if (userNumber === gameState.randomNumber) {
      console.log(`정답! ${gameState.attempts}번 만에 숫자를 맞추셨습니다.`);
      break;
    } else if (userNumber > gameState.randomNumber) {
      console.log("다운");
    } else {
      console.log("업");
    }
  }
}
