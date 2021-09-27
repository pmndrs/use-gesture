import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { RoleHTMLProps } from "../Role/Role";
import { unstable_IdStateReturn } from "./IdState";
import { unstable_IdContext } from "./IdProvider";
import { ID_KEYS } from "./__keys";

export type unstable_IdOptions = Pick<
  Partial<unstable_IdStateReturn>,
  "baseId" | "unstable_idCountRef"
> & {
  /**
   * Same as the HTML attribute.
   */
  id?: string;
};

export type unstable_IdHTMLProps = RoleHTMLProps;

export type unstable_IdProps = unstable_IdOptions & unstable_IdHTMLProps;

export const unstable_useId = createHook<
  unstable_IdOptions,
  unstable_IdHTMLProps
>({
  keys: ID_KEYS,

  useOptions(options, htmlProps) {
    const generateId = React.useContext(unstable_IdContext);

    const [suffix] = React.useState(() => {
      // This comes from useIdState
      if (options.unstable_idCountRef) {
        options.unstable_idCountRef.current += 1;
        return `-${options.unstable_idCountRef.current}`;
      }
      // If there's no useIdState, we check if `baseId` was passed (as a prop,
      // not from useIdState).
      if (options.baseId) {
        return `-${generateId("")}`;
      }
      return "";
    });

    // `baseId` will be the prop passed directly as a prop or via useIdState.
    // If there's neither, then it'll fallback to Context's generateId.
    // This generateId can result in a sequential ID (if there's a Provider)
    // or a random string (without Provider).
    const baseId = React.useMemo(() => options.baseId || generateId(), [
      options.baseId,
      generateId,
    ]);

    const id = htmlProps.id || options.id || `${baseId}${suffix}`;

    return { ...options, id };
  },

  useProps(options, htmlProps) {
    return { id: options.id, ...htmlProps };
  },
});

export const unstable_Id = createComponent({
  as: "div",
  useHook: unstable_useId,
});
