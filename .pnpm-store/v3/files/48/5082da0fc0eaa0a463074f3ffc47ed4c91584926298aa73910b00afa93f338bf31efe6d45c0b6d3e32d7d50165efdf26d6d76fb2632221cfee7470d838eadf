import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { shallowEqual } from "reakit-utils/shallowEqual";
import { ROLE_KEYS } from "./__keys";

export type RoleOptions = {
  /**
   * Options passed to `reakit-system-*`
   * @private
   */
  unstable_system?: any;
};

export type RoleHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any> & {
    /**
     * Function returned by the hook to wrap the element to which html props
     * will be passed.
     */
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
  };

export type RoleProps = RoleOptions & RoleHTMLProps;

export const useRole = createHook<RoleOptions, RoleHTMLProps>({
  name: "Role",
  keys: ROLE_KEYS,
  propsAreEqual(prev, next) {
    const { unstable_system: prevSystem, ...prevProps } = prev;
    const { unstable_system: nextSystem, ...nextProps } = next;
    if (prevSystem !== nextSystem && !shallowEqual(prevSystem, nextSystem)) {
      return false;
    }
    return shallowEqual(prevProps, nextProps);
  },
});

export const Role = createComponent({
  as: "div",
  useHook: useRole,
});
