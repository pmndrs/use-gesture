'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
var isButton = require('reakit-utils/isButton');
var reakitWarning = require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
var hasFocusWithin = require('reakit-utils/hasFocusWithin');
var tabbable = require('reakit-utils/tabbable');
require('../Role/Role.js');
var useUpdateEffect = require('reakit-utils/useUpdateEffect');
var useCreateElement = require('reakit-system/useCreateElement');
var getDocument = require('reakit-utils/getDocument');
require('reakit-utils/canUseDOM');
var getNextActiveElementOnBlur = require('reakit-utils/getNextActiveElementOnBlur');
var ensureFocus = require('reakit-utils/ensureFocus');
require('../__keys-f41a441b.js');
var Disclosure_DisclosureContent = require('../Disclosure/DisclosureContent.js');
require('react-dom');
var Portal_Portal = require('../Portal/Portal.js');
var removeItemFromArray = require('reakit-utils/removeItemFromArray');
var MenuContext = require('../MenuContext-2d32bb3e.js');
var bodyScrollLock = require('body-scroll-lock');
var closest = require('reakit-utils/closest');
var getActiveElement = require('reakit-utils/getActiveElement');
var contains = require('reakit-utils/contains');
var DialogBackdropContext = require('../DialogBackdropContext-b43e21d7.js');
var isEmpty = require('reakit-utils/isEmpty');
var __keys = require('../__keys-0c8e6398.js');

function useDisclosureRef(dialogRef, options) {
  var ref = React.useRef(null);
  var animating = !!(options.animated && options.animating);
  React.useEffect(function () {
    if (options.visible || animating) return undefined; // We get the last focused element before the dialog opens, so we can move
    // focus back to it when the dialog closes.

    var onFocus = function onFocus(event) {
      var target = event.target;

      if ("focus" in target) {
        ref.current = target;

        if (options.unstable_disclosureRef) {
          options.unstable_disclosureRef.current = target;
        }
      }
    };

    var document = getDocument.getDocument(dialogRef.current);
    document.addEventListener("focusin", onFocus);
    return function () {
      return document.removeEventListener("focusin", onFocus);
    };
  }, [options.visible, animating, options.unstable_disclosureRef, dialogRef]);
  React.useEffect(function () {
    var _options$unstable_dis;

    if (!options.visible || animating) return undefined; // Safari and Firefox on MacOS don't focus on buttons on mouse down.
    // Instead, they focus on the closest focusable parent (ultimately, the
    // body element). This works around that by preventing that behavior and
    // forcing focus on the disclosure button. Otherwise, we wouldn't be able
    // to close the dialog by clicking again on the disclosure.

    var onMouseDown = function onMouseDown(event) {
      var element = event.currentTarget;
      if (!isButton.isButton(element)) return;
      event.preventDefault();
      element.focus();
    };

    var disclosure = ((_options$unstable_dis = options.unstable_disclosureRef) === null || _options$unstable_dis === void 0 ? void 0 : _options$unstable_dis.current) || ref.current;
    disclosure === null || disclosure === void 0 ? void 0 : disclosure.addEventListener("mousedown", onMouseDown);
    return function () {
      return disclosure === null || disclosure === void 0 ? void 0 : disclosure.removeEventListener("mousedown", onMouseDown);
    };
  }, [options.visible, animating, options.unstable_disclosureRef]);
  return options.unstable_disclosureRef || ref;
}

function usePreventBodyScroll(targetRef, options) {
  var shouldPrevent = Boolean(options.preventBodyScroll && options.visible);
  React.useEffect(function () {
    var element = targetRef.current;
    if (!element || !shouldPrevent) return undefined;
    bodyScrollLock.disableBodyScroll(element, {
      reserveScrollBarGap: true
    });
    return function () {
      return bodyScrollLock.enableBodyScroll(element);
    };
  }, [targetRef, shouldPrevent]);
}

