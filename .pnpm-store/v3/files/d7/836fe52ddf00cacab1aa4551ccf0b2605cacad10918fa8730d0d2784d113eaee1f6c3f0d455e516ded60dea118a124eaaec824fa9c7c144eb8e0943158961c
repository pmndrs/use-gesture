import { unstable_setIn } from "../setIn";

test("setIn", () => {
  const obj = {
    a: {
      b: ["c", "d"],
      e: "f",
      g: 1,
    },
  };
  expect(unstable_setIn(obj, "a", null)).toEqual({
    a: null,
  });
  expect(unstable_setIn(obj, ["a", "b"], 0)).toEqual({
    ...obj,
    a: {
      ...obj.a,
      b: 0,
    },
  });
});
