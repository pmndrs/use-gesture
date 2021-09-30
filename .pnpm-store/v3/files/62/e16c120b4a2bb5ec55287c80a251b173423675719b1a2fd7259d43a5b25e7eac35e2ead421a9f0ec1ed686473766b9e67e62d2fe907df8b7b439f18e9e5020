import * as React from "react";
import { VisuallyHidden } from "reakit/VisuallyHidden";
import {
  useCompositeState,
  Composite,
  CompositeGroup,
  CompositeItem,
} from "reakit/Composite";

function move<T>(item: T, times: number) {
  return (items: T[]) => {
    const index = items.indexOf(item);
    if (index + times >= items.length || index + times < 0) {
      return items;
    }
    const copy = items.slice();
    copy[index + times] = item;
    copy[index] = items[index + times];
    return copy;
  };
}

function exclude<T>(item: T) {
  return (items: T[]) => {
    const index = items.indexOf(item);
    return [...items.slice(0, index), ...items.slice(index + 1)];
  };
}

export default function DynamicComposite() {
  const composite = useCompositeState();
  const [items, setItems] = React.useState([
    "item1",
    "item2",
    "item3",
    "item4",
  ]);

  const moveUp = (item: string) => setItems(move(item, -1));
  const moveDown = (item: string) => setItems(move(item, 1));
  const remove = (item: string) => setItems(exclude(item));

  return (
    <Composite {...composite} role="grid" aria-label="composite">
      {items.map((item) => (
        <CompositeGroup {...composite} key={item} role="row">
          <CompositeItem {...composite} as="span" role="gridcell">
            {item}
          </CompositeItem>
          <span role="gridcell">
            <CompositeItem {...composite} onClick={() => moveUp(item)}>
              Move <VisuallyHidden>{item}</VisuallyHidden> up
            </CompositeItem>
          </span>
          <span role="gridcell">
            <CompositeItem {...composite} onClick={() => moveDown(item)}>
              Move <VisuallyHidden>{item}</VisuallyHidden> down
            </CompositeItem>
          </span>
          <span role="gridcell">
            <CompositeItem {...composite} onClick={() => remove(item)}>
              Remove <VisuallyHidden>{item}</VisuallyHidden>
            </CompositeItem>
          </span>
        </CompositeGroup>
      ))}
    </Composite>
  );
}
