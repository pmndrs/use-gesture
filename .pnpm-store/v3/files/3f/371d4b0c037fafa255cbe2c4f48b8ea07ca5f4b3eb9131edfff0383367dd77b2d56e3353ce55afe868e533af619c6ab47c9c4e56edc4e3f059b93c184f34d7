import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { contains } from "reakit-utils/contains";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { hasFocusWithin } from "reakit-utils/hasFocusWithin";
import {
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "../Composite/CompositeItem";
import { MenuStateReturn } from "./MenuState";
import { MenuContext } from "./__utils/MenuContext";
import { findVisibleSubmenu } from "./__utils/findVisibleSubmenu";
import { useTransitToSubmenu } from "./__utils/useTransitToSubmenu";
import { MENU_ITEM_KEYS } from "./__keys";

export type MenuItemOptions = CompositeItemOptions &
  Pick<
    Partial<MenuStateReturn>,
    | "visible"
    | "hide"
    | "placement"
    | "unstable_popoverStyles"
    | "unstable_arrowStyles"
  > &
  Pick<MenuStateReturn, "next" | "previous" | "move">;

export type MenuItemHTMLProps = CompositeItemHTMLProps;

export type MenuItemProps = MenuItemOptions & MenuItemHTMLProps;

function getMouseDestination(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const relatedTarget = event.relatedTarget as Node | null;
  if (relatedTarget?.nodeType === Node.ELEMENT_NODE) {
    return event.relatedTarget;
  }
  // IE 11
  return (event as any).toElement || null;
}

function hoveringInside(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  return contains(event.currentTarget, nextElement);
}

function hoveringExpandedMenu(
  event: React.MouseEvent<HTMLElement, MouseEvent>,
  children?: Array<React.RefObject<HTMLElement>>
) {
  if (!children?.length) return false;
  const nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  const visibleSubmenu = findVisibleSubmenu(children);
  return visibleSubmenu && contains(visibleSubmenu, nextElement);
}

function hoveringAnotherMenuItem(
  event: React.MouseEvent<HTMLElement, MouseEvent>,
  items: MenuItemOptions["items"]
) {
  const nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  return items?.some(
    (item) => item.ref.current && contains(item.ref.current, nextElement)
  );
}

export const useMenuItem = createHook<MenuItemOptions, MenuItemHTMLProps>({
  name: "MenuItem",
  compose: useCompositeItem,
  keys: MENU_ITEM_KEYS,

  propsAreEqual(prev, next) {
    const {
      unstable_popoverStyles: prevPopoverStyles,
      unstable_arrowStyles: prevArrowStyles,
      visible: prevVisible,
      ...prevProps
    } = prev;
    const {
      unstable_popoverStyles: nextPopoverStyles,
      unstable_arrowStyles: nextArrowStyles,
      visible: nextVisible,
      ...nextProps
    } = next;
    return useCompositeItem.unstable_propsAreEqual(prevProps, nextProps);
  },

  useProps(
    options,
    {
      onMouseEnter: htmlOnMouseEnter,
      onMouseMove: htmlOnMouseMove,
      onMouseLeave: htmlOnMouseLeave,
      ...htmlProps
    }
  ) {
    const menu = React.useContext(MenuContext);
    const onMouseMoveRef = useLiveRef(htmlOnMouseMove);
    const onMouseLeaveRef = useLiveRef(htmlOnMouseLeave);
    const { onMouseEnter, isMouseInTransitToSubmenu } = useTransitToSubmenu(
      menu,
      htmlOnMouseEnter
    );

    const onMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onMouseMoveRef.current?.(event);
        if (event.defaultPrevented) return;
        if (menu?.role === "menubar") return;
        if (isMouseInTransitToSubmenu(event)) return;
        if (hasFocusWithin(event.currentTarget)) return;
        options.move?.(event.currentTarget.id);
      },
      [options.move]
    );

    const onMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onMouseLeaveRef.current?.(event);
        if (event.defaultPrevented) return;
        if (menu?.role === "menubar") return;
        if (hoveringInside(event)) return;
        // If this item is a menu disclosure and mouse is leaving it to focus
        // its respective submenu, we don't want to do anything.
        if (hoveringExpandedMenu(event, menu?.children)) return;
        // Move focus to menu after blurring
        if (!hoveringAnotherMenuItem(event, options.items)) {
          if (isMouseInTransitToSubmenu(event)) return;
          options.move?.(null);
        }
      },
      [menu?.role, menu?.children, options.items, options.move]
    );

    return {
      role: "menuitem",
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      ...htmlProps,
    };
  },
});

export const MenuItem = createComponent({
  as: "button",
  memo: true,
  useHook: useMenuItem,
});
