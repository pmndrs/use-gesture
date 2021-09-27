import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { VISUALLY_HIDDEN_KEYS } from "./__keys";

export type VisuallyHiddenOptions = RoleOptions;

export type VisuallyHiddenHTMLProps = RoleHTMLProps;

export type VisuallyHiddenProps = VisuallyHiddenOptions &
  VisuallyHiddenHTMLProps;

export const useVisuallyHidden = createHook<
  VisuallyHiddenOptions,
  VisuallyHiddenHTMLProps
>({
  name: "VisuallyHidden",
  compose: useRole,
  keys: VISUALLY_HIDDEN_KEYS,

  useProps(_, { style: htmlStyle, ...htmlProps }) {
    return {
      style: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px",
        ...htmlStyle,
      },
      ...htmlProps,
    };
  },
});

export const VisuallyHidden = createComponent({
  as: "span",
  memo: true,
  useHook: useVisuallyHidden,
});
