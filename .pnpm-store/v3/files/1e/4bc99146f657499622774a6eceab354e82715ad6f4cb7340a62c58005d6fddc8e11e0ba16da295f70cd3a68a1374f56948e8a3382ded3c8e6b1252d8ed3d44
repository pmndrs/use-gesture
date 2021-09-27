import { Item } from "./types";
import { groupItems } from "./groupItems";
import { getMaxLength } from "./getMaxLength";

/**
 * Turns [row1, row1, row2, row2] into [row1, row2, row1, row2]
 */
export function verticalizeItems(items: Item[]) {
  const groups = groupItems(items);
  const maxLength = getMaxLength(groups);
  const verticalized = [] as Item[];

  for (let i = 0; i < maxLength; i += 1) {
    for (const group of groups) {
      if (group[i]) {
        verticalized.push({
          ...group[i],
          // If there's no groupId, it means that it's not a grid composite,
          // but a single row instead. So, instead of verticalizing it, that
          // is, assigning a different groupId based on the column index, we
          // keep it undefined so they will be part of the same group.
          // It's useful when using up/down on one-dimensional composites.
          groupId: group[i].groupId ? `${i}` : undefined,
        });
      }
    }
  }

  return verticalized;
}
