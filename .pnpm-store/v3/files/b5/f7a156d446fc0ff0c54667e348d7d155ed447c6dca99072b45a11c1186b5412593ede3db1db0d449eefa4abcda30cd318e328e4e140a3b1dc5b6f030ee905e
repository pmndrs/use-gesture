"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.meta = void 0;

var _createBannedAttributeRule = _interopRequireDefault(require("../createBannedAttributeRule"));

/**
 * @fileoverview prefer toBeDisabled or toBeEnabled over attribute checks
 * @author Ben Monro
 */
const meta = {
  docs: {
    description: "prefer toBeChecked over checking attributes",
    category: "Best Practices",
    recommended: true,
    url: "prefer-checked"
  },
  fixable: "code"
};
exports.meta = meta;
const create = (0, _createBannedAttributeRule.default)({
  preferred: "toBeChecked",
  negatedPreferred: "not.toBeChecked",
  attributes: ["checked", "aria-checked"]
});
exports.create = create;