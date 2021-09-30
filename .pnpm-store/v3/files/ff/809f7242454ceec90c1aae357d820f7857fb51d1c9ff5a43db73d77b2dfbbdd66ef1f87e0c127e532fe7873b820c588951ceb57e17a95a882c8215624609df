'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Id_IdProvider = require('./Id/IdProvider.js');
var SystemProvider = require('reakit-system/SystemProvider');

var defaultSystem = {};
function Provider(_ref) {
  var prefix = _ref.unstable_prefix,
      _ref$unstable_system = _ref.unstable_system,
      system = _ref$unstable_system === void 0 ? defaultSystem : _ref$unstable_system,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(Id_IdProvider.unstable_IdProvider, {
    prefix: prefix
  }, /*#__PURE__*/React.createElement(SystemProvider.SystemProvider, {
    unstable_system: system
  }, children));
}

exports.Provider = Provider;
