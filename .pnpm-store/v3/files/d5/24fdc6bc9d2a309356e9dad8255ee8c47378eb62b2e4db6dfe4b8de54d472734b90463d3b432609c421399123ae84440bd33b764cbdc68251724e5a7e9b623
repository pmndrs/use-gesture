import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useEffect, useCallback, createElement } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import '../Role/Role.js';
import { getDocument } from 'reakit-utils/getDocument';
import 'reakit-utils/canUseDOM';
import '../__keys-e6a5cfbe.js';
import { useDisclosureContent } from '../Disclosure/DisclosureContent.js';
import 'react-dom';
import { Portal } from '../Portal/Portal.js';
import { T as TOOLTIP_KEYS } from '../__keys-d101cb3b.js';
import { g as globalState } from '../__globalState-300469f0.js';

function globallyHideTooltipOnEscape(event) {
  if (event.defaultPrevented) return;

  if (event.key === "Escape") {
    globalState.show(null);
  }
}

var useTooltip = createHook({
  name: "Tooltip",
  compose: useDisclosureContent,
  keys: TOOLTIP_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$unstable_portal = _ref.unstable_portal,
        unstable_portal = _ref$unstable_portal === void 0 ? true : _ref$unstable_portal,
        options = _objectWithoutPropertiesLoose(_ref, ["unstable_portal"]);

    return _objectSpread2({
      unstable_portal: unstable_portal
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlRef = _ref2.ref,
        htmlStyle = _ref2.style,
        htmlWrapElement = _ref2.wrapElement,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["ref", "style", "wrapElement"]);

    useEffect(function () {
      var _options$unstable_pop;

      var document = getDocument((_options$unstable_pop = options.unstable_popoverRef) === null || _options$unstable_pop === void 0 ? void 0 : _options$unstable_pop.current);
      document.addEventListener("keydown", globallyHideTooltipOnEscape);
    }, []);
    var wrapElement = useCallback(function (element) {
      if (options.unstable_portal) {
        element = /*#__PURE__*/createElement(Portal, null, element);
      }

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [options.unstable_portal, htmlWrapElement]);
    return _objectSpread2({
      ref: useForkRef(options.unstable_popoverRef, htmlRef),
      role: "tooltip",
      style: _objectSpread2(_objectSpread2({}, options.unstable_popoverStyles), {}, {
        pointerEvents: "none"
      }, htmlStyle),
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var Tooltip = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltip
});

export { Tooltip, useTooltip };
