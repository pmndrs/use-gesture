import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { removeIndexFromArray } from "reakit-utils/removeIndexFromArray";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { createEvent } from "reakit-utils/createEvent";
import { warning } from "reakit-warning";
import { useLiveRef } from "reakit-utils/useLiveRef";
import {
  ClickableOptions,
  ClickableHTMLProps,
  useClickable,
} from "../Clickable/Clickable";
import { CheckboxStateReturn } from "./CheckboxState";
import { CHECKBOX_KEYS } from "./__keys";

export type CheckboxOptions = ClickableOptions &
  Pick<Partial<CheckboxStateReturn>, "state" | "setState"> & {
    /**
     * Checkbox's value is going to be used when multiple checkboxes share the
     * same state. Checking a checkbox with value will add it to the state
     * array.
     */
    value?: string | number;
    /**
     * Checkbox's checked state. If present, it's used instead of `state`.
     */
    checked?: boolean;
  };

export type CheckboxHTMLProps = ClickableHTMLProps &
  React.InputHTMLAttributes<any> & {
    value?: string | number;
  };

export type CheckboxProps = CheckboxOptions & CheckboxHTMLProps;

function getChecked(options: CheckboxOptions) {
  if (typeof options.checked !== "undefined") {
    return options.checked;
  }
  if (typeof options.value === "undefined") {
    return !!options.state;
  }
  const state = Array.isArray(options.state) ? options.state : [];
  return state.indexOf(options.value) !== -1;
}

function fireChange(element: HTMLElement, onChange?: React.ChangeEventHandler) {
  const event = createEvent(element, "change");
  Object.defineProperties(event, {
    type: { value: "change" },
    target: { value: element },
    currentTarget: { value: element },
  });
  onChange?.(event as any);
}

function useIndeterminateState(
  ref: React.RefObject<HTMLInputElement>,
  options: CheckboxOptions
) {
  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      warning(
        options.state === "indeterminate",
        "Can't set indeterminate state because `ref` wasn't passed to component.",
        "See https://reakit.io/docs/checkbox/#indeterminate-state"
      );
      return;
    }

    if (options.state === "indeterminate") {
      element.indeterminate = true;
    } else if (element.indeterminate) {
      element.indeterminate = false;
    }
  }, [options.state, ref]);
}

export const useCheckbox = createHook<CheckboxOptions, CheckboxHTMLProps>({
  name: "Checkbox",
  compose: useClickable,
  keys: CHECKBOX_KEYS,

  useOptions(
    { unstable_clickOnEnter = false, ...options },
    { value, checked }
  ) {
    return {
      unstable_clickOnEnter,
      value,
      checked: getChecked({ checked, ...options }),
      ...options,
    };
  },

  useProps(
    options,
    { ref: htmlRef, onChange: htmlOnChange, onClick: htmlOnClick, ...htmlProps }
  ) {
    const ref = React.useRef<HTMLInputElement>(null);
    const [isNativeCheckbox, setIsNativeCheckbox] = React.useState(true);
    const onChangeRef = useLiveRef(htmlOnChange);
    const onClickRef = useLiveRef(htmlOnClick);

    React.useEffect(() => {
      const element = ref.current;
      if (!element) {
        warning(
          true,
          "Can't determine whether the element is a native checkbox because `ref` wasn't passed to the component",
          "See https://reakit.io/docs/checkbox"
        );
        return;
      }
      if (element.tagName !== "INPUT" || element.type !== "checkbox") {
        setIsNativeCheckbox(false);
      }
    }, []);

    useIndeterminateState(ref, options);

    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const element = event.currentTarget;

        if (options.disabled) {
          event.stopPropagation();
          event.preventDefault();
          return;
        }

        if (onChangeRef.current) {
          // If component is NOT rendered as a native input, it will not have
          // the `checked` property. So we assign it for consistency.
          if (!isNativeCheckbox) {
            element.checked = !element.checked;
          }
          onChangeRef.current(event);
        }

        if (!options.setState) return;

        if (typeof options.value === "undefined") {
          options.setState(!options.checked);
        } else {
          const state = Array.isArray(options.state) ? options.state : [];
          const index = state.indexOf(options.value);
          if (index === -1) {
            options.setState([...state, options.value]);
          } else {
            options.setState(removeIndexFromArray(state, index));
          }
        }
      },
      [
        options.disabled,
        isNativeCheckbox,
        options.setState,
        options.value,
        options.checked,
        options.state,
      ]
    );

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        if (isNativeCheckbox) return;
        fireChange(event.currentTarget, onChange);
      },
      [isNativeCheckbox, onChange]
    );

    return {
      ref: useForkRef(ref, htmlRef),
      role: !isNativeCheckbox ? "checkbox" : undefined,
      type: isNativeCheckbox ? "checkbox" : undefined,
      value: isNativeCheckbox ? options.value : undefined,
      checked: options.checked,
      "aria-checked":
        options.state === "indeterminate" ? "mixed" : options.checked,
      onChange,
      onClick,
      ...htmlProps,
    };
  },
});

export const Checkbox = createComponent({
  as: "input",
  memo: true,
  useHook: useCheckbox,
});
