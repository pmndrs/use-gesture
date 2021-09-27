import * as React from "react";
import {
  Menu,
  MenuBar,
  MenuButton,
  MenuButtonHTMLProps,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuSeparator,
  useMenuBarState,
  useMenuState,
  MenuStateReturn,
} from "reakit/Menu";
import items from "./items";

type MenuItemsProps = MenuStateReturn & { item: typeof items[number] };

const MenuItems = React.memo(
  ({ item, ...menu }: MenuItemsProps) => (
    <>
      {item.menu?.map((subitem, i) => {
        const id = `${menu.baseId}-${i}`;
        if ("type" in subitem) {
          if (subitem.type === "separator") {
            return <MenuSeparator {...menu} key={id} />;
          }
          if (subitem.type === "radio") {
            return (
              <MenuItemRadio
                {...menu}
                name={subitem.name}
                value={subitem.label}
                key={id}
                id={id}
              >
                {subitem.label}
              </MenuItemRadio>
            );
          }
          return (
            <MenuItemCheckbox {...menu} name={subitem.label} key={id} id={id}>
              {subitem.label}
            </MenuItemCheckbox>
          );
        }
        if ("menu" in subitem) {
          return (
            <MenuItem
              {...menu}
              key={id}
              as={MenuContainer}
              id={id}
              item={subitem}
            />
          );
        }
        return (
          <MenuItem {...menu} key={id} id={id}>
            {subitem.label}
          </MenuItem>
        );
      })}
    </>
  ),
  MenuItem.unstable_propsAreEqual
);

type MenuContainerProps = MenuButtonHTMLProps & {
  item: typeof items[number];
};

const MenuContainer = React.memo(
  React.forwardRef<HTMLButtonElement, MenuContainerProps>(
    ({ item, ...props }, ref) => {
      const menu = useMenuState({ loop: true });
      return (
        <>
          <MenuButton {...menu} {...props} ref={ref}>
            {item.label}
          </MenuButton>
          <Menu {...menu} aria-label={item.label}>
            <MenuItems {...menu} item={item} />
          </Menu>
        </>
      );
    }
  )
);

export default function ChromeMenuBar() {
  const menuBar = useMenuBarState({ loop: true });
  return (
    <MenuBar {...menuBar}>
      {items.map((item, i) => (
        <MenuItem
          {...menuBar}
          key={i}
          as={MenuContainer}
          id={`${menuBar.baseId}-${i}`}
          item={item}
        />
      ))}
    </MenuBar>
  );
}
