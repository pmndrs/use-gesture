"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _signalExit = _interopRequireDefault(require("signal-exit"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _gatsbyTelemetry = _interopRequireDefault(require("gatsby-telemetry"));

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _buildHtml = require("./build-html");

var _buildJavascript = require("./build-javascript");

var _bootstrap = require("../bootstrap");

var _apiRunnerNode = _interopRequireDefault(require("../utils/api-runner-node"));

var _graphqlRunner = require("../query/graphql-runner");

var _getStaticDir = require("../utils/get-static-dir");

var _tracer = require("../utils/tracer");

var db = _interopRequireWildcard(require("../redux/save-state"));

var _redux = require("../redux");

var appDataUtil = _interopRequireWildcard(require("../utils/app-data"));

var _pageData = require("../utils/page-data");

var _webpackErrorUtils = require("../utils/webpack-error-utils");

var _feedback = require("../utils/feedback");

var _actions = require("../redux/actions");

var _waitUntilJobsComplete = require("../utils/wait-until-jobs-complete");

var _types = require("./types");

var _services = require("../services");

var _webpackStatus = require("../utils/webpack-status");

var _showExperimentNotice = require("../utils/show-experiment-notice");

var _pool = require("../utils/worker/pool");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

module.exports = async function build(program) {
  if ((0, _gatsbyCoreUtils.isTruthy)(process.env.VERBOSE)) {
    program.verbose = true;
  }

  _reporter.default.setVerbose(program.verbose);

  if (program.profile) {
    _reporter.default.warn(`React Profiling is enabled. This can have a performance impact. See https://www.gatsbyjs.org/docs/profiling-site-performance-with-react-profiler/#performance-impact`);
  }

  await (0, _gatsbyCoreUtils.updateSiteMetadata)({
    name: program.sitePackageJson.name,
    sitePath: program.directory,
    lastRun: Date.now(),
    pid: process.pid
  });
  (0, _webpackStatus.markWebpackStatusAsPending)();

  const publicDir = _path.default.join(program.directory, `public`);

  (0, _tracer.initTracer)(program.openTracingConfigFile);

  const buildActivity = _reporter.default.phantomActivity(`build`);

  buildActivity.start();

  _gatsbyTelemetry.default.trackCli(`BUILD_START`);

  (0, _signalExit.default)(exitCode => {
    _gatsbyTelemetry.default.trackCli(`BUILD_END`, {
      exitCode: exitCode
    });
  });
  const buildSpan = buildActivity.span;
  buildSpan.setTag(`directory`, program.directory);
  const {
    gatsbyNodeGraphQLFunction,
    workerPool
  } = await (0, _bootstrap.bootstrap)({
    program,
    parentSpan: buildSpan
  });
  const graphqlRunner = new _graphqlRunner.GraphQLRunner(_redux.store, {
    collectStats: true,
    graphqlTracing: program.graphqlTracing
  });
  const {
    queryIds
  } = await (0, _services.calculateDirtyQueries)({
    store: _redux.store
  });
  let waitForWorkerPoolRestart = Promise.resolve();

  if (process.env.GATSBY_EXPERIMENTAL_PARALLEL_QUERY_RUNNING) {
    await (0, _pool.runQueriesInWorkersQueue)(workerPool, queryIds); // Jobs still might be running even though query running finished

    await (0, _waitUntilJobsComplete.waitUntilAllJobsComplete)(); // Restart worker pool before merging state to lower memory pressure while merging state

    waitForWorkerPoolRestart = workerPool.restart();
    await (0, _pool.mergeWorkerState)(workerPool);
  } else {
    await (0, _services.runStaticQueries)({
      queryIds,
      parentSpan: buildSpan,
      store: _redux.store,
      graphqlRunner
    });
    await (0, _services.runPageQueries)({
      queryIds,
      graphqlRunner,
      parentSpan: buildSpan,
      store: _redux.store
    });
  }

  await (0, _services.writeOutRequires)({
    store: _redux.store,
    parentSpan: buildSpan
  });
  await (0, _apiRunnerNode.default)(`onPreBuild`, {
    graphql: gatsbyNodeGraphQLFunction,
    parentSpan: buildSpan
  }); // Copy files from the static directory to
  // an equivalent static directory within public.

  (0, _getStaticDir.copyStaticDirs)();

  const buildActivityTimer = _reporter.default.activityTimer(`Building production JavaScript and CSS bundles`, {
    parentSpan: buildSpan
  });

  buildActivityTimer.start();
  let stats;
  let waitForCompilerClose;

  try {
    const result = await (0, _buildJavascript.buildProductionBundle)(program, buildActivityTimer.span);
    stats = result.stats;
    waitForCompilerClose = result.waitForCompilerClose;

    if (stats.hasWarnings()) {
      const rawMessages = stats.toJson({
        moduleTrace: false
      });
      (0, _webpackErrorUtils.reportWebpackWarnings)(rawMessages.warnings, _reporter.default);
    }
  } catch (err) {
    buildActivityTimer.panic((0, _webpackErrorUtils.structureWebpackErrors)(_types.Stage.BuildJavascript, err));
  } finally {
    buildActivityTimer.end();
  }

  const webpackCompilationHash = stats.hash;

  if (webpackCompilationHash !== _redux.store.getState().webpackCompilationHash || !appDataUtil.exists(publicDir)) {
    _redux.store.dispatch({
      type: `SET_WEBPACK_COMPILATION_HASH`,
      payload: webpackCompilationHash
    });

    const rewriteActivityTimer = _reporter.default.activityTimer(`Rewriting compilation hashes`, {
      parentSpan: buildSpan
    });

    rewriteActivityTimer.start();
    await appDataUtil.write(publicDir, webpackCompilationHash);
    rewriteActivityTimer.end();
  }

  await (0, _pageData.flush)();
  (0, _webpackStatus.markWebpackStatusAsDone)();

  if (_gatsbyTelemetry.default.isTrackingEnabled()) {
    // transform asset size to kB (from bytes) to fit 64 bit to numbers
    const bundleSizes = stats.toJson({
      assets: true
    }).assets.filter(asset => asset.name.endsWith(`.js`)).map(asset => asset.size / 1000);
    const pageDataSizes = [..._redux.store.getState().pageDataStats.values()];

    _gatsbyTelemetry.default.addSiteMeasurement(`BUILD_END`, {
      bundleStats: _gatsbyTelemetry.default.aggregateStats(bundleSizes),
      pageDataStats: _gatsbyTelemetry.default.aggregateStats(pageDataSizes),
      queryStats: graphqlRunner.getStats()
    });
  }

  _redux.store.dispatch(_actions.actions.setProgramStatus(`BOOTSTRAP_QUERY_RUNNING_FINISHED`));

  await db.saveState();
  await (0, _waitUntilJobsComplete.waitUntilAllJobsComplete)(); // we need to save it again to make sure our latest state has been saved

  await db.saveState();

  const buildSSRBundleActivityProgress = _reporter.default.activityTimer(`Building HTML renderer`, {
    parentSpan: buildSpan
  });

  buildSSRBundleActivityProgress.start();
  let pageRenderer = ``;
  let waitForCompilerCloseBuildHtml;

  try {
    const result = await (0, _buildHtml.buildRenderer)(program, _types.Stage.BuildHTML, buildSpan);
    pageRenderer = result.rendererPath;
    waitForCompilerCloseBuildHtml = result.waitForCompilerClose;
  } catch (err) {
    buildActivityTimer.panic((0, _webpackErrorUtils.structureWebpackErrors)(_types.Stage.BuildHTML, err));
  } finally {
    buildSSRBundleActivityProgress.end();
  }

  await waitForWorkerPoolRestart;
  const {
    toRegenerate,
    toDelete
  } = await (0, _buildHtml.buildHTMLPagesAndDeleteStaleArtifacts)({
    program,
    pageRenderer,
    workerPool,
    buildSpan
  });
  const waitWorkerPoolEnd = Promise.all(workerPool.end());

  _gatsbyTelemetry.default.addSiteMeasurement(`BUILD_END`, {
    pagesCount: toRegenerate.length,
    // number of html files that will be written
    totalPagesCount: _redux.store.getState().pages.size // total number of pages

  });

  const postBuildActivityTimer = _reporter.default.activityTimer(`onPostBuild`, {
    parentSpan: buildSpan
  });

  postBuildActivityTimer.start();
  await (0, _apiRunnerNode.default)(`onPostBuild`, {
    graphql: gatsbyNodeGraphQLFunction,
    parentSpan: buildSpan
  });
  postBuildActivityTimer.end(); // Wait for any jobs that were started in onPostBuild
  // This could occur due to queries being run which invoke sharp for instance

  await (0, _waitUntilJobsComplete.waitUntilAllJobsComplete)();

  try {
    await waitWorkerPoolEnd;
  } catch (e) {
    _reporter.default.warn(`Error when closing WorkerPool: ${e.message}`);
  } // Make sure we saved the latest state so we have all jobs cached


  await db.saveState();
  await Promise.all([waitForCompilerClose, waitForCompilerCloseBuildHtml]);

  _reporter.default.info(`Done building in ${process.uptime()} sec`);

  buildSpan.finish();
  await (0, _tracer.stopTracer)();
  buildActivity.end();

  if (program.logPages) {
    if (toRegenerate.length) {
      _reporter.default.info(`Built pages:\n${toRegenerate.map(path => `Updated page: ${path}`).join(`\n`)}`);
    }

    if (toDelete.length) {
      _reporter.default.info(`Deleted pages:\n${toDelete.map(path => `Deleted page: ${path}`).join(`\n`)}`);
    }
  }

  if (program.writeToFile) {
    const createdFilesPath = _path.default.resolve(`${program.directory}/.cache`, `newPages.txt`);

    const createdFilesContent = toRegenerate.length ? `${toRegenerate.join(`\n`)}\n` : ``;

    const deletedFilesPath = _path.default.resolve(`${program.directory}/.cache`, `deletedPages.txt`);

    const deletedFilesContent = toDelete.length ? `${toDelete.join(`\n`)}\n` : ``;
    await _fsExtra.default.writeFile(createdFilesPath, createdFilesContent, `utf8`);

    _reporter.default.info(`.cache/newPages.txt created`);

    await _fsExtra.default.writeFile(deletedFilesPath, deletedFilesContent, `utf8`);

    _reporter.default.info(`.cache/deletedPages.txt created`);
  }

  (0, _showExperimentNotice.showExperimentNotices)();

  if (await (0, _feedback.userGetsSevenDayFeedback)()) {
    (0, _feedback.showSevenDayFeedbackRequest)();
  } else if (await (0, _feedback.userPassesFeedbackRequestHeuristic)()) {
    (0, _feedback.showFeedbackRequest)();
  }
};
//# sourceMappingURL=build.js.map