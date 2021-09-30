import * as React from "react";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { MenuContextType } from "./MenuContext";
import { findVisibleSubmenu } from "./findVisibleSubmenu";

type Point = { x: number; y: number };

function getTriangleArea(a: Point, b: Point, c: Point) {
  return Math.abs(
    (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2
  );
}

function isPointInTriangle(point: Point, a: Point, b: Point, c: Point) {
  const A = getTriangleArea(a, b, c);
  const A1 = getTriangleArea(point, b, c);
  const A2 = getTriangleArea(a, point, c);
  const A3 = getTriangleArea(a, b, point);
  return A === A1 + A2 + A3;
}

function getSubmenuAnchorPoints(
  event: React.MouseEvent,
  visibleSubmenu: HTMLElement
) {
  const { top, right, bottom, left } = visibleSubmenu.getBoundingClientRect();
  // If left is bigger than mouse's clientX, than the submenu is visible on
  // the left side
  const x = left > event.clientX ? left : right;
  return [
    { x, y: top },
    { x, y: bottom },
  ] as const;
}

export function useTransitToSubmenu(
  menu: MenuContextType | null,
  htmlOnMouseEnter?: React.MouseEventHandler
) {
  const onMouseEnterRef = useLiveRef(htmlOnMouseEnter);
  const enterPointRef = React.useRef<Point | null>(null);
  const submenuTopPointRef = React.useRef<Point | null>(null);
  const submenuBottomPointRef = React.useRef<Point | null>(null);
  const previousClientX = React.useRef(0);
  const previousClientY = React.useRef(0);

  const assignSubmenuAnchorPoints = React.useCallback(
    (event: React.MouseEvent) => {
      if (!menu?.children.length) return;
      submenuTopPointRef.current = null;
      submenuBottomPointRef.current = null;
      const visibleSubmenu = findVisibleSubmenu(menu.children);
      if (!visibleSubmenu) return;
      [
        submenuTopPointRef.current,
        submenuBottomPointRef.current,
      ] = getSubmenuAnchorPoints(event, visibleSubmenu);
    },
    [menu?.children]
  );

  const isMouseInTransitToSubmenu = React.useCallback(
    (event: React.MouseEvent) => {
      const isMoving =
        previousClientX.current !== event.clientX ||
        previousClientY.current !== event.clientY;
      if (event.isTrusted && !isMoving) {
        // Safari sometimes triggers mousemove without a mouse movement
        return true;
      }
      const movementX = Math.abs(previousClientX.current - event.clientX);
      previousClientX.current = event.clientX;
      previousClientY.current = event.clientY;
      const hasAnchorPoints = () =>
        submenuTopPointRef.current && submenuBottomPointRef.current;
      if (event.type === "mouseleave" && !hasAnchorPoints()) {
        assignSubmenuAnchorPoints(event);
      }
      if (!hasAnchorPoints()) return false;
      return (
        movementX &&
        enterPointRef.current &&
        isPointInTriangle(
          { x: event.clientX, y: event.clientY },
          enterPointRef.current,
          submenuTopPointRef.current!,
          submenuBottomPointRef.current!
        )
      );
    },
    [assignSubmenuAnchorPoints]
  );

  const onMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onMouseEnterRef.current?.(event);
      if (event.defaultPrevented) return;
      if (menu?.role === "menubar") return;
      enterPointRef.current = { x: event.clientX, y: event.clientY };
      assignSubmenuAnchorPoints(event);
    },
    [menu?.role, assignSubmenuAnchorPoints]
  );

  return { onMouseEnter, isMouseInTransitToSubmenu };
}