function useFocusOnShow(dialogRef, nestedDialogs, options) {
  var initialFocusRef = options.unstable_initialFocusRef;
  var shouldFocus = options.visible && options.unstable_autoFocusOnShow;
  var animating = !!(options.animated && options.animating);
  useUpdateEffect.useUpdateEffect(function () {
    var dialog = dialogRef.current;
    process.env.NODE_ENV !== "production" ? reakitWarning.warning(!!shouldFocus && !dialog, "[reakit/Dialog]", "Can't set initial focus on dialog because `ref` wasn't passed to the dialog element.", "See https://reakit.io/docs/dialog") : void 0;
    if (!shouldFocus) return;
    if (!dialog) return;
    if (animating) return; // If there're nested open dialogs, let them handle focus

    if (nestedDialogs.some(function (child) {
      return child.current && !child.current.hidden;
    })) {
      return;
    }

    if (initialFocusRef !== null && initialFocusRef !== void 0 && initialFocusRef.current) {
      initialFocusRef.current.focus({
        preventScroll: true
      });
    } else {
      var tabbable$1 = tabbable.getFirstTabbableIn(dialog, true);

      var isActive = function isActive() {
        return hasFocusWithin.hasFocusWithin(dialog);
      };

      if (tabbable$1) {
        ensureFocus.ensureFocus(tabbable$1, {
          preventScroll: true,
          isActive: isActive
        });
      } else {
        ensureFocus.ensureFocus(dialog, {
          preventScroll: true,
          isActive: isActive
        });
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(dialog.tabIndex === undefined || dialog.tabIndex < 0, "It's recommended to have at least one tabbable element inside dialog. The dialog element has been automatically focused.", "If this is the intended behavior, pass `tabIndex={0}` to the dialog element to disable this warning.", "See https://reakit.io/docs/dialog/#initial-focus", dialog) : void 0;
      }
    }
  }, [dialogRef, shouldFocus, animating, nestedDialogs, initialFocusRef]);
}

function usePortalRef(dialogRef, options) {
  var portalRef = React.useRef(null);
  React.useEffect(function () {
    var dialog = dialogRef.current;
    if (!dialog || !options.visible) return;
    portalRef.current = closest.closest(dialog, Portal_Portal.Portal.__selector);
  }, [dialogRef, options.visible]);
  return portalRef;
}

function removeFromDOM(element) {
  if (element.parentNode == null) return;
  element.parentNode.removeChild(element);
}

var focusTrapClassName = "__reakit-focus-trap";
function isFocusTrap(element) {
  var _element$classList;

  return (_element$classList = element.classList) === null || _element$classList === void 0 ? void 0 : _element$classList.contains(focusTrapClassName);
}
function useFocusTrap(dialogRef, visibleModals, options) {
  var portalRef = usePortalRef(dialogRef, options);
  var shouldTrap = options.visible && options.modal;
  var beforeElement = React.useRef(null);
  var afterElement = React.useRef(null); // Create before and after elements
  // https://github.com/w3c/aria-practices/issues/545

  React.useEffect(function () {
    if (!shouldTrap) return undefined;
    var portal = portalRef.current;

    if (!portal) {
      process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "Can't trap focus within modal dialog because either `ref` wasn't passed to component or the component wasn't rendered within a portal", "See https://reakit.io/docs/dialog") : void 0;
      return undefined;
    }

    if (!beforeElement.current) {
      var document = getDocument.getDocument(portal);
      beforeElement.current = document.createElement("div");
      beforeElement.current.className = focusTrapClassName;
      beforeElement.current.tabIndex = 0;
      beforeElement.current.style.position = "fixed";
      beforeElement.current.setAttribute("aria-hidden", "true");
    }

    if (!afterElement.current) {
      afterElement.current = beforeElement.current.cloneNode();
    }

    portal.insertAdjacentElement("beforebegin", beforeElement.current);
    portal.insertAdjacentElement("afterend", afterElement.current);
    return function () {
      if (beforeElement.current) removeFromDOM(beforeElement.current);
      if (afterElement.current) removeFromDOM(afterElement.current);
    };
  }, [portalRef, shouldTrap]); // Focus trap

  React.useEffect(function () {
    var before = beforeElement.current;
    var after = afterElement.current;
    if (!shouldTrap || !before || !after) return undefined;

    var handleFocus = function handleFocus(event) {
      var dialog = dialogRef.current;
      if (!dialog || visibleModals.length) return;
      event.preventDefault();
      var isAfter = event.target === after;
      var tabbable$1 = isAfter ? tabbable.getFirstTabbableIn(dialog) : tabbable.getLastTabbableIn(dialog);

      if (tabbable$1) {
        tabbable$1.focus();
      } else {
        // fallback to dialog
        dialog.focus();
      }
    };

    before.addEventListener("focus", handleFocus);
    after.addEventListener("focus", handleFocus);
    return function () {
      before.removeEventListener("focus", handleFocus);
      after.removeEventListener("focus", handleFocus);
    };
  }, [dialogRef, visibleModals, shouldTrap]);
}

