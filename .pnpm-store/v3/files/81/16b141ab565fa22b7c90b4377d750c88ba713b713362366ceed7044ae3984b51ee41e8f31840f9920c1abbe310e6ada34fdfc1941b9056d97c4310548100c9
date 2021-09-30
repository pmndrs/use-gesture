import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { isButton } from "reakit-utils/isButton";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { isSelfTarget } from "reakit-utils/isSelfTarget";
import {
  TabbableOptions,
  TabbableHTMLProps,
  useTabbable,
} from "../Tabbable/Tabbable";
import { CLICKABLE_KEYS } from "./__keys";

export type ClickableOptions = TabbableOptions & {
  /**
   * Whether or not trigger click on pressing <kbd>Enter</kbd>.
   * @private
   */
  unstable_clickOnEnter?: boolean;
  /**
   * Whether or not trigger click on pressing <kbd>Space</kbd>.
   * @private
   */
  unstable_clickOnSpace?: boolean;
};

export type ClickableHTMLProps = TabbableHTMLProps;

export type ClickableProps = ClickableOptions & ClickableHTMLProps;

function isNativeClick(event: React.KeyboardEvent) {
  const element = event.currentTarget;
  if (!event.isTrusted) return false;
  // istanbul ignore next: can't test trusted events yet
  return (
    isButton(element) ||
    element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.tagName === "A" ||
    element.tagName === "SELECT"
  );
}

export const useClickable = createHook<ClickableOptions, ClickableHTMLProps>({
  name: "Clickable",
  compose: useTabbable,
  keys: CLICKABLE_KEYS,

  useOptions({
    unstable_clickOnEnter = true,
    unstable_clickOnSpace = true,
    ...options
  }) {
    return {
      unstable_clickOnEnter,
      unstable_clickOnSpace,
      ...options,
    };
  },

  useProps(
    options,
    { onKeyDown: htmlOnKeyDown, onKeyUp: htmlOnKeyUp, ...htmlProps }
  ) {
    const [active, setActive] = React.useState(false);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const onKeyUpRef = useLiveRef(htmlOnKeyUp);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDownRef.current?.(event);

        if (event.defaultPrevented) return;
        if (options.disabled) return;
        if (event.metaKey) return;
        if (!isSelfTarget(event)) return;

        const isEnter = options.unstable_clickOnEnter && event.key === "Enter";
        const isSpace = options.unstable_clickOnSpace && event.key === " ";

        if (isEnter || isSpace) {
          if (isNativeClick(event)) return;
          event.preventDefault();
          if (isEnter) {
            event.currentTarget.click();
          } else if (isSpace) {
            setActive(true);
          }
        }
      },
      [
        options.disabled,
        options.unstable_clickOnEnter,
        options.unstable_clickOnSpace,
      ]
    );

    const onKeyUp = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyUpRef.current?.(event);

        if (event.defaultPrevented) return;
        if (options.disabled) return;
        if (event.metaKey) return;

        const isSpace = options.unstable_clickOnSpace && event.key === " ";

        if (active && isSpace) {
          setActive(false);
          event.currentTarget.click();
        }
      },
      [options.disabled, options.unstable_clickOnSpace, active]
    );

    return {
      "data-active": active || undefined,
      onKeyDown,
      onKeyUp,
      ...htmlProps,
    };
  },
});

export const Clickable = createComponent({
  as: "button",
  memo: true,
  useHook: useClickable,
});
