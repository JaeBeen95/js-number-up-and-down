import { validateRange, getValidatedInput } from "../utils/index.js";

async function askRange() {
  console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)");
  return getValidatedInput("숫자 입력: ", validateRange);
}

export default askRange;
