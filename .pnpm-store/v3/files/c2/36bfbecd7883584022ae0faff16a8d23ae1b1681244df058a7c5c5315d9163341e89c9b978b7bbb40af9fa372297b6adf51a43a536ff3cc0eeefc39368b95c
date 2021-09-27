'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var SystemContext = require('./SystemContext.js');

/**
 * Provider component that is used by `reakit`'s `Provider` underneath.
 *
 * @example
 * // instead of using
 * import { Provider } from "reakit";
 * // you can use this
 * import { SystemProvider } from "reakit-system";
 * // reakit's Provider has more features, such as ID generation
 * import * as system from "reakit-system-bootstrap";
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <div>App</div>
 *     </SystemProvider>
 *   );
 * }
 *
 * @param props
 */
function SystemProvider(_ref) {
  var children = _ref.children,
      system = _ref.unstable_system;
  return /*#__PURE__*/React.createElement(SystemContext.SystemContext.Provider, {
    value: system
  }, children);
}

exports.SystemProvider = SystemProvider;
