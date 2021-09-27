import * as React from "react";
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemCheckbox,
  MenuButtonProps,
} from "reakit/Menu";

const SpellingAndGrammarMenu = React.forwardRef<
  HTMLButtonElement,
  MenuButtonProps
>((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu} {...props} ref={ref}>
        Spelling and Grammar
      </MenuButton>
      <Menu {...menu} aria-label="Spelling and Grammar">
        <MenuItem {...menu}>Show Spelling and Grammar</MenuItem>
        <MenuItem {...menu}>Check Document Now</MenuItem>
        <MenuItemCheckbox {...menu} name="checkSpellingWhileTyping">
          Check Spelling While Typing
        </MenuItemCheckbox>
        <MenuItemCheckbox {...menu} name="checkGrammarWithSpelling" disabled>
          Check Grammar With Spelling
        </MenuItemCheckbox>
      </Menu>
    </>
  );
});

export default SpellingAndGrammarMenu;
