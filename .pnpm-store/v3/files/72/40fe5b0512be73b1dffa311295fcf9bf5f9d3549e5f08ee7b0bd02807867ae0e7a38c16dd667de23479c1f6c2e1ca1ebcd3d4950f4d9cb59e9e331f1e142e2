import { normalizePropsAreEqual } from "reakit-utils/normalizePropsAreEqual";

function propsAreEqual(
  prev?: Record<any, any>,
  next?: Record<any, any>
): boolean {
  return prev?.a === next?.a;
}

const normalized = normalizePropsAreEqual(propsAreEqual);

test("normalizePropsAreEqual", () => {
  expect(propsAreEqual).not.toStrictEqual(normalized);
  expect(normalizePropsAreEqual(normalized)).toStrictEqual(normalized);

  expect(propsAreEqual({ a: "a" }, { a: "a" })).toBe(true);
  expect(propsAreEqual({ a: "a" }, { a: "b" })).toBe(false);

  expect(normalized({ a: "a" }, { a: "a" })).toBe(true);
  expect(normalized({ a: "a" }, { a: "b" })).toBe(false);

  expect(normalized({ state: { a: "a" } }, { state: { a: "a" } })).toBe(true);
  expect(normalized({ state: { a: "a" } }, { state: { a: "b" } })).toBe(false);
});
