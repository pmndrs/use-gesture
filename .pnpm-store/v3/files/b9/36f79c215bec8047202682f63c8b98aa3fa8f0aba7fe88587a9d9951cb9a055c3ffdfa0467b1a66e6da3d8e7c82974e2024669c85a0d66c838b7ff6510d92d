import { splitProps } from "../splitProps";

test("splitProps backward compatibility", () => {
  expect(splitProps({ a: "a", b: "b", c: "c" }, ["b"])).toEqual([
    { b: "b" },
    { a: "a", c: "c" },
  ]);
});

test("splitProps options passed as state object", () => {
  expect(
    splitProps({ state: { a: "aa" }, a: "a", b: "b", c: "c" }, ["b"])
  ).toEqual([
    { a: "aa", b: "b" },
    { a: "a", c: "c" },
  ]);
});

test("splitProps should fallback to the deprecated version if state is not a plain object", () => {
  expect(
    splitProps({ state: true, a: "a", b: "b", c: "c" }, ["state"])
  ).toEqual([{ state: true }, { a: "a", b: "b", c: "c" }]);

  expect(
    splitProps({ state: true, a: "a", b: "b", c: "c" }, ["state", "a"])
  ).toEqual([
    { state: true, a: "a" },
    { b: "b", c: "c" },
  ]);

  expect(
    splitProps({ state: "indeterminate", a: "a", b: "b", c: "c" }, [
      "state",
      "a",
    ])
  ).toEqual([
    { state: "indeterminate", a: "a" },
    { b: "b", c: "c" },
  ]);

  expect(
    splitProps({ state: "indeterminate", a: "a", b: "b", c: "c" }, ["a", "b"])
  ).toEqual([
    {
      a: "a",
      b: "b",
    },
    { state: "indeterminate", c: "c" },
  ]);
});
