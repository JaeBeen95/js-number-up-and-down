import readLineAsync from "./input.js";
import { validateNumber } from "../utils/index.js";

async function askMaxAttempts() {
  while (true) {
    try {
      console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.");
      const attemptsInput = await readLineAsync("숫자 입력: ");
      const maxAttempts = validateNumber(attemptsInput);
      return maxAttempts;
    } catch (error) {
      console.log(error.message);
      console.log("다시 입력해주세요.");
    }
  }
}

export default askMaxAttempts;
