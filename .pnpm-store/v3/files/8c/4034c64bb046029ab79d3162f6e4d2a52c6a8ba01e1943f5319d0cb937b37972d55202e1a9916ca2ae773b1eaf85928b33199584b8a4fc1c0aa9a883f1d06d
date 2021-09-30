import { formatInputName } from "../formatInputName";

test("formatInputName", () => {
  expect(formatInputName("a")).toBe("a");
  expect(formatInputName(["a", "b"])).toBe("a.b");
  expect(formatInputName(["a", "b"], "-")).toBe("a-b");
});
