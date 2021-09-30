import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  TabbableOptions,
  TabbableHTMLProps,
  useTabbable,
} from "../Tabbable/Tabbable";
import { INPUT_KEYS } from "./__keys";

export type InputOptions = TabbableOptions;

export type InputHTMLProps = TabbableHTMLProps & React.InputHTMLAttributes<any>;

export type InputProps = InputOptions & InputHTMLProps;

export const useInput = createHook<InputOptions, InputHTMLProps>({
  name: "Input",
  compose: useTabbable,
  keys: INPUT_KEYS,
});

export const Input = createComponent({
  as: "input",
  memo: true,
  useHook: useInput,
});
