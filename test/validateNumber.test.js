import { validateNumber } from "../src/utils";

describe("validateNumber 함수 테스트", () => {
  test("유효한 정수 문자열 입력값 테스트", () => {
    expect(validateNumber("123")).toBe(123);
  });

  test("앞뒤 공백이 있는 입력값 테스트", () => {
    expect(validateNumber("  123  ")).toBe(123);
  });

  test("빈 문자열 입력값 테스트", () => {
    expect(() => validateNumber("")).toThrow("값을 입력해주세요.");
  });

  test("공백 입력값 테스트", () => {
    expect(() => validateNumber("   ")).toThrow("값을 입력해주세요.");
  });

  test("정수가 아닌 입력값 테스트", () => {
    expect(() => validateNumber("12.34")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateNumber("-12.34")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateNumber("0")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateNumber("-123")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateNumber("abc")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateNumber("1a2")).toThrow("0을 제외한 양의 정수를 입력해주세요");
  });

  test("문자열이 아닌 입력값 테스트", () => {
    expect(() => validateNumber(null)).toThrow("값을 입력해주세요.");
    expect(() => validateNumber(undefined)).toThrow("값을 입력해주세요.");
    expect(() => validateNumber({})).toThrow("값을 입력해주세요.");
    expect(() => validateNumber([])).toThrow("값을 입력해주세요.");
  });
});
