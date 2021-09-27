"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wdm;

var _schemaUtils = require("schema-utils");

var _mimeTypes = _interopRequireDefault(require("mime-types"));

var _middleware = _interopRequireDefault(require("./middleware"));

var _getFilenameFromUrl = _interopRequireDefault(require("./utils/getFilenameFromUrl"));

var _setupHooks = _interopRequireDefault(require("./utils/setupHooks"));

var _setupWriteToDisk = _interopRequireDefault(require("./utils/setupWriteToDisk"));

var _setupOutputFileSystem = _interopRequireDefault(require("./utils/setupOutputFileSystem"));

var _ready = _interopRequireDefault(require("./utils/ready"));

var _options = _interopRequireDefault(require("./options.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const noop = () => {};

function wdm(compiler, options = {}) {
  (0, _schemaUtils.validate)(_options.default, options, {
    name: "Dev Middleware",
    baseDataPath: "options"
  });
  const {
    mimeTypes
  } = options;

  if (mimeTypes) {
    const {
      types
    } = _mimeTypes.default; // mimeTypes from user provided options should take priority
    // over existing, known types

    _mimeTypes.default.types = { ...types,
      ...mimeTypes
    };
  }

  const context = {
    state: false,
    stats: null,
    callbacks: [],
    options,
    compiler,
    watching: null
  }; // eslint-disable-next-line no-param-reassign

  context.logger = context.compiler.getInfrastructureLogger("webpack-dev-middleware");
  (0, _setupHooks.default)(context);

  if (options.writeToDisk) {
    (0, _setupWriteToDisk.default)(context);
  }

  (0, _setupOutputFileSystem.default)(context); // Start watching

  if (context.compiler.watching) {
    context.watching = context.compiler.watching;
  } else {
    let watchOptions;

    if (Array.isArray(context.compiler.compilers)) {
      watchOptions = context.compiler.compilers.map(childCompiler => childCompiler.options.watchOptions || {});
    } else {
      watchOptions = context.compiler.options.watchOptions || {};
    }

    context.watching = context.compiler.watch(watchOptions, error => {
      if (error) {
        // TODO: improve that in future
        // For example - `writeToDisk` can throw an error and right now it is ends watching.
        // We can improve that and keep watching active, but it is require API on webpack side.
        // Let's implement that in webpack@5 because it is rare case.
        context.logger.error(error);
      }
    });
  }

  const instance = (0, _middleware.default)(context); // API

  instance.getFilenameFromUrl = url => (0, _getFilenameFromUrl.default)(context, url);

  instance.waitUntilValid = (callback = noop) => {
    (0, _ready.default)(context, callback);
  };

  instance.invalidate = (callback = noop) => {
    (0, _ready.default)(context, callback);
    context.watching.invalidate();
  };

  instance.close = (callback = noop) => {
    context.watching.close(callback);
  };

  instance.context = context;
  return instance;
}