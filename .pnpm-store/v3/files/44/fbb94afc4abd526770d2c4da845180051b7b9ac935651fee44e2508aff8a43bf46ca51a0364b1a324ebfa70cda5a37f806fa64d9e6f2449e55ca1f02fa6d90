import { filterAllEmpty } from "../filterAllEmpty";

test("filterAllEmpty", () => {
  const arr = [0, 1, 2, 3];
  delete arr[1];
  const obj = {
    a: ["b", "c"],
    d: arr,
  };
  expect(filterAllEmpty(obj)).toEqual({
    a: ["b", "c"],
    d: [0, 2, 3],
  });
});
