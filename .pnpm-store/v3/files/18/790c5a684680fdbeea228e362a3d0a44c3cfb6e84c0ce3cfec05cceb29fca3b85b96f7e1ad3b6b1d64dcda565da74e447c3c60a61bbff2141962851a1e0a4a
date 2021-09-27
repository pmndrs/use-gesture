import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { GROUP_KEYS } from "./__keys";

export type GroupOptions = RoleOptions;

export type GroupHTMLProps = RoleHTMLProps;

export type GroupProps = GroupOptions & GroupHTMLProps;

export const useGroup = createHook<GroupOptions, GroupHTMLProps>({
  name: "Group",
  compose: useRole,
  keys: GROUP_KEYS,

  useProps(_, htmlProps) {
    return { role: "group", ...htmlProps };
  },
});

export const Group = createComponent({
  as: "div",
  useHook: useGroup,
});
