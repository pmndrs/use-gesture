"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.calcInitialDirtyQueryIds = exports.calcDirtyQueryIds = calcDirtyQueryIds;
exports.groupQueryIds = groupQueryIds;
exports.processStaticQueries = processStaticQueries;
exports.processPageQueries = processPageQueries;

var _lodash = _interopRequireDefault(require("lodash"));

var _fastq = _interopRequireDefault(require("fastq"));

var _redux = require("../redux");

var _queries = require("../redux/reducers/queries");

var _queryRunner = require("./query-runner");

var _websocketManager = require("../utils/websocket-manager");

var _graphqlRunner = require("./graphql-runner");

if (process.env.GATSBY_EXPERIMENTAL_QUERY_CONCURRENCY) {
  console.info(`GATSBY_EXPERIMENTAL_QUERY_CONCURRENCY: Running with concurrency set to \`${process.env.GATSBY_EXPERIMENTAL_QUERY_CONCURRENCY}\``);
}

const concurrency = Number(process.env.GATSBY_EXPERIMENTAL_QUERY_CONCURRENCY) || 4;
/**
 * Calculates the set of dirty query IDs (page.paths, or staticQuery.id's).
 *
 * Dirty state is tracked in `queries` reducer, here we simply filter
 * them from all tracked queries.
 */

function calcDirtyQueryIds(state) {
  const {
    trackedQueries,
    trackedComponents,
    deletedQueries
  } = state.queries;
  const queriesWithBabelErrors = new Set();

  for (const component of trackedComponents.values()) {
    if ((0, _queries.hasFlag)(component.errors, _queries.FLAG_ERROR_EXTRACTION)) {
      for (const queryId of component.pages) {
        queriesWithBabelErrors.add(queryId);
      }
    }
  } // Note: trackedQueries contains both - page and static query ids


  const dirtyQueryIds = [];

  for (const [queryId, query] of trackedQueries) {
    if (deletedQueries.has(queryId)) {
      continue;
    }

    if (query.dirty > 0 && !queriesWithBabelErrors.has(queryId)) {
      dirtyQueryIds.push(queryId);
    }
  }

  return dirtyQueryIds;
}

/**
 * Groups queryIds by whether they are static or page queries.
 */
function groupQueryIds(queryIds) {
  var _grouped$page, _grouped$page$map;

  const grouped = _lodash.default.groupBy(queryIds, p => p.slice(0, 4) === `sq--` ? `static` : `page`);

  const {
    pages
  } = _redux.store.getState();

  return {
    staticQueryIds: (grouped === null || grouped === void 0 ? void 0 : grouped.static) || [],
    pageQueryIds: (grouped === null || grouped === void 0 ? void 0 : (_grouped$page = grouped.page) === null || _grouped$page === void 0 ? void 0 : (_grouped$page$map = _grouped$page.map(path => pages.get(path))) === null || _grouped$page$map === void 0 ? void 0 : _grouped$page$map.filter(Boolean)) || []
  };
}

function createQueue({
  createJobFn,
  state,
  activity,
  graphqlRunner,
  graphqlTracing
}) {
  if (!graphqlRunner) {
    graphqlRunner = new _graphqlRunner.GraphQLRunner(_redux.store, {
      graphqlTracing
    });
  }

  state = state || _redux.store.getState();

  function worker(queryId, cb) {
    const job = createJobFn(state, queryId);

    if (!job) {
      cb(null, undefined);
      return;
    }

    (0, _queryRunner.queryRunner)(graphqlRunner, job, activity === null || activity === void 0 ? void 0 : activity.span).then(result => {
      if (activity.tick) {
        activity.tick();
      }

      cb(null, {
        job,
        result
      });
    }).catch(error => {
      cb(error);
    });
  } // Note: fastq.promise version is much slower


  return (0, _fastq.default)(worker, concurrency);
}

async function processQueries({
  queryIds,
  createJobFn,
  onQueryDone,
  state,
  activity,
  graphqlRunner,
  graphqlTracing
}) {
  return new Promise((resolve, reject) => {
    const fastQueue = createQueue({
      createJobFn,
      state,
      activity,
      graphqlRunner,
      graphqlTracing
    });
    queryIds.forEach(queryId => {
      fastQueue.push(queryId, (err, res) => {
        if (err) {
          fastQueue.kill();
          reject(err);
          return;
        }

        if (res && onQueryDone) {
          onQueryDone(res);
        }
      });
    });

    if (!fastQueue.idle()) {
      fastQueue.drain = () => resolve();
    } else {
      resolve();
    }
  });
}

function createStaticQueryJob(state, queryId) {
  const component = state.staticQueryComponents.get(queryId);

  if (!component) {
    return undefined;
  }

  const {
    hash,
    id,
    query,
    componentPath
  } = component;
  return {
    id: queryId,
    query,
    isPage: false,
    hash,
    componentPath,
    context: {
      path: id
    }
  };
}

function onDevelopStaticQueryDone({
  job,
  result
}) {
  if (!job.hash) {
    return;
  }

  _websocketManager.websocketManager.emitStaticQueryData({
    result,
    id: job.hash
  });
}

async function processStaticQueries(queryIds, {
  state,
  activity,
  graphqlRunner,
  graphqlTracing
}) {
  return processQueries({
    queryIds,
    createJobFn: createStaticQueryJob,
    onQueryDone: process.env.NODE_ENV === `production` ? undefined : onDevelopStaticQueryDone,
    state,
    activity,
    graphqlRunner,
    graphqlTracing
  });
}

async function processPageQueries(queryIds, {
  state,
  activity,
  graphqlRunner,
  graphqlTracing
}) {
  const processedQueries = await processQueries({
    queryIds,
    createJobFn: createPageQueryJob,
    onQueryDone: undefined,
    state,
    activity,
    graphqlRunner,
    graphqlTracing
  });
  return processedQueries;
}

function createPageQueryJob(state, page) {
  const component = state.components.get(page.componentPath);

  if (!component) {
    return undefined;
  }

  const {
    path,
    componentPath,
    context
  } = page;

  if ("" === `4`) {
    const {
      mode
    } = page;

    if (mode !== `SSG`) {
      return undefined;
    }
  }

  const {
    query
  } = component;
  return {
    id: path,
    query,
    isPage: true,
    componentPath,
    context: { ...page,
      ...context
    }
  };
}
//# sourceMappingURL=index.js.map