'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

// vector add
function addV(v1, v2) {
  return v1.map(function (v, i) {
    return v + v2[i];
  });
} // vector substract

function subV(v1, v2) {
  return v1.map(function (v, i) {
    return v - v2[i];
  });
}
/**
 * Calculates distance
 * @param movement the difference between current and initial vectors
 * @returns distance
 */

function calculateDistance(movement) {
  return Math.hypot.apply(Math, movement);
}
function calculateAllGeometry(movement, delta) {
  if (delta === void 0) {
    delta = movement;
  }

  var dl = calculateDistance(delta);
  var alpha = dl === 0 ? 0 : 1 / dl;
  var direction = delta.map(function (v) {
    return alpha * v;
  });
  var distance = calculateDistance(movement);
  return {
    distance: distance,
    direction: direction
  };
}
/**
 * Calculates all kinematics
 * @template T the expected vector type
 * @param movement the difference between current and initial vectors
 * @param delta the difference between current and previous vectors
 * @param delta_t the time difference between current and previous timestamps
 * @returns all kinematics
 */

function calculateAllKinematics(movement, delta, dt) {
  var dl = calculateDistance(delta);
  var alpha = dl === 0 ? 0 : 1 / dl;
  var beta = dt === 0 ? 0 : 1 / dt;
  var velocity = beta * dl;
  var velocities = delta.map(function (v) {
    return beta * v;
  });
  var direction = delta.map(function (v) {
    return alpha * v;
  });
  var distance = calculateDistance(movement);
  return {
    velocities: velocities,
    velocity: velocity,
    distance: distance,
    direction: direction
  };
}
/**
 * Because IE doesn't support `Math.sign` function, so we use the polyfill version of the function.
 * This polyfill function is suggested by Mozilla:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign#Polyfill
 * @param x target number
 */

function sign(x) {
  if (Math.sign) return Math.sign(x);
  return Number(x > 0) - Number(x < 0) || +x;
}

function minMax(value, min, max) {
  return Math.max(min, Math.min(value, max));
} // Based on @aholachek ;)
// https://twitter.com/chpwn/status/285540192096497664
// iOS constant = 0.55
// https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5


function rubberband2(distance, constant) {
  // default constant from the article is 0.7
  return Math.pow(distance, constant * 5);
}

function rubberband(distance, dimension, constant) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) return rubberband2(distance, constant);
  return distance * dimension * constant / (dimension + constant * distance);
}

function rubberbandIfOutOfBounds(position, min, max, constant) {
  if (constant === void 0) {
    constant = 0.15;
  }

  if (constant === 0) return minMax(position, min, max);
  if (position < min) return -rubberband(min - position, max - min, constant) + min;
  if (position > max) return +rubberband(position - max, max - min, constant) + max;
  return position;
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function noop() {}
/**
 * TODO Beware that only optimized cases are covered in tests =)
 * TODO Need to cover general case as well
 *
 * @param fns
 */

function chainFns() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  if (fns.length === 0) return noop;
  if (fns.length === 1) return fns[0];
  return function () {
    var result;

    for (var _iterator = _createForOfIteratorHelperLoose(fns), _step; !(_step = _iterator()).done;) {
      var fn = _step.value;
      result = fn.apply(this, arguments) || result;
    }

    return result;
  };
}
/**
 * Expects a simple value or 2D vector (an array with 2 elements) and
 * always returns 2D vector. If simple value is passed, returns a
 * vector with this value as both coordinates.
 *
 * @param value
 */

function ensureVector(value, fallback) {
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error('Must define fallback value if undefined is expected');
    }

    value = fallback;
  }

  if (Array.isArray(value)) return value;
  return [value, value];
}
/**
 * Helper for defining a default value
 *
 * @param value
 * @param fallback
 */

function assignDefault(value, fallback) {
  return Object.assign({}, fallback, value || {});
}
/**
 * Resolves getters (functions) by calling them
 * If simple value is given it just passes through
 *
 * @param v
 */

function valueFn(v) {
  if (typeof v === 'function') {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    // @ts-ignore
    return v.apply(void 0, args);
  } else {
    return v;
  }
}

function resolveWith(config, resolvers) {
  if (config === void 0) {
    config = {};
  }

  var result = {};

  for (var _i = 0, _Object$entries = Object.entries(resolvers); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        key = _Object$entries$_i[0],
        resolver = _Object$entries$_i[1];

    switch (typeof resolver) {
      case 'function':
        result[key] = resolver.call(result, config[key], key, config);
        break;

      case 'object':
        result[key] = resolveWith(config[key], resolver);
        break;

      case 'boolean':
        if (resolver) result[key] = config[key];
        break;
    }
  }

  return result;
}

/**
 * Whether the browser supports GestureEvent (ie Safari)
 * @returns true if the browser supports gesture event
 */
function supportsGestureEvents() {
  try {
    // TODO [TS] possibly find GestureEvent definitions?
    // @ts-ignore: no type definitions for webkit GestureEvents
    return 'constructor' in GestureEvent;
  } catch (e) {
    return false;
  }
}
function supportsTouchEvents() {
  return typeof window !== 'undefined' && 'ontouchstart' in window;
}
function supportsPointerEvents() {
  return typeof window !== 'undefined' && 'onpointerdown' in window;
}

function getEventTouches(event) {
  if ('pointerId' in event) return null;
  return event.type === 'touchend' ? event.changedTouches : event.targetTouches;
}

function getTouchIds(event) {
  return Array.from(getEventTouches(event)).map(function (t) {
    return t.identifier;
  });
}
function getGenericEventData(event) {
  var buttons = 'buttons' in event ? event.buttons : 0;
  var shiftKey = event.shiftKey,
      altKey = event.altKey,
      metaKey = event.metaKey,
      ctrlKey = event.ctrlKey; // TODO check if this might create some overrides?

  return {
    buttons: buttons,
    shiftKey: shiftKey,
    altKey: altKey,
    metaKey: metaKey,
    ctrlKey: ctrlKey
  };
}

var identity = function identity(xy) {
  return xy;
};
/**
 * Gets pointer event values.
 * @param event
 * @returns pointer event values
 */


function getPointerEventValues(event, transform) {
  if (transform === void 0) {
    transform = identity;
  }

  var touchEvents = getEventTouches(event);

  var _ref = touchEvents ? touchEvents[0] : event,
      clientX = _ref.clientX,
      clientY = _ref.clientY;

  return transform([clientX, clientY]);
}
/**
 * Gets two touches event data
 * @param event
 * @returns two touches event data
 */

function getTwoTouchesEventValues(event, pointerIds, transform) {
  if (transform === void 0) {
    transform = identity;
  }

  var _Array$from$filter = Array.from(event.touches).filter(function (t) {
    return pointerIds.includes(t.identifier);
  }),
      A = _Array$from$filter[0],
      B = _Array$from$filter[1];

  if (!A || !B) throw Error("The event doesn't have two pointers matching the pointerIds");
  var dx = B.clientX - A.clientX;
  var dy = B.clientY - A.clientY;
  var cx = (B.clientX + A.clientX) / 2;
  var cy = (B.clientY + A.clientY) / 2; // const e: any = 'nativeEvent' in event ? event.nativeEvent : event

  var distance = Math.hypot(dx, dy); // FIXME rotation has inconsistant values so we're not using it atm
  // const angle = (e.rotation as number) ?? -(Math.atan2(dx, dy) * 180) / Math.PI

  var angle = -(Math.atan2(dx, dy) * 180) / Math.PI;
  var values = transform([distance, angle]);
  var origin = transform([cx, cy]);
  return {
    values: values,
    origin: origin
  };
}
/**
 * Gets scroll event values
 * @param event
 * @returns scroll event values
 */

function getScrollEventValues(event, transform) {
  if (transform === void 0) {
    transform = identity;
  }

  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  var _event$currentTarget = event.currentTarget,
      scrollX = _event$currentTarget.scrollX,
      scrollY = _event$currentTarget.scrollY,
      scrollLeft = _event$currentTarget.scrollLeft,
      scrollTop = _event$currentTarget.scrollTop;
  return transform([scrollX || scrollLeft || 0, scrollY || scrollTop || 0]);
} // wheel delta defaults from https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js

var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
/**
 * Gets wheel event values.
 * @param event
 * @returns wheel event values
 */

function getWheelEventValues(event, transform) {
  if (transform === void 0) {
    transform = identity;
  }

  var deltaX = event.deltaX,
      deltaY = event.deltaY,
      deltaMode = event.deltaMode; // normalize wheel values, especially for Firefox

  if (deltaMode === 1) {
    deltaX *= LINE_HEIGHT;
    deltaY *= LINE_HEIGHT;
  } else if (deltaMode === 2) {
    deltaX *= PAGE_HEIGHT;
    deltaY *= PAGE_HEIGHT;
  }

  return transform([deltaX, deltaY]);
}
/**
 * Gets webkit gesture event values.
 * @param event
 * @returns webkit gesture event values
 */

function getWebkitGestureEventValues(event, transform) {
  if (transform === void 0) {
    transform = identity;
  }

  return transform([event.scale, event.rotation]);
}

