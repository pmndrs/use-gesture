import { Item } from "./types";

export function groupItems(items: Item[]) {
  const groups = [[]] as Item[][];

  for (const item of items) {
    const group = groups.find((g) => !g[0] || g[0].groupId === item.groupId);
    if (group) {
      group.push(item);
    } else {
      groups.push([item]);
    }
  }

  return groups;
}
