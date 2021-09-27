import * as React from "react";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";
import { useForkRef } from "reakit-utils/useForkRef";
import { hasFocusWithin } from "reakit-utils/hasFocusWithin";
import { useLiveRef } from "reakit-utils/useLiveRef";
import {
  PopoverDisclosureOptions,
  PopoverDisclosureHTMLProps,
  usePopoverDisclosure,
} from "../Popover/PopoverDisclosure";
import { MenuStateReturn } from "./MenuState";
import { MenuContext } from "./__utils/MenuContext";
import { findVisibleSubmenu } from "./__utils/findVisibleSubmenu";
import { MENU_BUTTON_KEYS } from "./__keys";

export type MenuButtonOptions = PopoverDisclosureOptions &
  Pick<
    Partial<MenuStateReturn>,
    | "hide"
    | "unstable_popoverStyles"
    | "unstable_arrowStyles"
    | "currentId"
    | "unstable_moves"
    | "move"
  > &
  Pick<MenuStateReturn, "show" | "placement" | "first" | "last">;

export type MenuButtonHTMLProps = PopoverDisclosureHTMLProps;

export type MenuButtonProps = MenuButtonOptions & MenuButtonHTMLProps;

const noop = () => {};

export const useMenuButton = createHook<MenuButtonOptions, MenuButtonHTMLProps>(
  {
    name: "MenuButton",
    compose: usePopoverDisclosure,
    keys: MENU_BUTTON_KEYS,

    propsAreEqual(prev, next) {
      const {
        unstable_popoverStyles: prevPopoverStyles,
        unstable_arrowStyles: prevArrowStyles,
        currentId: prevCurrentId,
        unstable_moves: prevMoves,
        ...prevProps
      } = prev;
      const {
        unstable_popoverStyles: nextPopoverStyles,
        unstable_arrowStyles: nextArrowStyles,
        currentId: nextCurrentId,
        unstable_moves: nextMoves,
        ...nextProps
      } = next;
      return usePopoverDisclosure.unstable_propsAreEqual(prevProps, nextProps);
    },

    useProps(
      options,
      {
        ref: htmlRef,
        onClick: htmlOnClick,
        onKeyDown: htmlOnKeyDown,
        onFocus: htmlOnFocus,
        onMouseEnter: htmlOnMouseEnter,
        onMouseDown: htmlOnMouseDown,
        ...htmlProps
      }
    ) {
      const parent = React.useContext(MenuContext);
      const ref = React.useRef<HTMLElement>(null);
      const hasPressedMouse = React.useRef(false);
      const [dir] = options.placement.split("-");
      const hasParent = !!parent;
      const parentIsMenuBar = parent?.role === "menubar";
      const disabled = options.disabled || htmlProps["aria-disabled"];
      const onClickRef = useLiveRef(htmlOnClick);
      const onKeyDownRef = useLiveRef(htmlOnKeyDown);
      const onFocusRef = useLiveRef(htmlOnFocus);
      const onMouseEnterRef = useLiveRef(htmlOnMouseEnter);
      const onMouseDownRef = useLiveRef(htmlOnMouseDown);

      const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
          if (event.key === "Escape") {
            // Doesn't prevent default on Escape, otherwise we can't close
            // dialogs when MenuButton is focused
            options.hide?.();
          } else if (!disabled) {
            // setTimeout prevents scroll jump
            const first = options.first && (() => setTimeout(options.first));
            const last = options.last && (() => setTimeout(options.last));
            const keyMap = {
              Enter: first,
              " ": first,
              ArrowUp: (dir === "top" || dir === "bottom") && last,
              ArrowRight: dir === "right" && first,
              ArrowDown: (dir === "bottom" || dir === "top") && first,
              ArrowLeft: dir === "left" && first,
            };
            const action = keyMap[event.key as keyof typeof keyMap];
            if (action) {
              event.preventDefault();
              event.stopPropagation();
              options.show?.();
              action();
              return;
            }
          }
          onKeyDownRef.current?.(event);
        },
        [disabled, options.hide, options.first, options.last, dir, options.show]
      );

      const onMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          onMouseEnterRef.current?.(event);
          if (event.defaultPrevented) return;
          // MenuButton's don't do anything on mouse over when they aren't
          // cointained within a Menu/MenuBar
          if (!parent) return;
          const element = event.currentTarget;
          if (parentIsMenuBar) {
            // if MenuButton is an item inside a MenuBar, it'll only open
            // if there's already another sibling expanded MenuButton
            if (findVisibleSubmenu(parent.children)) {
              element.focus();
            }
          } else {
            // If it's in a Menu, open after a short delay
            // TODO: Make the delay a prop?
            setTimeout(() => {
              if (hasFocusWithin(element)) {
                options.show?.();
              }
            }, 200);
          }
        },
        [parent, parentIsMenuBar, options.show]
      );

      const onMouseDown = React.useCallback((event: React.MouseEvent) => {
        // When in menu bar, the menu button can be activated either by focus
        // or click, but we don't want both to trigger sequentially.
        // Otherwise, onClick would toggle (hide) the menu right after it got
        // shown on focus.
        // This is also useful so we know if the menu button has been clicked
        // using mouse or keyboard. On mouse click, we don't automatically
        // focus the first menu item.
        hasPressedMouse.current = true;
        onMouseDownRef.current?.(event);
      }, []);

      const onFocus = React.useCallback(
        (event: React.FocusEvent) => {
          onFocusRef.current?.(event);
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (parentIsMenuBar && !hasPressedMouse.current) {
            options.show?.();
          }
        },
        [parentIsMenuBar, disabled, options.show]
      );

      // If disclosure is rendered as a menu bar item, it's toggable
      // That is, you can click on the expanded disclosure to close its menu.
      const onClick = React.useCallback(
        (event: React.MouseEvent) => {
          onClickRef.current?.(event);
          if (event.defaultPrevented) return;
          // If menu button is a menu item inside a menu (not menu bar), you
          // can't close it by clicking on it again.
          if (hasParent && !parentIsMenuBar) {
            options.show?.();
          } else {
            // Otherwise, if menu button is a menu bar item or an orphan menu
            // button, it's toggable.
            options.toggle?.();
            // Focus the menu popover when it's opened with mouse click.
            if (
              hasPressedMouse.current &&
              !parentIsMenuBar &&
              !options.visible
            ) {
              options.move?.(null);
            }
          }
          hasPressedMouse.current = false;
        },
        [
          hasParent,
          parentIsMenuBar,
          options.show,
          options.toggle,
          options.visible,
          options.move,
        ]
      );

      return {
        ref: useForkRef(ref, htmlRef),
        "aria-haspopup": "menu",
        onKeyDown,
        onMouseEnter,
        onMouseDown,
        onFocus,
        onClick,
        ...htmlProps,
      };
    },

    useComposeOptions(options) {
      return {
        ...options,
        // Toggling is handled by MenuButton
        toggle: noop,
      };
    },
  }
);

export const MenuButton = createComponent({
  as: "button",
  memo: true,
  useHook: useMenuButton,
});
