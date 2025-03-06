import { validateRange } from "../src/utils";

describe("validateRange 함수 테스트", () => {
  test("유효한 두 정수 입력값 테스트", () => {
    expect(validateRange("1,5")).toEqual({ min: 1, max: 5 });
  });

  test("순서가 바뀐 두 정수 입력값 테스트", () => {
    expect(validateRange("5,1")).toEqual({ min: 1, max: 5 });
  });

  test("앞뒤 공백이 있는 입력값 테스트", () => {
    expect(validateRange(" 1 , 5 ")).toEqual({ min: 1, max: 5 });
  });

  test("빈 문자열 입력값 테스트", () => {
    expect(() => validateRange("")).toThrow("값을 입력해주세요");
  });

  test("null/undefined 입력값 테스트", () => {
    expect(() => validateRange(null)).toThrow("값을 입력해주세요");
    expect(() => validateRange(undefined)).toThrow("값을 입력해주세요");
  });

  test("잘못된 형식 입력값 테스트", () => {
    expect(() => validateRange("1")).toThrow("두 개의 정수를 입력해주세요");
    expect(() => validateRange("1,2,3")).toThrow("두 개의 정수를 입력해주세요");
    expect(() => validateRange("1,")).toThrow("두 개의 정수를 입력해주세요");
    expect(() => validateRange(",2")).toThrow("두 개의 정수를 입력해주세요");
  });

  test("문자가 포함된 입력값 테스트", () => {
    expect(() => validateRange("a,b")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateRange("1,b")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateRange("a,1")).toThrow("0을 제외한 양의 정수를 입력해주세요");
  });

  test("소수점이 포함된 입력값 테스트", () => {
    expect(() => validateRange("1.5,2")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateRange("1,2.5")).toThrow("0을 제외한 양의 정수를 입력해주세요");
  });

  test("0이 포함된 입력값 테스트", () => {
    expect(() => validateRange("0,5")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateRange("5,0")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateRange("0,0")).toThrow("0을 제외한 양의 정수를 입력해주세요");
  });

  test("음수가 포함된 입력값 테스트", () => {
    expect(() => validateRange("-5,3")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateRange("1,-5")).toThrow("0을 제외한 양의 정수를 입력해주세요");
    expect(() => validateRange("-7,-2")).toThrow("0을 제외한 양의 정수를 입력해주세요");
  });
});
