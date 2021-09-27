import * as React from "react";
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
  MenuButtonProps,
} from "reakit/Menu";

const FileMenu = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton {...menu} {...props} ref={ref}>
          File
        </MenuButton>
        <Menu {...menu} aria-label="File">
          <MenuItem {...menu}>New Tab</MenuItem>
          <MenuItem {...menu}>New Window</MenuItem>
          <MenuItem {...menu}>New Icognito Window</MenuItem>
          <MenuItem {...menu}>Reopen Closed Tab</MenuItem>
          <MenuItem {...menu}>Open File...</MenuItem>
          <MenuItem {...menu}>Open Location...</MenuItem>
          <MenuSeparator {...menu} />
          <MenuItem {...menu}>Close Window</MenuItem>
          <MenuItem {...menu}>Close Tab</MenuItem>
          <MenuItem {...menu}>Save Page As...</MenuItem>
        </Menu>
      </>
    );
  }
);

export default FileMenu;
