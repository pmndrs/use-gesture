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
var hasFocusWithin = require('reakit-utils/hasFocusWithin');
var isPortalEvent = require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
var Clickable_Clickable = require('../Clickable/Clickable.js');
var getDocument = require('reakit-utils/getDocument');
var getCurrentId = require('../getCurrentId-eade2850.js');
var __keys = require('../__keys-3b597476.js');
var userFocus = require('../userFocus-0afea51a.js');
var isTextField = require('reakit-utils/isTextField');
var ensureFocus = require('reakit-utils/ensureFocus');
require('../Id/IdProvider.js');
var Id_Id = require('../Id/Id.js');
require('reakit-utils/fireEvent');
var setTextFieldValue = require('../setTextFieldValue-b0584ae1.js');

function getWidget(itemElement) {
  return itemElement.querySelector("[data-composite-item-widget]");
}

function useItem(options) {
  return React.useMemo(function () {
    var _options$items;

    return (_options$items = options.items) === null || _options$items === void 0 ? void 0 : _options$items.find(function (item) {
      return options.id && item.id === options.id;
    });
  }, [options.items, options.id]);
}

function targetIsAnotherItem(event, items) {
  if (isSelfTarget.isSelfTarget(event)) return false;

  for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
    var item = _step.value;

    if (item.ref.current === event.target) {
      return true;
    }
  }

  return false;
}

