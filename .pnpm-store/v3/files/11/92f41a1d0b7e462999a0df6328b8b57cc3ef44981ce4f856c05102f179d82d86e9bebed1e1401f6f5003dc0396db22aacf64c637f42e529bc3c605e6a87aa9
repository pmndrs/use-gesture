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
var isSelfTarget = require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
var Role_Role = require('../Role/Role.js');
var Tabbable_Tabbable = require('../Tabbable/Tabbable.js');
var useCreateElement = require('reakit-system/useCreateElement');
var getDocument = require('reakit-utils/getDocument');
var fireBlurEvent = require('reakit-utils/fireBlurEvent');
var fireKeyboardEvent = require('reakit-utils/fireKeyboardEvent');
var canUseDOM = require('reakit-utils/canUseDOM');
var getNextActiveElementOnBlur = require('reakit-utils/getNextActiveElementOnBlur');
var reverse = require('../reverse-4756a49e.js');
var getCurrentId = require('../getCurrentId-eade2850.js');
var findEnabledItemById = require('../findEnabledItemById-03112678.js');
var __keys = require('../__keys-3b597476.js');
var userFocus = require('../userFocus-0afea51a.js');

var isIE11 = canUseDOM.canUseDOM && "msCrypto" in window;

function canProxyKeyboardEvent(event) {
  if (!isSelfTarget.isSelfTarget(event)) return false;
  if (event.metaKey) return false;
  if (event.key === "Tab") return false;
  return true;
}

function useKeyboardEventProxy(virtual, currentItem, htmlEventHandler) {
  var eventHandlerRef = useLiveRef.useLiveRef(htmlEventHandler);
  return React.useCallback(function (event) {
    var _eventHandlerRef$curr;

    (_eventHandlerRef$curr = eventHandlerRef.current) === null || _eventHandlerRef$curr === void 0 ? void 0 : _eventHandlerRef$curr.call(eventHandlerRef, event);
    if (event.defaultPrevented) return;

    if (virtual && canProxyKeyboardEvent(event)) {
      var currentElement = currentItem === null || currentItem === void 0 ? void 0 : currentItem.ref.current;

      if (currentElement) {
        if (!fireKeyboardEvent.fireKeyboardEvent(currentElement, event.type, event)) {
          event.preventDefault();
        } // The event will be triggered on the composite item and then
        // propagated up to this composite element again, so we can pretend
        // that it wasn't called on this component in the first place.


        if (event.currentTarget.contains(currentElement)) {
          event.stopPropagation();
        }
      }
    }
  }, [virtual, currentItem]);
} // istanbul ignore next


function useActiveElementRef(elementRef) {
  var activeElementRef = React.useRef(null);
  React.useEffect(function () {
    var document = getDocument.getDocument(elementRef.current);

    var onFocus = function onFocus(event) {
      var target = event.target;
      activeElementRef.current = target;
    };

    document.addEventListener("focus", onFocus, true);
    return function () {
      document.removeEventListener("focus", onFocus, true);
    };
  }, []);
  return activeElementRef;
}

function findFirstEnabledItemInTheLastRow(items) {
  return getCurrentId.findFirstEnabledItem(reverse.flatten(reverse.reverse(reverse.groupItems(items))));
}

function isItem(items, element) {
  return items === null || items === void 0 ? void 0 : items.some(function (item) {
    return !!element && item.ref.current === element;
  });
}

function useScheduleUserFocus(currentItem) {
  var currentItemRef = useLiveRef.useLiveRef(currentItem);

  var _React$useReducer = React.useReducer(function (n) {
    return n + 1;
  }, 0),
      scheduled = _React$useReducer[0],
      schedule = _React$useReducer[1];

  React.useEffect(function () {
    var _currentItemRef$curre;

    var currentElement = (_currentItemRef$curre = currentItemRef.current) === null || _currentItemRef$curre === void 0 ? void 0 : _currentItemRef$curre.ref.current;

    if (scheduled && currentElement) {
      userFocus.userFocus(currentElement);
    }
  }, [scheduled]);
  return schedule;
}