var DEFAULT_DRAG_DELAY = 180;
var DEFAULT_RUBBERBAND = 0.15;
var DEFAULT_SWIPE_VELOCITY = 0.5;
var DEFAULT_SWIPE_DISTANCE = 50;
var DEFAULT_SWIPE_DURATION = 250;
var InternalGestureOptionsNormalizers = {
  threshold: function threshold(value) {
    if (value === void 0) {
      value = 0;
    }

    return ensureVector(value);
  },
  rubberband: function rubberband(value) {
    if (value === void 0) {
      value = 0;
    }

    switch (value) {
      case true:
        return ensureVector(DEFAULT_RUBBERBAND);

      case false:
        return ensureVector(0);

      default:
        return ensureVector(value);
    }
  },
  enabled: function enabled(value) {
    if (value === void 0) {
      value = true;
    }

    return value;
  },
  triggerAllEvents: function triggerAllEvents(value) {
    if (value === void 0) {
      value = false;
    }

    return value;
  },
  initial: function initial(value) {
    if (value === void 0) {
      value = 0;
    }

    if (typeof value === 'function') return value;
    return ensureVector(value);
  },
  transform: true
};

var InternalCoordinatesOptionsNormalizers = /*#__PURE__*/_extends({}, InternalGestureOptionsNormalizers, {
  axis: true,
  lockDirection: function lockDirection(value) {
    if (value === void 0) {
      value = false;
    }

    return value;
  },
  bounds: function bounds(value) {
    if (value === void 0) {
      value = {};
    }

    if (typeof value === 'function') return function (state) {
      return InternalCoordinatesOptionsNormalizers.bounds(value(state));
    };
    var _value2 = value,
        _value2$left = _value2.left,
        left = _value2$left === void 0 ? -Infinity : _value2$left,
        _value2$right = _value2.right,
        right = _value2$right === void 0 ? Infinity : _value2$right,
        _value2$top = _value2.top,
        top = _value2$top === void 0 ? -Infinity : _value2$top,
        _value2$bottom = _value2.bottom,
        bottom = _value2$bottom === void 0 ? Infinity : _value2$bottom;
    return [[left, right], [top, bottom]];
  }
});

var isBrowser = typeof window !== 'undefined' && window.document && window.document.createElement;
var InternalGenericOptionsNormalizers = {
  enabled: function enabled(value) {
    if (value === void 0) {
      value = true;
    }

    return value;
  },
  domTarget: true,
  window: /*#__PURE__*/function (_window) {
    function window(_x) {
      return _window.apply(this, arguments);
    }

    window.toString = function () {
      return _window.toString();
    };

    return window;
  }(function (value) {
    if (value === void 0) {
      value = isBrowser ? window : undefined;
    }

    return value;
  }),
  eventOptions: function eventOptions(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$passive = _ref.passive,
        passive = _ref$passive === void 0 ? true : _ref$passive,
        _ref$capture = _ref.capture,
        capture = _ref$capture === void 0 ? false : _ref$capture;

    return {
      passive: passive,
      capture: capture
    };
  },
  transform: true
};

var InternalDistanceAngleOptionsNormalizers = /*#__PURE__*/_extends({}, InternalGestureOptionsNormalizers, {
  bounds: function bounds(_value, _key, _ref2) {
    var _ref2$distanceBounds = _ref2.distanceBounds,
        distanceBounds = _ref2$distanceBounds === void 0 ? {} : _ref2$distanceBounds,
        _ref2$angleBounds = _ref2.angleBounds,
        angleBounds = _ref2$angleBounds === void 0 ? {} : _ref2$angleBounds;

    var _distanceBounds = function _distanceBounds(state) {
      var D = assignDefault(valueFn(distanceBounds, state), {
        min: -Infinity,
        max: Infinity
      });
      return [D.min, D.max];
    };

    var _angleBounds = function _angleBounds(state) {
      var A = assignDefault(valueFn(angleBounds, state), {
        min: -Infinity,
        max: Infinity
      });
      return [A.min, A.max];
    };

    if (typeof distanceBounds !== 'function' && typeof angleBounds !== 'function') return [_distanceBounds(), _angleBounds()];
    return function (state) {
      return [_distanceBounds(state), _angleBounds(state)];
    };
  }
});

var InternalDragOptionsNormalizers = /*#__PURE__*/_extends({}, InternalCoordinatesOptionsNormalizers, {
  useTouch: function useTouch(value) {
    if (value === void 0) {
      value = false;
    }

    var supportsTouch = supportsTouchEvents();
    var supportsPointer = supportsPointerEvents();
    if (value && supportsTouch) return true;
    if (supportsTouch && !supportsPointer) return true;
    return false;
  },
  experimental_preventWindowScrollY: function experimental_preventWindowScrollY(value) {
    if (value === void 0) {
      value = false;
    }

    return value;
  },
  threshold: function threshold(v, _k, _ref3) {
    var _ref3$filterTaps = _ref3.filterTaps,
        filterTaps = _ref3$filterTaps === void 0 ? false : _ref3$filterTaps,
        _ref3$lockDirection = _ref3.lockDirection,
        lockDirection = _ref3$lockDirection === void 0 ? false : _ref3$lockDirection,
        _ref3$axis = _ref3.axis,
        axis = _ref3$axis === void 0 ? undefined : _ref3$axis;
    var A = ensureVector(v, filterTaps ? 3 : lockDirection ? 1 : axis ? 1 : 0);
    this.filterTaps = filterTaps;
    return A;
  },
  swipeVelocity: function swipeVelocity(v) {
    if (v === void 0) {
      v = DEFAULT_SWIPE_VELOCITY;
    }

    return ensureVector(v);
  },
  swipeDistance: function swipeDistance(v) {
    if (v === void 0) {
      v = DEFAULT_SWIPE_DISTANCE;
    }

    return ensureVector(v);
  },
  swipeDuration: function swipeDuration(value) {
    if (value === void 0) {
      value = DEFAULT_SWIPE_DURATION;
    }

    return value;
  },
  delay: function delay(value) {
    if (value === void 0) {
      value = 0;
    }

    switch (value) {
      case true:
        return DEFAULT_DRAG_DELAY;

      case false:
        return 0;

      default:
        return value;
    }
  }
});

function getInternalGenericOptions(config) {
  if (config === void 0) {
    config = {};
  }

  // TODO warn when passive is set to true and domTarget is undefined
  return resolveWith(config, InternalGenericOptionsNormalizers);
}
function getInternalCoordinatesOptions(config) {
  if (config === void 0) {
    config = {};
  }

  return resolveWith(config, InternalCoordinatesOptionsNormalizers);
}
function getInternalDistanceAngleOptions(config) {
  if (config === void 0) {
    config = {};
  }

  return resolveWith(config, InternalDistanceAngleOptionsNormalizers);
}
function getInternalDragOptions(config) {
  if (config === void 0) {
    config = {};
  }

  return resolveWith(config, InternalDragOptionsNormalizers);
}

function _buildMoveConfig(_ref) {
  var domTarget = _ref.domTarget,
      eventOptions = _ref.eventOptions,
      window = _ref.window,
      enabled = _ref.enabled,
      rest = _objectWithoutPropertiesLoose(_ref, ["domTarget", "eventOptions", "window", "enabled"]);

  var opts = getInternalGenericOptions({
    domTarget: domTarget,
    eventOptions: eventOptions,
    window: window,
    enabled: enabled
  });
  opts.move = getInternalCoordinatesOptions(rest);
  return opts;
}
function _buildHoverConfig(_ref2) {
  var domTarget = _ref2.domTarget,
      eventOptions = _ref2.eventOptions,
      window = _ref2.window,
      enabled = _ref2.enabled,
      rest = _objectWithoutPropertiesLoose(_ref2, ["domTarget", "eventOptions", "window", "enabled"]);

  var opts = getInternalGenericOptions({
    domTarget: domTarget,
    eventOptions: eventOptions,
    window: window,
    enabled: enabled
  });
  opts.hover = _extends({
    enabled: true
  }, rest);
  return opts;
}
function _buildDragConfig(_ref3) {
  var domTarget = _ref3.domTarget,
      eventOptions = _ref3.eventOptions,
      window = _ref3.window,
      enabled = _ref3.enabled,
      rest = _objectWithoutPropertiesLoose(_ref3, ["domTarget", "eventOptions", "window", "enabled"]);

  var opts = getInternalGenericOptions({
    domTarget: domTarget,
    eventOptions: eventOptions,
    window: window,
    enabled: enabled
  });
  opts.drag = getInternalDragOptions(rest);
  return opts;
}
function _buildPinchConfig(_ref4) {
  var domTarget = _ref4.domTarget,
      eventOptions = _ref4.eventOptions,
      window = _ref4.window,
      enabled = _ref4.enabled,
      rest = _objectWithoutPropertiesLoose(_ref4, ["domTarget", "eventOptions", "window", "enabled"]);

  var opts = getInternalGenericOptions({
    domTarget: domTarget,
    eventOptions: eventOptions,
    window: window,
    enabled: enabled
  });
  opts.pinch = getInternalDistanceAngleOptions(rest);
  return opts;
}
function _buildScrollConfig(_ref5) {
  var domTarget = _ref5.domTarget,
      eventOptions = _ref5.eventOptions,
      window = _ref5.window,
      enabled = _ref5.enabled,
      rest = _objectWithoutPropertiesLoose(_ref5, ["domTarget", "eventOptions", "window", "enabled"]);

  var opts = getInternalGenericOptions({
    domTarget: domTarget,
    eventOptions: eventOptions,
    window: window,
    enabled: enabled
  });
  opts.scroll = getInternalCoordinatesOptions(rest);
  return opts;
}
function _buildWheelConfig(_ref6) {
  var domTarget = _ref6.domTarget,
      eventOptions = _ref6.eventOptions,
      window = _ref6.window,
      enabled = _ref6.enabled,
      rest = _objectWithoutPropertiesLoose(_ref6, ["domTarget", "eventOptions", "window", "enabled"]);

  var opts = getInternalGenericOptions({
    domTarget: domTarget,
    eventOptions: eventOptions,
    window: window,
    enabled: enabled
  });
  opts.wheel = getInternalCoordinatesOptions(rest);
  return opts;
}
function buildComplexConfig(config, actions) {
  if (config === void 0) {
    config = {};
  }

  if (actions === void 0) {
    actions = new Set();
  }

  var _config = config,
      drag = _config.drag,
      wheel = _config.wheel,
      move = _config.move,
      scroll = _config.scroll,
      pinch = _config.pinch,
      hover = _config.hover,
      eventOptions = _config.eventOptions,
      window = _config.window,
      transform = _config.transform,
      domTarget = _config.domTarget,
      enabled = _config.enabled;
  var mergedConfig = getInternalGenericOptions({
    domTarget: domTarget,
    eventOptions: eventOptions,
    transform: transform,
    window: window,
    enabled: enabled
  });
  if (actions.has('onDrag')) mergedConfig.drag = getInternalDragOptions(drag);
  if (actions.has('onWheel')) mergedConfig.wheel = getInternalCoordinatesOptions(wheel);
  if (actions.has('onScroll')) mergedConfig.scroll = getInternalCoordinatesOptions(scroll);
  if (actions.has('onMove')) mergedConfig.move = getInternalCoordinatesOptions(move);
  if (actions.has('onPinch')) mergedConfig.pinch = getInternalDistanceAngleOptions(pinch);
  if (actions.has('onHover')) mergedConfig.hover = _extends({
    enabled: true
  }, hover);
  return mergedConfig;
}

