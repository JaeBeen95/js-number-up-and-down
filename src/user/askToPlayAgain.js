import readLineAsync from "./input.js";

async function askToPlayAgain() {
  while (true) {
    const input = await readLineAsync("게임을 다시 시작하시겠습니까? (yes/no): ");
    const answer = input.toLowerCase().trim();

    if (answer === "yes") {
      return true;
    }
    if (answer === "no") {
      return false;
    }

    console.log("yes 또는 no만 입력해주세요.");
  }
}

export default askToPlayAgain;
