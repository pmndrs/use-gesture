import { unstable_setAllIn } from "../setAllIn";

test("setAllIn", () => {
  const obj = {
    a: {
      b: ["c", "d"],
      e: "f",
      g: 1,
    },
  };
  expect(unstable_setAllIn(obj, "a")).toEqual({
    a: {
      b: ["a", "a"],
      e: "a",
      g: "a",
    },
  });
});