function getInitial(mixed) {
  return _extends({
    _active: false,
    _blocked: false,
    _intentional: [false, false],
    _movement: [0, 0],
    _initial: [0, 0],
    _bounds: [[-Infinity, Infinity], [-Infinity, Infinity]],
    _threshold: [0, 0],
    _lastEventType: undefined,
    _dragStarted: false,
    _dragPreventScroll: false,
    _dragIsTap: true,
    _dragDelayed: false,
    event: undefined,
    intentional: false,
    values: [0, 0],
    velocities: [0, 0],
    delta: [0, 0],
    movement: [0, 0],
    offset: [0, 0],
    lastOffset: [0, 0],
    direction: [0, 0],
    initial: [0, 0],
    previous: [0, 0],
    first: false,
    last: false,
    active: false,
    timeStamp: 0,
    startTime: 0,
    elapsedTime: 0,
    cancel: noop,
    canceled: false,
    memo: undefined,
    args: undefined
  }, mixed);
}

function getInitialState() {
  var shared = {
    hovering: false,
    scrolling: false,
    wheeling: false,
    dragging: false,
    moving: false,
    pinching: false,
    touches: 0,
    buttons: 0,
    down: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    ctrlKey: false,
    locked: false
  };
  var drag = getInitial({
    _pointerId: undefined,
    axis: undefined,
    xy: [0, 0],
    vxvy: [0, 0],
    velocity: 0,
    distance: 0,
    tap: false,
    swipe: [0, 0]
  });
  var pinch = getInitial({
    // @ts-expect-error when used _pointerIds we can assert its type will be [number, number]
    _pointerIds: [],
    da: [0, 0],
    vdva: [0, 0],
    // @ts-expect-error origin can never be passed as undefined in userland
    origin: undefined,
    turns: 0
  });
  var wheel = getInitial({
    axis: undefined,
    xy: [0, 0],
    vxvy: [0, 0],
    velocity: 0,
    distance: 0
  });
  var move = getInitial({
    axis: undefined,
    xy: [0, 0],
    vxvy: [0, 0],
    velocity: 0,
    distance: 0
  });
  var scroll = getInitial({
    axis: undefined,
    xy: [0, 0],
    vxvy: [0, 0],
    velocity: 0,
    distance: 0
  });
  return {
    shared: shared,
    drag: drag,
    pinch: pinch,
    wheel: wheel,
    move: move,
    scroll: scroll
  };
}

var RecognizersMap = /*#__PURE__*/new Map();

var identity$1 = function identity(xy) {
  return xy;
};
/**
 * @private
 * Recognizer abstract class.
 */


var Recognizer = /*#__PURE__*/function () {
  /**
   * Creates an instance of a gesture recognizer.
   * @param stateKey drag, move, pinch, etc.
   * @param controller the controller attached to the gesture
   * @param [args] the args that should be passed to the gesture handler
   */
  function Recognizer(controller, args) {
    var _this = this;

    if (args === void 0) {
      args = [];
    }

    this.controller = controller;
    this.args = args;
    this.debounced = true; // Convenience method to set a timeout for a given gesture

    this.setTimeout = function (callback, ms) {
      var _window;

      if (ms === void 0) {
        ms = 140;
      }

      clearTimeout(_this.controller.timeouts[_this.stateKey]);

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      _this.controller.timeouts[_this.stateKey] = (_window = window).setTimeout.apply(_window, [callback, ms].concat(args));
    }; // Convenience method to clear a timeout for a given gesture


    this.clearTimeout = function () {
      clearTimeout(_this.controller.timeouts[_this.stateKey]);
    };
    /**
     * Fires the gesture handler
     */


    this.fireGestureHandler = function (forceFlag) {
      if (forceFlag === void 0) {
        forceFlag = false;
      }

      /**
       * If the gesture has been blocked (this can happen when the gesture has started in an unwanted direction),
       * clean everything and don't do anything.
       */
      if (_this.state._blocked) {
        // we need debounced gestures to end by themselves
        if (!_this.debounced) {
          _this.state._active = false;

          _this.clean();
        }

        return null;
      } // If the gesture has no intentional dimension, don't fire the handler.


      if (!forceFlag && !_this.state.intentional && !_this.config.triggerAllEvents) return null;

      if (_this.state.intentional) {
        var prev_active = _this.state.active;
        var next_active = _this.state._active;
        _this.state.active = next_active;
        _this.state.first = next_active && !prev_active;
        _this.state.last = prev_active && !next_active;
        _this.controller.state.shared[_this.ingKey] = next_active; // Sets dragging, pinching, etc. to the gesture active state
      }

      var touches = _this.controller.pointerIds.size || _this.controller.touchIds.size;
      var down = _this.controller.state.shared.buttons > 0 || touches > 0;

      var state = _extends({}, _this.controller.state.shared, _this.state, _this.mapStateValues(_this.state), {
        locked: !!document.pointerLockElement,
        touches: touches,
        down: down
      }); // @ts-expect-error


      var newMemo = _this.handler(state); // Sets memo to the returned value of the handler (unless it's not undefined)


      _this.state.memo = newMemo !== void 0 ? newMemo : _this.state.memo;
      return state;
    };

    this.controller = controller;
    this.args = args;
  } // Returns the gesture config


  var _proto = Recognizer.prototype;

  // Convenience method to update the shared state
  _proto.updateSharedState = function updateSharedState(sharedState) {
    Object.assign(this.controller.state.shared, sharedState);
  } // Convenience method to update the gesture state
  ;

  _proto.updateGestureState = function updateGestureState(gestureState) {
    Object.assign(this.state, gestureState);
  }
  /**
   * Returns state properties depending on the movement and state.
   *
   * Should be overriden for custom behavior, doesn't do anything in the implementation
   * below.
   */
  ;

  _proto.checkIntentionality = function checkIntentionality(_intentional, _movement) {
    return {
      _intentional: _intentional,
      _blocked: false
    };
  }
  /**
   * Returns basic movement properties for the gesture based on the next values and current state.
   */
  ;

  _proto.getMovement = function getMovement(values) {
    var rubberband = this.config.rubberband;
    var _this$state = this.state,
        _bounds = _this$state._bounds,
        _initial = _this$state._initial,
        _active = _this$state._active,
        wasIntentional = _this$state._intentional,
        lastOffset = _this$state.lastOffset,
        prevMovement = _this$state.movement,
        _T = _this$state._threshold;
    var M = this.getInternalMovement(values, this.state);
    var i0 = wasIntentional[0] === false ? getIntentionalDisplacement(M[0], _T[0]) : wasIntentional[0];
    var i1 = wasIntentional[1] === false ? getIntentionalDisplacement(M[1], _T[1]) : wasIntentional[1]; // Get gesture specific state properties based on intentionality and movement.

    var intentionalityCheck = this.checkIntentionality([i0, i1], M);

    if (intentionalityCheck._blocked) {
      return _extends({}, intentionalityCheck, {
        _movement: M,
        delta: [0, 0]
      });
    }

    var _intentional = intentionalityCheck._intentional;
    var _movement = M;
    /**
     * The movement sent to the handler has 0 in its dimensions when intentionality is false.
     * It is calculated from the actual movement minus the threshold.
     */

    var movement = [_intentional[0] !== false ? M[0] - _intentional[0] : 0, _intentional[1] !== false ? M[1] - _intentional[1] : 0];
    var offset = addV(movement, lastOffset);
    /**
     * Rubberband should be 0 when the gesture is no longer active, so that movement
     * and offset can return within their bounds.
     */

    var _rubberband = _active ? rubberband : [0, 0];

    movement = computeRubberband(_bounds, addV(movement, _initial), _rubberband);
    return _extends({}, intentionalityCheck, {
      intentional: _intentional[0] !== false || _intentional[1] !== false,
      _initial: _initial,
      _movement: _movement,
      movement: movement,
      values: values,
      offset: computeRubberband(_bounds, offset, _rubberband),
      delta: subV(movement, prevMovement)
    });
  } // Cleans the gesture. Can be overriden by gestures.
  ;

  _proto.clean = function clean() {
    this.clearTimeout();
  };

  _createClass(Recognizer, [{
    key: "config",
    get: function get() {
      return this.controller.config[this.stateKey];
    } // Is the gesture enabled

  }, {
    key: "enabled",
    get: function get() {
      return this.controller.config.enabled && this.config.enabled;
    } // Returns the controller state for a given gesture

  }, {
    key: "state",
    get: function get() {
      return this.controller.state[this.stateKey];
    } // Returns the gesture handler

  }, {
    key: "handler",
    get: function get() {
      return this.controller.handlers[this.stateKey];
    }
  }, {
    key: "transform",
    get: function get() {
      return this.config.transform || this.controller.config.transform || identity$1;
    }
  }]);

  return Recognizer;
}(); //--------------------------------------------