var useCompositeItem = createHook.createHook({
  name: "CompositeItem",
  compose: [Clickable_Clickable.useClickable, Id_Id.unstable_useId],
  keys: __keys.COMPOSITE_ITEM_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    if (!next.id || prev.id !== next.id) {
      return Clickable_Clickable.useClickable.unstable_propsAreEqual(prev, next);
    }

    var prevCurrentId = prev.currentId,
        prevMoves = prev.unstable_moves,
        prevProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(prev, ["currentId", "unstable_moves"]);

    var nextCurrentId = next.currentId,
        nextMoves = next.unstable_moves,
        nextProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(next, ["currentId", "unstable_moves"]);

    if (nextCurrentId !== prevCurrentId) {
      if (next.id === nextCurrentId || next.id === prevCurrentId) {
        return false;
      }
    } else if (prevMoves !== nextMoves) {
      return false;
    }

    return Clickable_Clickable.useClickable.unstable_propsAreEqual(prevProps, nextProps);
  },
  useOptions: function useOptions(options) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      id: options.id,
      currentId: getCurrentId.getCurrentId(options),
      unstable_clickOnSpace: options.unstable_hasActiveWidget ? false : options.unstable_clickOnSpace
    });
  },
  useProps: function useProps(options, _ref) {
    var _options$items2;

    var htmlRef = _ref.ref,
        _ref$tabIndex = _ref.tabIndex,
        htmlTabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
        htmlOnMouseDown = _ref.onMouseDown,
        htmlOnFocus = _ref.onFocus,
        htmlOnBlurCapture = _ref.onBlurCapture,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlOnClick = _ref.onClick,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref", "tabIndex", "onMouseDown", "onFocus", "onBlurCapture", "onKeyDown", "onClick"]);

    var ref = React.useRef(null);
    var id = options.id;
    var trulyDisabled = options.disabled && !options.focusable;
    var isCurrentItem = options.currentId === id;
    var isCurrentItemRef = useLiveRef.useLiveRef(isCurrentItem);
    var hasFocusedComposite = React.useRef(false);
    var item = useItem(options);
    var onMouseDownRef = useLiveRef.useLiveRef(htmlOnMouseDown);
    var onFocusRef = useLiveRef.useLiveRef(htmlOnFocus);
    var onBlurCaptureRef = useLiveRef.useLiveRef(htmlOnBlurCapture);
    var onKeyDownRef = useLiveRef.useLiveRef(htmlOnKeyDown);
    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var shouldTabIndex = !options.unstable_virtual && !options.unstable_hasActiveWidget && isCurrentItem || // We don't want to set tabIndex="-1" when using CompositeItem as a
    // standalone component, without state props.
    !((_options$items2 = options.items) !== null && _options$items2 !== void 0 && _options$items2.length);
    React.useEffect(function () {
      var _options$registerItem;

      if (!id) return undefined;
      (_options$registerItem = options.registerItem) === null || _options$registerItem === void 0 ? void 0 : _options$registerItem.call(options, {
        id: id,
        ref: ref,
        disabled: !!trulyDisabled
      });
      return function () {
        var _options$unregisterIt;

        (_options$unregisterIt = options.unregisterItem) === null || _options$unregisterIt === void 0 ? void 0 : _options$unregisterIt.call(options, id);
      };
    }, [id, trulyDisabled, options.registerItem, options.unregisterItem]);
    React.useEffect(function () {
      var element = ref.current;

      if (!element) {
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "Can't focus composite item component because `ref` wasn't passed to component.", "See https://reakit.io/docs/composite") : void 0;
        return;
      } // `moves` will be incremented whenever next, previous, up, down, first,
      // last or move have been called. This means that the composite item will
      // be focused whenever some of these functions are called. We're using
      // isCurrentItemRef instead of isCurrentItem because we don't want to
      // focus the item if isCurrentItem changes (and options.moves doesn't).


      if (options.unstable_moves && isCurrentItemRef.current) {
        userFocus.userFocus(element);
      }
    }, [options.unstable_moves]);
    var onMouseDown = React.useCallback(function (event) {
      var _onMouseDownRef$curre;

      (_onMouseDownRef$curre = onMouseDownRef.current) === null || _onMouseDownRef$curre === void 0 ? void 0 : _onMouseDownRef$curre.call(onMouseDownRef, event);
      userFocus.setUserFocus(event.currentTarget, true);
    }, []);
    var onFocus = React.useCallback(function (event) {
      var _onFocusRef$current, _options$setCurrentId;

      var shouldFocusComposite = userFocus.hasUserFocus(event.currentTarget);
      userFocus.setUserFocus(event.currentTarget, false);
      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      if (event.defaultPrevented) return;
      if (isPortalEvent.isPortalEvent(event)) return;
      if (!id) return;
      if (targetIsAnotherItem(event, options.items)) return;
      (_options$setCurrentId = options.setCurrentId) === null || _options$setCurrentId === void 0 ? void 0 : _options$setCurrentId.call(options, id); // When using aria-activedescendant, we want to make sure that the
      // composite container receives focus, not the composite item.
      // But we don't want to do this if the target is another focusable
      // element inside the composite item, such as CompositeItemWidget.

      if (shouldFocusComposite && options.unstable_virtual && options.baseId && isSelfTarget.isSelfTarget(event)) {
        var target = event.target;
        var composite = getDocument.getDocument(target).getElementById(options.baseId);

        if (composite) {
          hasFocusedComposite.current = true;
          ensureFocus.ensureFocus(composite);
        }
      }
    }, [id, options.items, options.setCurrentId, options.unstable_virtual, options.baseId]);
    var onBlurCapture = React.useCallback(function (event) {
      var _onBlurCaptureRef$cur;

      (_onBlurCaptureRef$cur = onBlurCaptureRef.current) === null || _onBlurCaptureRef$cur === void 0 ? void 0 : _onBlurCaptureRef$cur.call(onBlurCaptureRef, event);
      if (event.defaultPrevented) return;

      if (options.unstable_virtual && hasFocusedComposite.current) {
        // When hasFocusedComposite is true, composite has been focused right
        // after focusing this item. This is an intermediate blur event, so
        // we ignore it.
        hasFocusedComposite.current = false;
        event.preventDefault();
        event.stopPropagation();
      }
    }, [options.unstable_virtual]);
    var onKeyDown = React.useCallback(function (event) {
      var _onKeyDownRef$current;

      if (!isSelfTarget.isSelfTarget(event)) return;
      var isVertical = options.orientation !== "horizontal";
      var isHorizontal = options.orientation !== "vertical";
      var isGrid = !!(item !== null && item !== void 0 && item.groupId);
      var keyMap = {
        ArrowUp: (isGrid || isVertical) && options.up,
        ArrowRight: (isGrid || isHorizontal) && options.next,
        ArrowDown: (isGrid || isVertical) && options.down,
        ArrowLeft: (isGrid || isHorizontal) && options.previous,
        Home: function Home() {
          if (!isGrid || event.ctrlKey) {
            var _options$first;

            (_options$first = options.first) === null || _options$first === void 0 ? void 0 : _options$first.call(options);
          } else {
            var _options$previous;

            (_options$previous = options.previous) === null || _options$previous === void 0 ? void 0 : _options$previous.call(options, true);
          }
        },
        End: function End() {
          if (!isGrid || event.ctrlKey) {
            var _options$last;

            (_options$last = options.last) === null || _options$last === void 0 ? void 0 : _options$last.call(options);
          } else {
            var _options$next;

            (_options$next = options.next) === null || _options$next === void 0 ? void 0 : _options$next.call(options, true);
          }
        },
        PageUp: function PageUp() {
          if (isGrid) {
            var _options$up;

            (_options$up = options.up) === null || _options$up === void 0 ? void 0 : _options$up.call(options, true);
          } else {
            var _options$first2;

            (_options$first2 = options.first) === null || _options$first2 === void 0 ? void 0 : _options$first2.call(options);
          }
        },
        PageDown: function PageDown() {
          if (isGrid) {
            var _options$down;

            (_options$down = options.down) === null || _options$down === void 0 ? void 0 : _options$down.call(options, true);
          } else {
            var _options$last2;

            (_options$last2 = options.last) === null || _options$last2 === void 0 ? void 0 : _options$last2.call(options);
          }
        }
      };
      var action = keyMap[event.key];

      if (action) {
        event.preventDefault();
        action();
        return;
      }

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;

      if (event.key.length === 1 && event.key !== " ") {
        var widget = getWidget(event.currentTarget);

        if (widget && isTextField.isTextField(widget)) {
          widget.focus();
          setTextFieldValue.setTextFieldValue(widget, "");
        }
      } else if (event.key === "Delete" || event.key === "Backspace") {
        var _widget = getWidget(event.currentTarget);

        if (_widget && isTextField.isTextField(_widget)) {
          event.preventDefault();
          setTextFieldValue.setTextFieldValue(_widget, "");
        }
      }
    }, [options.orientation, item, options.up, options.next, options.down, options.previous, options.first, options.last]);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      var element = event.currentTarget;
      var widget = getWidget(element);

      if (widget && !hasFocusWithin.hasFocusWithin(widget)) {
        // If there's a widget inside the composite item, we make sure it's
        // focused when pressing enter, space or clicking on the composite item.
        widget.focus();
      }
    }, []);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      id: id,
      tabIndex: shouldTabIndex ? htmlTabIndex : -1,
      "aria-selected": options.unstable_virtual && isCurrentItem ? true : undefined,
      onMouseDown: onMouseDown,
      onFocus: onFocus,
      onBlurCapture: onBlurCapture,
      onKeyDown: onKeyDown,
      onClick: onClick
    }, htmlProps);
  }
});
var CompositeItem = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useCompositeItem
});

exports.CompositeItem = CompositeItem;
exports.useCompositeItem = useCompositeItem;
