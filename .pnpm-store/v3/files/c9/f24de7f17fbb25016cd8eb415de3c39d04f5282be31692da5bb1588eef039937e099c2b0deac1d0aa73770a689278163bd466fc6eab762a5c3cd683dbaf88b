import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useCallback } from 'react';
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
import { useButton } from '../Button/Button.js';
import { D as DISCLOSURE_KEYS } from '../__keys-e6a5cfbe.js';

var useDisclosure = createHook({
  name: "Disclosure",
  compose: useButton,
  keys: DISCLOSURE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnClick = _ref.onClick,
        ariaControls = _ref["aria-controls"],
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onClick", "aria-controls"]);

    var onClickRef = useLiveRef(htmlOnClick);
    var controls = ariaControls ? ariaControls + " " + options.baseId : options.baseId;
    var onClick = useCallback(function (event) {
      var _onClickRef$current, _options$toggle;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      (_options$toggle = options.toggle) === null || _options$toggle === void 0 ? void 0 : _options$toggle.call(options);
    }, [options.toggle]);
    return _objectSpread2({
      "aria-expanded": !!options.visible,
      "aria-controls": controls,
      onClick: onClick
    }, htmlProps);
  }
});
var Disclosure = createComponent({
  as: "button",
  memo: true,
  useHook: useDisclosure
});

export { Disclosure, useDisclosure };
