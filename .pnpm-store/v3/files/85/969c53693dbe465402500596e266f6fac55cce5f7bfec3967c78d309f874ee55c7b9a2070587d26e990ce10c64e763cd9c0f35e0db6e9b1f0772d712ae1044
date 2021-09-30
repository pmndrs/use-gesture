'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var Role_Role = require('../Role/Role.js');

// Automatically generated
var VISUALLY_HIDDEN_KEYS = [];

var useVisuallyHidden = createHook.createHook({
  name: "VisuallyHidden",
  compose: Role_Role.useRole,
  keys: VISUALLY_HIDDEN_KEYS,
  useProps: function useProps(_, _ref) {
    var htmlStyle = _ref.style,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["style"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      style: _rollupPluginBabelHelpers._objectSpread2({
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px"
      }, htmlStyle)
    }, htmlProps);
  }
});
var VisuallyHidden = createComponent.createComponent({
  as: "span",
  memo: true,
  useHook: useVisuallyHidden
});

exports.VisuallyHidden = VisuallyHidden;
exports.useVisuallyHidden = useVisuallyHidden;
