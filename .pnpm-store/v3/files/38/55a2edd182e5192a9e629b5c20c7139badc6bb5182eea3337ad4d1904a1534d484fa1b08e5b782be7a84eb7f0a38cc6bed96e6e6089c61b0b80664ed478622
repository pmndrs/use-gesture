"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isColorStop;

var _postcssValueParser = require("postcss-value-parser");

var _colord = require("colord");

var _names = _interopRequireDefault(require("colord/plugins/names"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _colord.extend)([_names.default]);
/* Code derived from https://github.com/pigcan/is-color-stop */

const lengthArray = ['PX', 'IN', 'CM', 'MM', 'EM', 'REM', 'POINTS', 'PC', 'EX', 'CH', 'VW', 'VH', 'VMIN', 'VMAX', '%'];

function isCSSLengthUnit(input) {
  return lengthArray.includes(input.toUpperCase());
}

function isStop(str) {
  let stop = !str;

  if (!stop) {
    const node = (0, _postcssValueParser.unit)(str);

    if (node) {
      if (node.number === 0 || !isNaN(node.number) && isCSSLengthUnit(node.unit)) {
        stop = true;
      }
    } else {
      stop = /^calc\(\S+\)$/g.test(str);
    }
  }

  return stop;
}

function isColorStop(color, stop) {
  return (0, _colord.colord)(color).isValid() && isStop(stop);
}

module.exports = exports.default;