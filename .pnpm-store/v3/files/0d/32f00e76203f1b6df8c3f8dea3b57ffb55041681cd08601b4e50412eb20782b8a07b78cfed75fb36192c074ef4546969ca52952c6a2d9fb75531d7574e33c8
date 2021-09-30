import { isPlainObject } from "../isPlainObject";

test("isPlainObject", () => {
  class Obj {}
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject(new Obj())).toBe(false);
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject(1)).toBe(false);
  expect(isPlainObject("a")).toBe(false);
  expect(isPlainObject(null)).toBe(false);
});
