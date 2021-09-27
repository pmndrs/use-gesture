import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { createOnKeyDown } from "reakit-utils/createOnKeyDown";
import { warning } from "reakit-warning";
import { useForkRef } from "reakit-utils/useForkRef";
import { hasFocusWithin } from "reakit-utils/hasFocusWithin";
import { AnyFunction } from "reakit-utils/types";
import {
  ClickableOptions,
  ClickableHTMLProps,
  useClickable,
} from "../Clickable/Clickable";
import {
  unstable_useId,
  unstable_IdOptions,
  unstable_IdHTMLProps,
} from "../Id/Id";
import { RoverStateReturn } from "./RoverState";
import { ROVER_KEYS } from "./__keys";

export type RoverOptions = ClickableOptions &
  unstable_IdOptions &
  Pick<Partial<RoverStateReturn>, "orientation" | "unstable_moves"> &
  Pick<
    RoverStateReturn,
    | "stops"
    | "currentId"
    | "register"
    | "unregister"
    | "move"
    | "next"
    | "previous"
    | "first"
    | "last"
  > & {
    /**
     * Element ID.
     */
    stopId?: string;
  };

export type RoverHTMLProps = ClickableHTMLProps & unstable_IdHTMLProps;

export type RoverProps = RoverOptions & RoverHTMLProps;

function useAllCallbacks(
  ...callbacks: Array<AnyFunction | null | undefined>
): AnyFunction {
  return React.useCallback((...args: any[]) => {
    const fns = callbacks.filter(Boolean) as Array<AnyFunction>;
    for (const callback of fns) callback(...args);
  }, callbacks);
}

export const useRover = createHook<RoverOptions, RoverHTMLProps>({
  name: "Rover",
  compose: [useClickable, unstable_useId],
  keys: ROVER_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      tabIndex: htmlTabIndex = 0,
      onFocus: htmlOnFocus,
      onKeyDown: htmlOnKeyDown,
      ...htmlProps
    }
  ) {
    const ref = React.useRef<HTMLElement>(null);
    const id = options.stopId || options.id;

    const trulyDisabled = options.disabled && !options.focusable;
    const noFocused = options.currentId == null;
    const focused = options.currentId === id;
    const isFirst = (options.stops || [])[0] && options.stops[0].id === id;
    const shouldTabIndex = focused || (isFirst && noFocused);

    React.useEffect(() => {
      if (trulyDisabled || !id) return undefined;
      options.register && options.register(id, ref);
      return () => options.unregister && options.unregister(id);
    }, [id, trulyDisabled, options.register, options.unregister]);

    React.useEffect(() => {
      const rover = ref.current;
      if (!rover) {
        warning(
          true,
          "Can't focus rover component because `ref` wasn't passed to component.",
          "See https://reakit.io/docs/rover"
        );
        return;
      }
      if (options.unstable_moves && focused && !hasFocusWithin(rover)) {
        rover.focus();
      }
    }, [focused, options.unstable_moves]);

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        if (!id || !event.currentTarget.contains(event.target)) return;
        // this is already focused, so we move silently
        options.move(id, true);
      },
      [options.move, id]
    );

    const onKeyDown = React.useMemo(
      () =>
        createOnKeyDown({
          onKeyDown: htmlOnKeyDown,
          stopPropagation: true,
          shouldKeyDown: (event) =>
            // Ignore portals
            // https://github.com/facebook/react/issues/11387
            event.currentTarget.contains(event.target as Node),
          keyMap: {
            ArrowUp: options.orientation !== "horizontal" && options.previous,
            ArrowRight: options.orientation !== "vertical" && options.next,
            ArrowDown: options.orientation !== "horizontal" && options.next,
            ArrowLeft: options.orientation !== "vertical" && options.previous,
            Home: options.first,
            End: options.last,
            PageUp: options.first,
            PageDown: options.last,
          },
        }),
      [
        htmlOnKeyDown,
        options.orientation,
        options.previous,
        options.next,
        options.first,
        options.last,
      ]
    );

    return {
      id,
      ref: useForkRef(ref, htmlRef),
      tabIndex: shouldTabIndex ? htmlTabIndex : -1,
      onFocus: useAllCallbacks(onFocus, htmlOnFocus),
      onKeyDown,
      ...htmlProps,
    };
  },
});

export const Rover = createComponent({
  as: "button",
  useHook: useRover,
});
