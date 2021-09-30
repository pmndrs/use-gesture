"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setupOutputFileSystem;

var _path = _interopRequireDefault(require("path"));

var _memfs = require("memfs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupOutputFileSystem(context) {
  let outputFileSystem;

  if (context.options.outputFileSystem) {
    // eslint-disable-next-line no-shadow
    const {
      outputFileSystem: outputFileSystemFromOptions
    } = context.options; // Todo remove when we drop webpack@4 support

    if (typeof outputFileSystemFromOptions.join !== "function") {
      throw new Error("Invalid options: options.outputFileSystem.join() method is expected");
    } // Todo remove when we drop webpack@4 support


    if (typeof outputFileSystemFromOptions.mkdirp !== "function") {
      throw new Error("Invalid options: options.outputFileSystem.mkdirp() method is expected");
    }

    outputFileSystem = outputFileSystemFromOptions;
  } else {
    outputFileSystem = (0, _memfs.createFsFromVolume)(new _memfs.Volume()); // TODO: remove when we drop webpack@4 support

    outputFileSystem.join = _path.default.join.bind(_path.default);
  }

  const compilers = context.compiler.compilers || [context.compiler];

  for (const compiler of compilers) {
    // eslint-disable-next-line no-param-reassign
    compiler.outputFileSystem = outputFileSystem;
  } // eslint-disable-next-line no-param-reassign


  context.outputFileSystem = outputFileSystem;
}