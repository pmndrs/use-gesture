import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useState, useEffect } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import { isButton } from 'reakit-utils/isButton';
import { warning } from 'reakit-warning';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import { useClickable } from '../Clickable/Clickable.js';

// Automatically generated
var BUTTON_KEYS = [];

var useButton = createHook({
  name: "Button",
  compose: useClickable,
  keys: BUTTON_KEYS,
  useProps: function useProps(_, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref"]);

    var ref = useRef(null);

    var _React$useState = useState(undefined),
        role = _React$useState[0],
        setRole = _React$useState[1];

    var _React$useState2 = useState("button"),
        type = _React$useState2[0],
        setType = _React$useState2[1];

    useEffect(function () {
      var element = ref.current;

      if (!element) {
        process.env.NODE_ENV !== "production" ? warning(true, "Can't determine whether the element is a native button because `ref` wasn't passed to the component", "See https://reakit.io/docs/button") : void 0;
        return;
      }

      if (!isButton(element)) {
        if (element.tagName !== "A") {
          setRole("button");
        }

        setType(undefined);
      }
    }, []);
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef),
      role: role,
      type: type
    }, htmlProps);
  }
});
var Button = createComponent({
  as: "button",
  memo: true,
  useHook: useButton
});

export { Button, useButton };
