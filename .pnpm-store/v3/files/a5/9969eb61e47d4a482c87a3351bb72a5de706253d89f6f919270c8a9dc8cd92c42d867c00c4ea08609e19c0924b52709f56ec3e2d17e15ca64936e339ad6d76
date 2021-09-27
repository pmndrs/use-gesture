"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.queryRunner = queryRunner;

var _lodash = _interopRequireDefault(require("lodash"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _crypto = _interopRequireDefault(require("crypto"));

var _path = _interopRequireDefault(require("path"));

var _redux = require("../redux");

var _actions = require("../redux/actions");

var _graphqlErrors = require("./graphql-errors");

var _errorParser = _interopRequireDefault(require("./error-parser"));

var _pageData = require("../utils/page-data");

const resultHashes = new Map();

function reportLongRunningQueryJob(queryJob) {
  const messageParts = [`Query takes too long:`, `File path: ${queryJob.componentPath}`];

  if (queryJob.isPage) {
    const {
      path,
      context
    } = queryJob.context;
    messageParts.push(`URL path: ${path}`);

    if (!_lodash.default.isEmpty(context)) {
      messageParts.push(`Context: ${JSON.stringify(context, null, 4)}`);
    }
  }

  _reporter.default.warn(messageParts.join(`\n`));
}

function panicQueryJobError(queryJob, errors) {
  let urlPath = undefined;
  let queryContext = {};
  const plugin = queryJob.pluginCreatorId || `none`;

  if (queryJob.isPage) {
    urlPath = queryJob.context.path;
    queryContext = queryJob.context.context;
  }

  const structuredErrors = errors.map(e => {
    const structuredError = (0, _errorParser.default)({
      message: e.message,
      filePath: undefined,
      location: undefined,
      error: e
    });
    structuredError.context = { ...structuredError.context,
      codeFrame: (0, _graphqlErrors.getCodeFrame)(queryJob.query, e.locations && e.locations[0].line, e.locations && e.locations[0].column),
      filePath: queryJob.componentPath,
      ...(urlPath ? {
        urlPath
      } : {}),
      ...queryContext,
      plugin
    };
    return structuredError;
  });

  _reporter.default.panicOnBuild(structuredErrors);
}

async function startQueryJob(graphqlRunner, queryJob, parentSpan) {
  let isPending = true; // Print out warning when query takes too long

  const timeoutId = setTimeout(() => {
    if (isPending) {
      reportLongRunningQueryJob(queryJob);
    }
  }, 15000);
  return graphqlRunner.query(queryJob.query, queryJob.context, {
    parentSpan,
    queryName: queryJob.id,
    componentPath: queryJob.componentPath
  }).finally(() => {
    isPending = false;
    clearTimeout(timeoutId);
  });
}

async function queryRunner(graphqlRunner, queryJob, parentSpan) {
  const {
    program
  } = _redux.store.getState();

  _redux.store.dispatch(_actions.actions.queryStart({
    path: queryJob.id,
    componentPath: queryJob.componentPath,
    isPage: queryJob.isPage
  })); // Run query


  let result; // Nothing to do if the query doesn't exist.

  if (!queryJob.query || queryJob.query === ``) {
    result = {};
  } else {
    result = await startQueryJob(graphqlRunner, queryJob, parentSpan);
  }

  if (result.errors) {
    // If there's a graphql error then log the error and exit
    panicQueryJobError(queryJob, result.errors);
  } // Add the page context onto the results.


  if (queryJob && queryJob.isPage) {
    result[`pageContext`] = Object.assign({}, queryJob.context);
  } // Delete internal data from pageContext


  if (result.pageContext) {
    delete result.pageContext.path;
    delete result.pageContext.internalComponentName;
    delete result.pageContext.component;
    delete result.pageContext.componentChunkName;
    delete result.pageContext.updatedAt;
    delete result.pageContext.pluginCreator___NODE;
    delete result.pageContext.pluginCreatorId;
    delete result.pageContext.componentPath;
    delete result.pageContext.context;
    delete result.pageContext.isCreatedByStatefulCreatePages;

    if ("" === `4`) {
      delete result.pageContext.mode;
    }
  }

  const resultJSON = JSON.stringify(result);

  const resultHash = _crypto.default.createHash(`sha1`).update(resultJSON).digest(`base64`);

  if (resultHash !== resultHashes.get(queryJob.id) || queryJob.isPage && !(0, _pageData.pageDataExists)(_path.default.join(program.directory, `public`), queryJob.id)) {
    resultHashes.set(queryJob.id, resultHash);

    if (queryJob.isPage) {
      // We need to save this temporarily in cache because
      // this might be incomplete at the moment
      await (0, _pageData.savePageQueryResult)(program.directory, queryJob.id, resultJSON);

      _redux.store.dispatch({
        type: `ADD_PENDING_PAGE_DATA_WRITE`,
        payload: {
          path: queryJob.id
        }
      });
    } else {
      const resultPath = _path.default.join(program.directory, `public`, `page-data`, `sq`, `d`, `${queryJob.hash}.json`);

      await _fsExtra.default.outputFile(resultPath, resultJSON);
    }
  } // Broadcast that a page's query has run.


  _redux.store.dispatch(_actions.actions.pageQueryRun({
    path: queryJob.id,
    componentPath: queryJob.componentPath,
    isPage: queryJob.isPage,
    resultHash,
    queryHash: queryJob.hash
  }));

  return result;
}
//# sourceMappingURL=query-runner.js.map