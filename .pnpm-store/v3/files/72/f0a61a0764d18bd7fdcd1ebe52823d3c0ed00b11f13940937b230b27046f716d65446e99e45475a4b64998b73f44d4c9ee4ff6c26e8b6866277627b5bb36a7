import * as React from "react";
import { useMenuState, Menu, MenuButton, MenuItem } from "reakit/Menu";

export default function SimpleMenuVirtual() {
  const menu = useMenuState({ unstable_virtual: true });
  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu {...menu} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu}>Extensions</MenuItem>
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
}
