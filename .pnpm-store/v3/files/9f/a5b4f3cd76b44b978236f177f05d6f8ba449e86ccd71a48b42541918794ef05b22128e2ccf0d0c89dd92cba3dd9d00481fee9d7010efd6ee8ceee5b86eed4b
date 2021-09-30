"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prettier = require("prettier");

var _default = resolveConfig => file => Boolean(_prettier.getFileInfo.sync(file, {
  resolveConfig,
  ..._prettier.resolveConfig.sync(file, {
    editorconfig: true
  }, {
    filepath: file
  })
}).inferredParser);

exports.default = _default;