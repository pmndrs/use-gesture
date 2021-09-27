import { flatten } from "../flatten";

test("flatten", () => {
  expect(flatten([0, 1, 2])).toEqual([0, 1, 2]);
  expect(flatten([0, 1, [2]])).toEqual([0, 1, 2]);
  expect(flatten([0, [1, [2], 3]])).toEqual([0, 1, 2, 3]);
});
