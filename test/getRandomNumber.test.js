import { getRandomNumber } from "../src/utils";

describe("getRandomNumber 테스트", () => {
  test("생성된 숫자가 범위 내에 있는지 테스트", () => {
    const min = 1;
    const max = 10;

    for (let i = 0; i < 1000; i++) {
      const randomNum = getRandomNumber(min, max);

      expect(randomNum).toBeGreaterThanOrEqual(min);
      expect(randomNum).toBeLessThanOrEqual(max);
    }
  });

  test("최솟값과 최댓값이 같은 경우 테스트", () => {
    const num = 5;
    const result = getRandomNumber(num, num);

    expect(result).toBe(num);
  });
});
