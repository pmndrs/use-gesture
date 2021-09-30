import { unstable_getIn } from "../getIn";

test("getIn", () => {
  const obj = {
    a: {
      b: ["c", "d"],
      e: "f",
      g: 1,
    },
  };
  expect(unstable_getIn(obj, "a")).toBe(obj.a);
  expect(unstable_getIn(obj, ["a", "b"])).toBe(obj.a.b);
  expect(unstable_getIn(obj, ["a", "b", 1])).toBe(obj.a.b[1]);
  expect(unstable_getIn({} as Record<any, any>, "a", "a")).toBe("a");
});
