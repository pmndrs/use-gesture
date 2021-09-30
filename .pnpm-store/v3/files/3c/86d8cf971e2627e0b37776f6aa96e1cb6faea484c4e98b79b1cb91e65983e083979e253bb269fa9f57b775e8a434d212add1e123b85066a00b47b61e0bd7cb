import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { useIsomorphicEffect } from "reakit-utils/useIsomorphicEffect";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { warning } from "reakit-warning";
import { hasFocusWithin } from "reakit-utils/hasFocusWithin";
import { isButton } from "reakit-utils/isButton";
import { isPortalEvent } from "reakit-utils/isPortalEvent";
import { isUA } from "reakit-utils/dom";
import { isFocusable } from "reakit-utils/tabbable";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { TABBABLE_KEYS } from "./__keys";

export type TabbableOptions = RoleOptions & {
  /**
   * Same as the HTML attribute.
   */
  disabled?: boolean;
  /**
   * When an element is `disabled`, it may still be `focusable`. It works
   * similarly to `readOnly` on form elements. In this case, only
   * `aria-disabled` will be set.
   */
  focusable?: boolean;
};

export type TabbableHTMLProps = RoleHTMLProps & {
  disabled?: boolean;
};

export type TabbableProps = TabbableOptions & TabbableHTMLProps;

const isSafariOrFirefoxOnMac =
  isUA("Mac") && !isUA("Chrome") && (isUA("Safari") || isUA("Firefox"));

function focusIfNeeded(element: HTMLElement) {
  if (!hasFocusWithin(element) && isFocusable(element)) {
    element.focus();
  }
}

function isNativeTabbable(element: Element) {
  return (
    element.tagName === "BUTTON" ||
    element.tagName === "INPUT" ||
    element.tagName === "SELECT" ||
    element.tagName === "TEXTAREA" ||
    element.tagName === "A"
  );
}

function supportsDisabledAttribute(element: Element) {
  return (
    element.tagName === "BUTTON" ||
    element.tagName === "INPUT" ||
    element.tagName === "SELECT" ||
    element.tagName === "TEXTAREA"
  );
}

function getTabIndex(
  trulyDisabled: boolean,
  nativeTabbable: boolean,
  supportsDisabled: boolean,
  htmlTabIndex?: number
) {
  if (trulyDisabled) {
    if (nativeTabbable && !supportsDisabled) {
      // Anchor, audio and video tags don't support the `disabled` attribute.
      // We must pass tabIndex={-1} so they don't receive focus on tab.
      return -1;
    }
    // Elements that support the `disabled` attribute don't need tabIndex.
    return undefined;
  }
  if (nativeTabbable) {
    // If the element is enabled and it's natively tabbable, we don't need to
    // specify a tabIndex attribute unless it's explicitly set by the user.
    return htmlTabIndex;
  }
  // If the element is enabled and is not natively tabbable, we have to
  // fallback tabIndex={0}.
  return htmlTabIndex || 0;
}

function useDisableEvent(
  htmlEventRef: React.RefObject<
    React.EventHandler<React.SyntheticEvent> | undefined
  >,
  disabled?: boolean
) {
  return React.useCallback(
    (event: React.SyntheticEvent) => {
      htmlEventRef.current?.(event);
      if (event.defaultPrevented) return;
      if (disabled) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    [htmlEventRef, disabled]
  );
}

export const useTabbable = createHook<TabbableOptions, TabbableHTMLProps>({
  name: "Tabbable",
  compose: useRole,
  keys: TABBABLE_KEYS,

  useOptions(options, { disabled }) {
    return { disabled, ...options };
  },

  useProps(
    options,
    {
      ref: htmlRef,
      tabIndex: htmlTabIndex,
      onClickCapture: htmlOnClickCapture,
      onMouseDownCapture: htmlOnMouseDownCapture,
      onMouseDown: htmlOnMouseDown,
      onKeyPressCapture: htmlOnKeyPressCapture,
      style: htmlStyle,
      ...htmlProps
    }
  ) {
    const ref = React.useRef<HTMLElement>(null);
    const onClickCaptureRef = useLiveRef(htmlOnClickCapture);
    const onMouseDownCaptureRef = useLiveRef(htmlOnMouseDownCapture);
    const onMouseDownRef = useLiveRef(htmlOnMouseDown);
    const onKeyPressCaptureRef = useLiveRef(htmlOnKeyPressCapture);
    const trulyDisabled = !!options.disabled && !options.focusable;
    const [nativeTabbable, setNativeTabbable] = React.useState(true);
    const [supportsDisabled, setSupportsDisabled] = React.useState(true);
    const style = options.disabled
      ? { pointerEvents: "none" as const, ...htmlStyle }
      : htmlStyle;

    useIsomorphicEffect(() => {
      const tabbable = ref.current;
      if (!tabbable) {
        warning(
          true,
          "Can't determine if the element is a native tabbable element because `ref` wasn't passed to the component.",
          "See https://reakit.io/docs/tabbable"
        );
        return;
      }
      if (!isNativeTabbable(tabbable)) {
        setNativeTabbable(false);
      }
      if (!supportsDisabledAttribute(tabbable)) {
        setSupportsDisabled(false);
      }
    }, []);

    const onClickCapture = useDisableEvent(onClickCaptureRef, options.disabled);

    const onMouseDownCapture = useDisableEvent(
      onMouseDownCaptureRef,
      options.disabled
    );

    const onKeyPressCapture = useDisableEvent(
      onKeyPressCaptureRef,
      options.disabled
    );

    const onMouseDown = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onMouseDownRef.current?.(event);
        const element = event.currentTarget;
        if (event.defaultPrevented) return;
        // Safari and Firefox on MacOS don't focus on buttons on mouse down
        // like other browsers/platforms. Instead, they focus on the closest
        // focusable ancestor element, which is ultimately the body element. So
        // we make sure to give focus to the tabbable element on mouse down so
        // it works consistently across browsers.
        if (!isSafariOrFirefoxOnMac) return;
        if (isPortalEvent(event)) return;
        if (!isButton(element)) return;
        // We can't focus right away after on mouse down, otherwise it would
        // prevent drag events from happening. So we schedule the focus to the
        // next animation frame.
        const raf = requestAnimationFrame(() => {
          element.removeEventListener("mouseup", focusImmediately, true);
          focusIfNeeded(element);
        });
        // If mouseUp happens before the next animation frame (which is common
        // on touch screens or by just tapping the trackpad on MacBook's), we
        // cancel the animation frame and immediately focus on the element.
        const focusImmediately = () => {
          cancelAnimationFrame(raf);
          focusIfNeeded(element);
        };
        // By listening to the event in the capture phase, we make sure the
        // focus event is fired before the onMouseUp and onMouseUpCapture React
        // events, which is aligned with the default browser behavior.
        element.addEventListener("mouseup", focusImmediately, {
          once: true,
          capture: true,
        });
      },
      []
    );

    return {
      ref: useForkRef(ref, htmlRef),
      style,
      tabIndex: getTabIndex(
        trulyDisabled,
        nativeTabbable,
        supportsDisabled,
        htmlTabIndex
      ),
      disabled: trulyDisabled && supportsDisabled ? true : undefined,
      "aria-disabled": options.disabled ? true : undefined,
      onClickCapture,
      onMouseDownCapture,
      onMouseDown,
      onKeyPressCapture,
      ...htmlProps,
    };
  },
});

export const Tabbable = createComponent({
  as: "div",
  useHook: useTabbable,
});
