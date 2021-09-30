import { Item } from "./types";

export function findFirstEnabledItem(items: Item[], excludeId?: string) {
  if (excludeId) {
    return items.find((item) => !item.disabled && item.id !== excludeId);
  }
  return items.find((item) => !item.disabled);
}
