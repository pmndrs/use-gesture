import * as React from "react";
import { Button, ButtonProps } from "reakit/Button";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

function BlurOnClickButton(props: ButtonProps) {
  return <Button onClick={(event) => event.currentTarget.blur()} {...props} />;
}

function UnmountOnFocusButton(props: ButtonProps) {
  const [mounted, setMounted] = React.useState(true);
  if (mounted) {
    return <Button onFocus={() => setMounted(!mounted)} {...props} />;
  }
  return null;
}

function NestedDialog() {
  const dialog = useDialogState({ modal: false });
  return (
    <>
      <DialogDisclosure {...dialog}>Open nested dialog</DialogDisclosure>
      <Dialog {...dialog} aria-label="Nested">
        <BlurOnClickButton>Nested blur on click</BlurOnClickButton>
        <UnmountOnFocusButton>Nested unmount on focus</UnmountOnFocusButton>
      </Dialog>
    </>
  );
}

export default function DialogWithFocusLoss() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog {...dialog} aria-label="Focus loss">
        <BlurOnClickButton>Blur on click</BlurOnClickButton>
        <UnmountOnFocusButton>Unmount on focus</UnmountOnFocusButton>
        <NestedDialog />
      </Dialog>
    </>
  );
}
