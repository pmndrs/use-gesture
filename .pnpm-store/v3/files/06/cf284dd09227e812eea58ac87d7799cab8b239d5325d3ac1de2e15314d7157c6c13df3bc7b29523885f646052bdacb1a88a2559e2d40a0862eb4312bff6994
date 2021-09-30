import { a as _objectSpread2, _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useContext, useCallback } from 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import 'reakit-utils/createEvent';
import 'reakit-utils/useSealedState';
import 'reakit-utils/getDocument';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../__keys-6742f591.js';
import '../userFocus-e16425e3.js';
import 'reakit-utils/isTextField';
import 'reakit-utils/ensureFocus';
import '../Id/IdProvider.js';
import '../Id/Id.js';
import 'reakit-utils/fireEvent';
import '../setTextFieldValue-0a221f4e.js';
import '../Composite/CompositeItem.js';
import '../Group/Group.js';
import 'reakit-utils/applyState';
import '../Id/IdState.js';
import '../Composite/CompositeState.js';
import { g as FORM_RADIO_KEYS } from '../__keys-54ad6269.js';
import { f as formatInputName } from '../getInputId-aa144169.js';
import '../getLabelId-3db05e97.js';
import { unstable_getIn } from './utils/getIn.js';
import '../shouldShowError-e8a86b53.js';
import './FormGroup.js';
import 'reakit-warning/warning';
import '../__keys-d251e56b.js';
import { useRadio } from '../Radio/Radio.js';
import { FormRadioGroupContext } from './FormRadioGroup.js';

var unstable_useFormRadio = createHook({
  name: "FormRadio",
  compose: useRadio,
  keys: FORM_RADIO_KEYS,
  useOptions: function useOptions(options, htmlProps) {
    var name = options.name || htmlProps.name;
    var value = typeof options.value !== "undefined" ? options.value : htmlProps.value;
    var composite = useContext(FormRadioGroupContext);
    var currentChecked = unstable_getIn(options.values, name);
    var checked = currentChecked === value;

    if (!composite) {
      // TODO: Better error
      throw new Error("Missing FormRadioGroup");
    }

    return _objectSpread2(_objectSpread2(_objectSpread2({}, options), composite), {}, {
      checked: checked,
      name: name,
      value: value
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlOnChange = _ref.onChange,
        htmlOnBlur = _ref.onBlur,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onChange", "onBlur"]);

    var onChangeRef = useLiveRef(htmlOnChange);
    var onBlurRef = useLiveRef(htmlOnBlur);
    var onChange = useCallback(function (event) {
      var _onChangeRef$current, _options$update;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, event);
      if (event.defaultPrevented) return;
      (_options$update = options.update) === null || _options$update === void 0 ? void 0 : _options$update.call(options, options.name, options.value);
    }, [options.update, options.name, options.value]);
    var onBlur = useCallback(function (event) {
      var _onBlurRef$current, _options$blur;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$blur = options.blur) === null || _options$blur === void 0 ? void 0 : _options$blur.call(options, options.name);
    }, [options.blur, options.name]);
    return _objectSpread2({
      name: formatInputName(options.name),
      onChange: onChange,
      onBlur: onBlur
    }, htmlProps);
  }
});
var unstable_FormRadio = createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useFormRadio
});

export { unstable_FormRadio, unstable_useFormRadio };
