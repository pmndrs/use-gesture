import { isEmpty } from "../isEmpty";

test("isEmpty", () => {
  expect(isEmpty([])).toBe(true);
  expect(isEmpty({})).toBe(true);
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty("")).toBe(true);
  expect(isEmpty(0)).toBe(false);
  expect(isEmpty("a")).toBe(false);
  expect(isEmpty(["a"])).toBe(false);
  expect(isEmpty({ a: "a" })).toBe(false);
});