function hidByFocusingAnotherElement(dialogRef) {
  var dialog = dialogRef.current;
  if (!dialog) return false;
  var activeElement = getActiveElement.getActiveElement(dialog);
  if (!activeElement) return false;
  if (contains.contains(dialog, activeElement)) return false;
  if (tabbable.isTabbable(activeElement)) return true;
  if (activeElement.getAttribute("data-dialog") === "true") return true;
  return false;
}

function useFocusOnHide(dialogRef, disclosureRef, options) {
  var shouldFocus = options.unstable_autoFocusOnHide && !options.visible;
  var animating = !!(options.animated && options.animating);
  useUpdateEffect.useUpdateEffect(function () {
    var _options$unstable_fin;

    if (!shouldFocus) return;
    if (animating) return; // Hide was triggered by a click/focus on a tabbable element outside
    // the dialog or on another dialog. We won't change focus then.

    if (hidByFocusingAnotherElement(dialogRef)) {
      return;
    }

    var finalFocusEl = ((_options$unstable_fin = options.unstable_finalFocusRef) === null || _options$unstable_fin === void 0 ? void 0 : _options$unstable_fin.current) || disclosureRef.current;

    if (finalFocusEl) {
      if (finalFocusEl.id) {
        var document = getDocument.getDocument(finalFocusEl);
        var compositeElement = document.querySelector("[aria-activedescendant='" + finalFocusEl.id + "']");

        if (compositeElement) {
          ensureFocus.ensureFocus(compositeElement);
          return;
        }
      }

      ensureFocus.ensureFocus(finalFocusEl);
      return;
    }

    process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "Can't return focus after closing dialog. Either render a disclosure component or provide a `unstable_finalFocusRef` prop.", "See https://reakit.io/docs/dialog", dialogRef.current) : void 0;
  }, [shouldFocus, animating, dialogRef, disclosureRef]);
}

