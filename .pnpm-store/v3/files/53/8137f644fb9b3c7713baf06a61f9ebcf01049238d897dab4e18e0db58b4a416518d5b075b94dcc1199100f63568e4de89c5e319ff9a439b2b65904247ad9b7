import * as React from "react";
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
  MenuButtonProps,
} from "reakit/Menu";

const FindMenu = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton {...menu} {...props} ref={ref}>
          Find
        </MenuButton>
        <Menu {...menu} aria-label="Find">
          <MenuItem {...menu}>Search the Web...</MenuItem>
          <MenuSeparator {...menu} />
          <MenuItem {...menu}>Find...</MenuItem>
          <MenuItem {...menu}>Find Next</MenuItem>
          <MenuItem {...menu}>Find previous</MenuItem>
          <MenuItem {...menu}>Use Selection for Find</MenuItem>
          <MenuItem {...menu} disabled>
            Jump to Selection
          </MenuItem>
        </Menu>
      </>
    );
  }
);

export default FindMenu;
