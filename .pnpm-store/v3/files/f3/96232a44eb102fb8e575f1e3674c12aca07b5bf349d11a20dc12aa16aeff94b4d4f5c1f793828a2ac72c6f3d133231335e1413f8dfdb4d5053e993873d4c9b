import * as React from "react";
import { As } from "reakit-utils/types";
import { isRenderProp } from "./__utils/isRenderProp";
import { SystemContext } from "./SystemContext";

/**
 * Custom hook that will call `children` if it's a function. If
 * `useCreateElement` has been passed to the context, it'll be used instead.
 *
 * @example
 * import React from "react";
 * import { SystemProvider, useCreateElement } from "reakit-system";
 *
 * const system = {
 *   useCreateElement(type, props, children = props.children) {
 *     // very similar to what `useCreateElement` does already
 *     if (typeof children === "function") {
 *       const { children: _, ...rest } = props;
 *       return children(rest);
 *     }
 *     return React.createElement(type, props, children);
 *   },
 * };
 *
 * function Component(props) {
 *   return useCreateElement("div", props);
 * }
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <Component url="url">{({ url }) => <a href={url}>link</a>}</Component>
 *     </SystemProvider>
 *   );
 * }
 */
export const useCreateElement = <T extends As>(
  type: T,
  props: Record<string, any>,
  children: React.ReactNode = props.children
): JSX.Element => {
  const context = React.useContext(SystemContext);

  if (context.useCreateElement) {
    return context.useCreateElement(type, props, children);
  }

  if (typeof type === "string" && isRenderProp(children)) {
    const { children: _, ...rest } = props;
    return children(rest);
  }

  return React.createElement(type, props, children);
};
