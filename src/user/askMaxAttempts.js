import { getValidatedInput, validateNumber } from "../utils/index.js";

async function askMaxAttempts() {
  console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.");
  return getValidatedInput("숫자 입력: ", validateNumber);
}

export default askMaxAttempts;
