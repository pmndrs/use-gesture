import * as React from "react";
import { getDocument } from "reakit-utils/getDocument";
import { sortBasedOnDOMPosition } from "./sortBasedOnDOMPosition";
import { Item } from "./types";

type SetItems = (items: Item[]) => void;

function setItemsBasedOnDOMPosition(items: Item[], setItems: SetItems) {
  const sortedItems = sortBasedOnDOMPosition(items);
  if (items !== sortedItems) {
    setItems(sortedItems);
  }
}

function getCommonParent(items: Item[]) {
  const [firstItem, ...nextItems] = items;
  let parentElement = firstItem?.ref.current?.parentElement;
  while (parentElement) {
    const parent = parentElement;
    if (nextItems.every((item) => parent.contains(item.ref.current))) {
      return parentElement;
    }
    parentElement = parentElement.parentElement;
  }
  return getDocument(parentElement).body;
}

// istanbul ignore next: JSDOM doesn't support IntersectionObverser
// See https://github.com/jsdom/jsdom/issues/2032
function useIntersectionObserver(items: Item[], setItems: SetItems) {
  const previousItems = React.useRef<typeof items>([]);

  React.useEffect(() => {
    const callback = () => {
      const hasPreviousItems = !!previousItems.current.length;
      // We don't want to sort items if items have been just registered.
      if (hasPreviousItems) {
        setItemsBasedOnDOMPosition(items, setItems);
      }
      previousItems.current = items;
    };
    const root = getCommonParent(items);
    const observer = new IntersectionObserver(callback, { root });
    for (const item of items) {
      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    }
    return () => {
      observer.disconnect();
    };
  }, [items]);
}

function useTimeoutObserver(items: Item[], setItems: SetItems) {
  React.useEffect(() => {
    const callback = () => setItemsBasedOnDOMPosition(items, setItems);
    const timeout = setTimeout(callback, 250);
    return () => clearTimeout(timeout);
  });
}

export function useSortBasedOnDOMPosition(items: Item[], setItems: SetItems) {
  if (typeof IntersectionObserver === "function") {
    useIntersectionObserver(items, setItems);
  } else {
    useTimeoutObserver(items, setItems);
  }
}
