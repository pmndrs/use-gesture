import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useCallback } from 'react';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import { useRole } from '../Role/Role.js';
import { F as FORM_KEYS } from '../__keys-54ad6269.js';

var unstable_useForm = createHook({
  name: "Form",
  compose: useRole,
  keys: FORM_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnSubmit = _ref.onSubmit,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onSubmit"]);

    var onSubmitRef = useLiveRef(htmlOnSubmit);
    var onSubmit = useCallback(function (event) {
      var _onSubmitRef$current, _options$submit;

      (_onSubmitRef$current = onSubmitRef.current) === null || _onSubmitRef$current === void 0 ? void 0 : _onSubmitRef$current.call(onSubmitRef, event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      (_options$submit = options.submit) === null || _options$submit === void 0 ? void 0 : _options$submit.call(options);
    }, [options.submit]);
    return _objectSpread2({
      role: "form",
      noValidate: true,
      onSubmit: onSubmit
    }, htmlProps);
  }
});
var unstable_Form = createComponent({
  as: "form",
  useHook: unstable_useForm
});

export { unstable_Form, unstable_useForm };
