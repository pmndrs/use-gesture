import * as React from "react";
import { render, focus, press, click, type } from "reakit-test-utils";
import {
  useCompositeState,
  Composite,
  CompositeGroup,
  CompositeItem,
  unstable_CompositeItemWidget as CompositeItemWidget,
} from "..";

const emojiMap = {
  "^": ["ArrowUp"],
  ">": ["ArrowRight"],
  v: ["ArrowDown"],
  "<": ["ArrowLeft"],
  "^^": ["PageUp"],
  vv: ["PageDown"],
  "<<": ["Home"],
  ">>": ["End"],
  "<<<": ["Home", { ctrlKey: true }],
  ">>>": ["End", { ctrlKey: true }],
} as const;

function active() {
  const { activeElement } = document;
  const activeDescendant = activeElement?.getAttribute("aria-activedescendant");
  if (activeDescendant) {
    return document.getElementById(activeDescendant);
  }
  return activeElement?.hasAttribute("data-item") ? activeElement : undefined;
}

function key(char: keyof typeof emojiMap) {
  const [k, options] = emojiMap[char];
  press[k](null, options);
  return active();
}

function template(value: string) {
  const items = Array.from(document.querySelectorAll("[data-item]"));
  const withoutSpaces = value.replace(/\s/gm, "");
  return items[withoutSpaces.indexOf("0")];
}

