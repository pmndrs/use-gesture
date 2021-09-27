'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var SystemContext = require('./SystemContext.js');

/**
 * React custom hook that returns the value of any token defined in the
 * SystemContext. It's mainly used internally in [`useOptions`](#useoptions)
 * and [`useProps`](#useprops).
 *
 * @example
 * import { SystemProvider, useToken } from "reakit-system";
 *
 * const system = {
 *   token: "value",
 * };
 *
 * function Component(props) {
 *   const token = useToken("token", "default value");
 *   return <div {...props}>{token}</div>;
 * }
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <Component />
 *     </SystemProvider>
 *   );
 * }
 */

function useToken(token, defaultValue) {
  React.useDebugValue(token);
  var context = React.useContext(SystemContext.SystemContext);
  return context[token] != null ? context[token] : defaultValue;
}

exports.useToken = useToken;
