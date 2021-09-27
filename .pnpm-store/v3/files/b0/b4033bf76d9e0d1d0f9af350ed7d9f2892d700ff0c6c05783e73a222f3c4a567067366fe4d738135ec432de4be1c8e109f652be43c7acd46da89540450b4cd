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

const SubstitutionsMenu = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const menu = useMenuState({ unstable_values: { textReplacement: true } });
    return (
      <>
        <MenuButton {...menu} {...props} ref={ref}>
          Substitutions
        </MenuButton>
        <Menu {...menu} aria-label="Substitutions">
          <MenuItem {...menu}>Show Substitutions</MenuItem>
          <MenuSeparator {...menu} />
          <MenuItemCheckbox {...menu} name="smartQuotes" disabled>
            Smart Quotes
          </MenuItemCheckbox>
          <MenuItemCheckbox {...menu} name="smartDashes" disabled>
            Smart Dashes
          </MenuItemCheckbox>
          <MenuItemCheckbox {...menu} name="textReplacement" disabled>
            Text Replacement
          </MenuItemCheckbox>
        </Menu>
      </>
    );
  }
);

export default SubstitutionsMenu;
