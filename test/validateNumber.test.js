import { validateNumber } from "../src/utils";

describe("validateNumber 함수 테스트", () => {
  test("유효한 정수 문자열 입력값 테스트", () => {
    expect(validateNumber("123")).toBe(123);
    expect(validateNumber("0")).toBe(0);
    expect(validateNumber("-123")).toBe(-123);
  });

  test("앞뒤 공백이 있는 입력값 테스트", () => {
    expect(validateNumber("  123  ")).toBe(123);
    expect(validateNumber(" -456 ")).toBe(-456);
  });

  test("빈 문자열 입력값 테스트", () => {
    expect(() => validateNumber("")).toThrow("값을 입력해주세요.");
  });

  test("공백 입력값 테스트", () => {
    expect(() => validateNumber("   ")).toThrow("값을 입력해주세요.");
  });

  test("정수가 아닌 입력값 테스트", () => {
    expect(() => validateNumber("12.34")).toThrow("정수 값만 입력해주세요");
    expect(() => validateNumber("-12.34")).toThrow("정수 값만 입력해주세요");
  });

  test("문자열이 아닌 입력값 테스트", () => {
    expect(() => validateNumber(null)).toThrow("값을 입력해주세요.");
    expect(() => validateNumber(undefined)).toThrow("값을 입력해주세요.");
    expect(() => validateNumber({})).toThrow("값을 입력해주세요.");
    expect(() => validateNumber([])).toThrow("값을 입력해주세요.");
  });
});
