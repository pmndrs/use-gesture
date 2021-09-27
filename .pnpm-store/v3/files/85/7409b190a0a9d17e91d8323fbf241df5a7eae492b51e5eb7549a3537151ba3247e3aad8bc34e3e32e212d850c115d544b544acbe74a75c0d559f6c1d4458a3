import { shouldShowError } from "../shouldShowError";

test("shouldShowError", () => {
  const obj = {
    errors: {
      a: "a",
      b: "b",
      c: {
        d: ["e", null, "f"],
      },
    },
    touched: {
      a: true,
      c: {
        d: [true, true],
      },
    },
  };
  expect(shouldShowError(obj, "a")).toBe(true);
  expect(shouldShowError(obj, "b")).toBe(false);
  expect(shouldShowError(obj, "d")).toBe(false);
  expect(shouldShowError(obj, ["c", "d", 0])).toBe(true);
  expect(shouldShowError(obj, ["c", "d", 1])).toBe(false);
  expect(shouldShowError(obj, ["c", "d", 2])).toBe(false);
});
