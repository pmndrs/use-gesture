import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2, b as _createForOfIteratorHelperLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import { warning } from 'reakit-warning';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import { hasFocusWithin } from 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import { useClickable } from '../Clickable/Clickable.js';
import '../Id/IdProvider.js';
import { unstable_useId } from '../Id/Id.js';
import { createOnKeyDown } from 'reakit-utils/createOnKeyDown';

// Automatically generated
var ROVER_STATE_KEYS = ["baseId", "unstable_idCountRef", "orientation", "stops", "currentId", "unstable_pastId", "unstable_moves", "loop", "setBaseId", "register", "unregister", "move", "next", "previous", "first", "last", "unstable_reset", "unstable_orientate"];
var ROVER_KEYS = [].concat(ROVER_STATE_KEYS, ["stopId"]);

function useAllCallbacks() {
  for (var _len = arguments.length, callbacks = new Array(_len), _key = 0; _key < _len; _key++) {
    callbacks[_key] = arguments[_key];
  }

  return useCallback(function () {
    var fns = callbacks.filter(Boolean);

    for (var _iterator = _createForOfIteratorHelperLoose(fns), _step; !(_step = _iterator()).done;) {
      var callback = _step.value;
      callback.apply(void 0, arguments);
    }
  }, callbacks);
}

var useRover = createHook({
  name: "Rover",
  compose: [useClickable, unstable_useId],
  keys: ROVER_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        _ref$tabIndex = _ref.tabIndex,
        htmlTabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
        htmlOnFocus = _ref.onFocus,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref", "tabIndex", "onFocus", "onKeyDown"]);

    var ref = useRef(null);
    var id = options.stopId || options.id;
    var trulyDisabled = options.disabled && !options.focusable;
    var noFocused = options.currentId == null;
    var focused = options.currentId === id;
    var isFirst = (options.stops || [])[0] && options.stops[0].id === id;
    var shouldTabIndex = focused || isFirst && noFocused;
    useEffect(function () {
      if (trulyDisabled || !id) return undefined;
      options.register && options.register(id, ref);
      return function () {
        return options.unregister && options.unregister(id);
      };
    }, [id, trulyDisabled, options.register, options.unregister]);
    useEffect(function () {
      var rover = ref.current;

      if (!rover) {
        process.env.NODE_ENV !== "production" ? warning(true, "Can't focus rover component because `ref` wasn't passed to component.", "See https://reakit.io/docs/rover") : void 0;
        return;
      }

      if (options.unstable_moves && focused && !hasFocusWithin(rover)) {
        rover.focus();
      }
    }, [focused, options.unstable_moves]);
    var onFocus = useCallback(function (event) {
      if (!id || !event.currentTarget.contains(event.target)) return; // this is already focused, so we move silently

      options.move(id, true);
    }, [options.move, id]);
    var onKeyDown = useMemo(function () {
      return createOnKeyDown({
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
    return _objectSpread2({
      id: id,
      ref: useForkRef(ref, htmlRef),
      tabIndex: shouldTabIndex ? htmlTabIndex : -1,
      onFocus: useAllCallbacks(onFocus, htmlOnFocus),
      onKeyDown: onKeyDown
    }, htmlProps);
  }
});
var Rover = createComponent({
  as: "button",
  useHook: useRover
});

export { Rover, useRover };
