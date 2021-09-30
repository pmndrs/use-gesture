'use strict';

var react = require('react');
var debounce = require('debounce');

function useMeasure(_temp) {
  var _ref = _temp === void 0 ? {
    debounce: 0,
    scroll: false
  } : _temp,
      debounce$1 = _ref.debounce,
      scroll = _ref.scroll,
      polyfill = _ref.polyfill;

  var ResizeObserver = polyfill || (typeof window === 'undefined' ? function ResizeObserver() {} : window.ResizeObserver);

  if (!ResizeObserver) {
    throw new Error('This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills');
  }

  var _useState = react.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0
  }),
      bounds = _useState[0],
      set = _useState[1]; // keep all state in a ref


  var state = react.useRef({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: bounds
  }); // set actual debounce values early, so effects know if they should react accordingly

  var scrollDebounce = debounce$1 ? typeof debounce$1 === 'number' ? debounce$1 : debounce$1.scroll : null;
  var resizeDebounce = debounce$1 ? typeof debounce$1 === 'number' ? debounce$1 : debounce$1.resize : null; // make sure to update state only as long as the component is truly mounted

  var mounted = react.useRef(false);
  react.useEffect(function () {
    mounted.current = true;
    return function () {
      return void (mounted.current = false);
    };
  }); // memoize handlers, so event-listeners know when they should update

  var _useMemo = react.useMemo(function () {
    var callback = function callback() {
      if (!state.current.element) return;

      var _ref2 = state.current.element.getBoundingClientRect(),
          left = _ref2.left,
          top = _ref2.top,
          width = _ref2.width,
          height = _ref2.height,
          bottom = _ref2.bottom,
          right = _ref2.right,
          x = _ref2.x,
          y = _ref2.y;

      var size = {
        left: left,
        top: top,
        width: width,
        height: height,
        bottom: bottom,
        right: right,
        x: x,
        y: y
      };
      Object.freeze(size);
      if (mounted.current && !areBoundsEqual(state.current.lastBounds, size)) set(state.current.lastBounds = size);
    };

    return [callback, resizeDebounce ? debounce.debounce(callback, resizeDebounce) : callback, scrollDebounce ? debounce.debounce(callback, scrollDebounce) : callback];
  }, [set, scrollDebounce, resizeDebounce]),
      forceRefresh = _useMemo[0],
      resizeChange = _useMemo[1],
      scrollChange = _useMemo[2]; // cleanup current scroll-listeners / observers


  function removeListeners() {
    if (state.current.scrollContainers) {
      state.current.scrollContainers.forEach(function (element) {
        return element.removeEventListener('scroll', scrollChange, true);
      });
      state.current.scrollContainers = null;
    }

    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect();
      state.current.resizeObserver = null;
    }
  } // add scroll-listeners / observers


  function addListeners() {
    if (!state.current.element) return;
    state.current.resizeObserver = new ResizeObserver(scrollChange);
    state.current.resizeObserver.observe(state.current.element);

    if (scroll && state.current.scrollContainers) {
      state.current.scrollContainers.forEach(function (scrollContainer) {
        return scrollContainer.addEventListener('scroll', scrollChange, {
          capture: true,
          passive: true
        });
      });
    }
  } // the ref we expose to the user


  var ref = function ref(node) {
    if (!node || node === state.current.element) return;
    removeListeners();
    state.current.element = node;
    state.current.scrollContainers = findScrollContainers(node);
    addListeners();
  }; // add general event listeners


  useOnWindowScroll(scrollChange, Boolean(scroll));
  useOnWindowResize(resizeChange); // respond to changes that are relevant for the listeners

  react.useEffect(function () {
    removeListeners();
    addListeners();
  }, [scroll, scrollChange, resizeChange]); // remove all listeners when the components unmounts

  react.useEffect(function () {
    return removeListeners;
  }, []);
  return [ref, bounds, forceRefresh];
} // Adds native resize listener to window


function useOnWindowResize(onWindowResize) {
  react.useEffect(function () {
    var cb = onWindowResize;
    window.addEventListener('resize', cb);
    return function () {
      return void window.removeEventListener('resize', cb);
    };
  }, [onWindowResize]);
}

function useOnWindowScroll(onScroll, enabled) {
  react.useEffect(function () {
    if (enabled) {
      var _cb = onScroll;
      window.addEventListener('scroll', _cb, {
        capture: true,
        passive: true
      });
      return function () {
        return void window.removeEventListener('scroll', _cb, true);
      };
    }
  }, [onScroll, enabled]);
} // Returns a list of scroll offsets


function findScrollContainers(element) {
  var result = [];
  if (!element || element === document.body) return result;

  var _window$getComputedSt = window.getComputedStyle(element),
      overflow = _window$getComputedSt.overflow,
      overflowX = _window$getComputedSt.overflowX,
      overflowY = _window$getComputedSt.overflowY;

  if ([overflow, overflowX, overflowY].some(function (prop) {
    return prop === 'auto' || prop === 'scroll';
  })) result.push(element);
  return [].concat(result, findScrollContainers(element.parentElement));
} // Checks if element boundaries are equal


var keys = ['x', 'y', 'top', 'bottom', 'left', 'right', 'width', 'height'];

var areBoundsEqual = function areBoundsEqual(a, b) {
  return keys.every(function (key) {
    return a[key] === b[key];
  });
};

module.exports = useMeasure;
