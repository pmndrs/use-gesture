import * as React from "react";
import { unstable_useId as useId } from "reakit/Id";
import { Button } from "reakit/Button";
import { useMenuState, Menu, MenuButton, MenuItem } from "reakit/Menu";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogDisclosureHTMLProps,
} from "reakit/Dialog";

type Props = DialogDisclosureHTMLProps & {
  label: string;
};

const BookmarkDialog = React.forwardRef<HTMLButtonElement, Props>(
  ({ label, ...props }, ref) => {
    const dialog = useDialogState();
    const heading = useId();
    return (
      <>
        <DialogDisclosure {...props} {...dialog} ref={ref}>
          {label}
        </DialogDisclosure>
        <Dialog {...dialog} aria-labelledby={heading.id}>
          <h1 id={heading.id}>{label}</h1>
          <Button onClick={dialog.hide}>Cancel</Button>
          <Button onClick={dialog.hide}>Save</Button>
        </Dialog>
      </>
    );
  }
);

export default function MenuWithDialog() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Bookmarks</MenuButton>
      <Menu {...menu} aria-label="Bookmarks">
        <MenuItem {...menu}>Bookmark Manager</MenuItem>
        <MenuItem {...menu} as={BookmarkDialog} label="Bookmark This Tab..." />
      </Menu>
    </>
  );
}
