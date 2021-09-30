import * as React from "react";
import { useTooltipState, Tooltip, TooltipReference } from "reakit/Tooltip";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
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

function CompositeWithTooltip() {
  const composite = useCompositeState();
  return (
    <Composite {...composite} role="toolbar" aria-label="composite">
      <CompositeItemWithTooltip {...composite}>item1</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item2</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item3</CompositeItemWithTooltip>
    </Composite>
  );
}

export default function DialogWithCompositeWithTooltip() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Disclosure</DialogDisclosure>
      <Dialog {...dialog} aria-label="Dialog">
        {(props) =>
          dialog.visible && (
            <div {...props}>
              <CompositeWithTooltip />
            </div>
          )
        }
      </Dialog>
    </>
  );
}
