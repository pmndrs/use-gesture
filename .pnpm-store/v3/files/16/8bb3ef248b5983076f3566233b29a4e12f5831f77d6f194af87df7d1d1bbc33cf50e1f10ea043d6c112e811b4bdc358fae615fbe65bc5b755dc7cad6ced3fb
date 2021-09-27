import { a as _objectSpread2, _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { createContext, useMemo, useCallback, createElement } from 'react';
import 'reakit-utils/useIsomorphicEffect';
import '../Role/Role.js';
import 'reakit-utils/useSealedState';
import 'reakit-utils/getDocument';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../Id/IdProvider.js';
import '../Group/Group.js';
import 'reakit-utils/applyState';
import '../Id/IdState.js';
import { useCompositeState } from '../Composite/CompositeState.js';
import { h as FORM_RADIO_GROUP_KEYS } from '../__keys-54ad6269.js';
import { g as getInputId } from '../getInputId-aa144169.js';
import '../getLabelId-3db05e97.js';
import './utils/getIn.js';
import '../shouldShowError-e8a86b53.js';
import { unstable_useFormGroup } from './FormGroup.js';

var FormRadioGroupContext = /*#__PURE__*/createContext(null);
var unstable_useFormRadioGroup = createHook({
  name: "FormRadioGroup",
  compose: unstable_useFormGroup,
  keys: FORM_RADIO_GROUP_KEYS,
  useOptions: function useOptions(options, _ref) {
    var name = _ref.name;
    return _objectSpread2(_objectSpread2({}, options), {}, {
      name: options.name || name
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlWrapElement = _ref2.wrapElement,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["wrapElement"]);

    var id = getInputId(options.name, options.baseId);
    var composite = useCompositeState({
      baseId: id,
      loop: true
    });
    var providerValue = useMemo(function () {
      return composite;
    }, Object.values(composite));
    var wrapElement = useCallback(function (element) {
      element = /*#__PURE__*/createElement(FormRadioGroupContext.Provider, {
        value: providerValue
      }, element);

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [providerValue, htmlWrapElement]);
    return _objectSpread2({
      role: "radiogroup",
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var unstable_FormRadioGroup = createComponent({
  as: "fieldset",
  useHook: unstable_useFormRadioGroup
});

export { FormRadioGroupContext, unstable_FormRadioGroup, unstable_useFormRadioGroup };
