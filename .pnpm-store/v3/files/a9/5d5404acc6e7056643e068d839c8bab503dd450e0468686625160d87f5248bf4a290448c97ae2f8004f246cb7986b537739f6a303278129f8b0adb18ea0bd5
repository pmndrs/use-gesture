import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { createHook } from "reakit-system/createHook";
import { useWarning } from "reakit-warning";
import {
  CompositeOptions,
  CompositeHTMLProps,
  useComposite,
} from "../Composite/Composite";
import { RADIO_GROUP_KEYS } from "./__keys";

export type RadioGroupOptions = CompositeOptions;

export type RadioGroupHTMLProps = CompositeHTMLProps &
  React.FieldsetHTMLAttributes<any>;

export type RadioGroupProps = RadioGroupOptions & RadioGroupHTMLProps;

const useRadioGroup = createHook<RadioGroupOptions, RadioGroupHTMLProps>({
  name: "RadioGroup",
  compose: useComposite,
  keys: RADIO_GROUP_KEYS,

  useProps(_, htmlProps) {
    return { role: "radiogroup", ...htmlProps };
  },
});

export const RadioGroup = createComponent({
  as: "div",
  useHook: useRadioGroup,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/radio"
    );
    return useCreateElement(type, props, children);
  },
});
