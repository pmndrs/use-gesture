"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configs = exports.generateAllRulesConfig = exports.generateRecommendedConfig = exports.rules = void 0;

var _requireindex = _interopRequireDefault(require("requireindex"));

/**
 * @fileoverview lint rules for use with jest-dom
 * @author Ben Monro
 */
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
// import all rules in src/rules
const rules = (0, _requireindex.default)(`${__dirname}/rules`);
exports.rules = rules;

const generateRecommendedConfig = allRules => Object.entries(allRules).reduce((memo, [name, rule]) => ({ ...memo,
  ...(rule.meta.docs.recommended ? {
    [`jest-dom/${name}`]: "error"
  } : {})
}), {});

exports.generateRecommendedConfig = generateRecommendedConfig;

const generateAllRulesConfig = allRules => Object.entries(allRules).reduce((memo, [name]) => ({ ...memo,
  ...{
    [`jest-dom/${name}`]: "error"
  }
}), {});

exports.generateAllRulesConfig = generateAllRulesConfig;
const configs = {
  recommended: {
    plugins: ["jest-dom"],
    rules: generateRecommendedConfig(rules)
  },
  all: {
    plugins: ["jest-dom"],
    rules: generateAllRulesConfig(rules)
  }
};
exports.configs = configs;