function getIntentionalDisplacement(movement, threshold) {
  if (Math.abs(movement) >= threshold) {
    return sign(movement) * threshold;
  } else {
    return false;
  }
}

function computeRubberband(bounds, _ref, _ref2) {
  var Vx = _ref[0],
      Vy = _ref[1];
  var Rx = _ref2[0],
      Ry = _ref2[1];
  var _bounds$ = bounds[0],
      X1 = _bounds$[0],
      X2 = _bounds$[1],
      _bounds$2 = bounds[1],
      Y1 = _bounds$2[0],
      Y2 = _bounds$2[1];
  return [rubberbandIfOutOfBounds(Vx, X1, X2, Rx), rubberbandIfOutOfBounds(Vy, Y1, Y2, Ry)];
}
/**
 * Returns a generic, common payload for all gestures from an event.
 */


function getGenericPayload(_ref3, event, isStartEvent) {
  var state = _ref3.state;
  var timeStamp = event.timeStamp,
      _lastEventType = event.type;
  var previous = state.values;
  var elapsedTime = isStartEvent ? 0 : timeStamp - state.startTime;
  return {
    _lastEventType: _lastEventType,
    event: event,
    timeStamp: timeStamp,
    elapsedTime: elapsedTime,
    previous: previous
  };
}
/**
 * Returns the reinitialized start state for the gesture.
 * Should be common to all gestures.
 */

function getStartGestureState(_ref4, values, event, initial) {
  var state = _ref4.state,
      config = _ref4.config,
      stateKey = _ref4.stateKey,
      args = _ref4.args,
      transform = _ref4.transform;
  var offset = state.offset;
  var startTime = event.timeStamp;
  var initialFn = config.initial,
      bounds = config.bounds,
      threshold = config.threshold; // the _threshold is the difference between a [0,0] offset converted to
  // its new space coordinates

  var _threshold = subV(transform(threshold), transform([0, 0])).map(Math.abs);

  var _state = _extends({}, getInitialState()[stateKey], {
    _active: true,
    args: args,
    values: values,
    initial: initial != null ? initial : values,
    _threshold: _threshold,
    offset: offset,
    lastOffset: offset,
    startTime: startTime
  });

  return _extends({}, _state, {
    _initial: valueFn(initialFn, _state),
    _bounds: valueFn(bounds, _state)
  });
}

/**
 * The controller will keep track of the state for all gestures and also keep
 * track of timeouts, and window listeners.
 */

var Controller = function Controller(classes) {
  var _this = this;

  this.classes = classes;
  this.pointerIds = new Set(); // register Pointer Events pointerIds

  this.touchIds = new Set(); // register Touch Events identifiers

  this.supportsTouchEvents = supportsTouchEvents();
  this.supportsGestureEvents = supportsGestureEvents();

  this.bind = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var bindings = {};

    for (var _iterator = _createForOfIteratorHelperLoose(_this.classes), _step; !(_step = _iterator()).done;) {
      var RecognizerClass = _step.value;
      new RecognizerClass(_this, args).addBindings(bindings);
    } // // we also add event bindings for native handlers


    var _loop = function _loop(eventKey) {
      addBindings(bindings, eventKey, function (event) {
        return _this.nativeRefs[eventKey](_extends({}, _this.state.shared, {
          event: event,
          args: args
        }));
      });
    };

    for (var eventKey in _this.nativeRefs) {
      _loop(eventKey);
    }

    if (_this.config.domTarget) {
      // If config.domTarget is set we add event listeners to it and return the clean function.
      return updateDomListeners(_this, bindings);
    } else {
      // If not, we return an object that contains gesture handlers mapped to react handler event keys.
      return getPropsListener(_this, bindings);
    }
  };

  this.effect = function () {
    if (_this.config.domTarget) _this.bind();
    return _this.clean;
  };
  /**
   * Function ran on component unmount: cleans timeouts and removes dom listeners set by the bind function.
   */


  this.clean = function () {
    var domTarget = getDomTargetFromConfig(_this.config);
    var eventOptions = _this.config.eventOptions;
    if (domTarget) removeListeners(domTarget, takeAll(_this.domListeners), eventOptions);
    Object.values(_this.timeouts).forEach(clearTimeout);
    clearAllWindowListeners(_this);
  };

  this.classes = classes;
  this.state = getInitialState();
  this.timeouts = {};
  this.domListeners = [];
  this.windowListeners = {};
};
function addEventIds(controller, event) {
  if ('pointerId' in event) {
    controller.pointerIds.add(event.pointerId);
  } else {
    controller.touchIds = new Set(getTouchIds(event));
  }
}
function removeEventIds(controller, event) {
  if ('pointerId' in event) {
    controller.pointerIds["delete"](event.pointerId);
  } else {
    getTouchIds(event).forEach(function (id) {
      return controller.touchIds["delete"](id);
    });
  }
}
function clearAllWindowListeners(controller) {
  var _controller$config = controller.config,
      el = _controller$config.window,
      eventOptions = _controller$config.eventOptions,
      windowListeners = controller.windowListeners;
  if (!el) return;

  for (var stateKey in windowListeners) {
    var handlers = windowListeners[stateKey];
    removeListeners(el, handlers, eventOptions);
  }

  controller.windowListeners = {};
}
function clearWindowListeners(_ref, stateKey, options) {
  var config = _ref.config,
      windowListeners = _ref.windowListeners;

  if (options === void 0) {
    options = config.eventOptions;
  }

  if (!config.window) return;
  removeListeners(config.window, windowListeners[stateKey], options);
  delete windowListeners[stateKey];
}
function updateWindowListeners(_ref2, stateKey, listeners, options) {
  var config = _ref2.config,
      windowListeners = _ref2.windowListeners;

  if (listeners === void 0) {
    listeners = [];
  }

  if (options === void 0) {
    options = config.eventOptions;
  }

  if (!config.window) return;
  removeListeners(config.window, windowListeners[stateKey], options);
  addListeners(config.window, windowListeners[stateKey] = listeners, options);
}

function updateDomListeners(_ref3, bindings) {
  var config = _ref3.config,
      domListeners = _ref3.domListeners;
  var domTarget = getDomTargetFromConfig(config);
  if (!domTarget) throw new Error('domTarget must be defined');
  var eventOptions = config.eventOptions;
  removeListeners(domTarget, takeAll(domListeners), eventOptions);

  for (var _i = 0, _Object$entries = Object.entries(bindings); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        key = _Object$entries$_i[0],
        fns = _Object$entries$_i[1];
    var name = key.slice(2).toLowerCase();
    domListeners.push([name, chainFns.apply(void 0, fns)]);
  }

  addListeners(domTarget, domListeners, eventOptions);
}

function getPropsListener(_ref4, bindings) {
  var config = _ref4.config;
  var props = {};
  var captureString = config.eventOptions.capture ? 'Capture' : '';

  for (var _i2 = 0, _Object$entries2 = Object.entries(bindings); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _Object$entries2[_i2],
        event = _Object$entries2$_i[0],
        fns = _Object$entries2$_i[1];
    var fnsArray = Array.isArray(fns) ? fns : [fns];
    var key = event + captureString;
    props[key] = chainFns.apply(void 0, fnsArray);
  }

  return props;
}

function takeAll(array) {
  if (array === void 0) {
    array = [];
  }

  return array.splice(0, array.length);
}

function getDomTargetFromConfig(_ref5) {
  var domTarget = _ref5.domTarget;
  return domTarget && 'current' in domTarget ? domTarget.current : domTarget;
}
/**
 * bindings is an object which keys match ReactEventHandlerKeys.
 * Since a recognizer might want to bind a handler function to an event key already used by a previously
 * added recognizer, we need to make sure that each event key is an array of all the functions mapped for
 * that key.
 */


function addBindings(bindings, name, fn) {
  if (!bindings[name]) bindings[name] = [];
  bindings[name].push(fn);
}

function addListeners(el, listeners, options) {
  if (listeners === void 0) {
    listeners = [];
  }

  if (options === void 0) {
    options = {};
  }

  for (var _iterator2 = _createForOfIteratorHelperLoose(listeners), _step2; !(_step2 = _iterator2()).done;) {
    var _step2$value = _step2.value,
        eventName = _step2$value[0],
        eventHandler = _step2$value[1];
    el.addEventListener(eventName, eventHandler, options);
  }
}

function removeListeners(el, listeners, options) {
  if (listeners === void 0) {
    listeners = [];
  }

  if (options === void 0) {
    options = {};
  }

  for (var _iterator3 = _createForOfIteratorHelperLoose(listeners), _step3; !(_step3 = _iterator3()).done;) {
    var _step3$value = _step3.value,
        eventName = _step3$value[0],
        eventHandler = _step3$value[1];
    el.removeEventListener(eventName, eventHandler, options);
  }
}

/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Utility hook called by all gesture hooks and that will be responsible for the internals.
 *
 * @param handlers
 * @param classes
 * @param config
 * @param nativeHandlers - native handlers such as onClick, onMouseDown, etc.
 */

