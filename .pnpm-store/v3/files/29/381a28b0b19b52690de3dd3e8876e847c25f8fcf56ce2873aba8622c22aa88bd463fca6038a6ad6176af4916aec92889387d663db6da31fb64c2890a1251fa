"use strict";

var path = require("path");

var regexEscape = require("regex-escape");

exports.onCreateWebpackConfig = function (_ref, _ref2) {
  var actions = _ref.actions,
      loaders = _ref.loaders;
  var _ref2$modules = _ref2.modules,
      modules = _ref2$modules === void 0 ? [] : _ref2$modules,
      _ref2$test = _ref2.test,
      test = _ref2$test === void 0 ? /\.js$/ : _ref2$test;
  actions.setWebpackConfig({
    module: {
      rules: [{
        test: test,
        exclude: function exclude(modulePath) {
          return /node_modules/.test(modulePath) && // whitelist specific es6 module
          !new RegExp("node_modules[\\\\/](".concat(modules.map(function (module) {
            return module.replace(/\//, path.sep);
          }).map(regexEscape).join("|"), ")[\\\\/]")).test(modulePath);
        },
        use: loaders.js()
      }]
    }
  });
};