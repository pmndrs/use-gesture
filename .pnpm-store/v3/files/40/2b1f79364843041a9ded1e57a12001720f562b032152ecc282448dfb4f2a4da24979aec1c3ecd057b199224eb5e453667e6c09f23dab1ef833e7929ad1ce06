#!/usr/bin/env node
"use strict";

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _meow = _interopRequireDefault(require("meow"));

var _resolveFrom = _interopRequireDefault(require("resolve-from"));

var _standalone = _interopRequireDefault(require("./standalone.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = (0, _meow.default)(`
    Usage generate-robotstxt [options] <dest>

    Options:
       --config  Path to a specific configuration file.
`, {
  flags: {
    config: {
      type: "string"
    }
  }
});
const optionsBase = {};

if (cli.flags.config) {
  // Should check these possibilities:
  //   a. name of a node_module
  //   b. absolute path
  //   c. relative path relative to `process.cwd()`.
  // If none of the above work, we'll try a relative path starting
  // in `process.cwd()`.
  optionsBase.configFile = (0, _resolveFrom.default)(process.cwd(), cli.flags.config) || _path.default.join(process.cwd(), cli.flags.config);
}

Promise.resolve().then(() => Object.assign({}, optionsBase)).then(options => (0, _standalone.default)(options)).then(output => {
  if (cli.input.length === 0) {
    throw new Error("Require `dest` argument");
  }

  const dest = _path.default.resolve(cli.input.pop());

  return Promise.resolve().then(() => _fsExtra.default.outputFile(dest, output));
}).catch(error => {
  console.log(error); // eslint-disable-line no-console

  process.exit(error.code || 1);
});