function useRecognizers(handlers, config, nativeHandlers) {
  if (nativeHandlers === void 0) {
    nativeHandlers = {};
  }

  var classes = resolveClasses(handlers);
  var controller = React__default.useMemo(function () {
    return new Controller(classes);
  }, []);
  controller.config = config;
  controller.handlers = handlers;
  controller.nativeRefs = nativeHandlers;
  React__default.useEffect(controller.effect, []); // @ts-ignore

  if (controller.config.domTarget) return deprecationNoticeForDomTarget; // @ts-ignore

  return controller.bind;
}

function deprecationNoticeForDomTarget() {
  {
    // eslint-disable-next-line no-console
    console.warn("Deprecation notice: When the `domTarget` option is specified, you don't need to write `useEffect(bind, [bind])` anymore: event binding is now made handled internally to this lib.\n\nNext version won't return anything when `domTarget` is provided, therefore your code will break if you try to call `useEffect`.");
  }
}

function resolveClasses(internalHandlers) {
  var classes = new Set();
  if (internalHandlers.drag) classes.add(RecognizersMap.get('drag'));
  if (internalHandlers.wheel) classes.add(RecognizersMap.get('wheel'));
  if (internalHandlers.scroll) classes.add(RecognizersMap.get('scroll'));
  if (internalHandlers.move) classes.add(RecognizersMap.get('move'));
  if (internalHandlers.pinch) classes.add(RecognizersMap.get('pinch'));
  if (internalHandlers.hover) classes.add(RecognizersMap.get('hover'));
  return classes;
}

/**
 * @private
 * Abstract class for coordinates-based gesture recongizers
 */

var CoordinatesRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(CoordinatesRecognizer, _Recognizer);

  function CoordinatesRecognizer() {
    return _Recognizer.apply(this, arguments) || this;
  }

  var _proto = CoordinatesRecognizer.prototype;

  /**
   * Returns the real movement (without taking intentionality into account)
   */
  _proto.getInternalMovement = function getInternalMovement(values, state) {
    return subV(values, state.initial);
  }
  /**
   * In coordinates-based gesture, this function will detect the first intentional axis,
   * lock the gesture axis if lockDirection is specified in the config, block the gesture
   * if the first intentional axis doesn't match the specified axis in config.
   */
  ;

  _proto.checkIntentionality = function checkIntentionality(_intentional, _movement) {
    if (_intentional[0] === false && _intentional[1] === false) {
      return {
        _intentional: _intentional,
        axis: this.state.axis
      };
    }

    var _movement$map = _movement.map(Math.abs),
        absX = _movement$map[0],
        absY = _movement$map[1];

    var axis = this.state.axis || (absX > absY ? 'x' : absX < absY ? 'y' : undefined);
    if (!this.config.axis && !this.config.lockDirection) return {
      _intentional: _intentional,
      _blocked: false,
      axis: axis
    };
    if (!axis) return {
      _intentional: [false, false],
      _blocked: false,
      axis: axis
    };
    if (!!this.config.axis && axis !== this.config.axis) return {
      _intentional: _intentional,
      _blocked: true,
      axis: axis
    };
    _intentional[axis === 'x' ? 1 : 0] = false;
    return {
      _intentional: _intentional,
      _blocked: false,
      axis: axis
    };
  };

  _proto.getKinematics = function getKinematics(values, event) {
    var state = this.getMovement(values);

    if (!state._blocked) {
      var dt = event.timeStamp - this.state.timeStamp;
      Object.assign(state, calculateAllKinematics(state.movement, state.delta, dt));
    }

    return state;
  };

  _proto.mapStateValues = function mapStateValues(state) {
    return {
      xy: state.values,
      vxvy: state.velocities
    };
  };

  return CoordinatesRecognizer;
}(Recognizer);

var TAP_DISTANCE_THRESHOLD = 3;

function persistEvent(event) {
  'persist' in event && typeof event.persist === 'function' && event.persist();
}

var DragRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
  _inheritsLoose(DragRecognizer, _CoordinatesRecognize);

  function DragRecognizer() {
    var _this;

    _this = _CoordinatesRecognize.apply(this, arguments) || this;
    _this.ingKey = 'dragging';
    _this.stateKey = 'drag'; // TODO add back when setPointerCapture is widely wupported
    // https://caniuse.com/#search=setPointerCapture

    _this.setPointerCapture = function (event) {
      // don't perform pointere capture when user wants to use touch events or
      // when a pointerLockElement exists as this would throw an error
      if (_this.config.useTouch || document.pointerLockElement) return;
      var target = event.target,
          pointerId = event.pointerId;

      if (target && 'setPointerCapture' in target) {
        // this would work in the DOM but doesn't with react three fiber
        // target.addEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
        // @ts-expect-error
        target.setPointerCapture(pointerId);
      }

      _this.updateGestureState({
        _dragTarget: target,
        _dragPointerId: pointerId
      });
    };

    _this.releasePointerCapture = function () {
      if (_this.config.useTouch || document.pointerLockElement) return;
      var _this$state = _this.state,
          _dragTarget = _this$state._dragTarget,
          _dragPointerId = _this$state._dragPointerId;

      if (_dragPointerId && _dragTarget && 'releasePointerCapture' in _dragTarget) {
        // this would work in the DOM but doesn't with react three fiber
        // target.removeEventListener('pointermove', this.onDragChange, this.controller.config.eventOptions)
        if (!('hasPointerCapture' in _dragTarget) || _dragTarget.hasPointerCapture(_dragPointerId)) try {
          _dragTarget.releasePointerCapture(_dragPointerId);
        } catch (e) {}
      }
    };

    _this.preventScroll = function (event) {
      if (_this.state._dragPreventScroll && event.cancelable) {
        event.preventDefault();
      }
    };

    _this.getEventId = function (event) {
      if (_this.config.useTouch) return event.changedTouches[0].identifier;
      return event.pointerId;
    };

    _this.isValidEvent = function (event) {
      // if we were using pointer events only event.isPrimary === 1 would suffice
      return _this.state._pointerId === _this.getEventId(event);
    };

    _this.shouldPreventWindowScrollY = _this.config.experimental_preventWindowScrollY && _this.controller.supportsTouchEvents;

    _this.setUpWindowScrollDetection = function (event) {
      persistEvent(event); // we add window listeners that will prevent the scroll when the user has started dragging

      updateWindowListeners(_this.controller, _this.stateKey, [['touchmove', _this.preventScroll], ['touchend', _this.clean.bind(_assertThisInitialized(_this))], ['touchcancel', _this.clean.bind(_assertThisInitialized(_this))]], {
        passive: false
      });

      _this.setTimeout(_this.startDrag.bind(_assertThisInitialized(_this)), 250, event);
    };

    _this.setUpDelayedDragTrigger = function (event) {
      _this.state._dragDelayed = true;
      persistEvent(event);

      _this.setTimeout(_this.startDrag.bind(_assertThisInitialized(_this)), _this.config.delay, event);
    };

    _this.setStartState = function (event) {
      var values = getPointerEventValues(event, _this.transform);

      _this.updateSharedState(getGenericEventData(event));

      _this.updateGestureState(_extends({}, getStartGestureState(_assertThisInitialized(_this), values, event), getGenericPayload(_assertThisInitialized(_this), event, true), {
        _pointerId: _this.getEventId(event)
      }));

      _this.updateGestureState(_this.getMovement(values));
    };

    _this.onDragStart = function (event) {
      addEventIds(_this.controller, event);
      if (!_this.enabled || _this.state._active) return;

      _this.setStartState(event);

      _this.setPointerCapture(event);

      if (_this.shouldPreventWindowScrollY) _this.setUpWindowScrollDetection(event);else if (_this.config.delay > 0) _this.setUpDelayedDragTrigger(event);else _this.startDrag(event, true); // we pass the values to the startDrag event
    };

    _this.onDragChange = function (event) {
      if ( // if the gesture was canceled or
      _this.state.canceled || // if onDragStart wasn't fired or
      !_this.state._active || // if the event pointerId doesn't match the one that initiated the drag
      !_this.isValidEvent(event) || // if the event has the same timestamp as the previous event
      // note that checking type equality is ONLY for tests ¯\_(ツ)_/¯
      _this.state._lastEventType === event.type && event.timeStamp === _this.state.timeStamp) return;
      var values;

      if (document.pointerLockElement) {
        var movementX = event.movementX,
            movementY = event.movementY;
        values = addV(_this.transform([movementX, movementY]), _this.state.values);
      } else values = getPointerEventValues(event, _this.transform);

      var kinematics = _this.getKinematics(values, event); // if startDrag hasn't fired


      if (!_this.state._dragStarted) {
        // If the gesture isn't active then respond to the event only if
        // it's been delayed via the `delay` option, in which case start
        // the gesture immediately.
        if (_this.state._dragDelayed) {
          _this.startDrag(event);

          return;
        } // if the user wants to prevent vertical window scroll when user starts dragging


        if (_this.shouldPreventWindowScrollY) {
          if (!_this.state._dragPreventScroll && kinematics.axis) {
            // if the user is dragging horizontally then we should allow the drag
            if (kinematics.axis === 'x') {
              _this.startDrag(event);
            } else {
              _this.state._active = false;
              return;
            }
          } else return;
        } else return;
      }

      var genericEventData = getGenericEventData(event);

      _this.updateSharedState(genericEventData);

      var genericPayload = getGenericPayload(_assertThisInitialized(_this), event); // This verifies if the drag can be assimilated to a tap by checking
      // if the real distance of the drag (ie not accounting for the threshold) is
      // greater than the TAP_DISTANCE_THRESHOLD.

      var realDistance = calculateDistance(kinematics._movement);
      var _dragIsTap = _this.state._dragIsTap;
      if (_dragIsTap && realDistance >= TAP_DISTANCE_THRESHOLD) _dragIsTap = false;

      _this.updateGestureState(_extends({}, genericPayload, kinematics, {
        _dragIsTap: _dragIsTap
      }));

      _this.fireGestureHandler();
    };

    _this.onDragEnd = function (event) {
      removeEventIds(_this.controller, event); // if the event pointerId doesn't match the one that initiated the drag
      // we don't want to end the drag

      if (!_this.isValidEvent(event)) return;

      _this.clean(); // if the gesture is no longer active (ie canceled)
      // don't do anything


      if (!_this.state._active) return;
      _this.state._active = false;
      var tap = _this.state._dragIsTap;
      var _this$state$velocitie = _this.state.velocities,
          vx = _this$state$velocitie[0],
          vy = _this$state$velocitie[1];
      var _this$state$movement = _this.state.movement,
          mx = _this$state$movement[0],
          my = _this$state$movement[1];
      var _this$state$_intentio = _this.state._intentional,
          ix = _this$state$_intentio[0],
          iy = _this$state$_intentio[1];
      var _this$config$swipeVel = _this.config.swipeVelocity,
          svx = _this$config$swipeVel[0],
          svy = _this$config$swipeVel[1];
      var _this$config$swipeDis = _this.config.swipeDistance,
          sx = _this$config$swipeDis[0],
          sy = _this$config$swipeDis[1];
      var sd = _this.config.swipeDuration;

      var endState = _extends({}, getGenericPayload(_assertThisInitialized(_this), event), _this.getMovement(_this.state.values));

      var swipe = [0, 0];

      if (endState.elapsedTime < sd) {
        if (ix !== false && Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = sign(vx);
        if (iy !== false && Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = sign(vy);
      }

      _this.updateSharedState({
        buttons: 0
      });

      _this.updateGestureState(_extends({}, endState, {
        tap: tap,
        swipe: swipe
      }));

      _this.fireGestureHandler(_this.config.filterTaps && tap === true);
    };

    _this.clean = function () {
      _CoordinatesRecognize.prototype.clean.call(_assertThisInitialized(_this));

      _this.state._dragStarted = false;

      _this.releasePointerCapture();

      clearWindowListeners(_this.controller, _this.stateKey);
    };

    _this.onCancel = function () {
      if (_this.state.canceled) return;

      _this.updateGestureState({
        canceled: true,
        _active: false
      });

      _this.updateSharedState({
        buttons: 0
      });

      setTimeout(function () {
        return _this.fireGestureHandler();
      }, 0);
    };

    _this.onClick = function (event) {
      if (!_this.state._dragIsTap) event.stopPropagation();
    };

    return _this;
  }

  var _proto = DragRecognizer.prototype;

  _proto.startDrag = function startDrag(event, onDragIsStart) {
    if (onDragIsStart === void 0) {
      onDragIsStart = false;
    }

    // startDrag can happen after a timeout, so we need to check if the gesture is still active
    // as the user might have lift up the pointer in between.
    if ( // if the gesture isn't active (probably means)
    !this.state._active || // if the drag has already started we should ignore subsequent attempts
    this.state._dragStarted) return;
    if (!onDragIsStart) this.setStartState(event);
    this.updateGestureState({
      _dragStarted: true,
      _dragPreventScroll: true,
      cancel: this.onCancel
    });
    this.clearTimeout();
    this.fireGestureHandler();
  };

  _proto.addBindings = function addBindings$1(bindings) {
    if (this.config.useTouch) {
      addBindings(bindings, 'onTouchStart', this.onDragStart);

      addBindings(bindings, 'onTouchMove', this.onDragChange); // this is needed for react-three-fiber


      addBindings(bindings, 'onTouchEnd', this.onDragEnd);

      addBindings(bindings, 'onTouchCancel', this.onDragEnd);
    } else {
      addBindings(bindings, 'onPointerDown', this.onDragStart);

      addBindings(bindings, 'onPointerMove', this.onDragChange); // this is needed for react-three-fiber


      addBindings(bindings, 'onPointerUp', this.onDragEnd);

      addBindings(bindings, 'onPointerCancel', this.onDragEnd);
    }

    if (this.config.filterTaps) {
      var handler = this.controller.config.eventOptions.capture ? 'onClick' : 'onClickCapture';

      addBindings(bindings, handler, this.onClick);
    }
  };

  return DragRecognizer;
}(CoordinatesRecognizer);

/**
 * Inlined from https://github.com/alexreardon/memoize-one
 */
function memoizeOne(resultFn, isEqual) {
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;

  function memoized() {
    for (var _len = arguments.length, newArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      newArgs[_key] = arguments[_key];
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized;
}

/**
 * Taken from https://github.com/FormidableLabs/react-fast-compare
 *
 * Dropped comments and ArrayBuffer handling
 */
function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    }

    var it;

    if (typeof Map === 'function' && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      it = a.entries();

      while (!(i = it.next()).done) {
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      }

      return true;
    }

    if (typeof Set === 'function' && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }

    if (typeof Element !== 'undefined' && a instanceof Element) return false;

    for (i = length; i-- !== 0;) {
      if (keys[i] === '_owner' && a.$$typeof) continue;
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }

    return true;
  } // true if both NaN, false otherwise — NaN !== NaN → true
  // eslint-disable-next-line no-self-compare


  return a !== a && b !== b;
}

