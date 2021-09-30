"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.reporter = void 0;

var _commonTags = require("common-tags");

var _chalk = _interopRequireDefault(require("chalk"));

var _gatsbyTelemetry = require("gatsby-telemetry");

var _opentracing = require("opentracing");

var reduxReporterActions = _interopRequireWildcard(require("./redux/actions"));

var _constants = require("./constants");

var _errors = require("./errors");

var _constructError = _interopRequireDefault(require("../structured-errors/construct-error"));

var _catchExitSignals = require("./catch-exit-signals");

var _reporterTimer = require("./reporter-timer");

var _reporterPhantom = require("./reporter-phantom");

var _reporterProgress = require("./reporter-progress");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const errorFormatter = (0, _errors.getErrorFormatter)();
const tracer = (0, _opentracing.globalTracer)();
let reporterActions = reduxReporterActions;
let isVerbose = false;

function isLogIntentMessage(msg) {
  return msg && msg.type === `LOG_INTENT`;
}
/**
 * Reporter module.
 * @module reporter
 */


class Reporter {
  constructor() {
    this.stripIndent = _commonTags.stripIndent;
    this.format = _chalk.default;
    this.errorMap = {};

    this.setErrorMap = entry => {
      this.errorMap = { ...this.errorMap,
        ...entry
      };
    };

    this.setVerbose = (_isVerbose = true) => {
      isVerbose = _isVerbose;
    };

    this.setNoColor = (isNoColor = false) => {
      if (isNoColor) {
        errorFormatter.withoutColors();
      } // disables colors in popular terminal output coloring packages
      //  - chalk: see https://www.npmjs.com/package/chalk#chalksupportscolor
      //  - ansi-colors: see https://github.com/doowb/ansi-colors/blob/8024126c7115a0efb25a9a0e87bc5e29fd66831f/index.js#L5-L7


      if (isNoColor) {
        process.env.FORCE_COLOR = `0`; // chalk determines color level at import time. Before we reach this point,
        // chalk was already imported, so we need to retroactively adjust level

        _chalk.default.level = 0;
      }
    };

    this.panic = (errorMeta, error, pluginName) => {
      const reporterError = this.error(errorMeta, error, pluginName);
      (0, _gatsbyTelemetry.trackError)(`GENERAL_PANIC`, {
        error: reporterError
      });
      (0, _catchExitSignals.prematureEnd)();
      return process.exit(1);
    };

    this.panicOnBuild = (errorMeta, error, pluginName) => {
      const reporterError = this.error(errorMeta, error, pluginName);
      (0, _gatsbyTelemetry.trackError)(`BUILD_PANIC`, {
        error: reporterError
      });

      if (process.env.gatsby_executing_command === `build`) {
        (0, _catchExitSignals.prematureEnd)();
        process.exit(1);
      }

      return reporterError;
    };

    this.error = (errorMeta, error, pluginName) => {
      let details = {
        context: {}
      }; // Many paths to retain backcompat :scream:
      // 1.
      //   reporter.error(any, Error);
      //   reporter.error(any, [Error]);

      if (error) {
        if (Array.isArray(error)) {
          return error.map(errorItem => this.error(errorMeta, errorItem));
        }

        details.error = error;
        details.context = {
          sourceMessage: errorMeta + ` ` + error.message
        }; // 2.
        //    reporter.error(Error);
      } else if (errorMeta instanceof Error) {
        details.error = errorMeta;
        details.context = {
          sourceMessage: errorMeta.message
        }; // 3.
        //    reporter.error([Error]);
      } else if (Array.isArray(errorMeta)) {
        // when we get an array of messages, call this function once for each error
        return errorMeta.map(errorItem => this.error(errorItem)); // 4.
        //    reporter.error(errorMeta);
      } else if (typeof errorMeta === `object`) {
        details = { ...errorMeta
        }; // 5.
        //    reporter.error('foo');
      } else if (typeof errorMeta === `string`) {
        details.context = {
          sourceMessage: errorMeta
        };
      }

      if (pluginName) {
        var _details;

        details.pluginName = pluginName;
        const id = (_details = details) === null || _details === void 0 ? void 0 : _details.id;

        if (id) {
          const isPrefixed = id.includes(`${pluginName}_`);

          if (!isPrefixed) {
            details.id = `${pluginName}_${id}`;
          }
        }
      }

      const structuredError = (0, _constructError.default)({
        details
      }, this.errorMap);

      if (structuredError) {
        reporterActions.createLog(structuredError);
        (0, _gatsbyTelemetry.trackError)(`GENERIC_ERROR`, {
          error: structuredError
        });
      } // TODO: remove this once Error component can render this info
      // log formatted stacktrace


      if (structuredError.error) {
        this.log(errorFormatter.render(structuredError.error));
      }

      return structuredError;
    };

    this.uptime = prefix => {
      this.verbose(`${prefix}: ${(process.uptime() * 1000).toFixed(3)}ms`);
    };

    this.verbose = text => {
      if (isVerbose) {
        reporterActions.createLog({
          level: _constants.LogLevels.Debug,
          text
        });
      }
    };

    this.success = text => reporterActions.createLog({
      level: _constants.LogLevels.Success,
      text
    });

    this.info = text => reporterActions.createLog({
      level: _constants.LogLevels.Info,
      text
    });

    this.warn = text => reporterActions.createLog({
      level: _constants.LogLevels.Warning,
      text
    });

    this.log = text => reporterActions.createLog({
      level: _constants.LogLevels.Log,
      text
    });

    this.pendingActivity = reporterActions.createPendingActivity;

    this.completeActivity = (id, status = _constants.ActivityStatuses.Success) => {
      reporterActions.endActivity({
        id,
        status
      });
    };

    this.activityTimer = (text, activityArgs = {}) => {
      let {
        parentSpan,
        id,
        tags
      } = activityArgs;
      const spanArgs = parentSpan ? {
        childOf: parentSpan,
        tags
      } : {
        tags
      };

      if (!id) {
        id = text;
      }

      const span = tracer.startSpan(text, spanArgs);
      return (0, _reporterTimer.createTimerReporter)({
        text,
        id,
        span,
        reporter: this,
        reporterActions
      });
    };

    this.phantomActivity = (text, activityArgs = {}) => {
      let {
        parentSpan,
        id,
        tags
      } = activityArgs;
      const spanArgs = parentSpan ? {
        childOf: parentSpan,
        tags
      } : {
        tags
      };

      if (!id) {
        id = text;
      }

      const span = tracer.startSpan(text, spanArgs);
      return (0, _reporterPhantom.createPhantomReporter)({
        id,
        text,
        span,
        reporterActions
      });
    };

    this.createProgress = (text, total = 0, start = 0, activityArgs = {}) => {
      let {
        parentSpan,
        id,
        tags
      } = activityArgs;
      const spanArgs = parentSpan ? {
        childOf: parentSpan,
        tags
      } : {
        tags
      };

      if (!id) {
        id = text;
      }

      const span = tracer.startSpan(text, spanArgs);
      return (0, _reporterProgress.createProgressReporter)({
        id,
        text,
        total,
        start,
        span,
        reporter: this,
        reporterActions
      });
    };

    this._setStage = () => {};
  }

  // This method is called by core when initializing worker process, so it can communicate with main process
  // and dispatch structured logs created by workers to parent process.
  _initReporterMessagingInWorker(sendMessage) {
    const intentifiedActionCreators = {};

    for (const actionCreatorName of Object.keys(reduxReporterActions)) {
      // swap each reporter action creator with function that send intent
      // to main process
      intentifiedActionCreators[actionCreatorName] = (...args) => {
        sendMessage({
          type: `LOG_INTENT`,
          payload: {
            name: actionCreatorName,
            args
          }
        });
      };
    }

    reporterActions = intentifiedActionCreators;
  } // This method is called by core when initializing worker pool, so main process can receive
  // messages from workers and dispatch structured logs created by workers to parent process.


  _initReporterMessagingInMain(onMessage) {
    onMessage(msg => {
      if (isLogIntentMessage(msg)) {
        reduxReporterActions[msg.payload.name].call(reduxReporterActions, // @ts-ignore Next line (`...msg.payload.args`) cause "A spread argument
        // must either have a tuple type or be passed to a rest parameter"
        ...msg.payload.args);
      }
    });
  }

}

const reporter = new Reporter();
exports.reporter = reporter;