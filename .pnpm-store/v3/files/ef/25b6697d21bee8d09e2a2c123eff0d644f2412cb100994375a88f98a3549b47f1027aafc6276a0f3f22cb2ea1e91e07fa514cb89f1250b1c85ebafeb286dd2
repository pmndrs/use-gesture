"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.prepareRegex = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

const prepareRegex = str => {
  const exploded = str.split(`/`);
  const regex = new RegExp(exploded.slice(1, -1).join(`/`), _lodash.default.last(exploded));
  return regex;
};

exports.prepareRegex = prepareRegex;
//# sourceMappingURL=prepare-regex.js.map