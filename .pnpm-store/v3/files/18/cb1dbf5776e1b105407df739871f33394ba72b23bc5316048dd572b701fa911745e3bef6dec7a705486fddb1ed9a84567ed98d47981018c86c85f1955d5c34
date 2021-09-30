import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { shallowEqual } from "reakit-utils/shallowEqual";
import { BOX_KEYS } from "./__keys";

export type BoxOptions = {
  /**
   * Options passed to `reakit-system-*`
   * @private
   */
  unstable_system?: any;
};

export type BoxHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any> & {
    /**
     * Function returned by the hook to wrap the element to which html props
     * will be passed.
     */
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
  };

export type BoxProps = BoxOptions & BoxHTMLProps;

export const useBox = createHook<BoxOptions, BoxHTMLProps>({
  name: "Box",
  keys: BOX_KEYS,
  propsAreEqual(prev, next) {
    const { unstable_system: prevSystem, ...prevProps } = prev;
    const { unstable_system: nextSystem, ...nextProps } = next;
    if (prevSystem !== nextSystem && !shallowEqual(prevSystem, nextSystem)) {
      return false;
    }
    return shallowEqual(prevProps, nextProps);
  },
});

export const Box = createComponent({
  as: "div",
  useHook: useBox,
});
