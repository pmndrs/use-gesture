import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { ButtonOptions, ButtonHTMLProps, useButton } from "../Button/Button";
import { unstable_FormStateReturn } from "./FormState";
import { getFirstInvalidInput } from "./__utils/getFirstInvalidInput";
import { FORM_SUBMIT_BUTTON_KEYS } from "./__keys";

export type unstable_FormSubmitButtonOptions = ButtonOptions &
  Pick<Partial<unstable_FormStateReturn<any>>, "submitting"> &
  Pick<unstable_FormStateReturn<any>, "baseId" | "submit">;

export type unstable_FormSubmitButtonHTMLProps = ButtonHTMLProps;

export type unstable_FormSubmitButtonProps = unstable_FormSubmitButtonOptions &
  unstable_FormSubmitButtonHTMLProps;

export const unstable_useFormSubmitButton = createHook<
  unstable_FormSubmitButtonOptions,
  unstable_FormSubmitButtonHTMLProps
>({
  name: "FormSubmitButton",
  compose: useButton,
  keys: FORM_SUBMIT_BUTTON_KEYS,

  useOptions(options) {
    return { disabled: options.submitting, ...options };
  },

  useProps(options, { onClick: htmlOnClick, ...htmlProps }) {
    const onClickRef = useLiveRef(htmlOnClick);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;

        const element = event.currentTarget;

        window.requestAnimationFrame(() => {
          const input = getFirstInvalidInput(options.baseId, element);
          input?.focus();
          if (input && "select" in input) {
            input.select();
          }
        });
      },
      [options.baseId]
    );

    return { type: "submit", onClick, ...htmlProps };
  },
});

export const unstable_FormSubmitButton = createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormSubmitButton,
});
