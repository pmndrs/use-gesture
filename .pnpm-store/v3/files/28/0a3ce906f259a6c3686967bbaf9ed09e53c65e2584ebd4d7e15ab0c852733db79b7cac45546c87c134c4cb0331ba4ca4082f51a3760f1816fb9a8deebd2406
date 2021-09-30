import { useWarning } from "reakit-warning";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { createHook } from "reakit-system/createHook";
import {
  CompositeOptions,
  CompositeHTMLProps,
  useComposite,
} from "../Composite/Composite";
import { TabStateReturn } from "./TabState";
import { TAB_LIST_KEYS } from "./__keys";

export type TabListOptions = CompositeOptions &
  Pick<Partial<TabStateReturn>, "orientation">;

export type TabListHTMLProps = CompositeHTMLProps;

export type TabListProps = TabListOptions & TabListHTMLProps;

export const useTabList = createHook<TabListOptions, TabListHTMLProps>({
  name: "TabList",
  compose: useComposite,
  keys: TAB_LIST_KEYS,

  useProps(options, htmlProps) {
    return {
      role: "tablist",
      "aria-orientation": options.orientation,
      ...htmlProps,
    };
  },
});

export const TabList = createComponent({
  as: "div",
  useHook: useTabList,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/tab"
    );
    return useCreateElement(type, props, children);
  },
});
