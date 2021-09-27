import * as React from "react";
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
  MenuButtonProps,
} from "reakit/Menu";
import FindMenu from "./FindMenu";
import SpellingAndGrammarMenu from "./SpellingAndGrammarMenu";

const EditMenu = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton {...menu} {...props} ref={ref}>
          Edit
        </MenuButton>
        <Menu {...menu} aria-label="Edit">
          <MenuItem {...menu}>Undo</MenuItem>
          <MenuItem {...menu}>Redo</MenuItem>
          <MenuSeparator {...menu} />
          <MenuItem {...menu} as={FindMenu} />
          <MenuItem {...menu} as={SpellingAndGrammarMenu} disabled focusable />
        </Menu>
      </>
    );
  }
);

export default EditMenu;
