import * as React from "react";
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite";

export default function VirtualNestedCompositeItems() {
  const composite = useCompositeState({ loop: true, unstable_virtual: true });
  return (
    <Composite {...composite} role="treegrid" aria-label="composite">
      <CompositeItem {...composite} as="div" role="row" aria-label="item0">
        <CompositeItem {...composite} role="gridcell" as="span">
          item1
        </CompositeItem>
        <CompositeItem {...composite} role="gridcell" as="span">
          item2
        </CompositeItem>
        <CompositeItem {...composite} role="gridcell" as="span">
          item3
        </CompositeItem>
      </CompositeItem>
    </Composite>
  );
}
