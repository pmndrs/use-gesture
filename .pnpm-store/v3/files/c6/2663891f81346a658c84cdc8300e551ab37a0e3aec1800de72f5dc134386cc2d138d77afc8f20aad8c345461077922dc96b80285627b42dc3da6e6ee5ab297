import * as React from "react";
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite";

export default function NestedCompositeItems() {
  const composite = useCompositeState({ loop: true });
  return (
    <Composite {...composite} role="toolbar" aria-label="composite">
      <CompositeItem {...composite} as="div" aria-label="item0">
        <CompositeItem {...composite} onClick={() => composite.next()}>
          item1
        </CompositeItem>
        <CompositeItem {...composite}>item2</CompositeItem>
        <CompositeItem {...composite}>item3</CompositeItem>
      </CompositeItem>
    </Composite>
  );
}
