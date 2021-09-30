import * as React from "react";
import {
  useCompositeState,
  Composite,
  CompositeGroup,
  CompositeItem,
} from "reakit/Composite";

export default function CompositeShift() {
  const composite = useCompositeState({ shift: true });
  return (
    <Composite {...composite} role="grid" aria-label="composite">
      <CompositeGroup {...composite} role="row">
        <span role="gridcell">
          <CompositeItem {...composite}>item-1-1</CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite}>item-1-2</CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite}>item-1-3</CompositeItem>
        </span>
      </CompositeGroup>
      <CompositeGroup {...composite} role="row">
        <span role="gridcell">
          <CompositeItem {...composite}>item-2-1</CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite}>item-2-2</CompositeItem>
        </span>
      </CompositeGroup>
      <CompositeGroup {...composite} role="row">
        <span role="gridcell">
          <CompositeItem {...composite}>item-3-1</CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite}>item-3-2</CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite} disabled>
            item-3-3
          </CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite}>item-3-4</CompositeItem>
        </span>
      </CompositeGroup>
      <CompositeGroup {...composite} role="row">
        <span role="gridcell">
          <CompositeItem {...composite}>item-4-1</CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite}>item-4-2</CompositeItem>
        </span>
        <span role="gridcell">
          <CompositeItem {...composite}>item-4-3</CompositeItem>
        </span>
      </CompositeGroup>
    </Composite>
  );
}
