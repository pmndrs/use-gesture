import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { isTextField } from "reakit-utils/isTextField";
import { getDocument } from "reakit-utils/getDocument";
import { isSelfTarget } from "reakit-utils/isSelfTarget";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { useRole, RoleOptions, RoleHTMLProps } from "../Role/Role";
import { CompositeStateReturn } from "./CompositeState";
import { setTextFieldValue } from "./__utils/setTextFieldValue";
import { COMPOSITE_ITEM_WIDGET_KEYS } from "./__keys";

export type unstable_CompositeItemWidgetOptions = RoleOptions &
  Pick<Partial<CompositeStateReturn>, "wrap"> &
  Pick<
    CompositeStateReturn,
    "unstable_hasActiveWidget" | "unstable_setHasActiveWidget" | "currentId"
  >;

export type unstable_CompositeItemWidgetHTMLProps = RoleHTMLProps;

export type unstable_CompositeItemWidgetProps = unstable_CompositeItemWidgetOptions &
  unstable_CompositeItemWidgetHTMLProps;

function focusCurrentItem(widget: Element, currentId?: string | null) {
  if (currentId) {
    getDocument(widget).getElementById(currentId)?.focus();
  }
}

function getTextFieldValue(element: HTMLElement) {
  return (element as HTMLInputElement).value;
}

export const unstable_useCompositeItemWidget = createHook<
  unstable_CompositeItemWidgetOptions,
  unstable_CompositeItemWidgetHTMLProps
>({
  name: "CompositeItemWidget",
  compose: useRole,
  keys: COMPOSITE_ITEM_WIDGET_KEYS,

  useProps(
    options,
    {
      onFocus: htmlOnFocus,
      onBlur: htmlOnBlur,
      onKeyDown: htmlOnKeyDown,
      ...htmlProps
    }
  ) {
    const initialValue = React.useRef("");
    const onFocusRef = useLiveRef(htmlOnFocus);
    const onBlurRef = useLiveRef(htmlOnBlur);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);

    const onFocus = React.useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        onFocusRef.current?.(event);
        options.unstable_setHasActiveWidget?.(true);
        if (isTextField(event.currentTarget)) {
          initialValue.current = getTextFieldValue(event.currentTarget);
        }
      },
      [options.unstable_setHasActiveWidget]
    );

    const onBlur = React.useCallback(
      (event: React.FocusEvent) => {
        onBlurRef.current?.(event);
        options.unstable_setHasActiveWidget?.(false);
      },
      [options.unstable_setHasActiveWidget]
    );

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;
        if (!isSelfTarget(event)) return;
        if (event.nativeEvent.isComposing) return;
        const element = event.currentTarget;
        if (event.key === "Enter") {
          if (isTextField(element)) {
            const isMultilineTextField = element.tagName === "TEXTAREA";
            // Make sure we can create new lines using Shift+Enter
            if (isMultilineTextField && event.shiftKey) return;
            // Make sure it'll not trigger a click on the parent button
            event.preventDefault();
            focusCurrentItem(element, options.currentId);
          }
        } else if (event.key === "Escape") {
          focusCurrentItem(element, options.currentId);
          if (isTextField(element)) {
            setTextFieldValue(element, initialValue.current);
          }
        }
      },
      [options.currentId]
    );

    return {
      tabIndex: options.unstable_hasActiveWidget ? 0 : -1,
      "data-composite-item-widget": true,
      onFocus,
      onBlur,
      onKeyDown,
      ...htmlProps,
    };
  },
});

export const unstable_CompositeItemWidget = createComponent({
  as: "div",
  useHook: unstable_useCompositeItemWidget,
});
