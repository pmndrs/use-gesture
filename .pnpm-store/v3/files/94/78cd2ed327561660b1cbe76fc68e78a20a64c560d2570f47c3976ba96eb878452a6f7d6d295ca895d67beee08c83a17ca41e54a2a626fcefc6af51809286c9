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
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
var hasFocusWithin = require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
var Clickable_Clickable = require('../Clickable/Clickable.js');
require('../Id/IdProvider.js');
var Id_Id = require('../Id/Id.js');
var createOnKeyDown = require('reakit-utils/createOnKeyDown');

// Automatically generated
var ROVER_STATE_KEYS = ["baseId", "unstable_idCountRef", "orientation", "stops", "currentId", "unstable_pastId", "unstable_moves", "loop", "setBaseId", "register", "unregister", "move", "next", "previous", "first", "last", "unstable_reset", "unstable_orientate"];
var ROVER_KEYS = [].concat(ROVER_STATE_KEYS, ["stopId"]);

function useAllCallbacks() {
  for (var _len = arguments.length, callbacks = new Array(_len), _key = 0; _key < _len; _key++) {
    callbacks[_key] = arguments[_key];
  }

  return React.useCallback(function () {
    var fns = callbacks.filter(Boolean);

    for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(fns), _step; !(_step = _iterator()).done;) {
      var callback = _step.value;
      callback.apply(void 0, arguments);
    }
  }, callbacks);
}

var useRover = createHook.createHook({
  name: "Rover",
  compose: [Clickable_Clickable.useClickable, Id_Id.unstable_useId],
  keys: ROVER_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        _ref$tabIndex = _ref.tabIndex,
        htmlTabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
        htmlOnFocus = _ref.onFocus,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref", "tabIndex", "onFocus", "onKeyDown"]);

    var ref = React.useRef(null);
    var id = options.stopId || options.id;
    var trulyDisabled = options.disabled && !options.focusable;
    var noFocused = options.currentId == null;
    var focused = options.currentId === id;
    var isFirst = (options.stops || [])[0] && options.stops[0].id === id;
    var shouldTabIndex = focused || isFirst && noFocused;
    React.useEffect(function () {
      if (trulyDisabled || !id) return undefined;
      options.register && options.register(id, ref);
      return function () {
        return options.unregister && options.unregister(id);
      };
    }, [id, trulyDisabled, options.register, options.unregister]);
    React.useEffect(function () {
      var rover = ref.current;

      if (!rover) {
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "Can't focus rover component because `ref` wasn't passed to component.", "See https://reakit.io/docs/rover") : void 0;
        return;
      }

      if (options.unstable_moves && focused && !hasFocusWithin.hasFocusWithin(rover)) {
        rover.focus();
      }
    }, [focused, options.unstable_moves]);
    var onFocus = React.useCallback(function (event) {
      if (!id || !event.currentTarget.contains(event.target)) return; // this is already focused, so we move silently

      options.move(id, true);
    }, [options.move, id]);
    var onKeyDown = React.useMemo(function () {
      return createOnKeyDown.createOnKeyDown({
        onKeyDown: htmlOnKeyDown,
        stopPropagation: true,
        shouldKeyDown: function shouldKeyDown(event) {
          return (// Ignore portals
            // https://github.com/facebook/react/issues/11387
            event.currentTarget.contains(event.target)
          );
        },
        keyMap: {
          ArrowUp: options.orientation !== "horizontal" && options.previous,
          ArrowRight: options.orientation !== "vertical" && options.next,
          ArrowDown: options.orientation !== "horizontal" && options.next,
          ArrowLeft: options.orientation !== "vertical" && options.previous,
          Home: options.first,
          End: options.last,
          PageUp: options.first,
          PageDown: options.last
        }
      });
    }, [htmlOnKeyDown, options.orientation, options.previous, options.next, options.first, options.last]);
    return _rollupPluginBabelHelpers._objectSpread2({
      id: id,
      ref: useForkRef.useForkRef(ref, htmlRef),
      tabIndex: shouldTabIndex ? htmlTabIndex : -1,
      onFocus: useAllCallbacks(onFocus, htmlOnFocus),
      onKeyDown: onKeyDown
    }, htmlProps);
  }
});
var Rover = createComponent.createComponent({
  as: "button",
  useHook: useRover
});

exports.Rover = Rover;
exports.useRover = useRover;
