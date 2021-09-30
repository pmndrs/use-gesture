import * as React from "react";
import { Button } from "reakit/Button";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

function TabComponent() {
  const tab = useTabState();

  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Content Tab 1</TabPanel>
      <TabPanel {...tab}>Content Tab 2</TabPanel>
      <TabPanel {...tab}>Content Tab 3</TabPanel>
    </>
  );
}

export default function TabWithDialog() {
  const dialog = useDialogState();

  return (
    <>
      <DialogDisclosure {...dialog}>Open modal...</DialogDisclosure>
      <Dialog {...dialog} aria-label="Test Component Tab">
        <TabComponent />
        <Button onClick={dialog.hide}>Close</Button>
      </Dialog>
    </>
  );
}
