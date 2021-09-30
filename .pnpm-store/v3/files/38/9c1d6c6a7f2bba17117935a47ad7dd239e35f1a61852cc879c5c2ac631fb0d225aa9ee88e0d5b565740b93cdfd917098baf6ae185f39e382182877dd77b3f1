'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./SystemContext.js');
var useToken = require('./useToken.js');

/**
 * React custom hook that returns the props returned by a given
 * `use${name}Props` in the SystemContext.
 *
 * @example
 * import { SystemProvider, useProps } from "reakit-system";
 *
 * const system = {
 *   useAProps(options, htmlProps) {
 *     return {
 *       ...htmlProps,
 *       href: options.url,
 *     };
 *   },
 * };
 *
 * function A({ url, ...htmlProps }) {
 *   const props = useProps("A", { url }, htmlProps);
 *   return <a {...props} />;
 * }
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <A url="url">It will convert url into href in useAProps</A>
 *     </SystemProvider>
 *   );
 * }
 */

function useProps(name, options, htmlProps) {
  if (options === void 0) {
    options = {};
  }

  if (htmlProps === void 0) {
    htmlProps = {};
  }

  var hookName = "use" + name + "Props";
  React.useDebugValue(hookName);
  var useHook = useToken.useToken(hookName);

  if (useHook) {
    return useHook(options, htmlProps);
  }

  return htmlProps;
}

exports.useProps = useProps;
