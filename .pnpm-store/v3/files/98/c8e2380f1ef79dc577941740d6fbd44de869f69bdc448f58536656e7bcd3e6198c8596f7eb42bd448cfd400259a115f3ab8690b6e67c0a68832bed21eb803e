import * as React from "react";
import { As, PropsWithAs, ArrayValue } from "reakit-utils/types";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useLiveRef } from "reakit-utils/useLiveRef";
import {
  CheckboxOptions,
  CheckboxHTMLProps,
  useCheckbox,
} from "../Checkbox/Checkbox";
import { DeepPath, DeepPathValue } from "./__utils/types";
import { getInputId } from "./__utils/getInputId";
import { getLabelId } from "./__utils/getLabelId";
import { unstable_FormStateReturn } from "./FormState";
import { unstable_getIn } from "./utils/getIn";
import { formatInputName } from "./__utils/formatInputName";
import { getMessageId } from "./__utils/getMessageId";
import { shouldShowError } from "./__utils/shouldShowError";
import { FORM_CHECKBOX_KEYS } from "./__keys";

export type unstable_FormCheckboxOptions<V, P extends DeepPath<V, P>> = Omit<
  CheckboxOptions,
  "value" | "state" | "setState"
> &
  Pick<
    unstable_FormStateReturn<V>,
    "baseId" | "values" | "update" | "blur" | "touched" | "errors"
  > & {
    /**
     * Checkbox's name as in form values.
     */
    name: P;
    /**
     * Checkbox's value is going to be used when multiple checkboxes share the
     * same state. Checking a checkbox with value will add it to the state
     * array.
     */
    value?: ArrayValue<DeepPathValue<V, P>>;
  };

export type unstable_FormCheckboxHTMLProps = CheckboxHTMLProps &
  React.InputHTMLAttributes<any>;

export type unstable_FormCheckboxProps<
  V,
  P extends DeepPath<V, P>
> = unstable_FormCheckboxOptions<V, P> & unstable_FormCheckboxHTMLProps;

export const unstable_useFormCheckbox = createHook<
  unstable_FormCheckboxOptions<any, any>,
  unstable_FormCheckboxHTMLProps
>({
  name: "FormCheckbox",
  compose: useCheckbox,
  keys: FORM_CHECKBOX_KEYS,

  useOptions(options, htmlProps) {
    const name = options.name || htmlProps.name;
    const value =
      typeof options.value !== "undefined" ? options.value : htmlProps.value;
    const state = unstable_getIn(options.values, name);
    const setState = (val: any) => options.update(name, val);
    return { ...options, state, setState, name, value };
  },

  useProps(options, { onBlur: htmlOnBlur, ...htmlProps }) {
    const onBlurRef = useLiveRef(htmlOnBlur);
    const isBoolean = typeof options.value === "undefined";

    const onBlur = React.useCallback(
      (event: React.FocusEvent) => {
        onBlurRef.current?.(event);
        if (event.defaultPrevented) return;
        options.blur?.(options.name);
      },
      [options.blur, options.name]
    );

    return {
      "aria-invalid": shouldShowError(options, options.name),
      name: formatInputName(options.name),
      onBlur,
      ...(isBoolean
        ? {
            id: getInputId(options.name, options.baseId),
            "aria-describedby": getMessageId(options.name, options.baseId),
            "aria-labelledby": getLabelId(options.name, options.baseId),
          }
        : {}),
      ...htmlProps,
    };
  },
}) as <V, P extends DeepPath<V, P>>(
  options: unstable_FormCheckboxOptions<V, P>,
  htmlProps?: unstable_FormCheckboxHTMLProps
) => unstable_FormCheckboxHTMLProps;

export const unstable_FormCheckbox = (createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useFormCheckbox,
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "input">(
  props: PropsWithAs<unstable_FormCheckboxOptions<V, P>, T>
) => JSX.Element;
