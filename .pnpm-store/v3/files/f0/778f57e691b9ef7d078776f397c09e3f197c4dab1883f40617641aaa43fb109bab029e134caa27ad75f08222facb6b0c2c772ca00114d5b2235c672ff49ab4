import { fillGroups } from "../fillGroups";
import { Item } from "../types";

test("fillRows", () => {
  const groups: Item[][] = [
    [
      { id: "0", ref: { current: null }, groupId: "0" },
      { id: "1", ref: { current: null }, groupId: "0" },
    ],
    [{ id: "0", ref: { current: null }, groupId: "1" }],
    [{ id: "0", ref: { current: null }, groupId: "2" }],
  ];
  expect(fillGroups(groups)).toEqual([
    [groups[0][0], groups[0][1]],
    [
      groups[1][0],
      {
        id: "__EMPTY_ITEM__",
        ref: { current: null },
        disabled: true,
        groupId: "1",
      },
    ],
    [
      groups[2][0],
      {
        id: "__EMPTY_ITEM__",
        ref: { current: null },
        disabled: true,
        groupId: "2",
      },
    ],
  ]);
});
