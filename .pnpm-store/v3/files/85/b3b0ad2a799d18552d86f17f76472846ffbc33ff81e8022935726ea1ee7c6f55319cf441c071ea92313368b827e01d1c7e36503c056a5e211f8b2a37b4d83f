import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { useForkRef } from "reakit-utils/useForkRef";
import { createEvent } from "reakit-utils/createEvent";
import { warning } from "reakit-warning/warning";
import {
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "../Composite/CompositeItem";
import { RadioStateReturn } from "./RadioState";
import { RADIO_KEYS } from "./__keys";

export type RadioOptions = CompositeItemOptions &
  Pick<Partial<RadioStateReturn>, "state" | "setState"> & {
    /**
     * Same as the `value` attribute.
     */
    value: string | number;
    /**
     * Same as the `checked` attribute.
     */
    checked?: boolean;
    /**
     * @private
     */
    unstable_checkOnFocus?: boolean;
  };

export type RadioHTMLProps = CompositeItemHTMLProps &
  React.InputHTMLAttributes<any>;

export type RadioProps = RadioOptions & RadioHTMLProps;

function getChecked(options: RadioOptions) {
  if (typeof options.checked !== "undefined") {
    return options.checked;
  }
  return (
    typeof options.value !== "undefined" && options.state === options.value
  );
}

function useInitialChecked(options: RadioOptions) {
  const [initialChecked] = React.useState(() => getChecked(options));
  const [initialCurrentId] = React.useState(options.currentId);
  const { id, setCurrentId } = options;

  React.useEffect(() => {
    if (initialChecked && id && initialCurrentId !== id) {
      setCurrentId?.(id);
    }
  }, [initialChecked, id, setCurrentId, initialCurrentId]);
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

export const useRadio = createHook<RadioOptions, RadioHTMLProps>({
  name: "Radio",
  compose: useCompositeItem,
  keys: RADIO_KEYS,

  useOptions(
    { unstable_clickOnEnter = false, unstable_checkOnFocus = true, ...options },
    { value, checked }
  ) {
    return {
      checked,
      unstable_clickOnEnter,
      unstable_checkOnFocus,
      ...options,
      value: options.value ?? value,
    };
  },

  useProps(
    options,
    { ref: htmlRef, onChange: htmlOnChange, onClick: htmlOnClick, ...htmlProps }
  ) {
    const ref = React.useRef<HTMLInputElement>(null);
    const [isNativeRadio, setIsNativeRadio] = React.useState(true);
    const checked = getChecked(options);
    const isCurrentItemRef = useLiveRef(options.currentId === options.id);
    const onChangeRef = useLiveRef(htmlOnChange);
    const onClickRef = useLiveRef(htmlOnClick);

    useInitialChecked(options);

    React.useEffect(() => {
      const element = ref.current;
      if (!element) {
        warning(
          true,
          "Can't determine whether the element is a native radio because `ref` wasn't passed to the component",
          "See https://reakit.io/docs/radio"
        );
        return;
      }
      if (element.tagName !== "INPUT" || element.type !== "radio") {
        setIsNativeRadio(false);
      }
    }, []);

    const onChange = React.useCallback(
      (event: React.ChangeEvent) => {
        onChangeRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.disabled) return;
        options.setState?.(options.value);
      },
      [options.disabled, options.setState, options.value]
    );

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        if (isNativeRadio) return;
        fireChange(event.currentTarget, onChange);
      },
      [onChange, isNativeRadio]
    );

    React.useEffect(() => {
      const element = ref.current;
      if (!element) return;
      if (
        options.unstable_moves &&
        isCurrentItemRef.current &&
        options.unstable_checkOnFocus
      ) {
        fireChange(element, onChange);
      }
    }, [options.unstable_moves, options.unstable_checkOnFocus, onChange]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: !isNativeRadio ? "radio" : undefined,
      type: isNativeRadio ? "radio" : undefined,
      value: isNativeRadio ? options.value : undefined,
      name: isNativeRadio ? options.baseId : undefined,
      "aria-checked": checked,
      checked,
      onChange,
      onClick,
      ...htmlProps,
    };
  },
});

export const Radio = createComponent({
  as: "input",
  memo: true,
  useHook: useRadio,
});