var useComposite = createHook.createHook({
  name: "Composite",
  compose: [Tabbable_Tabbable.useTabbable],
  keys: __keys.COMPOSITE_KEYS,
  useOptions: function useOptions(options) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      currentId: getCurrentId.getCurrentId(options)
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlOnFocusCapture = _ref.onFocusCapture,
        htmlOnFocus = _ref.onFocus,
        htmlOnBlurCapture = _ref.onBlurCapture,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlOnKeyDownCapture = _ref.onKeyDownCapture,
        htmlOnKeyUpCapture = _ref.onKeyUpCapture,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref", "onFocusCapture", "onFocus", "onBlurCapture", "onKeyDown", "onKeyDownCapture", "onKeyUpCapture"]);

    var ref = React.useRef(null);
    var currentItem = findEnabledItemById.findEnabledItemById(options.items, options.currentId);
    var previousElementRef = React.useRef(null);
    var onFocusCaptureRef = useLiveRef.useLiveRef(htmlOnFocusCapture);
    var onFocusRef = useLiveRef.useLiveRef(htmlOnFocus);
    var onBlurCaptureRef = useLiveRef.useLiveRef(htmlOnBlurCapture);
    var onKeyDownRef = useLiveRef.useLiveRef(htmlOnKeyDown);
    var scheduleUserFocus = useScheduleUserFocus(currentItem); // IE 11 doesn't support event.relatedTarget, so we use the active element
    // ref instead.

    var activeElementRef = isIE11 ? useActiveElementRef(ref) : undefined;
    React.useEffect(function () {
      var element = ref.current;

      if (options.unstable_moves && !currentItem) {
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(!element, "Can't focus composite component because `ref` wasn't passed to component.", "See https://reakit.io/docs/composite") : void 0; // If composite.move(null) has been called, the composite container
        // will receive focus.

        element === null || element === void 0 ? void 0 : element.focus();
      }
    }, [options.unstable_moves, currentItem]);
    var onKeyDownCapture = useKeyboardEventProxy(options.unstable_virtual, currentItem, htmlOnKeyDownCapture);
    var onKeyUpCapture = useKeyboardEventProxy(options.unstable_virtual, currentItem, htmlOnKeyUpCapture);
    var onFocusCapture = React.useCallback(function (event) {
      var _onFocusCaptureRef$cu;

      (_onFocusCaptureRef$cu = onFocusCaptureRef.current) === null || _onFocusCaptureRef$cu === void 0 ? void 0 : _onFocusCaptureRef$cu.call(onFocusCaptureRef, event);
      if (event.defaultPrevented) return;
      if (!options.unstable_virtual) return; // IE11 doesn't support event.relatedTarget, so we use the active
      // element ref instead.

      var previousActiveElement = (activeElementRef === null || activeElementRef === void 0 ? void 0 : activeElementRef.current) || event.relatedTarget;
      var previousActiveElementWasItem = isItem(options.items, previousActiveElement);

      if (isSelfTarget.isSelfTarget(event) && previousActiveElementWasItem) {
        // Composite has been focused as a result of an item receiving focus.
        // The composite item will move focus back to the composite
        // container. In this case, we don't want to propagate this
        // additional event nor call the onFocus handler passed to
        // <Composite onFocus={...} />.
        event.stopPropagation(); // We keep track of the previous active item element so we can
        // manually fire a blur event on it later when the focus is moved to
        // another item on the onBlurCapture event below.

        previousElementRef.current = previousActiveElement;
      }
    }, [options.unstable_virtual, options.items]);
    var onFocus = React.useCallback(function (event) {
      var _onFocusRef$current;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      if (event.defaultPrevented) return;

      if (options.unstable_virtual) {
        if (isSelfTarget.isSelfTarget(event)) {
          // This means that the composite element has been focused while the
          // composite item has not. For example, by clicking on the
          // composite element without touching any item, or by tabbing into
          // the composite element. In this case, we want to trigger focus on
          // the item, just like it would happen with roving tabindex.
          // When it receives focus, the composite item will put focus back
          // on the composite element, in which case hasItemWithFocus will be
          // true.
          scheduleUserFocus();
        }
      } else if (isSelfTarget.isSelfTarget(event)) {
        var _options$setCurrentId;

        // When the roving tabindex composite gets intentionally focused (for
        // example, by clicking directly on it, and not on an item), we make
        // sure to set the current id to null (which means the composite
        // itself is focused).
        (_options$setCurrentId = options.setCurrentId) === null || _options$setCurrentId === void 0 ? void 0 : _options$setCurrentId.call(options, null);
      }
    }, [options.unstable_virtual, options.setCurrentId]);
    var onBlurCapture = React.useCallback(function (event) {
      var _onBlurCaptureRef$cur;

      (_onBlurCaptureRef$cur = onBlurCaptureRef.current) === null || _onBlurCaptureRef$cur === void 0 ? void 0 : _onBlurCaptureRef$cur.call(onBlurCaptureRef, event);
      if (event.defaultPrevented) return;
      if (!options.unstable_virtual) return; // When virtual is set to true, we move focus from the composite
      // container (this component) to the composite item that is being
      // selected. Then we move focus back to the composite container. This
      // is so we can provide the same API as the roving tabindex method,
      // which means people can attach onFocus/onBlur handlers on the
      // CompositeItem component regardless of whether it's virtual or not.
      // This sequence of blurring and focusing items and composite may be
      // confusing, so we ignore intermediate focus and blurs by stopping its
      // propagation and not calling the passed onBlur handler (htmlOnBlur).

      var currentElement = (currentItem === null || currentItem === void 0 ? void 0 : currentItem.ref.current) || null;
      var nextActiveElement = getNextActiveElementOnBlur.getNextActiveElementOnBlur(event);
      var nextActiveElementIsItem = isItem(options.items, nextActiveElement);

      if (isSelfTarget.isSelfTarget(event) && nextActiveElementIsItem) {
        // This is an intermediate blur event: blurring the composite
        // container to focus an item (nextActiveElement).
        if (nextActiveElement === currentElement) {
          // The next active element will be the same as the current item in
          // the state in two scenarios:
          //   - Moving focus with keyboard: the state is updated before the
          // blur event is triggered, so here the current item is already
          // pointing to the next active element.
          //   - Clicking on the current active item with a pointer: this
          // will trigger blur on the composite element and then the next
          // active element will be the same as the current item. Clicking on
          // an item other than the current one doesn't end up here as the
          // currentItem state will be updated only after it.
          if (previousElementRef.current && previousElementRef.current !== nextActiveElement) {
            // If there's a previous active item and it's not a click action,
            // then we fire a blur event on it so it will work just like if
            // it had DOM focus before (like when using roving tabindex).
            fireBlurEvent.fireBlurEvent(previousElementRef.current, event);
          }
        } else if (currentElement) {
          // This will be true when the next active element is not the
          // current element, but there's a current item. This will only
          // happen when clicking with a pointer on a different item, when
          // there's already an item selected, in which case currentElement
          // is the item that is getting blurred, and nextActiveElement is
          // the item that is being clicked.
          fireBlurEvent.fireBlurEvent(currentElement, event);
        } // We want to ignore intermediate blur events, so we stop its
        // propagation and return early so onFocus will not be called.


        event.stopPropagation();
      } else {
        var targetIsItem = isItem(options.items, event.target);

        if (!targetIsItem && currentElement) {
          // If target is not a composite item, it may be the composite
          // element itself (isSelfTarget) or a tabbable element inside the
          // composite widget. This may be triggered by clicking outside the
          // composite widget or by tabbing out of it. In either cases we
          // want to fire a blur event on the current item.
          fireBlurEvent.fireBlurEvent(currentElement, event);
        }
      }
    }, [options.unstable_virtual, options.items, currentItem]);
    var onKeyDown = React.useCallback(function (event) {
      var _onKeyDownRef$current, _options$groups;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;
      if (options.currentId !== null) return;
      if (!isSelfTarget.isSelfTarget(event)) return;
      var isVertical = options.orientation !== "horizontal";
      var isHorizontal = options.orientation !== "vertical";
      var isGrid = !!((_options$groups = options.groups) !== null && _options$groups !== void 0 && _options$groups.length);

      var up = function up() {
        if (isGrid) {
          var item = findFirstEnabledItemInTheLastRow(options.items);

          if (item !== null && item !== void 0 && item.id) {
            var _options$move;

            (_options$move = options.move) === null || _options$move === void 0 ? void 0 : _options$move.call(options, item.id);
          }
        } else {
          var _options$last;

          (_options$last = options.last) === null || _options$last === void 0 ? void 0 : _options$last.call(options);
        }
      };

      var keyMap = {
        ArrowUp: (isGrid || isVertical) && up,
        ArrowRight: (isGrid || isHorizontal) && options.first,
        ArrowDown: (isGrid || isVertical) && options.first,
        ArrowLeft: (isGrid || isHorizontal) && options.last,
        Home: options.first,
        End: options.last,
        PageUp: options.first,
        PageDown: options.last
      };
      var action = keyMap[event.key];

      if (action) {
        event.preventDefault();
        action();
      }
    }, [options.currentId, options.orientation, options.groups, options.items, options.move, options.last, options.first]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      id: options.baseId,
      onFocus: onFocus,
      onFocusCapture: onFocusCapture,
      onBlurCapture: onBlurCapture,
      onKeyDownCapture: onKeyDownCapture,
      onKeyDown: onKeyDown,
      onKeyUpCapture: onKeyUpCapture,
      "aria-activedescendant": options.unstable_virtual ? (currentItem === null || currentItem === void 0 ? void 0 : currentItem.id) || undefined : undefined
    }, htmlProps);
  },
  useComposeProps: function useComposeProps(options, htmlProps) {
    htmlProps = Role_Role.useRole(options, htmlProps, true);
    var tabbableHTMLProps = Tabbable_Tabbable.useTabbable(options, htmlProps, true);

    if (options.unstable_virtual || options.currentId === null) {
      // Composite will only be tabbable by default if the focus is managed
      // using aria-activedescendant, which requires DOM focus on the container
      // element (the composite)
      return _rollupPluginBabelHelpers._objectSpread2({
        tabIndex: 0
      }, tabbableHTMLProps);
    }

    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, htmlProps), {}, {
      ref: tabbableHTMLProps.ref
    });
  }
});
var Composite = createComponent.createComponent({
  as: "div",
  useHook: useComposite,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/composite") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.Composite = Composite;
exports.useComposite = useComposite;
