'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('../Clickable/Clickable.js');
require('reakit-utils/createEvent');
require('reakit-utils/useSealedState');
require('reakit-utils/getDocument');
require('../reverse-4756a49e.js');
require('../getCurrentId-eade2850.js');
require('../findEnabledItemById-03112678.js');
require('../__keys-3b597476.js');
require('../userFocus-0afea51a.js');
require('reakit-utils/isTextField');
require('reakit-utils/ensureFocus');
require('../Id/IdProvider.js');
require('../Id/Id.js');
require('reakit-utils/fireEvent');
require('../setTextFieldValue-b0584ae1.js');
require('../Composite/CompositeItem.js');
require('../Group/Group.js');
require('reakit-utils/applyState');
require('../Id/IdState.js');
require('../Composite/CompositeState.js');
var __keys = require('../__keys-4b3c7cdc.js');
var getInputId = require('../getInputId-cbd3bbcc.js');
require('../getLabelId-eba7e47b.js');
var Form_utils_getIn = require('./utils/getIn.js');
require('../shouldShowError-880a39c9.js');
require('./FormGroup.js');
require('reakit-warning/warning');
require('../__keys-a6d5cee4.js');
var Radio_Radio = require('../Radio/Radio.js');
var Form_FormRadioGroup = require('./FormRadioGroup.js');

var unstable_useFormRadio = createHook.createHook({
  name: "FormRadio",
  compose: Radio_Radio.useRadio,
  keys: __keys.FORM_RADIO_KEYS,
  useOptions: function useOptions(options, htmlProps) {
    var name = options.name || htmlProps.name;
    var value = typeof options.value !== "undefined" ? options.value : htmlProps.value;
    var composite = React.useContext(Form_FormRadioGroup.FormRadioGroupContext);
    var currentChecked = Form_utils_getIn.unstable_getIn(options.values, name);
    var checked = currentChecked === value;

    if (!composite) {
      // TODO: Better error
      throw new Error("Missing FormRadioGroup");
    }

    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), composite), {}, {
      checked: checked,
      name: name,
      value: value
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlOnChange = _ref.onChange,
        htmlOnBlur = _ref.onBlur,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onChange", "onBlur"]);

    var onChangeRef = useLiveRef.useLiveRef(htmlOnChange);
    var onBlurRef = useLiveRef.useLiveRef(htmlOnBlur);
    var onChange = React.useCallback(function (event) {
      var _onChangeRef$current, _options$update;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, event);
      if (event.defaultPrevented) return;
      (_options$update = options.update) === null || _options$update === void 0 ? void 0 : _options$update.call(options, options.name, options.value);
    }, [options.update, options.name, options.value]);
    var onBlur = React.useCallback(function (event) {
      var _onBlurRef$current, _options$blur;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$blur = options.blur) === null || _options$blur === void 0 ? void 0 : _options$blur.call(options, options.name);
    }, [options.blur, options.name]);
    return _rollupPluginBabelHelpers._objectSpread2({
      name: getInputId.formatInputName(options.name),
      onChange: onChange,
      onBlur: onBlur
    }, htmlProps);
  }
});
var unstable_FormRadio = createComponent.createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useFormRadio
});

exports.unstable_FormRadio = unstable_FormRadio;
exports.unstable_useFormRadio = unstable_useFormRadio;
