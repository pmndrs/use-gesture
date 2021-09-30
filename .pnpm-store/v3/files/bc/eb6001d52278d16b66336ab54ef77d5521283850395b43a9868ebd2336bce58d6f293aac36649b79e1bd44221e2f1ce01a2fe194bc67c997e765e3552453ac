import { Item } from "./types";
import { isElementPreceding } from "./isElementPreceding";

export function findDOMIndex(items: Item[], item: Item) {
  return items.findIndex((currentItem) => {
    if (!currentItem.ref.current || !item.ref.current) {
      return false;
    }
    return isElementPreceding(item.ref.current, currentItem.ref.current);
  });
}
