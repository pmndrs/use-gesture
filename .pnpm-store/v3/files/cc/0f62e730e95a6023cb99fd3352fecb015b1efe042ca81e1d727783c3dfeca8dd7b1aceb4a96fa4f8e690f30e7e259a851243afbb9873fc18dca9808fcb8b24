import * as React from "react";
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemCheckbox,
  MenuSeparator,
  MenuButtonProps,
} from "reakit/Menu";

const ViewMenu = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton {...menu} {...props} ref={ref}>
          View
        </MenuButton>
        <Menu {...menu} aria-label="View">
          <MenuItemCheckbox {...menu} name="alwaysShowBookmarksBar">
            Always Show Bookmarks Bar
          </MenuItemCheckbox>
          <MenuItemCheckbox {...menu} name="alwaysShowBookmarksBar">
            Always Show Toolbar in Full Screen
          </MenuItemCheckbox>
          <MenuItem {...menu}>Customize Touch Bar...</MenuItem>
          <MenuSeparator {...menu} />
          <MenuItem {...menu}>Stop</MenuItem>
          <MenuItem {...menu}>Reload This Page</MenuItem>
        </Menu>
      </>
    );
  }
);

export default ViewMenu;
