import * as React from "react";
import { isElementPreceding } from "./isElementPreceding";

type Item = {
  ref: React.RefObject<HTMLElement | null>;
};

export function sortBasedOnDOMPosition<T extends Item>(items: T[]): T[] {
  const pairs = items.map((item, index) => [index, item] as const);

  let isOrderDifferent = false;

  pairs.sort(([indexA, a], [indexB, b]) => {
    const elementA = a.ref.current;
    const elementB = b.ref.current;
    if (!elementA || !elementB) return 0;
    // a before b
    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }
      return -1;
    }
    // a after b
    if (indexA < indexB) {
      isOrderDifferent = true;
    }
    return 1;
  });

  if (isOrderDifferent) {
    return pairs.map(([_, item]) => item);
  }

  return items;
}
