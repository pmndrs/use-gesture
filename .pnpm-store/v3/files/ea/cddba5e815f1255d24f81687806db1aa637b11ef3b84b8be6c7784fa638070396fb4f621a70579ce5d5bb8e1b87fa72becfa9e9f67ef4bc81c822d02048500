"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.buildHTMLPagesAndDeleteStaleArtifacts = buildHTMLPagesAndDeleteStaleArtifacts;
exports.buildHTML = exports.doBuildPages = exports.deleteRenderer = exports.buildRenderer = exports.getDevSSRWebpack = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _errors = require("gatsby-cli/lib/reporter/errors");

var _lodash = require("lodash");

var _webpack = _interopRequireDefault(require("webpack"));

var path = _interopRequireWildcard(require("path"));

var _redux = require("../redux");

var _webpack2 = _interopRequireDefault(require("../utils/webpack.config"));

var _webpackErrorUtils = require("../utils/webpack-error-utils");

var buildUtils = _interopRequireWildcard(require("./build-utils"));

var _getPageData = require("../utils/get-page-data");

var _types = require("./types");

var _nodeManifest = require("../utils/node-manifest");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let devssrWebpackCompiler;
let devssrWebpackWatcher;
let needToRecompileSSRBundle = true;

const getDevSSRWebpack = () => {
  if (process.env.gatsby_executing_command !== `develop`) {
    throw new Error(`This function can only be called in development`);
  }

  return {
    devssrWebpackWatcher,
    devssrWebpackCompiler,
    needToRecompileSSRBundle
  };
};

exports.getDevSSRWebpack = getDevSSRWebpack;
let oldHash = ``;
let newHash = ``;

const runWebpack = (compilerConfig, stage, directory, parentSpan) => new _bluebird.default((resolve, reject) => {
  if (!process.env.GATSBY_EXPERIMENTAL_DEV_SSR || stage === `build-html`) {
    const compiler = (0, _webpack.default)(compilerConfig);
    compiler.run((err, stats) => {
      let activity;

      if (process.env.GATSBY_EXPERIMENTAL_PRESERVE_WEBPACK_CACHE) {
        activity = _reporter.default.activityTimer(`Caching HTML renderer compilation`, {
          parentSpan
        });
        activity.start();
      }

      const waitForCompilerClose = new Promise((resolve, reject) => {
        compiler.close(error => {
          if (activity) {
            activity.end();
          }

          if (error) {
            return reject(error);
          }

          return resolve();
        });
      });

      if (err) {
        return reject(err);
      } else {
        return resolve({
          stats: stats,
          waitForCompilerClose
        });
      }
    });
  } else if (process.env.GATSBY_EXPERIMENTAL_DEV_SSR && stage === `develop-html`) {
    devssrWebpackCompiler = (0, _webpack.default)(compilerConfig);
    devssrWebpackCompiler.hooks.invalid.tap(`ssr file invalidation`, () => {
      needToRecompileSSRBundle = true;
    });
    devssrWebpackWatcher = devssrWebpackCompiler.watch({
      ignored: /node_modules/
    }, (err, stats) => {
      needToRecompileSSRBundle = false;

      _redux.emitter.emit(`DEV_SSR_COMPILATION_DONE`);

      devssrWebpackWatcher.suspend();

      if (err) {
        return reject(err);
      } else {
        newHash = (stats === null || stats === void 0 ? void 0 : stats.hash) || ``;

        const {
          restartWorker
        } = require(`../utils/dev-ssr/render-dev-html`); // Make sure we use the latest version during development


        if (oldHash !== `` && newHash !== oldHash) {
          restartWorker(`${directory}/public/render-page.js`);
        }

        oldHash = newHash;
        return resolve({
          stats: stats,
          waitForCompilerClose: Promise.resolve()
        });
      }
    });
  }
});

const doBuildRenderer = async ({
  directory
}, webpackConfig, stage, parentSpan) => {
  const {
    stats,
    waitForCompilerClose
  } = await runWebpack(webpackConfig, stage, directory, parentSpan);

  if (stats.hasErrors()) {
    _reporter.default.panic((0, _webpackErrorUtils.structureWebpackErrors)(stage, stats.compilation.errors));
  }

  if (stage === `build-html` && _redux.store.getState().html.ssrCompilationHash !== stats.hash) {
    _redux.store.dispatch({
      type: `SET_SSR_WEBPACK_COMPILATION_HASH`,
      payload: stats.hash
    });
  } // render-page.js is hard coded in webpack.config


  return {
    rendererPath: `${directory}/public/render-page.js`,
    waitForCompilerClose
  };
};