[true, false].forEach((virtual) => {
  describe(virtual ? "aria-activedescendant" : "roving-tabindex", () => {
    test("warning when there's no label", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <Composite {...composite} role="toolbar">
            <CompositeItem {...composite}>item1</CompositeItem>
            <CompositeItem {...composite}>item2</CompositeItem>
            <CompositeItem {...composite}>item3</CompositeItem>
          </Composite>
        );
      };
      render(<Test />);
      expect(console).toHaveWarned();
    });

    test("first list item is active", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite}>item1</CompositeItem>
            <CompositeItem {...composite}>item2</CompositeItem>
            <CompositeItem {...composite}>item3</CompositeItem>
          </Composite>
        );
      };
      const { getByText } = render(<Test />);
      const item1 = getByText("item1");
      expect(item1).not.toHaveFocus();
      press.Tab();
      expect(item1).toHaveFocus();
    });

    test("list item is active when currentId is set", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          currentId: "item2",
        });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite}>item1</CompositeItem>
            <CompositeItem {...composite} id="item2">
              item2
            </CompositeItem>
            <CompositeItem {...composite}>item3</CompositeItem>
          </Composite>
        );
      };
      const { getByText } = render(<Test />);
      const item2 = getByText("item2");
      expect(item2).not.toHaveFocus();
      press.Tab();
      expect(item2).toHaveFocus();
    });

    test("composite becomes the first item when currentId is null", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          currentId: null,
        });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite}>item1</CompositeItem>
            <CompositeItem {...composite}>item2</CompositeItem>
            <CompositeItem {...composite}>item3</CompositeItem>
          </Composite>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const composite = getByLabelText("composite");
      const item1 = getByText("item1");
      const item2 = getByText("item2");
      const item3 = getByText("item3");
      expect(composite).not.toHaveFocus();
      press.Tab();
      expect(composite).toHaveFocus();
      expect(item1).not.toHaveFocus();
      press.ArrowDown();
      expect(item1).toHaveFocus();
      press.ArrowRight();
      expect(item2).toHaveFocus();
      press.ArrowDown();
      expect(item3).toHaveFocus();
      press.ArrowDown();
      expect(item3).toHaveFocus();
      press.ArrowUp();
      expect(item2).toHaveFocus();
      press.ArrowLeft();
      expect(item1).toHaveFocus();
      press.ArrowUp();
      expect(item1).not.toHaveFocus();
      expect(composite).toHaveFocus();
      press.ArrowUp();
      expect(item3).toHaveFocus();
      press.Home();
      press.ArrowUp();
      expect(composite).toHaveFocus();
      press.PageDown();
      expect(item3).toHaveFocus();
      press.PageUp();
      press.ArrowLeft();
      expect(composite).toHaveFocus();
      press.Home();
      expect(item1).toHaveFocus();
      press.ArrowUp();
      expect(composite).toHaveFocus();
      press.End();
      expect(item3).toHaveFocus();
    });

    test("composite becomes the first item when currentId is null and loop is true", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          currentId: null,
          loop: true,
        });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite}>item1</CompositeItem>
            <CompositeItem {...composite}>item2</CompositeItem>
            <CompositeItem {...composite}>item3</CompositeItem>
          </Composite>
        );
      };
      const { getByText, getByLabelText } = render(<Test />);
      const composite = getByLabelText("composite");
      const item1 = getByText("item1");
      const item2 = getByText("item2");
      const item3 = getByText("item3");
      expect(composite).not.toHaveFocus();
      press.Tab();
      expect(composite).toHaveFocus();
      expect(item1).not.toHaveFocus();
      press.ArrowRight();
      expect(item1).toHaveFocus();
      press.ArrowDown();
      expect(item2).toHaveFocus();
      press.ArrowRight();
      expect(item3).toHaveFocus();
      press.ArrowRight();
      expect(item1).not.toHaveFocus();
      expect(item3).not.toHaveFocus();
      expect(composite).toHaveFocus();
      press.ArrowDown();
      expect(item1).toHaveFocus();
      press.ArrowLeft();
      expect(item1).not.toHaveFocus();
      expect(item3).not.toHaveFocus();
      expect(composite).toHaveFocus();
      press.PageDown();
      expect(item3).toHaveFocus();
      press.ArrowDown();
      expect(composite).toHaveFocus();
      press.Home();
      expect(item1).toHaveFocus();
      press.ArrowUp();
      expect(composite).toHaveFocus();
      press.End();
      expect(item3).toHaveFocus();
    });

    test("click item", () => {
      const onClick = jest.fn();
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite}>item1</CompositeItem>
            <CompositeItem {...composite} onClick={onClick}>
              item2
            </CompositeItem>
            <CompositeItem {...composite}>item3</CompositeItem>
          </Composite>
        );
      };
      const { getByText } = render(<Test />);
      const item2 = getByText("item2");
      expect(item2).not.toHaveFocus();
      expect(onClick).toHaveBeenCalledTimes(0);
      click(item2);
      expect(item2).toHaveFocus();
      expect(onClick).toHaveBeenCalledTimes(1);
      press.Enter();
      expect(onClick).toHaveBeenCalledTimes(2);
      press.Space();
      expect(onClick).toHaveBeenCalledTimes(3);
    });

    test("composite is a single tab stop", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <>
            <button>button1</button>
            <Composite {...composite} role="toolbar" aria-label="composite">
              <CompositeItem {...composite}>item1</CompositeItem>
              <CompositeItem {...composite}>item2</CompositeItem>
              <CompositeItem {...composite}>item3</CompositeItem>
            </Composite>
            <button>button2</button>
          </>
        );
      };
      const { getByText } = render(<Test />);
      const button1 = getByText("button1");
      const item1 = getByText("item1");
      const button2 = getByText("button2");
      focus(button1);
      press.Tab();
      expect(item1).toHaveFocus();
      press.Tab();
      expect(button2).toHaveFocus();
      press.ShiftTab();
      expect(item1).toHaveFocus();
    });

    test("remember the last focused item", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <>
            <Composite {...composite} role="toolbar" aria-label="composite">
              <CompositeItem {...composite}>item1</CompositeItem>
              <CompositeItem {...composite}>item2</CompositeItem>
              <CompositeItem {...composite}>item3</CompositeItem>
            </Composite>
            <button>button</button>
          </>
        );
      };
      const { getByText } = render(<Test />);
      const button = getByText("button");
      const item2 = getByText("item2");
      focus(item2);
      press.Tab();
      expect(button).toHaveFocus();
      press.ShiftTab();
      expect(item2).toHaveFocus();
    });

    test("move focus with arrow keys", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item disabled />
            <CompositeItem {...composite} data-item disabled focusable />
            <CompositeItem {...composite} data-item />
          </Composite>
        );
      };
      render(<Test />);
      press.Tab();
      expect(active()).toBe(template("0x--"));
      expect(key(">")).toBe(template("-x0-"));
      expect(key("v")).toBe(template("-x-0"));
      expect(key("<")).toBe(template("-x0-"));
      expect(key("^")).toBe(template("0x--"));
      expect(key("<")).toBe(template("0x--"));
      expect(key(">>")).toBe(template("-x-0"));
      expect(key("<<")).toBe(template("0x--"));
      expect(key("vv")).toBe(template("-x-0"));
      expect(key("^^")).toBe(template("0x--"));
    });

    test("move focus with arrow keys rtl", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          rtl: true,
        });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item disabled />
            <CompositeItem {...composite} data-item disabled focusable />
            <CompositeItem {...composite} data-item />
          </Composite>
        );
      };
      render(<Test />);
      press.Tab();
      expect(active()).toBe(template("0x--"));
      expect(key("<")).toBe(template("-x0-"));
      expect(key("v")).toBe(template("-x-0"));
      expect(key(">")).toBe(template("-x0-"));
      expect(key("^")).toBe(template("0x--"));
      expect(key(">")).toBe(template("0x--"));
      expect(key(">>")).toBe(template("-x-0"));
      expect(key("<<")).toBe(template("0x--"));
      expect(key("vv")).toBe(template("-x-0"));
      expect(key("^^")).toBe(template("0x--"));
    });

    test("move focus with arrow keys loop", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          loop: true,
        });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item disabled focusable />
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item disabled />
          </Composite>
        );
      };
      render(<Test />);
      press.Tab();
      expect(active()).toBe(template("0--x"));
      expect(key(">")).toBe(template("-0-x"));
      expect(key("v")).toBe(template("--0x"));
      expect(key("<")).toBe(template("-0-x"));
      expect(key("^")).toBe(template("0--x"));
      expect(key("<")).toBe(template("--0x"));
      expect(key(">")).toBe(template("0--x"));
      expect(key(">>")).toBe(template("--0x"));
      expect(key("<<")).toBe(template("0--x"));
      expect(key("vv")).toBe(template("--0x"));
      expect(key("^^")).toBe(template("0--x"));
    });

    test("move focus with arrow keys horizontal", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          orientation: "horizontal",
        });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item />
          </Composite>
        );
      };
      render(<Test />);
      press.Tab();
      expect(active()).toBe(template("0--"));
      expect(key(">")).toBe(template("-0-"));
      expect(key("v")).toBe(template("-0-"));
      expect(key(">")).toBe(template("--0"));
      expect(key(">")).toBe(template("--0"));
      expect(key("<")).toBe(template("-0-"));
      expect(key("^")).toBe(template("-0-"));
      expect(key("<")).toBe(template("0--"));
      expect(key("<")).toBe(template("0--"));
      expect(key(">>")).toBe(template("--0"));
      expect(key("<<")).toBe(template("0--"));
      expect(key("vv")).toBe(template("--0"));
      expect(key("^^")).toBe(template("0--"));
    });

    test("move focus with arrow keys vertical", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          orientation: "vertical",
        });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item />
            <CompositeItem {...composite} data-item />
          </Composite>
        );
      };
      render(<Test />);
      press.Tab();
      expect(active()).toBe(template("0--"));
      expect(key("v")).toBe(template("-0-"));
      expect(key(">")).toBe(template("-0-"));
      expect(key("v")).toBe(template("--0"));
      expect(key("v")).toBe(template("--0"));
      expect(key("^")).toBe(template("-0-"));
      expect(key("<")).toBe(template("-0-"));
      expect(key("^")).toBe(template("0--"));
      expect(key("^")).toBe(template("0--"));
      expect(key(">>")).toBe(template("--0"));
      expect(key("<<")).toBe(template("0--"));
      expect(key("vv")).toBe(template("--0"));
      expect(key("^^")).toBe(template("0--"));
    });

    test("block intermediate focus/blur events", () => {
      const stack: string[] = [];
      const returnTarget = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLElement;
        const currentTarget = event.currentTarget as HTMLElement;
        stack.push(
          `${event.type} ${currentTarget.getAttribute(
            "aria-label"
          )} ${target.getAttribute("aria-label")}`
        );
      };
      const onCompositeFocus = jest.fn(returnTarget);
      const onCompositeBlur = jest.fn(returnTarget);
      const onItemFocus = jest.fn(returnTarget);
      const onItemBlur = jest.fn(returnTarget);
      const Test = () => {
        const composite = useCompositeState({
          currentId: null,
          unstable_virtual: virtual,
        });
        return (
          <Composite
            {...composite}
            role="toolbar"
            aria-label="composite"
            onFocus={onCompositeFocus}
            onBlur={onCompositeBlur}
          >
            <CompositeItem
              {...composite}
              aria-label="item1"
              onFocus={onItemFocus}
              onBlur={onItemBlur}
            />
            <CompositeItem
              {...composite}
              aria-label="item2"
              onFocus={onItemFocus}
              onBlur={onItemBlur}
            />
            <CompositeItem
              {...composite}
              aria-label="item3"
              onFocus={onItemFocus}
              onBlur={onItemBlur}
            />
          </Composite>
        );
      };
      const { getByLabelText: $, baseElement } = render(<Test />);
      press.Tab();
      expect(stack.splice(0)).toEqual(["focus composite composite"]);
      press.ArrowDown();
      if (virtual) {
        expect(stack.splice(0)).toEqual([
          "focus item1 item1",
          "focus composite item1",
        ]);
      } else {
        expect(stack.splice(0)).toEqual([
          "blur composite composite",
          "focus item1 item1",
          "focus composite item1",
        ]);
      }
      press.ArrowDown();
      expect(stack.splice(0)).toEqual([
        "blur item1 item1",
        "blur composite item1",
        "focus item2 item2",
        "focus composite item2",
      ]);
      click($("item3"));
      expect(stack.splice(0)).toEqual([
        "blur item2 item2",
        "blur composite item2",
        "focus item3 item3",
        "focus composite item3",
      ]);
      click(baseElement);
      if (virtual) {
        expect(stack.splice(0)).toEqual([
          "blur item3 item3",
          "blur composite item3",
          "blur composite composite",
        ]);
      } else {
        expect(stack.splice(0)).toEqual([
          "blur item3 item3",
          "blur composite item3",
        ]);
      }
      press.Tab();
      if (virtual) {
        expect(stack.splice(0)).toEqual([
          "focus composite composite",
          "focus item3 item3",
          "focus composite item3",
        ]);
      } else {
        expect(stack.splice(0)).toEqual([
          "focus item3 item3",
          "focus composite item3",
        ]);
      }
    });

    test("keep DOM order", () => {
      const Test = ({ renderItem2 = false }) => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <Composite {...composite} role="toolbar" aria-label="composite">
            <CompositeItem {...composite}>item1</CompositeItem>
            {renderItem2 && <CompositeItem {...composite}>item2</CompositeItem>}
            <CompositeItem {...composite}>item3</CompositeItem>
          </Composite>
        );
      };
      const { getByText, rerender } = render(<Test />);
      const item1 = getByText("item1");
      const item3 = getByText("item3");
      focus(item1);
      expect(item1).toHaveFocus();
      press.ArrowRight();
      expect(item3).toHaveFocus();
      rerender(<Test renderItem2 />);
      expect(item3).toHaveFocus();
      press.ArrowLeft();
      expect(getByText("item2")).toHaveFocus();
    });

    ["disabled", "unmounted"].forEach((state) => {
      test(`move to the past item when the current active item is ${state}`, () => {
        const Test = () => {
          const [disabled, setDisabled] = React.useState(false);
          const composite = useCompositeState({ unstable_virtual: virtual });
          return (
            <>
              <button onClick={() => setDisabled(!disabled)}>toggle</button>
              <Composite {...composite} role="toolbar" aria-label="composite">
                <CompositeItem {...composite}>item1</CompositeItem>
                {(!disabled || state !== "unmounted") && (
                  <CompositeItem {...composite} disabled={disabled}>
                    item2
                  </CompositeItem>
                )}
                <CompositeItem {...composite} disabled>
                  item3
                </CompositeItem>
                <CompositeItem {...composite}>item4</CompositeItem>
              </Composite>
            </>
          );
        };
        const { getByText: $ } = render(<Test />);
        focus($("item2"));
        expect($("item2")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        expect($("item1")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        press.ArrowRight();
        expect($("item2")).toHaveFocus();
        press.ArrowRight();
        expect($("item4")).toHaveFocus();
        press.ArrowLeft();
        expect($("item2")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        expect($("item4")).toHaveFocus();
      });

      test(`move to the past item when the current active item is ${state} and currentId is set`, () => {
        const Test = () => {
          const [disabled, setDisabled] = React.useState(false);
          const composite = useCompositeState({
            unstable_virtual: virtual,
            currentId: "item2",
          });
          return (
            <>
              <button onClick={() => setDisabled(!disabled)}>toggle</button>
              <Composite {...composite} role="toolbar" aria-label="composite">
                <CompositeItem {...composite}>item1</CompositeItem>
                {(!disabled || state !== "unmounted") && (
                  <CompositeItem {...composite} disabled={disabled} id="item2">
                    item2
                  </CompositeItem>
                )}
                <CompositeItem {...composite} disabled>
                  item3
                </CompositeItem>
                <CompositeItem {...composite}>item4</CompositeItem>
              </Composite>
            </>
          );
        };
        const { getByText: $ } = render(<Test />);
        expect($("item2")).not.toHaveFocus();
        click($("toggle"));
        expect($("item1")).not.toHaveFocus();
        press.Tab();
        expect($("item1")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        press.ArrowRight();
        expect($("item2")).toHaveFocus();
        press.ArrowRight();
        expect($("item4")).toHaveFocus();
        press.ArrowLeft();
        expect($("item2")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        expect($("item4")).toHaveFocus();
      });

      test(`move to the past item when the current active item is ${state} and id is set`, () => {
        const Test = () => {
          const [disabled, setDisabled] = React.useState(false);
          const composite = useCompositeState({ unstable_virtual: virtual });
          return (
            <>
              <button onClick={() => setDisabled(!disabled)}>toggle</button>
              <Composite
                {...composite}
                id="toolbar"
                role="toolbar"
                aria-label="composite"
              >
                <CompositeItem {...composite}>item1</CompositeItem>
                {(!disabled || state !== "unmounted") && (
                  <CompositeItem {...composite} disabled={disabled}>
                    item2
                  </CompositeItem>
                )}
                <CompositeItem {...composite} disabled>
                  item3
                </CompositeItem>
                <CompositeItem {...composite}>item4</CompositeItem>
              </Composite>
            </>
          );
        };
        const { getByText: $ } = render(<Test />);
        focus($("item2"));
        expect($("item2")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        expect($("item1")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        press.ArrowRight();
        expect($("item2")).toHaveFocus();
        press.ArrowRight();
        expect($("item4")).toHaveFocus();
        press.ArrowLeft();
        expect($("item2")).toHaveFocus();
        click($("toggle"));
        press.Tab();
        expect($("item4")).toHaveFocus();
      });
    });

    test("list item with tabbable content inside", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        return (
          <>
            <Composite {...composite} role="toolbar" aria-label="composite">
              <CompositeItem {...composite}>item1</CompositeItem>
              <CompositeItem {...composite} as="div" aria-label="item2">
                <CompositeItemWidget
                  {...composite}
                  as="input"
                  type="text"
                  aria-label="input"
                />
              </CompositeItem>
              <CompositeItem {...composite} as="div" aria-label="item3">
                <CompositeItemWidget {...composite} as="button">
                  innerButton
                </CompositeItemWidget>
              </CompositeItem>
            </Composite>
            <button>outerButton</button>
          </>
        );
      };
      const { getByLabelText, getByText } = render(<Test />);
      const item2 = getByLabelText("item2");
      const item3 = getByLabelText("item3");
      const input = getByLabelText("input");
      const innerButton = getByText("innerButton");
      const outerButton = getByText("outerButton");
      click(item2);
      expect(item2).not.toHaveFocus();
      expect(input).toHaveFocus();
      press.Escape();
      expect(item2).toHaveFocus();
      press.Tab();
      expect(outerButton).toHaveFocus();
      press.ShiftTab();
      expect(item2).toHaveFocus();
      press.Enter();
      expect(input).toHaveFocus();
      press.ArrowDown();
      press.ArrowRight();
      expect(input).toHaveFocus();
      press.Tab();
      expect(innerButton).toHaveFocus();
      press.Tab();
      expect(outerButton).toHaveFocus();
      press.ShiftTab();
      expect(item3).toHaveFocus();
      press("a");
      expect(item3).toHaveFocus();
      press.Enter();
      expect(innerButton).toHaveFocus();
      press.Escape();
      expect(item3).toHaveFocus();
      press.Space();
      expect(innerButton).toHaveFocus();
      press.ShiftTab();
      expect(input).toHaveFocus();
      press.Escape();
      expect(input).not.toHaveFocus();
      press.Space();
      expect(input).toHaveFocus();
      expect(input).toHaveValue("");
      press.Escape();
      expect(input).not.toHaveFocus();
      type("a");
      expect(input).toHaveFocus();
      expect(input).toHaveValue("a");
      type("bc d");
      expect(input).toHaveValue("abc d");
      press.Escape();
      expect(input).not.toHaveFocus();
      expect(input).toHaveValue("");
      type("b");
      expect(input).toHaveFocus();
      expect(input).toHaveValue("b");
      type("c");
      expect(input).toHaveValue("bc");
      press.Enter();
      expect(item2).toHaveFocus();
      expect(input).toHaveValue("bc");
      type("b");
      expect(input).toHaveFocus();
      expect(input).toHaveValue("b");
      press.Escape();
      expect(item2).toHaveFocus();
      expect(input).toHaveValue("bc");
      press.Backspace();
      expect(item2).toHaveFocus();
      expect(input).toHaveValue("");
      type("#");
      expect(input).toHaveFocus();
      expect(input).toHaveValue("#");
      press.Escape();
      press.Delete();
      expect(item2).toHaveFocus();
      expect(input).toHaveValue("");
    });

    test("move grid focus with arrow keys", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 2, 1, 2],
          [2, 0, 0, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 - - -
          - x x -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - 0 - -
          - x x -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - - 0 -
          - x x -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - - - 0
          - x x -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - - - 0
          - x x -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - - - -
          - x x 0
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - - - -
          - x x 0
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - - - -
          0 x x -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - - - -
          - x x -
          0 - - x
      `)
      );
      expect(key(">>")).toBe(
        template(`
          - - - -
          - x x -
          - - 0 x
      `)
      );
      expect(key("<<")).toBe(
        template(`
          - - - -
          - x x -
          0 - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - - - -
          - x x -
          - 0 - x
      `)
      );
      expect(key("^^")).toBe(
        template(`
          - 0 - -
          - x x -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - 0 - -
          - x x -
          - - - x
      `)
      );
      expect(key("<<<")).toBe(
        template(`
          0 - - -
          - x x -
          - - - x
      `)
      );
      expect(key("vv")).toBe(
        template(`
          - - - -
          - x x -
          0 - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - - - -
          0 x x -
          - - - x
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - - - -
          - x x -
          - - 0 x
      `)
      );
    });

    test("move grid focus with arrow keys rtl", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          rtl: true,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - - - 0
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x -
          - - 0 -
          - - - x
      `)
      );
      expect(key(">>")).toBe(
        template(`
          - x x -
          - - - 0
          - - - x
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("<<<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("vv")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
    });

    test("move grid focus with arrow keys wrap", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: true,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x -
          0 - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys wrap horizontal", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: "horizontal",
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x -
          0 - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys wrap vertical", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: "vertical",
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys loop", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          loop: true,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    aria-label={`${i + 1}-${j + 1}`}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          0 - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          0 - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - 0
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys loop horizontal", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          loop: "horizontal",
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys loop vertical", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          loop: "vertical",
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys wrap loop", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: true,
          loop: true,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    aria-label={`${i + 1}-${j + 1}`}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x -
          0 - - -
          - - - x
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key(">")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - - - 0
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - 0
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys wrap horizontal loop vertical", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: "horizontal",
          loop: "vertical",
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x -
          0 - - -
          - - - x
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - - 0 -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
    });

    test("move grid focus with arrow keys rtl wrap loop", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          rtl: true,
          wrap: true,
          loop: true,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    aria-label={`${i + 1}-${j + 1}`}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x -
          0 - - -
          - - - x
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - - - 0
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
    });

    test("move grid focus with arrow keys different number of cells", () => {
      const Test = () => {
        const composite = useCompositeState({ unstable_virtual: virtual });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 0, 1],
          [2, 2, 0],
          [2, 2, 2, 2, 1],
          [2, 2, 2],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x x -
          - - x
          - - - - -
          - - -
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x 0
          - - x
          - - - - -
          - - -
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x 0
          - - x
          - - - - -
          - - -
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x x 0
          - - x
          - - - - -
          - - -
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x x -
          - - x
          - - - - 0
          - - -
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x x -
          - - x
          - - - - 0
          - - -
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x x 0
          - - x
          - - - - -
          - - -
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - x x x -
          - - x
          - - - - -
          - - 0
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x x -
          - - x
          - - 0 - -
          - - -
      `)
      );
      expect(key("<<")).toBe(
        template(`
          - x x x -
          - - x
          0 - - - -
          - - -
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x x -
          - - x
          - - - - -
          0 - -
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x -
          - - x
          - - - - -
          - 0 -
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x -
          - - x
          - - - - -
          - - 0
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x -
          - - x
          - - - - -
          - - 0
      `)
      );
      expect(key("^^")).toBe(
        template(`
          - x x x -
          - - x
          - - 0 - -
          - - -
      `)
      );
      expect(key(">>")).toBe(
        template(`
          - x x x -
          - - x
          - - - - 0
          - - -
      `)
      );
    });

    test("move grid focus with arrow keys different number of cells wrap", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: true,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 0, 1],
          [2, 2, 0],
          [2, 2, 2, 2, 1],
          [2, 2, 2],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      render(<Test />);
      press.Tab();
      expect(active()).toBe(
        template(`
          0 x x x -
          - - x
          - - - - -
          - - -
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x 0
          - - x
          - - - - -
          - - -
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x -
          0 - x
          - - - - -
          - - -
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - x x x -
          - - x
          - - - - -
          - - 0
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x x -
          - - x
          - - 0 - -
          - - -
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x x -
          - - x
          - - - 0 -
          - - -
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x x -
          - - x
          - - - - -
          - - 0
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x x -
          - - x
          - - - 0 -
          - - -
      `)
      );
    });

    test("grid item with tabbable content inside", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          orientation: "vertical",
          wrap: true,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled, .5 - has widget
        const rows = [
          [2, 0.5, 0, 2],
          [2, 2.5, 1, 2],
          [2, 2, 1.5, 0.5],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    as="div"
                    disabled={Math.floor(item) < 2}
                    focusable={Math.floor(item) === 1}
                    aria-label={`${i}-${j}`}
                  >
                    {item % 1 !== 0 && (
                      <CompositeItemWidget
                        {...composite}
                        as="textarea"
                        aria-label={`input-${i}-${j}`}
                      />
                    )}
                  </CompositeItem>
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };

      const { getByLabelText } = render(<Test />);
      press.Tab();
      expect(getByLabelText("0-0")).toHaveFocus();
      press.ArrowDown();
      press.ArrowRight();
      expect(getByLabelText("1-1")).toHaveFocus();
      press.Enter();
      expect(getByLabelText("1-1")).not.toHaveFocus();
      expect(getByLabelText("input-1-1")).toHaveFocus();
      press.Enter(null, { shiftKey: true });
      expect(getByLabelText("input-1-1")).toHaveFocus();
      press.Tab();
      expect(getByLabelText("2-2")).not.toHaveFocus();
      expect(getByLabelText("input-2-2")).toHaveFocus();
      press.ShiftTab();
      expect(getByLabelText("1-1")).not.toHaveFocus();
      expect(getByLabelText("input-1-1")).toHaveFocus();
      press.Escape();
      expect(getByLabelText("1-1")).toHaveFocus();
      expect(getByLabelText("input-1-1")).not.toHaveFocus();
    });

    test("move to the past item when the current group is unmounted", () => {
      const Test = () => {
        const [disableGroup, setDisableGroup] = React.useState(false);
        const [disableItems, setDisableItems] = React.useState(false);
        const composite = useCompositeState({
          unstable_virtual: virtual,
        });
        const [groups, setGroups] = React.useState<string[][]>([[]]);

        React.useEffect(() => {
          if (disableGroup) {
            setGroups([
              ["1-1", "1-2", "1-3"],
              ["3-1", "3-2", "3-3"],
            ]);
          } else {
            setGroups([
              ["1-1", "1-2", "1-3"],
              ["2-1", "2-2", "2-3"],
              ["3-1", "3-2", "3-3"],
            ]);
          }
        }, [disableGroup]);

        return (
          <>
            <button onClick={() => setDisableGroup(!disableGroup)}>
              toggle group
            </button>
            <button onClick={() => setDisableItems(!disableItems)}>
              toggle items
            </button>
            <Composite {...composite} role="grid" aria-label="composite">
              {groups.map((items, i) => (
                <CompositeGroup {...composite} key={items.join("")}>
                  {items.map((item) => (
                    <CompositeItem
                      {...composite}
                      key={item}
                      disabled={disableItems && i === 1}
                      aria-label={item}
                    />
                  ))}
                </CompositeGroup>
              ))}
            </Composite>
          </>
        );
      };
      const { getByLabelText, getByText } = render(<Test />);
      press.Tab();
      press.Tab();
      press.Tab();
      expect(getByLabelText("1-1")).toHaveFocus();
      press.ArrowDown();
      press.ArrowRight();
      expect(getByLabelText("2-2")).toHaveFocus();
      click(getByText("toggle group"));
      press.Tab();
      press.Tab();
      expect(getByLabelText("1-1")).toHaveFocus();
      click(getByText("toggle group"));
      press.Tab();
      press.Tab();
      expect(getByLabelText("1-1")).toHaveFocus();
      press.ArrowDown();
      expect(getByLabelText("2-1")).toHaveFocus();
      click(getByText("toggle items"));
      press.Tab();
      expect(getByLabelText("1-1")).toHaveFocus();
    });

    test("composite grid becomes the first item when currentId is null", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          currentId: null,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };
      const { getByLabelText: $ } = render(<Test />);
      press.Tab();
      expect($("composite")).toHaveFocus();
      expect(active()).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("vv")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
      expect(key("^^")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect($("composite")).toHaveFocus();
      expect(key(">")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key(">")).toBe(
        template(`
          - x x 0
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect($("composite")).toHaveFocus();
      expect(key("<")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("<<<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^^")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<<<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">>")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("<<<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key(">>>")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key("<<<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
    });

    test("composite grid becomes the first item when currentId is null and wrap", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: true,
          currentId: null,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };
      const { getByLabelText: $ } = render(<Test />);
      press.Tab();
      expect($("composite")).toHaveFocus();
      expect(active()).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("vv")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - 0 - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect($("composite")).toHaveFocus();
    });

    test("composite grid becomes the first item when currentId is null, wrap and loop", () => {
      const Test = () => {
        const composite = useCompositeState({
          unstable_virtual: virtual,
          wrap: true,
          loop: true,
          currentId: null,
        });
        // 2 - enabled, 1 - disabled focusable, 0 - disabled
        const rows = [
          [2, 0, 0, 2],
          [2, 2, 1, 2],
          [2, 2, 2, 0],
        ];
        return (
          <Composite {...composite} role="grid" aria-label="composite">
            {rows.map((items, i) => (
              <CompositeGroup {...composite} key={i}>
                {items.map((item, j) => (
                  <CompositeItem
                    {...composite}
                    key={j}
                    disabled={item < 2}
                    focusable={item === 1}
                    data-item
                  />
                ))}
              </CompositeGroup>
            ))}
          </Composite>
        );
      };
      const { getByLabelText: $ } = render(<Test />);
      press.Tab();
      expect($("composite")).toHaveFocus();
      expect(active()).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("<")).toBe(
        template(`
          - x x -
          - - - -
          - - 0 x
      `)
      );
      expect(key(">")).toBe(
        template(`
          0 x x -
          - - - -
          - - - x
      `)
      );
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect($("composite")).toHaveFocus();
      expect(key("^")).toBe(
        template(`
          - x x -
          - - - -
          0 - - x
      `)
      );
      expect(key("v")).toBe(
        template(`
          - x x -
          - - - -
          - - - x
      `)
      );
      expect($("composite")).toHaveFocus();
    });
  });
});

test("block intermediate focus/blur events when composite container is not the parent", () => {
  const stack: string[] = [];
  const returnTarget = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    stack.push(
      `${event.type} ${currentTarget.getAttribute(
        "aria-label"
      )} ${target.getAttribute("aria-label")}`
    );
  };
  const onCompositeFocus = jest.fn(returnTarget);
  const onCompositeBlur = jest.fn(returnTarget);
  const onItemFocus = jest.fn(returnTarget);
  const onItemBlur = jest.fn(returnTarget);
  const Test = () => {
    const composite = useCompositeState({ unstable_virtual: true });
    return (
      <>
        <Composite
          {...composite}
          role="combobox"
          aria-label="composite"
          onFocus={onCompositeFocus}
          onBlur={onCompositeBlur}
        />
        <>
          <CompositeItem
            {...composite}
            aria-label="item1"
            onFocus={onItemFocus}
            onBlur={onItemBlur}
          />
          <CompositeItem
            {...composite}
            aria-label="item2"
            onFocus={onItemFocus}
            onBlur={onItemBlur}
          />
          <CompositeItem
            {...composite}
            aria-label="item3"
            onFocus={onItemFocus}
            onBlur={onItemBlur}
          />
        </>
      </>
    );
  };
  const { getByLabelText: $, baseElement } = render(<Test />);
  press.Tab();
  expect(stack.splice(0)).toEqual([
    "focus composite composite",
    "focus item1 item1",
  ]);
  press.ArrowDown();
  expect(stack.splice(0)).toEqual(["blur item1 item1", "focus item2 item2"]);
  click($("item3"));
  expect(stack.splice(0)).toEqual(["blur item2 item2", "focus item3 item3"]);
  click(baseElement);
  expect(stack.splice(0)).toEqual([
    "blur item3 item3",
    "blur composite composite",
  ]);
  press.Tab();
  expect(stack.splice(0)).toEqual([
    "focus composite composite",
    "focus item3 item3",
  ]);
});
