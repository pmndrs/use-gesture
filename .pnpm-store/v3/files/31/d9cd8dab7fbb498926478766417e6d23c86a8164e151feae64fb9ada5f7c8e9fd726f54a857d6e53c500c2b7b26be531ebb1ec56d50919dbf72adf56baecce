import * as React from "react";
import {
  render,
  click,
  hover,
  focus,
  act,
  wait,
  press,
} from "reakit-test-utils";
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuItem,
  MenuGroup,
  MenuBar,
  MenuItemRadio,
  MenuItemCheckbox,
  MenuButtonHTMLProps,
} from "..";

[true, false].forEach((virtual) => {
  describe(virtual ? "aria-activedescendant" : "roving-tabindex", () => {
    test("menu bar is always visible", () => {
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual });
        return <MenuBar {...menu} aria-label="menu" />;
      };
      const { getByLabelText } = render(<Test />);
      const menu = getByLabelText("menu");
      expect(menu).toBeVisible();
    });

    test("clicking on menu item disclosure opens submenu without moving focus", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu} as={Submenu} />
            <MenuItem {...menu}>item3</MenuItem>
          </Menu>
        );
      };
      jest.useFakeTimers();
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const submenu = getByLabelText("submenu");
      const subitem1 = getByText("subitem1");
      expect(submenu).not.toBeVisible();
      click(subdisclosure);
      expect(submenu).toBeVisible();
      expect(subitem1).not.toHaveFocus();
      act(() => {
        jest.runAllTimers();
      });
      jest.useRealTimers();
    });

    test("focusing menu item disclosure does not open submenu", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </Menu>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const submenu = getByLabelText("submenu");
      focus(subdisclosure);
      expect(submenu).not.toBeVisible();
      expect(subdisclosure).toHaveFocus();
    });

    test("pressing enter on menu item disclosure opens submenu and focus the first item", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </Menu>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const subitem1 = getByText("subitem1");
      const submenu = getByLabelText("submenu");
      focus(subdisclosure);
      expect(submenu).not.toBeVisible();
      expect(subdisclosure).toHaveFocus();
      press.Enter();
      expect(submenu).toBeVisible();
      await wait(expect(subitem1).toHaveFocus);
    });

    test("pressing space on menu item disclosure opens submenu and focus the first item", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </Menu>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const subitem1 = getByText("subitem1");
      const submenu = getByLabelText("submenu");
      focus(subdisclosure);
      expect(submenu).not.toBeVisible();
      expect(subdisclosure).toHaveFocus();
      press.Space();
      expect(submenu).toBeVisible();
      await wait(expect(subitem1).toHaveFocus);
    });

    test("hovering menu item disclosure moves focus into it and opens submenu after a short delay without moving focus", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const subdisclosure = getByText("subdisclosure");
      const menu = getByLabelText("menu");
      const submenu = getByLabelText("submenu");
      click(disclosure);
      expect(menu).toBeVisible();
      hover(subdisclosure);
      expect(subdisclosure).toHaveFocus();
      expect(submenu).not.toBeVisible();
      await wait(expect(submenu).toBeVisible);
      expect(subdisclosure).toHaveFocus();
    });

    test("arrow down on disclosure opens bottom menu and focus first item", async () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          placement: "bottom-end",
        });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      const item1 = getByText("item1");
      focus(disclosure);
      expect(menu).not.toBeVisible();
      press.ArrowDown();
      expect(menu).toBeVisible();
      await wait(expect(item1).toHaveFocus);
      press.ArrowUp();
      expect(menu).toBeVisible();
      expect(item1).toHaveFocus();
    });

    test("arrow down on disclosure opens top menu and focus first item", async () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          placement: "top",
        });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      const item1 = getByText("item1");
      focus(disclosure);
      expect(menu).not.toBeVisible();
      press.ArrowDown();
      expect(menu).toBeVisible();
      await wait(expect(item1).toHaveFocus);
      press.ArrowUp();
      expect(menu).toBeVisible();
      expect(item1).toHaveFocus();
    });

    test("arrow up on disclosure opens bottom menu and focus last item", async () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          placement: "bottom",
        });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      const item3 = getByText("item3");
      focus(disclosure);
      expect(menu).not.toBeVisible();
      press.ArrowUp();
      expect(menu).toBeVisible();
      await wait(expect(item3).toHaveFocus);
      press.ArrowDown();
      expect(menu).toBeVisible();
      expect(item3).toHaveFocus();
    });

    test("arrow up on disclosure opens top menu and focus last item", async () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          placement: "top-start",
        });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      const item3 = getByText("item3");
      focus(disclosure);
      expect(menu).not.toBeVisible();
      press.ArrowUp();
      expect(menu).toBeVisible();
      await wait(expect(item3).toHaveFocus);
      press.ArrowDown();
      expect(menu).toBeVisible();
      expect(item3).toHaveFocus();
    });

    test("arrow right on disclosure opens right menu and focus first item", async () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          placement: "right",
        });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      const item1 = getByText("item1");
      focus(disclosure);
      expect(menu).not.toBeVisible();
      press.ArrowRight();
      expect(menu).toBeVisible();
      await wait(expect(item1).toHaveFocus);
      press.ArrowLeft();
      expect(menu).toBeVisible();
      expect(item1).toHaveFocus();
    });

    test("arrow left on disclosure opens left menu and focus first item", async () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          placement: "left",
        });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      const item1 = getByText("item1");
      focus(disclosure);
      expect(menu).not.toBeVisible();
      press.ArrowLeft();
      expect(menu).toBeVisible();
      await wait(expect(item1).toHaveFocus);
      press.ArrowRight();
      expect(menu).toBeVisible();
      expect(item1).toHaveFocus();
    });

    test("arrow right on menu item disclosure opens right submenu and focus first item", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const subdisclosure = getByText("subdisclosure");
      const subitem1 = getByText("subitem1");
      const menu = getByLabelText("menu");
      const submenu = getByLabelText("submenu");
      click(disclosure);
      expect(menu).toBeVisible();
      focus(subdisclosure);
      expect(submenu).not.toBeVisible();
      press.ArrowRight();
      expect(submenu).toBeVisible();
      await wait(expect(subitem1).toHaveFocus);
      press.ArrowLeft();
      await wait(expect(submenu).not.toBeVisible);
      expect(subdisclosure).toHaveFocus();
    });

    test("arrow left on menu item disclosure opens left submenu and focus first item", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({
            unstable_virtual: virtual,
            placement: "left",
          });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </Menu>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const subitem1 = getByText("subitem1");
      const submenu = getByLabelText("submenu");
      focus(subdisclosure);
      expect(submenu).not.toBeVisible();
      press.ArrowLeft();
      expect(submenu).toBeVisible();
      await wait(expect(subitem1).toHaveFocus);
      press.ArrowRight();
      expect(submenu).not.toBeVisible();
      expect(subdisclosure).toHaveFocus();
    });

    test("arrow up on menu focus last item", () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          currentId: null,
          visible: true,
        });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>item2</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </Menu>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const menu = getByLabelText("menu");
      const item3 = getByText("item3");
      expect(menu).toBeVisible();
      focus(menu);
      expect(menu).toHaveFocus();
      press.ArrowRight();
      press.ArrowLeft();
      expect(menu).toHaveFocus();
      press.ArrowUp();
      expect(item3).toHaveFocus();
    });

    test("arrow down on menu focus first item", () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          currentId: null,
          visible: true,
        });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>item2</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </Menu>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const menu = getByLabelText("menu");
      const item1 = getByText("item1");
      expect(menu).toBeVisible();
      focus(menu);
      expect(menu).toHaveFocus();
      press.ArrowRight();
      press.ArrowLeft();
      expect(menu).toHaveFocus();
      press.ArrowDown();
      expect(item1).toHaveFocus();
    });

    test("focusing menubar item disclosure opens the submenu without moving focus", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const submenu = getByLabelText("submenu");
      expect(submenu).not.toHaveFocus();
      focus(subdisclosure);
      expect(submenu).toBeVisible();
      expect(subdisclosure).toHaveFocus();
    });

    test("clicking on menubar item disclosure opens the submenu without moving focus", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const submenu = getByLabelText("submenu");
      expect(submenu).not.toBeVisible();
      click(subdisclosure);
      expect(submenu).toBeVisible();
      click(subdisclosure);
      expect(submenu).not.toBeVisible();
    });

    test("hovering menubar item disclosure does not move focus into it", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const submenu = getByLabelText("submenu");
      hover(subdisclosure);
      expect(submenu).not.toBeVisible();
      expect(subdisclosure).not.toHaveFocus();
    });

    test("hovering menubar item disclosure moves focus into it if there is another submenu opened", async () => {
      const Submenu = React.forwardRef(
        (
          { index, ...props }: { index: number } & MenuButtonHTMLProps,
          ref: React.RefObject<any>
        ) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure{index}
              </MenuButton>
              <Menu {...menu} aria-label={`submenu${index}`}>
                <MenuItem {...menu}>submenu{index}item1</MenuItem>
                <MenuItem {...menu}>submenu{index}item2</MenuItem>
                <MenuItem {...menu}>submenu{index}item3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>
              {(props) => <Submenu {...props} index={1} />}
            </MenuItem>
            <MenuItem {...menu}>
              {(props) => <Submenu {...props} index={2} />}
            </MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure1 = getByText("subdisclosure1");
      const subdisclosure2 = getByText("subdisclosure2");
      const submenu1 = getByLabelText("submenu1");
      const submenu2 = getByLabelText("submenu2");
      focus(subdisclosure1);
      expect(submenu1).toBeVisible();
      expect(subdisclosure1).toHaveFocus();
      hover(subdisclosure2);
      expect(submenu1).not.toBeVisible();
      expect(submenu2).toBeVisible();
      expect(subdisclosure2).toHaveFocus();
    });

    test("pressing enter on menubar item disclosure focus submenu first item", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const subitem1 = getByText("subitem1");
      const submenu = getByLabelText("submenu");
      focus(subdisclosure);
      expect(submenu).toBeVisible();
      expect(subdisclosure).toHaveFocus();
      press.Enter();
      expect(submenu).toBeVisible();
      await wait(expect(subitem1).toHaveFocus);
    });

    test("pressing space on menubar item disclosure focus submenu first item", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const subdisclosure = getByText("subdisclosure");
      const subitem1 = getByText("subitem1");
      const submenu = getByLabelText("submenu");
      focus(subdisclosure);
      expect(submenu).toBeVisible();
      expect(subdisclosure).toHaveFocus();
      press.Space();
      expect(submenu).toBeVisible();
      await wait(expect(subitem1).toHaveFocus);
    });

    test("move focus within menu with arrow keys", () => {
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>item2</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
            <MenuItemCheckbox {...menu} name="accept">
              accept
            </MenuItemCheckbox>
            <MenuGroup>
              <MenuItemRadio {...menu} name="fruit" value="apple">
                apple
              </MenuItemRadio>
              <MenuItemRadio {...menu} name="fruit" value="orange">
                orange
              </MenuItemRadio>
            </MenuGroup>
          </MenuBar>
        );
      };
      const { getByText } = render(<Test />);
      const item1 = getByText("item1");
      const item2 = getByText("item2");
      const item3 = getByText("item3");
      const accept = getByText("accept");
      const apple = getByText("apple");
      const orange = getByText("orange");
      focus(item1);
      press.ArrowDown();
      expect(item2).toHaveFocus();
      press.ArrowDown();
      expect(item3).toHaveFocus();
      press.ArrowDown();
      expect(accept).toHaveFocus();
      press.ArrowDown();
      expect(apple).toHaveFocus();
      press.ArrowDown();
      expect(orange).toHaveFocus();
      press.ArrowUp();
      expect(apple).toHaveFocus();
      press.ArrowLeft();
      expect(apple).toHaveFocus();
    });

    test("move focus within submenu with arrow keys", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const subdisclosure = getByText("subdisclosure");
      const subitem1 = getByText("subitem1");
      const subitem2 = getByText("subitem2");
      const subitem3 = getByText("subitem3");
      const menu = getByLabelText("menu");
      const submenu = getByLabelText("submenu");
      const item1 = getByText("item1");
      const item3 = getByText("item3");
      click(disclosure);
      expect(menu).toBeVisible();
      expect(menu).toHaveFocus();
      press.ArrowDown();
      expect(item1).toHaveFocus();
      press.ArrowDown();
      expect(subdisclosure).toHaveFocus();
      press.ArrowDown();
      expect(item3).toHaveFocus();
      press.ArrowUp();
      expect(subdisclosure).toHaveFocus();
      press.ArrowRight();
      expect(submenu).toBeVisible();
      await wait(expect(subitem1).toHaveFocus);
      press.ArrowDown();
      expect(subitem2).toHaveFocus();
      press.ArrowDown();
      expect(subitem3).toHaveFocus();
      press.ArrowLeft();
      await wait(expect(submenu).not.toBeVisible);
      expect(subdisclosure).toHaveFocus();
    });

    test("move focus within menu with ascii keys", () => {
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <Menu {...menu} aria-label="menu">
            <MenuItem {...menu}>Abc</MenuItem>
            <MenuItem {...menu}>Def</MenuItem>
            <MenuItem {...menu}>Ghi</MenuItem>
            <MenuItem {...menu}>Daa</MenuItem>
          </Menu>
        );
      };
      const { getByText } = render(<Test />);
      const abc = getByText("Abc");
      const def = getByText("Def");
      const ghi = getByText("Ghi");
      const daa = getByText("Daa");

      focus(abc);
      expect(abc).toHaveFocus();

      jest.useFakeTimers();
      press("d");
      expect(def).toHaveFocus();
      press("a");
      expect(daa).toHaveFocus();

      act(() => {
        jest.runAllTimers(); // clear letters
      });
      press("g");
      expect(ghi).toHaveFocus();

      act(() => {
        jest.runAllTimers();
      });
      press("a");
      press("b");
      act(() => {
        jest.runAllTimers();
      });
      expect(abc).toHaveFocus();
      jest.useRealTimers();
    });

    test("move focus within submenu with ascii keys", () => {
      const Test = () => {
        const menu1 = useMenuState({
          unstable_virtual: virtual,
          visible: true,
        });
        const menu2 = useMenuState({
          unstable_virtual: virtual,
          visible: true,
        });
        return (
          <Menu aria-label="menu1" {...menu1}>
            <MenuItem {...menu1}>Abc</MenuItem>
            <MenuItem {...menu1}>Def</MenuItem>
            <MenuItem {...menu1}>
              {(props) => (
                <MenuButton {...props} {...menu2}>
                  Ghi
                </MenuButton>
              )}
            </MenuItem>
            <Menu aria-label="menu2" {...menu2}>
              <MenuItem data-testid="menu2abc" {...menu2}>
                Abc
              </MenuItem>
              <MenuItem data-testid="menu2def" {...menu2}>
                Def
              </MenuItem>
            </Menu>
            <MenuItem {...menu1}>Daa</MenuItem>
          </Menu>
        );
      };
      const { getByTestId } = render(<Test />);
      const menu2abc = getByTestId("menu2abc");
      const menu2def = getByTestId("menu2def");

      focus(menu2abc);
      expect(menu2abc).toHaveFocus();
      press("d");
      expect(menu2def).toHaveFocus();
    });

    test("move focus within menubar with arrow keys", () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
          loop: true,
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>item1</MenuItem>
            <MenuItem {...menu}>item2</MenuItem>
            <MenuItem {...menu}>item3</MenuItem>
          </MenuBar>
        );
      };
      const { getByText } = render(<Test />);
      const item1 = getByText("item1");
      const item2 = getByText("item2");
      const item3 = getByText("item3");
      focus(item1);
      press.ArrowRight();
      expect(item2).toHaveFocus();
      press.ArrowRight();
      expect(item3).toHaveFocus();
      press.ArrowRight();
      expect(item1).toHaveFocus();
    });

    test("move focus within menubar with ascii keys", () => {
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>abc</MenuItem>
            <MenuItem {...menu}>def</MenuItem>
            <MenuItem {...menu}>ghi</MenuItem>
          </MenuBar>
        );
      };
      const { getByText } = render(<Test />);
      const abc = getByText("abc");
      const def = getByText("def");
      focus(abc);
      press("d");
      expect(def).toHaveFocus();
    });

    test("arrow right/left in a submenu moves focus between disclosures in menubar", async () => {
      const Submenu = React.forwardRef(
        (
          { index, ...props }: { index: number } & MenuButtonHTMLProps,
          ref: React.RefObject<any>
        ) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                item{index}
              </MenuButton>
              <Menu aria-label={`submenu${index}`} {...menu}>
                <MenuItem {...menu}>submenu{index}item1</MenuItem>
                <MenuItem {...menu}>submenu{index}item2</MenuItem>
                <MenuItem {...menu}>submenu{index}item3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>
              {(props) => <Submenu {...props} index={1} />}
            </MenuItem>
            <MenuItem {...menu}>
              {(props) => <Submenu {...props} index={2} />}
            </MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const item1 = getByText("item1");
      const submenu1item1 = getByText("submenu1item1");
      const item2 = getByText("item2");
      const submenu2item3 = getByText("submenu2item3");
      const submenu1 = getByLabelText("submenu1");
      const submenu2 = getByLabelText("submenu2");
      focus(item1);
      expect(submenu1).toBeVisible();
      expect(item1).toHaveFocus();
      press.ArrowDown();
      await wait(expect(submenu1item1).toHaveFocus);
      press.ArrowRight();
      expect(submenu1).not.toBeVisible();
      expect(submenu2).toBeVisible();
      expect(item2).toHaveFocus();
      press.ArrowUp();
      await wait(expect(submenu2item3).toHaveFocus);
      press.ArrowLeft();
      expect(submenu1).toBeVisible();
      expect(submenu2).not.toBeVisible();
      expect(item1).toHaveFocus();
      press.ArrowLeft();
      expect(item1).toHaveFocus(); // not loop
      press.ArrowDown();
      await wait(expect(submenu1item1).toHaveFocus);
      press.ArrowLeft();
      expect(submenu1).toBeVisible();
      expect(submenu1item1).toHaveFocus(); // not loop
    });

    test("arrow right/left in a subsubmenu moves focus between disclosures in menubar", async () => {
      const Submenu = React.forwardRef(
        (
          { index, ...props }: { index: number } & MenuButtonHTMLProps,
          ref: React.RefObject<any>
        ) => {
          const menu = useMenuState({ unstable_virtual: virtual });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                item{index}
              </MenuButton>
              <Menu aria-label={`submenu${index}`} {...menu}>
                <MenuItem {...menu}>submenu{index}item1</MenuItem>
                {index >= 10 ? (
                  <MenuItem {...menu}>submenu{index}item2</MenuItem>
                ) : (
                  <MenuItem {...menu} as={Submenu} index={index * 10} />
                )}
                <MenuItem {...menu}>submenu{index}item3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItem {...menu}>
              {(props) => <Submenu {...props} index={1} />}
            </MenuItem>
            <MenuItem {...menu}>
              {(props) => <Submenu {...props} index={2} />}
            </MenuItem>
            <MenuItem {...menu}>
              {(props) => <Submenu {...props} index={3} />}
            </MenuItem>
          </MenuBar>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const item1 = getByText("item1");
      const submenu1item1 = getByText("submenu1item1");
      const item10 = getByText("item10");
      const item2 = getByText("item2");
      const submenu10item1 = getByText("submenu10item1");
      const submenu1 = getByLabelText("submenu1");
      const submenu10 = getByLabelText("submenu10");
      const submenu2 = getByLabelText("submenu2");
      focus(item1);
      expect(submenu1).toBeVisible();
      await wait(expect(item1).toHaveFocus);
      press.ArrowDown();
      await wait(expect(submenu1item1).toHaveFocus);
      press.ArrowDown();
      await wait(expect(item10).toHaveFocus);
      press.ArrowRight();
      expect(submenu10).toBeVisible();
      await wait(expect(submenu10item1).toHaveFocus);
      press.ArrowRight();
      expect(submenu1).not.toBeVisible();
      expect(submenu10).not.toBeVisible();
      expect(item2).toHaveFocus();
      expect(submenu2).toBeVisible();
    });

    test("clicking on menu disclorure closes the menu", () => {
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      expect(menu).toBeVisible();
      click(disclosure);
      expect(menu).not.toBeVisible();
      expect(disclosure).toHaveFocus();
    });

    test("clicking outside menu closes it", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({
            unstable_virtual: virtual,
            visible: true,
          });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByLabelText, baseElement } = render(<Test />);
      const menu = getByLabelText("menu");
      const submenu = getByLabelText("submenu");
      expect(menu).toBeVisible();
      expect(submenu).toBeVisible();
      click(baseElement);
      expect(menu).not.toBeVisible();
      expect(submenu).not.toBeVisible();
    });

    test("focusing outside menu closes it", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({
            unstable_virtual: virtual,
            visible: true,
          });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <>
            <button>button</button>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const button = getByText("button");
      const menu = getByLabelText("menu");
      const submenu = getByLabelText("submenu");
      expect(menu).toBeVisible();
      expect(submenu).toBeVisible();
      focus(button);
      expect(menu).not.toBeVisible();
      expect(submenu).not.toBeVisible();
      expect(button).toHaveFocus();
    });

    test("focusing outside submenu closes it", () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({
            unstable_virtual: virtual,
            visible: true,
          });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const menu = getByLabelText("menu");
      const submenu = getByLabelText("submenu");
      const item1 = getByText("item1");
      expect(menu).toBeVisible();
      expect(submenu).toBeVisible();
      focus(item1);
      expect(menu).toBeVisible();
      expect(submenu).not.toBeVisible();
    });

    test("pressing esc closes all menus", async () => {
      const Submenu = React.forwardRef(
        (props: MenuButtonHTMLProps, ref: React.RefObject<any>) => {
          const menu = useMenuState({
            unstable_virtual: virtual,
            visible: true,
          });
          return (
            <>
              <MenuButton {...menu} {...props} ref={ref}>
                subdisclosure
              </MenuButton>
              <Menu {...menu} aria-label="submenu">
                <MenuItem {...menu}>subitem1</MenuItem>
                <MenuItem {...menu}>subitem2</MenuItem>
                <MenuItem {...menu}>subitem3</MenuItem>
              </Menu>
            </>
          );
        }
      );
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>{(props) => <Submenu {...props} />}</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      const submenu = getByLabelText("submenu");
      const subitem1 = getByText("subitem1");
      expect(menu).toBeVisible();
      expect(submenu).toBeVisible();
      focus(subitem1);
      press.Escape();
      expect(menu).not.toBeVisible();
      expect(submenu).not.toBeVisible();
      expect(disclosure).toHaveFocus();
    });

    test("pressing esc on disclosure closes the menu", () => {
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual, visible: true });
        return (
          <>
            <MenuButton {...menu}>disclosure</MenuButton>
            <Menu {...menu} aria-label="menu">
              <MenuItem {...menu}>item1</MenuItem>
              <MenuItem {...menu}>item2</MenuItem>
              <MenuItem {...menu}>item3</MenuItem>
            </Menu>
          </>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const disclosure = getByText("disclosure");
      const menu = getByLabelText("menu");
      expect(menu).toBeVisible();
      focus(disclosure);
      expect(menu).toBeVisible();
      press.Escape();
      expect(menu).not.toBeVisible();
      expect(disclosure).toHaveFocus();
    });

    test("clicking on menu item checkbox/radio checks it", () => {
      const Test = () => {
        const menu = useMenuState({ unstable_virtual: virtual });
        return (
          <MenuBar {...menu} aria-label="menu">
            <MenuItemCheckbox {...menu} name="accept">
              accept
            </MenuItemCheckbox>
            <MenuGroup>
              <MenuItemRadio {...menu} name="fruit" value="apple">
                apple
              </MenuItemRadio>
              <MenuItemRadio {...menu} name="fruit" value="orange">
                orange
              </MenuItemRadio>
            </MenuGroup>
          </MenuBar>
        );
      };
      const { getByText } = render(<Test />);
      const accept = getByText("accept") as HTMLInputElement;
      const apple = getByText("apple") as HTMLInputElement;
      const orange = getByText("orange") as HTMLInputElement;

      expect(accept.checked).toBe(false);
      click(accept);
      expect(accept.checked).toBe(true);

      expect(apple.checked).toBe(false);
      click(apple);
      expect(apple.checked).toBe(true);

      expect(orange.checked).toBe(false);
      click(orange);
      expect(orange.checked).toBe(true);
      expect(apple.checked).toBe(false);
    });
  });
});
