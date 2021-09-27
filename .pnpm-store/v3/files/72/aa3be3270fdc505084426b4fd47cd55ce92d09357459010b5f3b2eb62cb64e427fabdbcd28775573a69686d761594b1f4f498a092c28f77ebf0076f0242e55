import * as React from "react";
import { useTooltipState, Tooltip, TooltipReference } from "reakit/Tooltip";
import {
  useToolbarState,
  Toolbar,
  ToolbarItem,
  ToolbarItemProps,
} from "reakit/Toolbar";

function TooltipWithToolbarItem(props: ToolbarItemProps) {
  const tooltip = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip}>
        {(referenceProps) => <ToolbarItem {...props} {...referenceProps} />}
      </TooltipReference>
      <Tooltip {...tooltip}>{props.children}tooltip</Tooltip>
    </>
  );
}

export default function TooltipWithToolbar() {
  const composite = useToolbarState();
  return (
    <Toolbar {...composite} role="toolbar" aria-label="composite">
      <TooltipWithToolbarItem {...composite}>item1</TooltipWithToolbarItem>
      <TooltipWithToolbarItem {...composite}>item2</TooltipWithToolbarItem>
      <TooltipWithToolbarItem {...composite}>item3</TooltipWithToolbarItem>
    </Toolbar>
  );
}
