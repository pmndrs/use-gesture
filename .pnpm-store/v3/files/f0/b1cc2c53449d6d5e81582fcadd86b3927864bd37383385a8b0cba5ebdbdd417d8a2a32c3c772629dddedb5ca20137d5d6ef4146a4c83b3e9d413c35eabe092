import * as React from "react";
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
} from "reakit/Menu";
import FindMenu from "./FindMenu";
import SpellingAndGrammarMenu from "./SpellingAndGrammarMenu";
import SubstitutionsMenu from "./SubstitutionsMenu";

export default function MenuWithSubmenu() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Edit</MenuButton>
      <Menu {...menu} aria-label="Edit">
        <MenuItem {...menu}>Undo</MenuItem>
        <MenuItem {...menu}>Redo</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu} as={FindMenu} />
        <MenuItem {...menu} as={SpellingAndGrammarMenu} />
        <MenuItem {...menu} as={SubstitutionsMenu} />
      </Menu>
    </>
  );
}
