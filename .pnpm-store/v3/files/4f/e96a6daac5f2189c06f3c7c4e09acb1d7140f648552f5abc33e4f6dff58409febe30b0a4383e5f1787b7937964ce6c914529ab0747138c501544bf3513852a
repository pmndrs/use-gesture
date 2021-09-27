import * as React from "react";
import { useMenuState, MenuBar, MenuItem } from "reakit/Menu";
import FileMenu from "./FileMenu";
import ViewMenu from "./ViewMenu";
import EditMenu from "./EditMenu";

export default function MenuBarWithDisabledItems() {
  const menu = useMenuState({ loop: true, orientation: "horizontal" });
  return (
    <MenuBar {...menu} aria-label="Disabled items">
      <MenuItem {...menu} as={FileMenu} />
      <MenuItem {...menu} as={ViewMenu} disabled focusable />
      <MenuItem {...menu} as={EditMenu} />
    </MenuBar>
  );
}
