import * as React from "react";

type KeyMap = {
  [key: string]:
    | ((event: React.KeyboardEvent<any>) => any)
    | null
    | false
    | undefined;
};

type Options = {
  keyMap?: KeyMap | ((event: React.KeyboardEvent) => KeyMap);
  onKey?: (event: React.KeyboardEvent) => any;
  preventDefault?: boolean | ((event: React.KeyboardEvent) => boolean);
  stopPropagation?: boolean | ((event: React.KeyboardEvent) => boolean);
  shouldKeyDown?: (event: React.KeyboardEvent) => boolean;
  onKeyDown?:
    | React.KeyboardEventHandler
    | React.RefObject<React.KeyboardEventHandler | undefined>;
};

/**
 * Returns an `onKeyDown` handler to be passed to a component.
 *
 * @param options
 */
export function createOnKeyDown({
  keyMap,
  onKey,
  stopPropagation,
  onKeyDown,
  shouldKeyDown = () => true,
  preventDefault = true,
}: Options = {}): React.KeyboardEventHandler {
  return (event) => {
    if (!keyMap) return;

    const finalKeyMap = typeof keyMap === "function" ? keyMap(event) : keyMap;

    const shouldPreventDefault =
      typeof preventDefault === "function"
        ? preventDefault(event)
        : preventDefault;

    const shouldStopPropagation =
      typeof stopPropagation === "function"
        ? stopPropagation(event)
        : stopPropagation;

    if (event.key in finalKeyMap) {
      const action = finalKeyMap[event.key];
      if (typeof action === "function" && shouldKeyDown(event)) {
        if (shouldPreventDefault) event.preventDefault();
        if (shouldStopPropagation) event.stopPropagation();
        if (onKey) onKey(event);
        action(event);
        // Prevent onKeyDown from being called twice for the same keys
        return;
      }
    }

    if (onKeyDown && "current" in onKeyDown) {
      onKeyDown.current?.(event);
    } else {
      onKeyDown?.(event);
    }
  };
}
