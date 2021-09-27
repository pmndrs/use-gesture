'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
var reakitWarning = require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('../Clickable/Clickable.js');
require('../Button/Button.js');
require('../__keys-f41a441b.js');
var __keys = require('../__keys-0c8e6398.js');
var Disclosure_Disclosure = require('../Disclosure/Disclosure.js');

var useDialogDisclosure = createHook.createHook({
  name: "DialogDisclosure",
  compose: Disclosure_Disclosure.useDisclosure,
  keys: __keys.DIALOG_DISCLOSURE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlOnClick = _ref.onClick,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref", "onClick"]);

    var ref = React.useRef(null);
    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);

    var _React$useState = React.useState(false),
        expanded = _React$useState[0],
        setExpanded = _React$useState[1];

    var disclosureRef = options.unstable_disclosureRef; // aria-expanded may be used for styling purposes, so we useLayoutEffect

    useIsomorphicEffect.useIsomorphicEffect(function () {
      var element = ref.current;
      process.env.NODE_ENV !== "production" ? reakitWarning.warning(!element, "Can't determine whether the element is the current disclosure because `ref` wasn't passed to the component", "See https://reakit.io/docs/dialog") : void 0;

      if (disclosureRef && !disclosureRef.current) {
        disclosureRef.current = element;
      }

      var isCurrentDisclosure = !(disclosureRef !== null && disclosureRef !== void 0 && disclosureRef.current) || disclosureRef.current === element;
      setExpanded(!!options.visible && isCurrentDisclosure);
    }, [options.visible, disclosureRef]);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;

      if (disclosureRef) {
        disclosureRef.current = event.currentTarget;
      }
    }, [disclosureRef]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      "aria-haspopup": "dialog",
      "aria-expanded": expanded,
      onClick: onClick
    }, htmlProps);
  }
});
var DialogDisclosure = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useDialogDisclosure
});

exports.DialogDisclosure = DialogDisclosure;
exports.useDialogDisclosure = useDialogDisclosure;
