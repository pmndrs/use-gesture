import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { isSelfTarget } from "reakit-utils/isSelfTarget";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { DisclosureStateReturn } from "./DisclosureState";
import { DISCLOSURE_CONTENT_KEYS } from "./__keys";

export type DisclosureContentOptions = RoleOptions &
  Pick<
    Partial<DisclosureStateReturn>,
    "baseId" | "visible" | "animating" | "animated" | "stopAnimation"
  >;

export type DisclosureContentHTMLProps = RoleHTMLProps;

export type DisclosureContentProps = DisclosureContentOptions &
  DisclosureContentHTMLProps;

type TransitionState = "enter" | "leave" | null;

export const useDisclosureContent = createHook<
  DisclosureContentOptions,
  DisclosureContentHTMLProps
>({
  name: "DisclosureContent",
  compose: useRole,
  keys: DISCLOSURE_CONTENT_KEYS,

  useProps(
    options,
    {
      onTransitionEnd: htmlOnTransitionEnd,
      onAnimationEnd: htmlOnAnimationEnd,
      style: htmlStyle,
      ...htmlProps
    }
  ) {
    const animating = options.animated && options.animating;
    const [transition, setTransition] = React.useState<TransitionState>(null);
    const hidden = !options.visible && !animating;
    const style = hidden ? { display: "none", ...htmlStyle } : htmlStyle;
    const onTransitionEndRef = useLiveRef(htmlOnTransitionEnd);
    const onAnimationEndRef = useLiveRef(htmlOnAnimationEnd);
    const raf = React.useRef(0);

    React.useEffect(() => {
      if (!options.animated) return undefined;
      // Double RAF is needed so the browser has enough time to paint the
      // default styles before processing the `data-enter` attribute. Otherwise
      // it wouldn't be considered a transition.
      // See https://github.com/reakit/reakit/issues/643
      raf.current = window.requestAnimationFrame(() => {
        raf.current = window.requestAnimationFrame(() => {
          if (options.visible) {
            setTransition("enter");
          } else if (animating) {
            setTransition("leave");
          } else {
            setTransition(null);
          }
        });
      });
      return () => window.cancelAnimationFrame(raf.current);
    }, [options.animated, options.visible, animating]);

    const onEnd = React.useCallback(
      (event: React.SyntheticEvent) => {
        if (!isSelfTarget(event)) return;
        if (!animating) return;
        // Ignores number animated
        if (options.animated === true) {
          options.stopAnimation?.();
        }
      },
      [options.animated, animating, options.stopAnimation]
    );

    const onTransitionEnd = React.useCallback(
      (event: React.TransitionEvent) => {
        onTransitionEndRef.current?.(event);
        onEnd(event);
      },
      [onEnd]
    );

    const onAnimationEnd = React.useCallback(
      (event: React.AnimationEvent) => {
        onAnimationEndRef.current?.(event);
        onEnd(event);
      },
      [onEnd]
    );

    return {
      id: options.baseId,
      "data-enter": transition === "enter" ? "" : undefined,
      "data-leave": transition === "leave" ? "" : undefined,
      onTransitionEnd,
      onAnimationEnd,
      hidden,
      style,
      ...htmlProps,
    };
  },
});

export const DisclosureContent = createComponent({
  as: "div",
  useHook: useDisclosureContent,
});
