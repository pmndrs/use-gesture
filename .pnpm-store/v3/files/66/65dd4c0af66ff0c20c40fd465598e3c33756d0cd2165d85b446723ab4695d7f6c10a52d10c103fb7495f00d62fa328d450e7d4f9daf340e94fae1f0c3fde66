import * as React from "react";
import { render, press, wait } from "reakit-test-utils";
import {
  useCompositeState,
  Composite,
  CompositeItem,
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  usePopoverState,
  Popover,
  PopoverDisclosure,
} from "..";

[true, false].forEach((virtual) => {
  const strategy = virtual ? "aria-activedescendant" : "roving-tabindex";

  test(`${strategy} composite with menu button controlling arrow keys`, async () => {
    const Test = () => {
      const composite = useCompositeState({ unstable_virtual: virtual });
      const menu = useMenuState({ placement: "right-start" });
      return (
        <Composite {...composite} role="toolbar" aria-label="composite">
          <CompositeItem {...composite}>item1</CompositeItem>
          <CompositeItem {...composite}>item2</CompositeItem>
          <CompositeItem {...composite}>
            {(props) => (
              <>
                <MenuButton {...menu} {...props}>
                  item3
                </MenuButton>
                <Menu {...menu} aria-label="menu">
                  <MenuItem {...menu}>menuitem1</MenuItem>
                  <MenuItem {...menu}>menuitem2</MenuItem>
                  <MenuItem {...menu}>menuitem3</MenuItem>
                </Menu>
              </>
            )}
          </CompositeItem>
          <CompositeItem {...composite}>item4</CompositeItem>
        </Composite>
      );
    };
    const { getByText: text, getByLabelText: label } = render(<Test />);
    press.Tab();
    expect(text("item1")).toHaveFocus();
    press.ArrowRight();
    expect(text("item2")).toHaveFocus();
    press.ArrowRight();
    expect(text("item3")).toHaveFocus();
    expect(label("menu")).not.toBeVisible();
    press.ArrowRight();
    expect(label("menu")).toBeVisible();
    await wait(expect(text("menuitem1")).toHaveFocus);
    press.ArrowRight();
    expect(text("item3")).not.toHaveFocus();
    expect(label("menu")).toBeVisible();
    await wait(expect(text("menuitem1")).toHaveFocus);
  });

  test(`${strategy} composite with menu button not controlling arrow keys`, async () => {
    const Test = () => {
      const composite = useCompositeState({ unstable_virtual: virtual });
      const menu = useMenuState({ placement: "right-start" });
      return (
        <Composite {...composite} role="toolbar" aria-label="composite">
          <CompositeItem {...composite}>item1</CompositeItem>
          <CompositeItem {...composite}>item2</CompositeItem>
          <MenuButton {...menu}>
            {(props) => (
              <>
                <CompositeItem {...composite} {...props}>
                  item3
                </CompositeItem>
                <Menu {...menu} aria-label="menu">
                  <MenuItem {...menu}>menuitem1</MenuItem>
                  <MenuItem {...menu}>menuitem2</MenuItem>
                  <MenuItem {...menu}>menuitem3</MenuItem>
                </Menu>
              </>
            )}
          </MenuButton>
          <CompositeItem {...composite}>item4</CompositeItem>
        </Composite>
      );
    };
    const { getByText: text, getByLabelText: label } = render(<Test />);
    press.Tab();
    expect(text("item1")).toHaveFocus();
    press.ArrowRight();
    expect(text("item2")).toHaveFocus();
    press.ArrowRight();
    expect(text("item3")).toHaveFocus();
    expect(label("menu")).not.toBeVisible();
    press.ArrowRight();
    expect(text("item4")).toHaveFocus();
    expect(label("menu")).not.toBeVisible();
    press.ArrowLeft();
    expect(text("item3")).toHaveFocus();
    press.Enter();
    expect(label("menu")).toBeVisible();
    await wait(expect(text("menuitem1")).toHaveFocus);
    press.ArrowRight();
    expect(text("item3")).not.toHaveFocus();
    expect(label("menu")).toBeVisible();
    expect(text("menuitem1")).toHaveFocus();
    press.Escape();
    expect(text("item3")).toHaveFocus();
    expect(label("menu")).not.toBeVisible();
    press.ArrowRight();
    expect(text("item4")).toHaveFocus();
  });

  test(`${strategy} menu inside dialog closes only itself when pressing Esc`, async () => {
    const Test = () => {
      const popover = usePopoverState();
      const menu = useMenuState({ unstable_virtual: virtual });
      return (
        <>
          <PopoverDisclosure {...popover}>Open popover</PopoverDisclosure>
          <Popover {...popover} aria-label="popover">
            <MenuButton {...menu}>Open menu</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>Item 1</MenuItem>
            </Menu>
          </Popover>
        </>
      );
    };
    const { getByText: text, getByLabelText: label } = render(<Test />);
    press.Tab();
    expect(text("Open popover")).toHaveFocus();
    expect(label("popover")).not.toBeVisible();
    expect(label("menu")).not.toBeVisible();
    press.Enter();
    expect(text("Open menu")).toHaveFocus();
    expect(label("popover")).toBeVisible();
    expect(label("menu")).not.toBeVisible();
    press.Enter();
    await wait(expect(text("Item 1")).toHaveFocus);
    expect(label("popover")).toBeVisible();
    expect(label("menu")).toBeVisible();
    press.Escape();
    expect(text("Open menu")).toHaveFocus();
    expect(label("popover")).toBeVisible();
    expect(label("menu")).not.toBeVisible();
    press.Escape();
    expect(text("Open popover")).toHaveFocus();
    expect(label("popover")).not.toBeVisible();
    expect(label("menu")).not.toBeVisible();
  });

  test(`${strategy} menu inside dialog inside menu closes only itself when pressing Esc`, async () => {
    const Test = () => {
      const popover = usePopoverState();
      const menu1 = useMenuState({ unstable_virtual: virtual });
      const menu2 = useMenuState({ unstable_virtual: virtual });
      return (
        <>
          <MenuButton {...menu1}>Open menu 1</MenuButton>
          <Menu {...menu1} aria-label="menu1">
            <MenuItem {...menu1}>
              {(props) => (
                <>
                  <PopoverDisclosure {...popover} {...props}>
                    Open popover
                  </PopoverDisclosure>
                  <Popover {...popover} aria-label="popover">
                    <MenuButton {...menu2}>Open menu 2</MenuButton>
                    <Menu {...menu2} aria-label="menu2">
                      <MenuItem {...menu2}>Item 1</MenuItem>
                    </Menu>
                  </Popover>
                </>
              )}
            </MenuItem>
          </Menu>
        </>
      );
    };
    const { getByText: text, getByLabelText: label } = render(<Test />);
    press.Tab();
    expect(text("Open menu 1")).toHaveFocus();
    expect(label("menu1")).not.toBeVisible();
    expect(label("popover")).not.toBeVisible();
    expect(label("menu2")).not.toBeVisible();
    press.Enter();
    await wait(expect(text("Open popover")).toHaveFocus);
    expect(label("menu1")).toBeVisible();
    expect(label("popover")).not.toBeVisible();
    expect(label("menu2")).not.toBeVisible();
    press.Enter();
    expect(text("Open menu 2")).toHaveFocus();
    expect(label("menu1")).toBeVisible();
    expect(label("popover")).toBeVisible();
    expect(label("menu2")).not.toBeVisible();
    press.Enter();
    await wait(expect(text("Item 1")).toHaveFocus);
    expect(label("menu1")).toBeVisible();
    expect(label("popover")).toBeVisible();
    expect(label("menu2")).toBeVisible();
    press.Escape();
    expect(text("Open menu 2")).toHaveFocus();
    expect(label("menu1")).toBeVisible();
    expect(label("popover")).toBeVisible();
    expect(label("menu2")).not.toBeVisible();
    press.Escape();
    expect(text("Open popover")).toHaveFocus();
    expect(label("menu1")).toBeVisible();
    expect(label("popover")).not.toBeVisible();
    expect(label("menu2")).not.toBeVisible();
    press.Escape();
    expect(text("Open menu 1")).toHaveFocus();
    expect(label("menu1")).not.toBeVisible();
    expect(label("popover")).not.toBeVisible();
    expect(label("menu2")).not.toBeVisible();
  });
});
