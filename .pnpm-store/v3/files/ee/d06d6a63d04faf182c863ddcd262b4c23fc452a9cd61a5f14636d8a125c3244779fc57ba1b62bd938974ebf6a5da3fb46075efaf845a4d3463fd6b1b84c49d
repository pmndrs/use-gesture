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
          <TooltipReference {...tooltip} {...itemProps} as="div" role="option">
            {children}
          </TooltipReference>
        )}
      </CompositeItem>
      <Tooltip {...tooltip}>{children}tooltip</Tooltip>
    </>
  );
}

function VirtualCompositeWithTooltip() {
  const composite = useCompositeState({ unstable_virtual: true });
  return (
    <Composite {...composite} role="listbox" aria-label="composite">
      <CompositeItemWithTooltip {...composite}>item1</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item2</CompositeItemWithTooltip>
      <CompositeItemWithTooltip {...composite}>item3</CompositeItemWithTooltip>
    </Composite>
  );
}

export default function DialogWithVirtualCompositeWithTooltip() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Disclosure</DialogDisclosure>
      <Dialog {...dialog} aria-label="Dialog">
        {(props) =>
          dialog.visible && (
            <div {...props}>
              <VirtualCompositeWithTooltip />
            </div>
          )
        }
      </Dialog>
    </>
  );
}
