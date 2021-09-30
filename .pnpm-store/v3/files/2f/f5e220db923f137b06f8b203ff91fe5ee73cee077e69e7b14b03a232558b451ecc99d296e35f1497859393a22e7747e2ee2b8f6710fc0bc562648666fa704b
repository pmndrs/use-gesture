import { shallowEqual } from "../shallowEqual";

test("shallowEqual", () => {
  expect(shallowEqual({}, {})).toBe(true);
  expect(shallowEqual({ a: "a" }, { b: "b" })).toBe(false);
  expect(shallowEqual({ a: "a" }, { a: "a" })).toBe(true);
  expect(shallowEqual({ a: "a" }, { a: "a", b: "b" })).toBe(false);
  expect(shallowEqual({ a: "a" }, {})).toBe(false);
});
