"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _gatsby = require("gatsby");

var _catchLinks = _interopRequireDefault(require("./catch-links"));

exports.onClientEntry = function (_, pluginOptions) {
  if (pluginOptions === void 0) {
    pluginOptions = {};
  }

  (0, _catchLinks.default)(window, pluginOptions, function (href) {
    (0, _gatsby.navigate)(href);
  });
};