"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _options = require("../utils/options");

var _detectors = require("../utils/detectors");

var _minify = require("../minify");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(t) {
  return function (path, state) {
    if ((0, _options.useMinify)(state) && ((0, _detectors.isStyled)(t)(path.node.tag, state) || (0, _detectors.isHelper)(t)(path.node.tag, state))) {
      var templateLiteral = path.node.quasi;
      var quasisLength = templateLiteral.quasis.length;

      var _minifyRawValues = (0, _minify.minifyRawValues)(templateLiteral.quasis.map(function (x) {
        return x.value.raw;
      })),
          _minifyRawValues2 = _slicedToArray(_minifyRawValues, 1),
          rawValuesMinified = _minifyRawValues2[0];

      var _minifyCookedValues = (0, _minify.minifyCookedValues)(templateLiteral.quasis.map(function (x) {
        return x.value.cooked;
      })),
          _minifyCookedValues2 = _slicedToArray(_minifyCookedValues, 2),
          cookedValuesMinfified = _minifyCookedValues2[0],
          eliminatedExpressionIndices = _minifyCookedValues2[1];

      eliminatedExpressionIndices.forEach(function (expressionIndex, iteration) {
        templateLiteral.expressions.splice(expressionIndex - iteration, 1);
      });

      for (var i = 0; i < quasisLength; i++) {
        var element = templateLiteral.quasis[i];
        element.value.raw = rawValuesMinified[i];
        element.value.cooked = cookedValuesMinfified[i];
      }
    }
  };
};

exports.default = _default;