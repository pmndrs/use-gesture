import { isPromise } from "../isPromise";

test("isPromise", () => {
  expect(isPromise(new Promise(() => {}))).toBe(true);
  expect(isPromise({})).toBe(false);
});
