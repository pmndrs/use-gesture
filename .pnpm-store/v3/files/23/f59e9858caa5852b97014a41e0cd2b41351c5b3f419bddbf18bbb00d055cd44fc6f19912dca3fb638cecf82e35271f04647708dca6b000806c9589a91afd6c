import * as React from "react";
import { closest } from "reakit-utils/closest";
import { MenuStateReturn } from "../MenuState";

export function useShortcuts(
  menuRef: React.RefObject<HTMLElement>,
  { items, move }: Pick<MenuStateReturn, "items" | "move">,
  timeout = 500
) {
  const [keys, setKeys] = React.useState("");

  React.useEffect(() => {
    if (!keys) return undefined;

    const timeoutId = setTimeout(() => setKeys(""), timeout);

    const stop = items.find((s) =>
      Boolean(
        s.ref.current &&
          s.ref.current.textContent &&
          s.ref.current.textContent.toLowerCase().startsWith(keys)
      )
    );

    if (stop) {
      move(stop.id);
    }

    return () => clearTimeout(timeoutId);
  }, [keys, items, move, timeout]);

  React.useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.length > 1) return;
      if (event.shiftKey) return;
      if (event.metaKey) return;
      if (event.ctrlKey) return;
      if (event.altKey) return;
      const target = event.target as HTMLElement;
      const role = target.getAttribute?.("role");
      const targetIsMenu = target === menu;
      const targetIsMenuItem =
        role &&
        role.indexOf("menuitem") !== -1 &&
        closest(target, "[role=menu],[role=menubar]") === menu;

      if (!targetIsMenu && !targetIsMenuItem) return;

      if (/^[a-z0-9_-]$/i.test(event.key)) {
        event.stopPropagation();
        event.preventDefault();
        setKeys((k) => `${k}${event.key}`);
      }
    };

    // https://github.com/facebook/react/issues/11387#issuecomment-524113945
    menu.addEventListener("keydown", onKeyDown);
    return () => menu.removeEventListener("keydown", onKeyDown);
  }, [menuRef, setKeys]);
}