const buildRenderer = async (program, stage, parentSpan) => {
  const {
    directory
  } = program;
  const config = await (0, _webpack2.default)(program, directory, stage, null, {
    parentSpan
  });
  return doBuildRenderer(program, config, stage, parentSpan);
};

exports.buildRenderer = buildRenderer;

const deleteRenderer = async rendererPath => {
  try {
    await _fsExtra.default.remove(rendererPath);
    await _fsExtra.default.remove(`${rendererPath}.map`);
  } catch (e) {// This function will fail on Windows with no further consequences.
  }
};

exports.deleteRenderer = deleteRenderer;

const renderHTMLQueue = async (workerPool, activity, htmlComponentRendererPath, pages, stage = _types.Stage.BuildHTML) => {
  // We need to only pass env vars that are set programmatically in gatsby-cli
  // to child process. Other vars will be picked up from environment.
  const envVars = [[`NODE_ENV`, process.env.NODE_ENV], [`gatsby_executing_command`, process.env.gatsby_executing_command], [`gatsby_log_level`, process.env.gatsby_log_level]];
  const segments = (0, _lodash.chunk)(pages, 50);
  const sessionId = Date.now();
  const renderHTML = stage === `build-html` ? workerPool.single.renderHTMLProd : workerPool.single.renderHTMLDev;
  const uniqueUnsafeBuiltinUsedStacks = new Set();

  try {
    await _bluebird.default.map(segments, async pageSegment => {
      const renderHTMLResult = await renderHTML({
        envVars,
        htmlComponentRendererPath,
        paths: pageSegment,
        sessionId
      });

      if (stage === `build-html`) {
        const htmlRenderMeta = renderHTMLResult;

        _redux.store.dispatch({
          type: `HTML_GENERATED`,
          payload: pageSegment
        });

        for (const [_pagePath, arrayOfUsages] of Object.entries(htmlRenderMeta.unsafeBuiltinsUsageByPagePath)) {
          for (const unsafeUsageStack of arrayOfUsages) {
            uniqueUnsafeBuiltinUsedStacks.add(unsafeUsageStack);
          }
        }
      }

      if (activity && activity.tick) {
        activity.tick(pageSegment.length);
      }
    });
  } catch (e) {
    var _e$context;

    if (e !== null && e !== void 0 && (_e$context = e.context) !== null && _e$context !== void 0 && _e$context.unsafeBuiltinsUsageByPagePath) {
      for (const [_pagePath, arrayOfUsages] of Object.entries(e.context.unsafeBuiltinsUsageByPagePath)) {
        // @ts-ignore TS doesn't know arrayOfUsages is Iterable
        for (const unsafeUsageStack of arrayOfUsages) {
          uniqueUnsafeBuiltinUsedStacks.add(unsafeUsageStack);
        }
      }
    }

    throw e;
  } finally {
    if (uniqueUnsafeBuiltinUsedStacks.size > 0) {
      console.warn(`Unsafe builtin method was used, future builds will need to rebuild all pages`);

      _redux.store.dispatch({
        type: `SSR_USED_UNSAFE_BUILTIN`
      });
    }

    for (const unsafeBuiltinUsedStack of uniqueUnsafeBuiltinUsedStacks) {
      const prettyError = await (0, _errors.createErrorFromString)(unsafeBuiltinUsedStack, `${htmlComponentRendererPath}.map`);
      const warningMessage = `${prettyError.stack}${prettyError.codeFrame ? `\n\n${prettyError.codeFrame}\n` : ``}`;

      _reporter.default.warn(warningMessage);
    }
  }
};

class BuildHTMLError extends Error {
  constructor(error) {
    super(error.message); // We must use getOwnProperty because keys like `stack` are not enumerable,
    // but we want to copy over the entire error

    this.codeFrame = ``;
    Object.getOwnPropertyNames(error).forEach(key => {
      this[key] = error[key];
    });
  }

}

