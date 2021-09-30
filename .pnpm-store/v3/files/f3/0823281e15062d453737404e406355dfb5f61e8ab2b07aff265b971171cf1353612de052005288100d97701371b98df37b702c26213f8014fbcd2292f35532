import { groupItems } from "../groupItems";
import { Item } from "../types";

test("with groupId", () => {
  const items: Item[] = [
    { id: "0", ref: { current: null }, groupId: "0" },
    { id: "1", ref: { current: null }, groupId: "0" },
    { id: "2", ref: { current: null }, groupId: "1" },
    { id: "3", ref: { current: null }, groupId: "1" },
    { id: "4", ref: { current: null }, groupId: "2" },
    { id: "5", ref: { current: null }, groupId: "2" },
  ];
  expect(groupItems(items)).toEqual([
    [items[0], items[1]],
    [items[2], items[3]],
    [items[4], items[5]],
  ]);
});

test("without groupId", () => {
  const items: Item[] = [
    { id: "0", ref: { current: null } },
    { id: "1", ref: { current: null } },
    { id: "2", ref: { current: null } },
  ];
  expect(groupItems(items)).toEqual([[items[0], items[1], items[2]]]);
});
