'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-utils/useIsomorphicEffect');
require('../Role/Role.js');
require('reakit-utils/useSealedState');
require('reakit-utils/getDocument');
require('../reverse-4756a49e.js');
require('../getCurrentId-eade2850.js');
require('../findEnabledItemById-03112678.js');
require('../Id/IdProvider.js');
require('../Group/Group.js');
require('reakit-utils/applyState');
require('../Id/IdState.js');
var Composite_CompositeState = require('../Composite/CompositeState.js');
var __keys = require('../__keys-4b3c7cdc.js');
var getInputId = require('../getInputId-cbd3bbcc.js');
require('../getLabelId-eba7e47b.js');
require('./utils/getIn.js');
require('../shouldShowError-880a39c9.js');
var Form_FormGroup = require('./FormGroup.js');

var FormRadioGroupContext = /*#__PURE__*/React.createContext(null);
var unstable_useFormRadioGroup = createHook.createHook({
  name: "FormRadioGroup",
  compose: Form_FormGroup.unstable_useFormGroup,
  keys: __keys.FORM_RADIO_GROUP_KEYS,
  useOptions: function useOptions(options, _ref) {
    var name = _ref.name;
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      name: options.name || name
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlWrapElement = _ref2.wrapElement,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["wrapElement"]);

    var id = getInputId.getInputId(options.name, options.baseId);
    var composite = Composite_CompositeState.useCompositeState({
      baseId: id,
      loop: true
    });
    var providerValue = React.useMemo(function () {
      return composite;
    }, Object.values(composite));
    var wrapElement = React.useCallback(function (element) {
      element = /*#__PURE__*/React.createElement(FormRadioGroupContext.Provider, {
        value: providerValue
      }, element);

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [providerValue, htmlWrapElement]);
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "radiogroup",
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var unstable_FormRadioGroup = createComponent.createComponent({
  as: "fieldset",
  useHook: unstable_useFormRadioGroup
});

exports.FormRadioGroupContext = FormRadioGroupContext;
exports.unstable_FormRadioGroup = unstable_FormRadioGroup;
exports.unstable_useFormRadioGroup = unstable_useFormRadioGroup;
