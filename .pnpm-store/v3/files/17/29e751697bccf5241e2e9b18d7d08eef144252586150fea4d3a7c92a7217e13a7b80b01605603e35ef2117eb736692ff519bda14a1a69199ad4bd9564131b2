import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useState, useCallback } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import { warning } from 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import { useIsomorphicEffect } from 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import '../Button/Button.js';
import '../__keys-e6a5cfbe.js';
import { b as DIALOG_DISCLOSURE_KEYS } from '../__keys-ed7b48af.js';
import { useDisclosure } from '../Disclosure/Disclosure.js';

var useDialogDisclosure = createHook({
  name: "DialogDisclosure",
  compose: useDisclosure,
  keys: DIALOG_DISCLOSURE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlOnClick = _ref.onClick,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref", "onClick"]);

    var ref = useRef(null);
    var onClickRef = useLiveRef(htmlOnClick);

    var _React$useState = useState(false),
        expanded = _React$useState[0],
        setExpanded = _React$useState[1];

    var disclosureRef = options.unstable_disclosureRef; // aria-expanded may be used for styling purposes, so we useLayoutEffect

    useIsomorphicEffect(function () {
      var element = ref.current;
      process.env.NODE_ENV !== "production" ? warning(!element, "Can't determine whether the element is the current disclosure because `ref` wasn't passed to the component", "See https://reakit.io/docs/dialog") : void 0;

      if (disclosureRef && !disclosureRef.current) {
        disclosureRef.current = element;
      }

      var isCurrentDisclosure = !(disclosureRef !== null && disclosureRef !== void 0 && disclosureRef.current) || disclosureRef.current === element;
      setExpanded(!!options.visible && isCurrentDisclosure);
    }, [options.visible, disclosureRef]);
    var onClick = useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;

      if (disclosureRef) {
        disclosureRef.current = event.currentTarget;
      }
    }, [disclosureRef]);
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef),
      "aria-haspopup": "dialog",
      "aria-expanded": expanded,
      onClick: onClick
    }, htmlProps);
  }
});
var DialogDisclosure = createComponent({
  as: "button",
  memo: true,
  useHook: useDialogDisclosure
});

export { DialogDisclosure, useDialogDisclosure };
