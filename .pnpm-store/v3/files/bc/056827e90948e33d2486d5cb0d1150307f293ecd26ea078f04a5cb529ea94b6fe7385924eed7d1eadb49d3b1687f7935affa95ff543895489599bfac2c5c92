import { useWarning } from "reakit-warning";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { createHook } from "reakit-system/createHook";
import {
  CompositeOptions,
  CompositeHTMLProps,
  useComposite,
} from "../Composite/Composite";
import { ToolbarStateReturn } from "./ToolbarState";
import { TOOLBAR_KEYS } from "./__keys";

export type ToolbarOptions = CompositeOptions &
  Pick<Partial<ToolbarStateReturn>, "orientation">;

export type ToolbarHTMLProps = CompositeHTMLProps;

export type ToolbarProps = ToolbarOptions & ToolbarHTMLProps;

export const useToolbar = createHook<ToolbarOptions, ToolbarHTMLProps>({
  name: "Toolbar",
  compose: useComposite,
  keys: TOOLBAR_KEYS,

  useProps(options, htmlProps) {
    return {
      role: "toolbar",
      "aria-orientation": options.orientation,
      ...htmlProps,
    };
  },
});

export const Toolbar = createComponent({
  as: "div",
  useHook: useToolbar,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/toolbar"
    );
    return useCreateElement(type, props, children);
  },
});
