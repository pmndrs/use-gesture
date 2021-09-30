import { reduceObjects } from "../reduceObjects";

test("reduceObjects", () => {
  expect(reduceObjects([{ a: "a" }, { a: "b" }])).toEqual({ a: ["a", "b"] });
  expect(
    reduceObjects(
      [{ a: "a" }, { a: "b" }],
      (val, key) => key === "a" && val === "a"
    )
  ).toEqual({
    a: ["a"],
  });
});