function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || '').match(/stack|recursion/i)) {
      // eslint-disable-next-line no-console
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }

    throw error;
  }
}

/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */

function useDrag(handler, config) {
  if (config === void 0) {
    config = {};
  }

  RecognizersMap.set('drag', DragRecognizer);
  var buildDragConfig = React.useRef();

  if (!buildDragConfig.current) {
    buildDragConfig.current = memoizeOne(_buildDragConfig, isEqual);
  }

  return useRecognizers({
    drag: handler
  }, buildDragConfig.current(config));
}

/**
 * @private
 * Abstract class for distance/angle-based gesture recongizers
 */

var DistanceAngleRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(DistanceAngleRecognizer, _Recognizer);

  function DistanceAngleRecognizer() {
    return _Recognizer.apply(this, arguments) || this;
  }

  var _proto = DistanceAngleRecognizer.prototype;

  _proto.getInternalMovement = function getInternalMovement(values, state) {
    var prev_a = state.values[1]; // not be defined if ctrl+wheel is used for zoom only

    var d = values[0],
        _values$ = values[1],
        a = _values$ === void 0 ? prev_a : _values$;
    var delta_a = a - prev_a;
    var next_turns = state.turns;
    if (Math.abs(delta_a) > 270) next_turns += sign(delta_a);
    return subV([d, a - 360 * next_turns], state.initial);
  };

  _proto.getKinematics = function getKinematics(values, event) {
    var state = this.getMovement(values);
    var turns = (values[1] - state._movement[1] - this.state.initial[1]) / 360;
    var dt = event.timeStamp - this.state.timeStamp;

    var _calculateAllKinemati = calculateAllKinematics(state.movement, state.delta, dt),
        kinematics = _objectWithoutPropertiesLoose(_calculateAllKinemati, ["distance", "velocity"]);

    return _extends({
      turns: turns
    }, state, kinematics);
  };

  _proto.mapStateValues = function mapStateValues(state) {
    return {
      da: state.values,
      vdva: state.velocities
    };
  };

  return DistanceAngleRecognizer;
}(Recognizer);

