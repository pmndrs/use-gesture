import { Item } from "./types";

export function findEnabledItemById(items: Item[], id?: string | null) {
  if (!id) return undefined;
  return items?.find((item) => item.id === id && !item.disabled);
}
