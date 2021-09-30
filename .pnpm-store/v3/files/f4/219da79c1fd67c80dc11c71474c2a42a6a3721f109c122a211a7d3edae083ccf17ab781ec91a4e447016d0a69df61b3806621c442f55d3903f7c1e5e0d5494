'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('../Role/Role.js');
require('reakit-utils/canUseDOM');
require('../__keys-f41a441b.js');
var Disclosure_DisclosureContent = require('../Disclosure/DisclosureContent.js');
require('react-dom');
var Portal_Portal = require('../Portal/Portal.js');
var DialogBackdropContext = require('../DialogBackdropContext-b43e21d7.js');
var __keys = require('../__keys-0c8e6398.js');

var useDialogBackdrop = createHook.createHook({
  name: "DialogBackdrop",
  compose: Disclosure_DisclosureContent.useDisclosureContent,
  keys: __keys.DIALOG_BACKDROP_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? true : _ref$modal,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["modal"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      modal: modal
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlWrapElement = _ref2.wrapElement,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["wrapElement"]);

    var wrapElement = React.useCallback(function (element) {
      if (options.modal) {
        element = /*#__PURE__*/React.createElement(Portal_Portal.Portal, null, /*#__PURE__*/React.createElement(DialogBackdropContext.DialogBackdropContext.Provider, {
          value: options.baseId
        }, element));
      }

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [options.modal, htmlWrapElement]);
    return _rollupPluginBabelHelpers._objectSpread2({
      id: undefined,
      "data-dialog-ref": options.baseId,
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var DialogBackdrop = createComponent.createComponent({
  as: "div",
  memo: true,
  useHook: useDialogBackdrop
});

exports.DialogBackdrop = DialogBackdrop;
exports.useDialogBackdrop = useDialogBackdrop;