var ZOOM_CONSTANT = 7;
var WEBKIT_DISTANCE_SCALE_FACTOR = 260;
var PinchRecognizer = /*#__PURE__*/function (_DistanceAngleRecogni) {
  _inheritsLoose(PinchRecognizer, _DistanceAngleRecogni);

  function PinchRecognizer() {
    var _this;

    _this = _DistanceAngleRecogni.apply(this, arguments) || this;
    _this.ingKey = 'pinching';
    _this.stateKey = 'pinch';

    _this.onPinchStart = function (event) {
      addEventIds(_this.controller, event);
      var touchIds = _this.controller.touchIds;
      if (!_this.enabled) return;

      if (_this.state._active) {
        // check that the pointerIds that initiated the gesture
        // are still enabled. This is useful for when the page
        // loses track of the pointers (minifying gesture on iPad).
        if (_this.state._pointerIds.every(function (id) {
          return touchIds.has(id);
        })) return; // something was wrong with the pointers but we let it go.
      } // until we reach two fingers on the target don't react


      if (touchIds.size < 2) return;

      var _pointerIds = Array.from(touchIds).slice(0, 2);

      var _getTwoTouchesEventVa = getTwoTouchesEventValues(event, _pointerIds, _this.transform),
          values = _getTwoTouchesEventVa.values,
          origin = _getTwoTouchesEventVa.origin;

      _this.updateSharedState(getGenericEventData(event));

      _this.updateGestureState(_extends({}, getStartGestureState(_assertThisInitialized(_this), values, event), getGenericPayload(_assertThisInitialized(_this), event, true), {
        _pointerIds: _pointerIds,
        cancel: _this.onCancel,
        origin: origin
      }));

      _this.updateGestureState(_this.getMovement(values));

      _this.fireGestureHandler();
    };

    _this.onPinchChange = function (event) {
      var _this$state = _this.state,
          canceled = _this$state.canceled,
          _active = _this$state._active;
      if (canceled || !_active || // if the event has the same timestamp as the previous event
      event.timeStamp === _this.state.timeStamp) return;
      var genericEventData = getGenericEventData(event);

      _this.updateSharedState(genericEventData);

      try {
        var _getTwoTouchesEventVa2 = getTwoTouchesEventValues(event, _this.state._pointerIds, _this.transform),
            values = _getTwoTouchesEventVa2.values,
            origin = _getTwoTouchesEventVa2.origin;

        var kinematics = _this.getKinematics(values, event);

        _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), kinematics, {
          origin: origin
        }));

        _this.fireGestureHandler();
      } catch (e) {
        _this.onPinchEnd(event);
      }
    };

    _this.onPinchEnd = function (event) {
      removeEventIds(_this.controller, event);
      var pointerIds = getTouchIds(event); // if none of the lifted pointerIds is in the state pointerIds don't do anything

      if (_this.state._pointerIds.every(function (id) {
        return !pointerIds.includes(id);
      })) return;

      _this.clean();

      if (!_this.state._active) return;

      _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), _this.getMovement(_this.state.values), {
        _active: false
      }));

      _this.fireGestureHandler();
    };

    _this.onCancel = function () {
      if (_this.state.canceled) return;

      _this.updateGestureState({
        _active: false,
        canceled: true
      });

      setTimeout(function () {
        return _this.fireGestureHandler();
      }, 0);
    };
    /**
     * PINCH WITH WEBKIT GESTURES
     */


    _this.onGestureStart = function (event) {
      if (!_this.enabled) return;
      event.preventDefault();
      var values = getWebkitGestureEventValues(event, _this.transform);

      _this.updateSharedState(getGenericEventData(event));

      _this.updateGestureState(_extends({}, getStartGestureState(_assertThisInitialized(_this), values, event), getGenericPayload(_assertThisInitialized(_this), event, true), {
        origin: [event.clientX, event.clientY],
        cancel: _this.onCancel
      }));

      _this.updateGestureState(_this.getMovement(values));

      _this.fireGestureHandler();
    };

    _this.onGestureChange = function (event) {
      var _this$state2 = _this.state,
          canceled = _this$state2.canceled,
          _active = _this$state2._active;
      if (canceled || !_active) return;
      event.preventDefault();
      var genericEventData = getGenericEventData(event);

      _this.updateSharedState(genericEventData); // this normalizes the values of the Safari's WebKitEvent by calculating
      // the delta and then multiplying it by a constant.


      var values = getWebkitGestureEventValues(event, _this.transform);
      values[0] = (values[0] - _this.state.event.scale) * WEBKIT_DISTANCE_SCALE_FACTOR + _this.state.values[0];

      var kinematics = _this.getKinematics(values, event);

      _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), kinematics, {
        origin: [event.clientX, event.clientY]
      }));

      _this.fireGestureHandler();
    };

    _this.onGestureEnd = function (event) {
      _this.clean();

      if (!_this.state._active) return;

      _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), _this.getMovement(_this.state.values), {
        _active: false,
        origin: [event.clientX, event.clientY]
      }));

      _this.fireGestureHandler();
    };
    /**
     * PINCH WITH WHEEL
     */


    _this.wheelShouldRun = function (event) {
      return _this.enabled && event.ctrlKey;
    };

    _this.getWheelValuesFromEvent = function (event) {
      var _getWheelEventValues = getWheelEventValues(event, _this.transform),
          delta_d = _getWheelEventValues[1];

      var _this$state$values = _this.state.values,
          prev_d = _this$state$values[0],
          prev_a = _this$state$values[1]; // ZOOM_CONSTANT is based on Safari trackpad natural zooming

      var _delta_d = -delta_d * ZOOM_CONSTANT; // new distance is the previous state distance added to the delta


      var d = prev_d + _delta_d;
      var a = prev_a !== void 0 ? prev_a : 0;
      return {
        values: [d, a],
        origin: [event.clientX, event.clientY],
        delta: [_delta_d, a]
      };
    };

    _this.onWheel = function (event) {
      if (!_this.wheelShouldRun(event)) return;

      _this.setTimeout(_this.onWheelEnd);

      if (!_this.state._active) _this.onWheelStart(event);else _this.onWheelChange(event);
    };

    _this.onWheelStart = function (event) {
      var _this$getWheelValuesF = _this.getWheelValuesFromEvent(event),
          values = _this$getWheelValuesF.values,
          delta = _this$getWheelValuesF.delta,
          origin = _this$getWheelValuesF.origin;

      if (event.cancelable) event.preventDefault();else {
        // eslint-disable-next-line no-console
        console.warn('To properly support zoom on trackpads, try using the `domTarget` option and `config.eventOptions.passive` set to `false`. This message will only appear in development mode.');
      }

      _this.updateSharedState(getGenericEventData(event));

      _this.updateGestureState(_extends({}, getStartGestureState(_assertThisInitialized(_this), values, event, _this.state.values), getGenericPayload(_assertThisInitialized(_this), event, true), {
        offset: values,
        delta: delta,
        origin: origin
      }));

      _this.updateGestureState(_this.getMovement(values));

      _this.fireGestureHandler();
    };

    _this.onWheelChange = function (event) {
      if (event.cancelable) event.preventDefault();

      _this.updateSharedState(getGenericEventData(event));

      var _this$getWheelValuesF2 = _this.getWheelValuesFromEvent(event),
          values = _this$getWheelValuesF2.values,
          origin = _this$getWheelValuesF2.origin,
          delta = _this$getWheelValuesF2.delta;

      _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), _this.getKinematics(values, event), {
        origin: origin,
        delta: delta
      }));

      _this.fireGestureHandler();
    };

    _this.onWheelEnd = function () {
      _this.clean();

      if (!_this.state._active) return;
      _this.state._active = false;

      _this.updateGestureState(_this.getMovement(_this.state.values));

      _this.fireGestureHandler();
    };

    return _this;
  }

  var _proto = PinchRecognizer.prototype;

  _proto.addBindings = function addBindings$1(bindings) {
    // Only try to use gesture events when they are supported and domTarget is set
    // as React doesn't support gesture handlers.
    if (this.controller.config.domTarget && !this.controller.supportsTouchEvents && this.controller.supportsGestureEvents) {
      addBindings(bindings, 'onGestureStart', this.onGestureStart);

      addBindings(bindings, 'onGestureChange', this.onGestureChange);

      addBindings(bindings, 'onGestureEnd', this.onGestureEnd);
    } else {
      addBindings(bindings, 'onTouchStart', this.onPinchStart);

      addBindings(bindings, 'onTouchMove', this.onPinchChange);

      addBindings(bindings, 'onTouchEnd', this.onPinchEnd);

      addBindings(bindings, 'onTouchCancel', this.onPinchEnd);

      addBindings(bindings, 'onWheel', this.onWheel);
    }
  };

  return PinchRecognizer;
}(DistanceAngleRecognizer);

/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */

function usePinch(handler, config) {
  if (config === void 0) {
    config = {};
  }

  RecognizersMap.set('pinch', PinchRecognizer);
  var buildPinchConfig = React.useRef();

  if (!buildPinchConfig.current) {
    buildPinchConfig.current = memoizeOne(_buildPinchConfig, isEqual);
  }

  return useRecognizers({
    pinch: handler
  }, buildPinchConfig.current(config));
}

var WheelRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
  _inheritsLoose(WheelRecognizer, _CoordinatesRecognize);

  function WheelRecognizer() {
    var _this;

    _this = _CoordinatesRecognize.apply(this, arguments) || this;
    _this.ingKey = 'wheeling';
    _this.stateKey = 'wheel';
    _this.debounced = true;

    _this.handleEvent = function (event) {
      if (event.ctrlKey && 'pinch' in _this.controller.handlers) return;
      if (!_this.enabled) return;

      _this.setTimeout(_this.onEnd);

      _this.updateSharedState(getGenericEventData(event));

      var values = addV(getWheelEventValues(event, _this.transform), _this.state.values);

      if (!_this.state._active) {
        _this.updateGestureState(_extends({}, getStartGestureState(_assertThisInitialized(_this), values, event, _this.state.values), getGenericPayload(_assertThisInitialized(_this), event, true)));

        var movement = _this.getMovement(values);

        var geometry = calculateAllGeometry(movement.delta);

        _this.updateGestureState(movement);

        _this.updateGestureState(geometry);
      } else {
        _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), _this.getKinematics(values, event)));
      }

      _this.fireGestureHandler();
    };

    _this.onEnd = function () {
      _this.clean();

      if (!_this.state._active) return;

      var movement = _this.getMovement(_this.state.values);

      _this.updateGestureState(movement);

      _this.updateGestureState({
        _active: false,
        velocities: [0, 0],
        velocity: 0
      });

      _this.fireGestureHandler();
    };

    return _this;
  }

  var _proto = WheelRecognizer.prototype;

  _proto.addBindings = function addBindings$1(bindings) {
    addBindings(bindings, 'onWheel', this.handleEvent);
  };

  return WheelRecognizer;
}(CoordinatesRecognizer);

/**
 * Wheel hook.
 *
 * @param handler - the function fired every time the wheel gesture updates
 * @param the config object including generic options and wheel options
 */

function useWheel(handler, config) {
  if (config === void 0) {
    config = {};
  }

  RecognizersMap.set('wheel', WheelRecognizer);
  var buildWheelConfig = React.useRef();

  if (!buildWheelConfig.current) {
    buildWheelConfig.current = memoizeOne(_buildWheelConfig, isEqual);
  }

  return useRecognizers({
    wheel: handler
  }, buildWheelConfig.current(config));
}

var MoveRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
  _inheritsLoose(MoveRecognizer, _CoordinatesRecognize);

  function MoveRecognizer() {
    var _this;

    _this = _CoordinatesRecognize.apply(this, arguments) || this;
    _this.ingKey = 'moving';
    _this.stateKey = 'move';
    _this.debounced = true;

    _this.onMove = function (event) {
      if (!_this.enabled) return;

      _this.setTimeout(_this.onMoveEnd);

      if (!_this.state._active) _this.onMoveStart(event);else _this.onMoveChange(event);
    };

    _this.onMoveStart = function (event) {
      _this.updateSharedState(getGenericEventData(event));

      var values = getPointerEventValues(event, _this.transform);

      _this.updateGestureState(_extends({}, getStartGestureState(_assertThisInitialized(_this), values, event), getGenericPayload(_assertThisInitialized(_this), event, true)));

      _this.updateGestureState(_this.getMovement(values));

      _this.fireGestureHandler();
    };

    _this.onMoveChange = function (event) {
      _this.updateSharedState(getGenericEventData(event));

      var values = getPointerEventValues(event, _this.transform);

      _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), _this.getKinematics(values, event)));

      _this.fireGestureHandler();
    };

    _this.onMoveEnd = function () {
      _this.clean();

      if (!_this.state._active) return;
      var values = _this.state.values;

      _this.updateGestureState(_this.getMovement(values));

      _this.updateGestureState({
        velocities: [0, 0],
        velocity: 0,
        _active: false
      });

      _this.fireGestureHandler();
    };

    _this.hoverTransform = function () {
      return _this.controller.config.hover.transform || _this.controller.config.transform;
    };

    _this.onPointerEnter = function (event) {
      _this.controller.state.shared.hovering = true;
      if (!_this.controller.config.enabled) return;

      if (_this.controller.config.hover.enabled) {
        var values = getPointerEventValues(event, _this.hoverTransform());

        var state = _extends({}, _this.controller.state.shared, _this.state, getGenericPayload(_assertThisInitialized(_this), event, true), {
          args: _this.args,
          values: values,
          active: true,
          hovering: true
        });

        _this.controller.handlers.hover(_extends({}, state, _this.mapStateValues(state)));
      }

      if ('move' in _this.controller.handlers) _this.onMoveStart(event);
    };

    _this.onPointerLeave = function (event) {
      _this.controller.state.shared.hovering = false;
      if ('move' in _this.controller.handlers) _this.onMoveEnd();
      if (!_this.controller.config.hover.enabled) return;
      var values = getPointerEventValues(event, _this.hoverTransform());

      var state = _extends({}, _this.controller.state.shared, _this.state, getGenericPayload(_assertThisInitialized(_this), event), {
        args: _this.args,
        values: values,
        active: false
      });

      _this.controller.handlers.hover(_extends({}, state, _this.mapStateValues(state)));
    };

    return _this;
  }

  var _proto = MoveRecognizer.prototype;

  _proto.addBindings = function addBindings$1(bindings) {
    if ('move' in this.controller.handlers) {
      addBindings(bindings, 'onPointerMove', this.onMove);
    }

    if ('hover' in this.controller.handlers) {
      addBindings(bindings, 'onPointerEnter', this.onPointerEnter);

      addBindings(bindings, 'onPointerLeave', this.onPointerLeave);
    }
  };

  return MoveRecognizer;
}(CoordinatesRecognizer);

/**
 * Move hook.
 *
 * @param handler - the function fired every time the move gesture updates
 * @param [config={}] - the config object including generic options and move options
 */

function useMove(handler, config) {
  if (config === void 0) {
    config = {};
  }

  RecognizersMap.set('move', MoveRecognizer);
  var buildMoveConfig = React.useRef();

  if (!buildMoveConfig.current) {
    buildMoveConfig.current = memoizeOne(_buildMoveConfig, isEqual);
  }

  return useRecognizers({
    move: handler
  }, buildMoveConfig.current(config));
}

/**
 * Hover hook.
 *
 * @param handler - the function fired every time the hover gesture updates
 * @param [config={}] - the config object including generic options and hover options
 */

function useHover(handler, config) {
  if (config === void 0) {
    config = {};
  }

  RecognizersMap.set('hover', MoveRecognizer);
  var buildHoverConfig = React.useRef();

  if (!buildHoverConfig.current) {
    buildHoverConfig.current = memoizeOne(_buildHoverConfig, isEqual);
  }

  return useRecognizers({
    hover: handler
  }, buildHoverConfig.current(config));
}

var ScrollRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
  _inheritsLoose(ScrollRecognizer, _CoordinatesRecognize);

  function ScrollRecognizer() {
    var _this;

    _this = _CoordinatesRecognize.apply(this, arguments) || this;
    _this.ingKey = 'scrolling';
    _this.stateKey = 'scroll';
    _this.debounced = true;

    _this.handleEvent = function (event) {
      if (!_this.enabled) return;

      _this.clearTimeout();

      _this.setTimeout(_this.onEnd);

      var values = getScrollEventValues(event, _this.transform);

      _this.updateSharedState(getGenericEventData(event));

      if (!_this.state._active) {
        _this.updateGestureState(_extends({}, getStartGestureState(_assertThisInitialized(_this), values, event, _this.state.values), getGenericPayload(_assertThisInitialized(_this), event, true)));

        var movementDetection = _this.getMovement(values);

        var geometry = calculateAllGeometry(movementDetection.delta);

        _this.updateGestureState(movementDetection);

        _this.updateGestureState(geometry);
      } else {
        _this.updateGestureState(_extends({}, getGenericPayload(_assertThisInitialized(_this), event), _this.getKinematics(values, event)));
      }

      _this.fireGestureHandler();
    };

    _this.onEnd = function () {
      _this.clean();

      if (!_this.state._active) return;

      _this.updateGestureState(_extends({}, _this.getMovement(_this.state.values), {
        _active: false,
        velocities: [0, 0],
        velocity: 0
      }));

      _this.fireGestureHandler();
    };

    return _this;
  }

  var _proto = ScrollRecognizer.prototype;

  _proto.addBindings = function addBindings$1(bindings) {
    addBindings(bindings, 'onScroll', this.handleEvent);
  };

  return ScrollRecognizer;
}(CoordinatesRecognizer);

/**
 * Scroll hook.
 *
 * @param handler - the function fired every time the scroll gesture updates
 * @param [config={}] - the config object including generic options and scroll options
 */

function useScroll(handler, config) {
  if (config === void 0) {
    config = {};
  }

  RecognizersMap.set('scroll', ScrollRecognizer);
  var buildScrollConfig = React.useRef();

  if (!buildScrollConfig.current) {
    buildScrollConfig.current = memoizeOne(_buildScrollConfig, isEqual);
  }

  return useRecognizers({
    scroll: handler
  }, buildScrollConfig.current(config));
}

var RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;

function sortHandlers(handlers) {
  var _native = {};
  var handle = {};
  var actions = new Set();

  for (var key in handlers) {
    if (RE_NOT_NATIVE.test(key)) {
      actions.add(RegExp.lastMatch);
      handle[key] = handlers[key];
    } else {
      _native[key] = handlers[key];
    }
  }

  return [handle, _native, actions];
}
/**
 * @public
 *
 * The most complete gesture hook, allowing support for multiple gestures.
 *
 * @param {Handlers} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} [config={}] - the full config object
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */


function useGesture(_handlers, config) {
  if (config === void 0) {
    config = {};
  }

  var _sortHandlers = sortHandlers(_handlers),
      handlers = _sortHandlers[0],
      nativeHandlers = _sortHandlers[1],
      actions = _sortHandlers[2];

  RecognizersMap.set('drag', DragRecognizer);
  RecognizersMap.set('hover', MoveRecognizer);
  RecognizersMap.set('move', MoveRecognizer);
  RecognizersMap.set('pinch', PinchRecognizer);
  RecognizersMap.set('scroll', ScrollRecognizer);
  RecognizersMap.set('wheel', WheelRecognizer);
  var mergedConfig = buildComplexConfig(config, actions);
  var internalHandlers = {};
  if (actions.has('onDrag')) internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag');
  if (actions.has('onWheel')) internalHandlers.wheel = includeStartEndHandlers(handlers, 'onWheel');
  if (actions.has('onScroll')) internalHandlers.scroll = includeStartEndHandlers(handlers, 'onScroll');
  if (actions.has('onMove')) internalHandlers.move = includeStartEndHandlers(handlers, 'onMove');
  if (actions.has('onPinch')) internalHandlers.pinch = includeStartEndHandlers(handlers, 'onPinch');
  if (actions.has('onHover')) internalHandlers.hover = handlers.onHover;
  return useRecognizers(internalHandlers, mergedConfig, nativeHandlers);
}

function includeStartEndHandlers(handlers, handlerKey) {
  var startKey = handlerKey + 'Start';
  var endKey = handlerKey + 'End';

  var fn = function fn(state) {
    var memo = undefined;
    if (state.first && startKey in handlers) handlers[startKey](state);
    if (handlerKey in handlers) memo = handlers[handlerKey](state);
    if (state.last && endKey in handlers) handlers[endKey](state);
    return memo;
  };

  return fn;
}

exports.addV = addV;
exports.rubberbandIfOutOfBounds = rubberbandIfOutOfBounds;
exports.subV = subV;
exports.useDrag = useDrag;
exports.useGesture = useGesture;
exports.useHover = useHover;
exports.useMove = useMove;
exports.usePinch = usePinch;
exports.useScroll = useScroll;
exports.useWheel = useWheel;
//# sourceMappingURL=reactusegesture.cjs.development.js.map
