import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useWarning } from "reakit-warning";
import { useCreateElement } from "reakit-system/useCreateElement";
import { BoxOptions, BoxHTMLProps, useBox } from "../Box/Box";
import { getMenuId } from "./__utils/getMenuId";
import { unstable_ComboboxStateReturn } from "./ComboboxState";
import { COMBOBOX_LIST_KEYS } from "./__keys";

export const unstable_useComboboxList = createHook<
  unstable_ComboboxListOptions,
  unstable_ComboboxListHTMLProps
>({
  name: "ComboboxList",
  compose: useBox,
  keys: COMBOBOX_LIST_KEYS,

  useOptions({ menuRole = "listbox", ...options }) {
    return { menuRole, ...options };
  },

  useProps(options, htmlProps) {
    return {
      role: options.menuRole,
      id: getMenuId(options.baseId),
      ...htmlProps,
    };
  },
});

export const unstable_ComboboxList = createComponent({
  as: "div",
  useHook: unstable_useComboboxList,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/combobox"
    );
    return useCreateElement(type, props, children);
  },
});

export type unstable_ComboboxListOptions = BoxOptions &
  Pick<Partial<unstable_ComboboxStateReturn>, "menuRole"> &
  Pick<unstable_ComboboxStateReturn, "baseId">;

export type unstable_ComboboxListHTMLProps = BoxHTMLProps;

export type unstable_ComboboxListProps = unstable_ComboboxListOptions &
  unstable_ComboboxListHTMLProps;
