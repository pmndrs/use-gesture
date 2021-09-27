"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.runQueriesInWorkersQueue = runQueriesInWorkersQueue;
exports.mergeWorkerState = mergeWorkerState;
exports.create = void 0;

var _gatsbyWorker = require("gatsby-worker");

var _lodash = require("lodash");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _workerMessaging = require("../jobs/worker-messaging");

var _reporter2 = require("./reporter");

var _redux = require("../../redux");

const create = () => {
  const numWorkers = Math.max(1, (0, _gatsbyCoreUtils.cpuCoreCount)() - 1);

  _reporter.default.verbose(`Creating ${numWorkers} worker`);

  const worker = new _gatsbyWorker.WorkerPool(require.resolve(`./child`), {
    numWorkers,
    env: {
      GATSBY_WORKER_POOL_WORKER: `true`
    }
  });
  (0, _workerMessaging.initJobsMessagingInMainProcess)(worker);
  (0, _reporter2.initReporterMessagingInMainProcess)(worker);
  return worker;
};

exports.create = create;
const queriesChunkSize = Number(process.env.GATSBY_PARALLEL_QUERY_CHUNK_SIZE) || 50;

async function runQueriesInWorkersQueue(pool, queryIds, chunkSize = queriesChunkSize) {
  const staticQuerySegments = (0, _lodash.chunk)(queryIds.staticQueryIds, chunkSize);
  const pageQuerySegments = (0, _lodash.chunk)(queryIds.pageQueryIds, chunkSize);

  const activity = _reporter.default.createProgress(`run queries in workers`, queryIds.staticQueryIds.length + queryIds.pageQueryIds.length);

  activity.start();
  pool.all.setComponents();

  for (const segment of staticQuerySegments) {
    pool.single.runQueries({
      pageQueryIds: [],
      staticQueryIds: segment
    }).then(replayWorkerActions).then(() => {
      activity.tick(segment.length);
    });
  }

  for (const segment of pageQuerySegments) {
    pool.single.runQueries({
      pageQueryIds: segment,
      staticQueryIds: []
    }).then(replayWorkerActions).then(() => {
      activity.tick(segment.length);
    });
  } // note that we only await on this and not on anything before (`.setComponents()` or `.runQueries()`)
  // because gatsby-worker will queue tasks internally and worker will never execute multiple tasks at the same time
  // so awaiting `.saveQueriesDependencies()` is enough to make sure `.setComponents()` and `.runQueries()` finished


  await Promise.all(pool.all.saveQueriesDependencies());
  activity.end();
}

async function mergeWorkerState(pool) {
  const activity = _reporter.default.activityTimer(`Merge worker state`);

  activity.start();

  for (const {
    workerId
  } of pool.getWorkerInfo()) {
    const state = (0, _redux.loadPartialStateFromDisk)([`queries`], String(workerId));
    const queryStateChunk = state.queries;

    if (queryStateChunk) {
      // When there are too little queries, some worker can be inactive and its state is empty
      _redux.store.dispatch({
        type: `MERGE_WORKER_QUERY_STATE`,
        payload: {
          workerId,
          queryStateChunk
        }
      });

      await new Promise(resolve => process.nextTick(resolve));
    }
  }

  activity.end();
}

async function replayWorkerActions(actions) {
  let i = 1;

  for (const action of actions) {
    _redux.store.dispatch(action); // Give event loop some breath


    if (i++ % 100 === 0) {
      await new Promise(resolve => process.nextTick(resolve));
    }
  }
}
//# sourceMappingURL=pool.js.map