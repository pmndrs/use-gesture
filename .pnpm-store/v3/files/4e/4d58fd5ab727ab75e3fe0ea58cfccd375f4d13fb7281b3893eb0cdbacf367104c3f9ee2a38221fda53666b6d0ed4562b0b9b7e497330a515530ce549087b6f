import { createElement } from 'react';
import { unstable_IdProvider } from './Id/IdProvider.js';
import { SystemProvider } from 'reakit-system/SystemProvider';

var defaultSystem = {};
function Provider(_ref) {
  var prefix = _ref.unstable_prefix,
      _ref$unstable_system = _ref.unstable_system,
      system = _ref$unstable_system === void 0 ? defaultSystem : _ref$unstable_system,
      children = _ref.children;
  return /*#__PURE__*/createElement(unstable_IdProvider, {
    prefix: prefix
  }, /*#__PURE__*/createElement(SystemProvider, {
    unstable_system: system
  }, children));
}

export { Provider };
