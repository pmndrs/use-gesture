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
    description: "prefer toBeDisabled or toBeEnabled over checking attributes",
    category: "Best Practices",
    recommended: true,
    url: "prefer-enabled-disabled"
  },
  fixable: "code"
};
exports.meta = meta;
const create = (0, _createBannedAttributeRule.default)({
  preferred: "toBeDisabled",
  negatedPreferred: "toBeEnabled",
  attributes: ["disabled"]
});
exports.create = create;