var DialogContext = /*#__PURE__*/React.createContext({});
function useNestedDialogs(dialogRef, options) {
  var context = React.useContext(DialogContext);

  var _React$useState = React.useState([]),
      dialogs = _React$useState[0],
      setDialogs = _React$useState[1];

  var _React$useState2 = React.useState(dialogs),
      visibleModals = _React$useState2[0],
      setVisibleModals = _React$useState2[1];

  var addDialog = React.useCallback(function (ref) {
    var _context$addDialog;

    (_context$addDialog = context.addDialog) === null || _context$addDialog === void 0 ? void 0 : _context$addDialog.call(context, ref);
    setDialogs(function (prevDialogs) {
      return [].concat(prevDialogs, [ref]);
    });
  }, [context.addDialog]);
  var removeDialog = React.useCallback(function (ref) {
    var _context$removeDialog;

    (_context$removeDialog = context.removeDialog) === null || _context$removeDialog === void 0 ? void 0 : _context$removeDialog.call(context, ref);
    setDialogs(function (prevDialogs) {
      return removeItemFromArray.removeItemFromArray(prevDialogs, ref);
    });
  }, [context.removeDialog]);
  var showDialog = React.useCallback(function (ref) {
    var _context$showDialog;

    (_context$showDialog = context.showDialog) === null || _context$showDialog === void 0 ? void 0 : _context$showDialog.call(context, ref);
    setVisibleModals(function (prevDialogs) {
      return [].concat(prevDialogs, [ref]);
    });
  }, [context.showDialog]);
  var hideDialog = React.useCallback(function (ref) {
    var _context$hideDialog;

    (_context$hideDialog = context.hideDialog) === null || _context$hideDialog === void 0 ? void 0 : _context$hideDialog.call(context, ref);
    setVisibleModals(function (prevDialogs) {
      return removeItemFromArray.removeItemFromArray(prevDialogs, ref);
    });
  }, [context.hideDialog]); // If it's a nested dialog, add it to context

  React.useEffect(function () {
    var _context$addDialog2;

    if (options.unstable_orphan) return undefined;
    (_context$addDialog2 = context.addDialog) === null || _context$addDialog2 === void 0 ? void 0 : _context$addDialog2.call(context, dialogRef);
    return function () {
      var _context$removeDialog2;

      (_context$removeDialog2 = context.removeDialog) === null || _context$removeDialog2 === void 0 ? void 0 : _context$removeDialog2.call(context, dialogRef);
    };
  }, [options.unstable_orphan, context.addDialog, dialogRef, context.removeDialog]);
  React.useEffect(function () {
    var _context$showDialog2;

    if (options.unstable_orphan) return undefined;
    if (!options.modal) return undefined;
    if (!options.visible) return undefined;
    (_context$showDialog2 = context.showDialog) === null || _context$showDialog2 === void 0 ? void 0 : _context$showDialog2.call(context, dialogRef);
    return function () {
      var _context$hideDialog2;

      (_context$hideDialog2 = context.hideDialog) === null || _context$hideDialog2 === void 0 ? void 0 : _context$hideDialog2.call(context, dialogRef);
    };
  }, [options.unstable_orphan, options.modal, options.visible, context.showDialog, dialogRef, context.hideDialog]); // Close all nested dialogs when parent dialog closes

  React.useEffect(function () {
    if (context.visible === false && options.visible && !options.unstable_orphan) {
      var _options$hide;

      (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
    }
  }, [context.visible, options.visible, options.hide, options.unstable_orphan]); // Provider

  var providerValue = React.useMemo(function () {
    return {
      visible: options.visible,
      addDialog: addDialog,
      removeDialog: removeDialog,
      showDialog: showDialog,
      hideDialog: hideDialog
    };
  }, [options.visible, addDialog, removeDialog, showDialog, hideDialog]);
  var wrap = React.useCallback(function (element) {
    return /*#__PURE__*/React.createElement(DialogContext.Provider, {
      value: providerValue
    }, element);
  }, [providerValue]);
  return {
    dialogs: dialogs,
    visibleModals: visibleModals,
    wrap: wrap
  };
}

function dialogContains(target) {
  return function (dialogRef) {
    var dialog = dialogRef.current;
    if (!dialog) return false;
    if (contains.contains(dialog, target)) return true;
    var document = getDocument.getDocument(dialog);
    var backdrop = document.querySelector("[data-dialog-ref=\"" + dialog.id + "\"]");

    if (backdrop) {
      return contains.contains(backdrop, target);
    }

    return false;
  };
}

function isDisclosure(target, disclosure) {
  return contains.contains(disclosure, target);
}

function isInDocument(target) {
  var document = getDocument.getDocument(target);

  if (target.tagName === "HTML") {
    return true;
  }

  return contains.contains(document.body, target);
}

function useEventListenerOutside(containerRef, disclosureRef, nestedDialogs, eventType, listener, shouldListen, capture) {
  var listenerRef = useLiveRef.useLiveRef(listener);
  React.useEffect(function () {
    if (!shouldListen) return undefined;

    var onEvent = function onEvent(event) {
      if (!listenerRef.current) return;
      var container = containerRef.current;
      var disclosure = disclosureRef.current;
      var target = event.target;

      if (!container) {
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "Can't detect events outside dialog because `ref` wasn't passed to component.", "See https://reakit.io/docs/dialog") : void 0;
        return;
      } // When an element is unmounted right after it receives focus, the focus
      // event is triggered after that, when the element isn't part of the
      // current document anymore. So we ignore it.


      if (!isInDocument(target)) return; // Event inside dialog

      if (contains.contains(container, target)) return; // Event on disclosure

      if (disclosure && isDisclosure(target, disclosure)) return; // Event inside a nested dialog or focus trap

      if (isFocusTrap(target) || nestedDialogs.some(dialogContains(target))) {
        return;
      }

      listenerRef.current(event);
    };

    var document = getDocument.getDocument(containerRef.current);
    document.addEventListener(eventType, onEvent, capture);
    return function () {
      return document.removeEventListener(eventType, onEvent, capture);
    };
  }, [containerRef, disclosureRef, nestedDialogs, eventType, shouldListen, listenerRef]);
}

function useMouseDownRef(dialogRef, options) {
  var mouseDownRef = React.useRef();
  React.useEffect(function () {
    if (!options.visible) return undefined;
    if (!options.hideOnClickOutside) return undefined;
    var document = getDocument.getDocument(dialogRef.current);

    var onMouseDown = function onMouseDown(event) {
      mouseDownRef.current = event.target;
    };

    document.addEventListener("mousedown", onMouseDown);
    return function () {
      return document.removeEventListener("mousedown", onMouseDown);
    };
  }, [options.visible, options.hideOnClickOutside, dialogRef]);
  return mouseDownRef;
}

