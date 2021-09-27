import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { ArrayValue, As, PropsWithAs } from "reakit-utils/types";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { getDocument } from "reakit-utils/getDocument";
import { ButtonOptions, ButtonHTMLProps, useButton } from "../Button/Button";
import { unstable_FormStateReturn } from "./FormState";
import { unstable_getIn } from "./utils/getIn";
import { formatInputName } from "./__utils/formatInputName";
import { getInputId } from "./__utils/getInputId";
import { getPushButtonId } from "./__utils/getPushButtonId";
import { DeepPath, DeepPathValue } from "./__utils/types";
import { FORM_PUSH_BUTTON_KEYS } from "./__keys";

export type unstable_FormPushButtonOptions<
  V,
  P extends DeepPath<V, P>
> = ButtonOptions &
  Pick<unstable_FormStateReturn<V>, "baseId" | "values" | "push"> & {
    /**
     * FormInput's name as in form values. This should point to array value.
     */
    name: P;
    /**
     * The value that is going to be pushed to `form.values[name]`.
     */
    value: ArrayValue<DeepPathValue<V, P>>;
  };

export type unstable_FormPushButtonHTMLProps = ButtonHTMLProps;

export type unstable_FormPushButtonProps<
  V,
  P extends DeepPath<V, P>
> = unstable_FormPushButtonOptions<V, P> & unstable_FormPushButtonHTMLProps;

export const unstable_useFormPushButton = createHook<
  unstable_FormPushButtonOptions<any, any>,
  unstable_FormPushButtonHTMLProps
>({
  name: "FormPushButton",
  compose: useButton,
  keys: FORM_PUSH_BUTTON_KEYS,

  useOptions(options, { name, value }) {
    return {
      ...options,
      name: options.name || name,
      value: options.value ?? value,
    };
  },

  useProps(options, { onClick: htmlOnClick, ...htmlProps }) {
    const onClickRef = useLiveRef(htmlOnClick);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;

        options.push?.(options.name, options.value);

        const { length } = unstable_getIn(options.values, options.name, []);
        const inputId = getInputId(
          `${formatInputName(options.name, "-")}-${length}`,
          options.baseId
        );

        if (!inputId) return;
        const element = event.currentTarget;

        window.requestAnimationFrame(() => {
          const selector = `[id^="${inputId}"]`;
          const document = getDocument(element);
          const input = document.querySelector<HTMLElement>(selector);
          input?.focus();
        });
      },
      [
        options.push,
        options.name,
        options.value,
        options.values,
        options.baseId,
      ]
    );

    return {
      id: getPushButtonId(options.name, options.baseId),
      onClick,
      ...htmlProps,
    };
  },
}) as <V, P extends DeepPath<V, P>>(
  options: unstable_FormPushButtonOptions<V, P>,
  htmlProps?: unstable_FormPushButtonHTMLProps
) => unstable_FormPushButtonHTMLProps;

export const unstable_FormPushButton = (createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormPushButton,
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "button">(
  props: PropsWithAs<unstable_FormPushButtonOptions<V, P>, T>
) => JSX.Element;
