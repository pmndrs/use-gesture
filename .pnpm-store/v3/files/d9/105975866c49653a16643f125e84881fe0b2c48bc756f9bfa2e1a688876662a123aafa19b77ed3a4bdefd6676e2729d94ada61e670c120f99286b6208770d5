'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./SystemContext.js');
var useToken = require('./useToken.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');

/**
 * React custom hook that returns the options returned by a given
 * `use${name}Options` in the SystemContext.
 *
 * @example
 * import React from "react";
 * import { SystemProvider, useOptions } from "reakit-system";
 *
 * const system = {
 *   useAOptions(options, htmlProps) {
 *     return {
 *       ...options,
 *       url: htmlProps.href,
 *     };
 *   },
 * };
 *
 * function A({ url, ...htmlProps }) {
 *   const options = useOptions("A", { url }, htmlProps);
 *   return <a href={options.url} {...htmlProps} />;
 * }
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <A href="url">
 *         It will convert href into url in useAOptions and then url into href in A
 *       </A>
 *     </SystemProvider>
 *   );
 * }
 */

function useOptions(name, options, htmlProps) {
  if (options === void 0) {
    options = {};
  }

  if (htmlProps === void 0) {
    htmlProps = {};
  }

  var hookName = "use" + name + "Options";
  React.useDebugValue(hookName);
  var useHook = useToken.useToken(hookName);

  if (useHook) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), useHook(options, htmlProps));
  }

  return options;
}

exports.useOptions = useOptions;
