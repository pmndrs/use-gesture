import * as React from "react";
import { useTooltipState, Tooltip, TooltipReference } from "reakit/Tooltip";
import {
  useCompositeState,
  Composite,
  CompositeItem,
  CompositeItemProps,
} from "reakit/Composite";

function CompositeItemWithTooltip(props: CompositeItemProps) {
  const tooltip = useTooltipState();
  return (
    <>
      <CompositeItem {...props} role="option">
        {(itemProps) => (
          <TooltipReference {...tooltip} {...itemProps} as="li">
            {props.children}
          </TooltipReference>
        )}
      </CompositeItem>
      <Tooltip {...tooltip}>{props.children}tooltip</Tooltip>
    </>
  );
}

export default function VirtualCompositeWithTooltip() {
  const composite = useCompositeState({ unstable_virtual: true });
  return (
    <Composite {...composite} as="ul" role="listbox" aria-label="composite">
      <CompositeItemWithTooltip {...composite}>item1</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item2</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item3</CompositeItemWithTooltip>
    </Composite>
  );
}
