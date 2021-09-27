'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('leva/plugin');
var React = require('react');
var web = require('@react-spring/web');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

const Canvas = plugin.styled('canvas', {
  height: 80,
  width: '100%',
  cursor: 'crosshair',
  display: 'block',
  $draggable: ''
});
const SpringPreview = plugin.styled('div', {
  position: 'relative',
  top: -2,
  backgroundColor: '$accent2',
  width: '100%',
  height: 2,
  opacity: 0.2,
  borderRadius: 1,
  transition: 'opacity 350ms ease',
  transformOrigin: 'left'
});

function springFn(tension, friction, mass = 1) {
  const w0 = Math.sqrt(tension / mass) / 1000;
  const zeta = friction / (2 * Math.sqrt(tension * mass));
  const w1 = w0 * Math.sqrt(1.0 - zeta * zeta);
  const w2 = w0 * Math.sqrt(zeta * zeta - 1.0);
  const v_0 = 0;
  const to = 1;
  const from = 0;
  const x_0 = to - from;

  if (zeta < 1) {
    return t => to - Math.exp(-zeta * w0 * t) * ((-v_0 + zeta * w0 * x_0) / w1 * Math.sin(w1 * t) + x_0 * Math.cos(w1 * t));
  } else if (zeta === 1) {
    return t => to - Math.exp(-w0 * t) * (x_0 + (-v_0 + w0 * x_0) * t);
  } else {
    return t => to - Math.exp(-zeta * w0 * t) * ((-v_0 + zeta * w0 * x_0) * Math.sinh(w2 * t) + w2 * x_0 * Math.cosh(w2 * t)) / w2;
  }
}

const SpringPreviewAnimated = web.a(SpringPreview);
function SpringCanvas() {
  const {
    displayValue,
    value,
    onUpdate,
    settings
  } = plugin.useInputContext();
  const springRef = React.useRef(displayValue);
  const accentColor = plugin.useTh('colors', 'highlight3');
  const backgroundColor = plugin.useTh('colors', 'elevation2');
  const fillColor = plugin.useTh('colors', 'highlight1');
  const [gradientTop, gradientBottom] = React.useMemo(() => {
    return [plugin.colord(fillColor).alpha(0.4).toRgbString(), plugin.colord(fillColor).alpha(0.1).toRgbString()];
  }, [fillColor]);
  const {
    tension,
    friction,
    mass = 1
  } = displayValue;
  const {
    tension: ts,
    friction: fs
  } = settings;
  const [spring, api] = web.useSpring(() => ({
    scaleX: 0.5,
    opacity: 0.2,
    immediate: k => k === 'opacity'
  }));
  const bind = plugin.useDrag(({
    movement: [x, y],
    memo: _memo = [tension, friction]
  }) => {
    onUpdate(_objectSpread2(_objectSpread2({}, value), {}, {
      tension: _memo[0] - Math.round(x) * ts.step,
      friction: _memo[1] - Math.round(y / 4) * fs.step
    }));
    return _memo;
  });
  const updateSpring = React.useMemo(() => plugin.debounce(() => {
    const {
      tension,
      friction,
      mass
    } = springRef.current;
    api.start({
      from: {
        scaleX: 0,
        opacity: 0.9
      },
      to: [{
        scaleX: 0.5
      }, {
        opacity: 0.2
      }],
      config: {
        friction,
        tension,
        mass
      }
    });
  }, 250), [api]);
  const drawSpring = React.useCallback((_canvas, _ctx) => {
    const {
      tension,
      friction,
      mass
    } = springRef.current;
    const {
      width,
      height
    } = _canvas;
    const t = springFn(tension, friction, mass);
    const path = new Path2D();

    for (let i = 0; i < width; i++) {
      const v = t(i * 8) * height / 2;
      path.lineTo(i, height - v);
    }

    _ctx.clearRect(0, 0, width, height);

    const gradientPath = new Path2D(path);
    gradientPath.lineTo(width - 1, height);
    gradientPath.lineTo(0, height);

    const gradient = _ctx.createLinearGradient(0, height / 2, 0, height);

    gradient.addColorStop(0.0, gradientTop);
    gradient.addColorStop(1.0, gradientBottom);
    _ctx.fillStyle = gradient;

    _ctx.fill(gradientPath);

    _ctx.strokeStyle = backgroundColor;
    _ctx.lineJoin = 'round';
    _ctx.lineWidth = 14;

    _ctx.stroke(path);

    _ctx.strokeStyle = accentColor;
    _ctx.lineWidth = 2;

    _ctx.stroke(path);
  }, [accentColor, backgroundColor, gradientTop, gradientBottom]);
  const [canvas, ctx] = plugin.useCanvas2d(drawSpring);
  React.useEffect(() => {
    springRef.current = {
      tension,
      friction,
      mass
    };
    drawSpring(canvas.current, ctx.current);
    updateSpring();
  }, [drawSpring, updateSpring, tension, friction, mass, canvas, ctx]);
  return React__default['default'].createElement(React__default['default'].Fragment, null, React__default['default'].createElement(Canvas, _extends({}, bind(), {
    ref: canvas
  })), React__default['default'].createElement(SpringPreviewAnimated, {
    style: spring
  }));
}

const {
  Row,
  Label,
  Vector
} = plugin.Components;
function Spring() {
  const {
    label,
    displayValue,
    onUpdate,
    settings
  } = plugin.useInputContext();
  return React__default['default'].createElement(React__default['default'].Fragment, null, React__default['default'].createElement(Row, null, React__default['default'].createElement(SpringCanvas, null)), React__default['default'].createElement(Row, {
    input: true
  }, React__default['default'].createElement(Label, null, label), React__default['default'].createElement(Vector, {
    value: displayValue,
    settings: settings,
    onUpdate: onUpdate
  })));
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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const _excluded = ["value"];
const defaultTensionSettings = {
  min: 1,
  step: 1
};
const defaultFrictionSettings = {
  min: 1,
  step: 0.5
};
const defaultMassSettings = {
  min: 0.1,
  step: 0.1
};
const defaultValue = {
  tension: 100,
  friction: 30,
  mass: 1
};
const normalize = (input = {}) => {
  const _ref = 'value' in input ? input : {
    value: input
  },
        {
    value: _value
  } = _ref,
        _settings = _objectWithoutProperties(_ref, _excluded);

  const mergedSettings = {
    tension: _objectSpread2(_objectSpread2({}, defaultTensionSettings), _settings.tension),
    friction: _objectSpread2(_objectSpread2({}, defaultFrictionSettings), _settings.friction),
    mass: _objectSpread2(_objectSpread2({}, defaultMassSettings), _settings.mass)
  };
  const {
    value,
    settings
  } = plugin.normalizeVector(_objectSpread2(_objectSpread2({}, defaultValue), _value), mergedSettings);
  return {
    value,
    settings: settings
  };
};
const sanitize = (value, settings, prevValue) => plugin.sanitizeVector(value, settings, prevValue);

const spring = plugin.createPlugin({
  normalize,
  sanitize,
  component: Spring
});

exports.spring = spring;
