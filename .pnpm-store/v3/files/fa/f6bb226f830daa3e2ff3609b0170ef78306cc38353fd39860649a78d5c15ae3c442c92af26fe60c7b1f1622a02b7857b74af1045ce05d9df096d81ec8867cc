import { useWarning } from "reakit-warning";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { createHook } from "reakit-system/createHook";
import {
  CompositeOptions,
  CompositeHTMLProps,
  useComposite,
} from "../Composite/Composite";
import { GRID_KEYS } from "./__keys";

export type unstable_GridOptions = CompositeOptions;

export type unstable_GridHTMLProps = CompositeHTMLProps;

export type unstable_GridProps = unstable_GridOptions & unstable_GridHTMLProps;

export const unstable_useGrid = createHook<
  unstable_GridOptions,
  unstable_GridHTMLProps
>({
  name: "Grid",
  compose: useComposite,
  keys: GRID_KEYS,

  useProps(_, htmlProps) {
    return { role: "grid", ...htmlProps };
  },
});

export const unstable_Grid = createComponent({
  as: "div",
  useHook: unstable_useGrid,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/grid"
    );
    return useCreateElement(type, props, children);
  },
});
