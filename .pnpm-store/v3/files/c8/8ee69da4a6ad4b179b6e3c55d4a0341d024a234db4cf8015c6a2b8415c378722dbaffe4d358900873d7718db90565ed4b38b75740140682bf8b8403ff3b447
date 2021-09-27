import { shouldShowMessage } from "../shouldShowMessage";

test("shouldShowMessage", () => {
  const obj = {
    messages: {
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
  expect(shouldShowMessage(obj, "a")).toBe(true);
  expect(shouldShowMessage(obj, "b")).toBe(false);
  expect(shouldShowMessage(obj, "d")).toBe(false);
  expect(shouldShowMessage(obj, ["c", "d", 0])).toBe(true);
  expect(shouldShowMessage(obj, ["c", "d", 1])).toBe(false);
  expect(shouldShowMessage(obj, ["c", "d", 2])).toBe(false);
});
