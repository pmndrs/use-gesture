import { useContext, createElement } from 'react';
import { SystemContext } from './SystemContext.js';
import { a as _objectWithoutPropertiesLoose } from './_rollupPluginBabelHelpers-0c84a174.js';

function isRenderProp(children) {
  return typeof children === "function";
}

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

var useCreateElement = function useCreateElement(type, props, children) {
  if (children === void 0) {
    children = props.children;
  }

  var context = useContext(SystemContext);

  if (context.useCreateElement) {
    return context.useCreateElement(type, props, children);
  }

  if (typeof type === "string" && isRenderProp(children)) {
    var _ = props.children,
        rest = _objectWithoutPropertiesLoose(props, ["children"]);

    return children(rest);
  }

  return /*#__PURE__*/createElement(type, props, children);
};

export { useCreateElement };