const truncateObjStrings = obj => {
  // Recursively truncate strings nested in object
  // These objs can be quite large, but we want to preserve each field
  for (const key in obj) {
    if (typeof obj[key] === `object`) {
      truncateObjStrings(obj[key]);
    } else if (typeof obj[key] === `string`) {
      obj[key] = (0, _lodash.truncate)(obj[key], {
        length: 250
      });
    }
  }

  return obj;
};

const doBuildPages = async (rendererPath, pagePaths, activity, workerPool, stage) => {
  try {
    await renderHTMLQueue(workerPool, activity, rendererPath, pagePaths, stage);
  } catch (error) {
    var _error$context;

    const prettyError = await (0, _errors.createErrorFromString)(error.stack, `${rendererPath}.map`);
    const buildError = new BuildHTMLError(prettyError);
    buildError.context = error.context;

    if (error !== null && error !== void 0 && (_error$context = error.context) !== null && _error$context !== void 0 && _error$context.path) {
      const pageData = await (0, _getPageData.getPageData)(error.context.path);
      const truncatedPageData = truncateObjStrings(pageData);
      const pageDataMessage = `Page data from page-data.json for the failed page "${error.context.path}": ${JSON.stringify(truncatedPageData, null, 2)}`;

      _reporter.default.error(pageDataMessage);
    }

    throw buildError;
  }
}; // TODO remove in v4 - this could be a "public" api


exports.doBuildPages = doBuildPages;

const buildHTML = async ({
  program,
  stage,
  pagePaths,
  activity,
  workerPool
}) => {
  const {
    rendererPath
  } = await buildRenderer(program, stage, activity.span);
  await doBuildPages(rendererPath, pagePaths, activity, workerPool, stage);
  await deleteRenderer(rendererPath);
};

exports.buildHTML = buildHTML;

async function buildHTMLPagesAndDeleteStaleArtifacts({
  pageRenderer,
  workerPool,
  buildSpan,
  program
}) {
  buildUtils.markHtmlDirtyIfResultOfUsedStaticQueryChanged();
  const {
    toRegenerate,
    toDelete,
    toCleanupFromTrackedState
  } = buildUtils.calcDirtyHtmlFiles(_redux.store.getState());

  _redux.store.dispatch({
    type: `HTML_TRACKED_PAGES_CLEANUP`,
    payload: toCleanupFromTrackedState
  });

  if (toRegenerate.length > 0) {
    const buildHTMLActivityProgress = _reporter.default.createProgress(`Building static HTML for pages`, toRegenerate.length, 0, {
      parentSpan: buildSpan
    });

    buildHTMLActivityProgress.start();

    try {
      await doBuildPages(pageRenderer, toRegenerate, buildHTMLActivityProgress, workerPool, _types.Stage.BuildHTML);
    } catch (err) {
      let id = `95313`; // TODO: verify error IDs exist

      const context = {
        errorPath: err.context && err.context.path,
        ref: ``
      };
      const match = err.message.match(/ReferenceError: (window|document|localStorage|navigator|alert|location) is not defined/i);

      if (match && match[1]) {
        id = `95312`;
        context.ref = match[1];
      }

      buildHTMLActivityProgress.panic({
        id,
        context,
        error: err
      });
    }

    buildHTMLActivityProgress.end();
  } else {
    _reporter.default.info(`There are no new or changed html files to build.`);
  }

  if (!program.keepPageRenderer) {
    try {
      await deleteRenderer(pageRenderer);
    } catch (err) {// pass through
    }
  }

  if (toDelete.length > 0) {
    const publicDir = path.join(program.directory, `public`);

    const deletePageDataActivityTimer = _reporter.default.activityTimer(`Delete previous page data`);

    deletePageDataActivityTimer.start();
    await buildUtils.removePageFiles(publicDir, toDelete);
    deletePageDataActivityTimer.end();
  } // we process node manifests in this location because we need to make sure all page-data.json files are written for gatsby as well as inc-builds (both call builHTMLPagesAndDeleteStaleArtifacts). Node manifests include a digest of the corresponding page-data.json file and at this point we can be sure page-data has been written out for the latest updates in gatsby build AND inc builds.


  await (0, _nodeManifest.processNodeManifests)();
  return {
    toRegenerate,
    toDelete
  };
}
//# sourceMappingURL=build-html.js.map