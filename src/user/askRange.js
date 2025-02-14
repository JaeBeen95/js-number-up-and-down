import { readLineAsync } from "./input.js";
import { validateRange } from "../utils/index.js";

async function askRange() {
  while (true) {
    try {
      console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)");
      const rangeInput = await readLineAsync("숫자 입력: ");
      const { min, max } = validateRange(rangeInput);
      return { min, max };
    } catch (error) {
      console.log(error.message);
      console.log("다시 입력해주세요.");
    }
  }
}

export default askRange;
