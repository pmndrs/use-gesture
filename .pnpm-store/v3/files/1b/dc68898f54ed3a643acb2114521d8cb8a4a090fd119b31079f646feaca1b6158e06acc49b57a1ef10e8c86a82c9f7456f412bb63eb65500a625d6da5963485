'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('../Role/Role.js');
var getDocument = require('reakit-utils/getDocument');
require('reakit-utils/canUseDOM');
require('../__keys-f41a441b.js');
var Disclosure_DisclosureContent = require('../Disclosure/DisclosureContent.js');
require('react-dom');
var Portal_Portal = require('../Portal/Portal.js');
var __keys = require('../__keys-724ea0fe.js');
var __globalState = require('../__globalState-de564b64.js');

function globallyHideTooltipOnEscape(event) {
  if (event.defaultPrevented) return;

  if (event.key === "Escape") {
    __globalState.globalState.show(null);
  }
}

var useTooltip = createHook.createHook({
  name: "Tooltip",
  compose: Disclosure_DisclosureContent.useDisclosureContent,
  keys: __keys.TOOLTIP_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$unstable_portal = _ref.unstable_portal,
        unstable_portal = _ref$unstable_portal === void 0 ? true : _ref$unstable_portal,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["unstable_portal"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      unstable_portal: unstable_portal
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlRef = _ref2.ref,
        htmlStyle = _ref2.style,
        htmlWrapElement = _ref2.wrapElement,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["ref", "style", "wrapElement"]);

    React.useEffect(function () {
      var _options$unstable_pop;

      var document = getDocument.getDocument((_options$unstable_pop = options.unstable_popoverRef) === null || _options$unstable_pop === void 0 ? void 0 : _options$unstable_pop.current);
      document.addEventListener("keydown", globallyHideTooltipOnEscape);
    }, []);
    var wrapElement = React.useCallback(function (element) {
      if (options.unstable_portal) {
        element = /*#__PURE__*/React.createElement(Portal_Portal.Portal, null, element);
      }

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [options.unstable_portal, htmlWrapElement]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(options.unstable_popoverRef, htmlRef),
      role: "tooltip",
      style: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options.unstable_popoverStyles), {}, {
        pointerEvents: "none"
      }, htmlStyle),
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var Tooltip = createComponent.createComponent({
  as: "div",
  memo: true,
  useHook: useTooltip
});

exports.Tooltip = Tooltip;
exports.useTooltip = useTooltip;
