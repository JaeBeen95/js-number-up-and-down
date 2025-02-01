import { readLineAsync } from "./input.js";

async function play() {
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
  const inputValue = await readLineAsync("숫자 입력: ");
  console.log(inputValue);
}

play();
