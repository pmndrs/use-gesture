'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./SystemContext.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');
var useCreateElement = require('./useCreateElement.js');
var splitProps = require('reakit-utils/splitProps');
var shallowEqual = require('reakit-utils/shallowEqual');
var normalizePropsAreEqual = require('reakit-utils/normalizePropsAreEqual');

function forwardRef(component) {
  return /*#__PURE__*/React.forwardRef(component);
}

function memo(component, propsAreEqual) {
  return /*#__PURE__*/React.memo(component, propsAreEqual);
}

/**
 * Creates a React component.
 *
 * @example
 * import { createComponent } from "reakit-system";
 *
 * const A = createComponent({ as: "a" });
 *
 * @param options
 */
function createComponent(_ref) {
  var type = _ref.as,
      useHook = _ref.useHook,
      shouldMemo = _ref.memo,
      _ref$propsAreEqual = _ref.propsAreEqual,
      propsAreEqual = _ref$propsAreEqual === void 0 ? useHook === null || useHook === void 0 ? void 0 : useHook.unstable_propsAreEqual : _ref$propsAreEqual,
      _ref$keys = _ref.keys,
      keys = _ref$keys === void 0 ? (useHook === null || useHook === void 0 ? void 0 : useHook.__keys) || [] : _ref$keys,
      _ref$useCreateElement = _ref.useCreateElement,
      useCreateElement$1 = _ref$useCreateElement === void 0 ? useCreateElement.useCreateElement : _ref$useCreateElement;

  var Comp = function Comp(_ref2, ref) {
    var _ref2$as = _ref2.as,
        as = _ref2$as === void 0 ? type : _ref2$as,
        props = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["as"]);

    if (useHook) {
      var _as$render;

      var _splitProps = splitProps.splitProps(props, keys),
          _options = _splitProps[0],
          htmlProps = _splitProps[1];

      var _useHook = useHook(_options, _rollupPluginBabelHelpers._objectSpread2({
        ref: ref
      }, htmlProps)),
          wrapElement = _useHook.wrapElement,
          elementProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useHook, ["wrapElement"]); // @ts-ignore


      var asKeys = ((_as$render = as.render) === null || _as$render === void 0 ? void 0 : _as$render.__keys) || as.__keys;
      var asOptions = asKeys && splitProps.splitProps(props, asKeys)[0];
      var allProps = asOptions ? _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, elementProps), asOptions) : elementProps;

      var _element = useCreateElement$1(as, allProps);

      if (wrapElement) {
        return wrapElement(_element);
      }

      return _element;
    }

    return useCreateElement$1(as, _rollupPluginBabelHelpers._objectSpread2({
      ref: ref
    }, props));
  };

  if (process.env.NODE_ENV !== "production" && useHook) {
    Comp.displayName = useHook.name.replace(/^(unstable_)?use/, "");
  }

  Comp = forwardRef(Comp);

  if (shouldMemo) {
    Comp = memo(Comp, propsAreEqual && normalizePropsAreEqual.normalizePropsAreEqual(propsAreEqual));
  }

  Comp.__keys = keys;
  Comp.unstable_propsAreEqual = normalizePropsAreEqual.normalizePropsAreEqual(propsAreEqual || shallowEqual.shallowEqual);
  return Comp;
}

exports.createComponent = createComponent;