function useHideOnClickOutside(dialogRef, disclosureRef, nestedDialogs, options) {
  var mouseDownRef = useMouseDownRef(dialogRef, options);
  useEventListenerOutside(dialogRef, disclosureRef, nestedDialogs, "click", function (event) {
    // Make sure the element that has been clicked is the same that last
    // triggered the mousedown event. This prevents the dialog from closing
    // by dragging the cursor (for example, selecting some text inside the
    // dialog and releasing the mouse outside of it).
    if (mouseDownRef.current === event.target) {
      var _options$hide;

      (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
    }
  }, options.visible && options.hideOnClickOutside);
  useEventListenerOutside(dialogRef, disclosureRef, nestedDialogs, "focusin", function (event) {
    var document = getDocument.getDocument(dialogRef.current); // Fix for https://github.com/reakit/reakit/issues/619
    // On IE11, calling element.blur() triggers the focus event on
    // document.body, so we make sure to ignore it as well.

    if (event.target !== document && event.target !== document.body) {
      var _options$hide2;

      (_options$hide2 = options.hide) === null || _options$hide2 === void 0 ? void 0 : _options$hide2.call(options);
    }
  }, options.visible && options.hideOnClickOutside);
}

function useDisableHoverOutside(portalRef, nestedDialogs, options) {
  var useEvent = function useEvent(eventType) {
    return useEventListenerOutside(portalRef, {
      current: null
    }, nestedDialogs, eventType, function (event) {
      event.stopPropagation();
      event.preventDefault();
    }, options.visible && options.modal, true);
  };

  useEvent("mouseover");
  useEvent("mousemove");
  useEvent("mouseout");
}

/**
 * When the focused child gets removed from the DOM, we make sure to move focus
 * to the dialog.
 */
function useFocusOnChildUnmount(dialogRef, options) {
  React.useEffect(function () {
    var dialog = dialogRef.current;
    if (!options.visible || !dialog) return undefined;
    var observer = new MutationObserver(function (mutations) {
      var target = mutations[0].target; // If target is not this dialog, then this observer was triggered by a
      // nested dialog, so we just ignore it here and let the nested dialog
      // handle it there.

      if (target !== dialog) return;
      var document = getDocument.getDocument(dialog);
      var activeElement = getActiveElement.getActiveElement(dialog); // We can check if the current focused element is the document body. On
      // IE 11, it's an empty object when the current document is in a frame or
      // iframe.

      if (activeElement === document.body || isEmpty.isEmpty(activeElement)) {
        dialog.focus();
      }
    });
    observer.observe(dialog, {
      childList: true,
      subtree: true
    });
    return function () {
      observer.disconnect();
    };
  }, [options.visible, dialogRef]);
}

function isActualElement(element) {
  return element && element.tagName && element.tagName !== "HTML" && element !== getDocument.getDocument(element).body;
}

function useFocusOnBlur(dialogRef, options) {
  var _React$useReducer = React.useReducer(function (n) {
    return n + 1;
  }, 0),
      blurred = _React$useReducer[0],
      scheduleFocus = _React$useReducer[1];

  useIsomorphicEffect.useIsomorphicEffect(function () {
    var dialog = dialogRef.current;
    if (!options.visible) return;
    if (!blurred) return; // After blur, if the active element isn't an actual element, this probably
    // means that element.blur() was called on an element inside the dialog.
    // In this case, the browser will automatically focus the body element.
    // So we move focus back to the dialog.

    if (!isActualElement(getActiveElement.getActiveElement(dialog))) {
      process.env.NODE_ENV !== "production" ? reakitWarning.warning(!dialog, "Can't focus dialog after a nested element got blurred because `ref` wasn't passed to the component", "See https://reakit.io/docs/dialog") : void 0;
      dialog === null || dialog === void 0 ? void 0 : dialog.focus();
    }
  }, [blurred, dialogRef]);
  var onBlur = React.useCallback(function (event) {
    if (!options.visible) return;
    var nextActiveElement = getNextActiveElementOnBlur.getNextActiveElementOnBlur(event);

    if (!isActualElement(nextActiveElement)) {
      scheduleFocus();
    }
  }, [options.visible]);
  return onBlur;
}

var useDialog = createHook.createHook({
  name: "Dialog",
  compose: Disclosure_DisclosureContent.useDisclosureContent,
  keys: __keys.DIALOG_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? true : _ref$modal,
        _ref$hideOnEsc = _ref.hideOnEsc,
        hideOnEsc = _ref$hideOnEsc === void 0 ? true : _ref$hideOnEsc,
        _ref$hideOnClickOutsi = _ref.hideOnClickOutside,
        hideOnClickOutside = _ref$hideOnClickOutsi === void 0 ? true : _ref$hideOnClickOutsi,
        _ref$preventBodyScrol = _ref.preventBodyScroll,
        preventBodyScroll = _ref$preventBodyScrol === void 0 ? modal : _ref$preventBodyScrol,
        _ref$unstable_autoFoc = _ref.unstable_autoFocusOnShow,
        unstable_autoFocusOnShow = _ref$unstable_autoFoc === void 0 ? true : _ref$unstable_autoFoc,
        _ref$unstable_autoFoc2 = _ref.unstable_autoFocusOnHide,
        unstable_autoFocusOnHide = _ref$unstable_autoFoc2 === void 0 ? true : _ref$unstable_autoFoc2,
        unstable_orphan = _ref.unstable_orphan,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["modal", "hideOnEsc", "hideOnClickOutside", "preventBodyScroll", "unstable_autoFocusOnShow", "unstable_autoFocusOnHide", "unstable_orphan"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      modal: modal,
      hideOnEsc: hideOnEsc,
      hideOnClickOutside: hideOnClickOutside,
      preventBodyScroll: modal && preventBodyScroll,
      unstable_autoFocusOnShow: unstable_autoFocusOnShow,
      unstable_autoFocusOnHide: unstable_autoFocusOnHide,
      unstable_orphan: modal && unstable_orphan
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlRef = _ref2.ref,
        htmlOnKeyDown = _ref2.onKeyDown,
        htmlOnBlur = _ref2.onBlur,
        htmlWrapElement = _ref2.wrapElement,
        tabIndex = _ref2.tabIndex,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["ref", "onKeyDown", "onBlur", "wrapElement", "tabIndex"]);

    var dialog = React.useRef(null);
    var backdrop = React.useContext(DialogBackdropContext.DialogBackdropContext);
    var hasBackdrop = backdrop && backdrop === options.baseId;
    var disclosure = useDisclosureRef(dialog, options);
    var onKeyDownRef = useLiveRef.useLiveRef(htmlOnKeyDown);
    var onBlurRef = useLiveRef.useLiveRef(htmlOnBlur);
    var focusOnBlur = useFocusOnBlur(dialog, options);

    var _useNestedDialogs = useNestedDialogs(dialog, options),
        dialogs = _useNestedDialogs.dialogs,
        visibleModals = _useNestedDialogs.visibleModals,
        wrap = _useNestedDialogs.wrap; // VoiceOver/Safari accepts only one `aria-modal` container, so if there
    // are visible child modals, then we don't want to set aria-modal on the
    // parent modal (this component).


    var modal = options.modal && !visibleModals.length ? true : undefined;
    usePreventBodyScroll(dialog, options);
    useFocusTrap(dialog, visibleModals, options);
    useFocusOnChildUnmount(dialog, options);
    useFocusOnShow(dialog, dialogs, options);
    useFocusOnHide(dialog, disclosure, options);
    useHideOnClickOutside(dialog, disclosure, dialogs, options);
    useDisableHoverOutside(dialog, dialogs, options);
    var onKeyDown = React.useCallback(function (event) {
      var _onKeyDownRef$current;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;
      if (event.key !== "Escape") return;
      if (!options.hideOnEsc) return;

      if (!options.hide) {
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "`hideOnEsc` prop is truthy, but `hide` prop wasn't provided.", "See https://reakit.io/docs/dialog", dialog.current) : void 0;
        return;
      }

      event.stopPropagation();
      options.hide();
    }, [options.hideOnEsc, options.hide]);
    var onBlur = React.useCallback(function (event) {
      var _onBlurRef$current;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      focusOnBlur(event);
    }, [focusOnBlur]);
    var wrapElement = React.useCallback(function (element) {
      element = wrap(element);

      if (options.modal && !hasBackdrop) {
        element = /*#__PURE__*/React.createElement(Portal_Portal.Portal, null, element);
      }

      if (htmlWrapElement) {
        element = htmlWrapElement(element);
      }

      return (
        /*#__PURE__*/
        // Prevents Menu > Dialog > Menu to behave as a sub menu
        React.createElement(MenuContext.MenuContext.Provider, {
          value: null
        }, element)
      );
    }, [wrap, options.modal, hasBackdrop, htmlWrapElement]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(dialog, htmlRef),
      role: "dialog",
      tabIndex: tabIndex != null ? tabIndex : -1,
      "aria-modal": modal,
      "data-dialog": true,
      onKeyDown: onKeyDown,
      onBlur: onBlur,
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var Dialog = createComponent.createComponent({
  as: "div",
  useHook: useDialog,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/dialog") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.Dialog = Dialog;
exports.useDialog = useDialog;
