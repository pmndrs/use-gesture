import * as React from "react";
import { Button } from "reakit/Button";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

export default function ChatDialog() {
  const state = useDialogState();
  return (
    <>
      <DialogDisclosure state={state}>Open chat</DialogDisclosure>
      <Dialog state={state} hideOnClickOutside={false} aria-label="Chat">
        <Button onClick={state.hide}>Close chat</Button>
      </Dialog>
    </>
  );
}
