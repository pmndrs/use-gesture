import * as React from "react";
import { useTooltipState, Tooltip, TooltipReference } from "reakit/Tooltip";
import {
  useCompositeState,
  Composite,
  CompositeItem,
  CompositeItemProps,
} from "reakit/Composite";

function CompositeItemWithTooltip({ children, ...props }: CompositeItemProps) {
  const tooltip = useTooltipState();
  return (
    <>
      <CompositeItem {...props}>
        {(itemProps) => (
          <TooltipReference {...tooltip} {...itemProps} as="button">
            {children}
          </TooltipReference>
        )}
      </CompositeItem>
      <Tooltip {...tooltip}>{children}tooltip</Tooltip>
    </>
  );
}

export default function CompositeWithTooltip() {
  const composite = useCompositeState();
  return (
    <Composite {...composite} role="toolbar" aria-label="composite">
      <CompositeItemWithTooltip {...composite}>item1</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item2</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item3</CompositeItemWithTooltip>
    </Composite>
  );
}
