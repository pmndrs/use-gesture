import * as React from "react";
import { Button } from "reakit/Button";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

export default function DialogWithMultipleDisclosures() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Disclosure 1</DialogDisclosure>
      <DialogDisclosure {...dialog}>Disclosure 2</DialogDisclosure>
      <Button onClick={dialog.toggle}>Button</Button>
      <Dialog {...dialog} aria-label="Dialog with multiple disclosures">
        Dialog
        <Button onClick={dialog.hide}>Close</Button>
      </Dialog>
    </>
  );
}
