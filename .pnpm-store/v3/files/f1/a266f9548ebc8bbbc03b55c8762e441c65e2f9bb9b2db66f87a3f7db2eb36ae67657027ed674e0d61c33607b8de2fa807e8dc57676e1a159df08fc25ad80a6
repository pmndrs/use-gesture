import * as React from "react";
import { Button } from "reakit/Button";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";

export default function DialogSidebar() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog} as={Button} aria-label="Toggle Sidebar">
        toggle
      </DialogDisclosure>

      <DialogBackdrop
        {...dialog}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 997,
          backgroundColor: "rgb(0,0,0, 0.6)",
        }}
      >
        <Dialog
          {...dialog}
          preventBodyScroll
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "20vw",
            height: "100vh",
            overflow: "auto",
            zIndex: 998,
            backgroundColor: "transparent",
          }}
          aria-label="Sidebar"
        >
          <nav>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                background: "#fff",
                zIndex: 997,
              }}
            />
            <div
              style={{
                zIndex: 999,
                position: "absolute",
                top: 100,
                padding: "1em",
              }}
            >
              sidebar
              <Button onClick={dialog.hide}>Close</Button>
            </div>
          </nav>
        </Dialog>
      </DialogBackdrop>
    </>
  );
}
