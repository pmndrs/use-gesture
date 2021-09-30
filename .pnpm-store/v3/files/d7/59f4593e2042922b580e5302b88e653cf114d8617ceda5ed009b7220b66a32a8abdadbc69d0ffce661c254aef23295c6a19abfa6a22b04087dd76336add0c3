"use strict";

exports.__esModule = true;
exports.setupLmdbStore = setupLmdbStore;

var _lmdbStore = require("lmdb-store");

var _nodes = require("./updates/nodes");

var _nodesByType = require("./updates/nodes-by-type");

var _redux = require("../../redux");

var _iterable = require("../common/iterable");

var _runQuery = require("./query/run-query");

var _runFastFilters = require("../in-memory/run-fast-filters");

var _process$env$FORCE_TE;

const lmdbDatastore = {
  getNode,
  getTypes,
  countNodes,
  iterateNodes,
  iterateNodesByType,
  updateDataStore,
  ready,
  runQuery,
  // deprecated:
  getNodes,
  getNodesByType
};
const rootDbFile = process.env.NODE_ENV === `test` ? `test-datastore-${// FORCE_TEST_DATABASE_ID will be set if this gets executed in worker context
// when running jest tests. JEST_WORKER_ID will be set when this gets executed directly
// in test context (jest will use jest-worker internally).
(_process$env$FORCE_TE = process.env.FORCE_TEST_DATABASE_ID) !== null && _process$env$FORCE_TE !== void 0 ? _process$env$FORCE_TE : process.env.JEST_WORKER_ID}` : `datastore`;
let rootDb;
let databases;

function getRootDb() {
  if (!rootDb) {
    rootDb = (0, _lmdbStore.open)({
      name: `root`,
      path: process.cwd() + `/.cache/data/` + rootDbFile,
      compression: true
    });
  }

  return rootDb;
}

function getDatabases() {
  if (!databases) {
    const rootDb = getRootDb();
    databases = {
      nodes: rootDb.openDB({
        name: `nodes`,
        // FIXME: sharedStructuresKey breaks tests - probably need some cleanup for it on DELETE_CACHE
        // sharedStructuresKey: Symbol.for(`structures`),
        // @ts-ignore
        cache: true
      }),
      nodesByType: rootDb.openDB({
        name: `nodesByType`,
        dupSort: true
      }),
      metadata: rootDb.openDB({
        name: `metadata`,
        useVersions: true
      }),
      indexes: rootDb.openDB({
        name: `indexes` // TODO: use dupSort when this is ready: https://github.com/DoctorEvidence/lmdb-store/issues/66
        // dupSort: true

      })
    };
  }

  return databases;
}
/**
 * @deprecated
 */


function getNodes() {
  // const start = performance.now()
  const result = Array.from(iterateNodes()); // const timeTotal = performance.now() - start
  // console.warn(
  //   `getNodes() is deprecated, use iterateNodes() instead; ` +
  //     `array length: ${result.length}; time(ms): ${timeTotal}`
  // )

  return result !== null && result !== void 0 ? result : [];
}
/**
 * @deprecated
 */


function getNodesByType(type) {
  // const start = performance.now()
  const result = Array.from(iterateNodesByType(type)); // const timeTotal = performance.now() - start
  // console.warn(
  //   `getNodesByType() is deprecated, use iterateNodesByType() instead; ` +
  //     `array length: ${result.length}; time(ms): ${timeTotal}`
  // )

  return result !== null && result !== void 0 ? result : [];
}

function iterateNodes() {
  // Additionally fetching items by id to leverage lmdb-store cache
  const nodesDb = getDatabases().nodes;
  return new _iterable.GatsbyIterable(nodesDb.getKeys({
    snapshot: false
  }).map(nodeId => typeof nodeId === `string` ? getNode(nodeId) : undefined).filter(Boolean));
}

function iterateNodesByType(type) {
  const nodesByType = getDatabases().nodesByType;
  return new _iterable.GatsbyIterable(nodesByType.getValues(type).map(nodeId => getNode(nodeId)).filter(Boolean));
}

function getNode(id) {
  if (!id) return undefined;
  const {
    nodes
  } = getDatabases();
  return nodes.get(id);
}

function getTypes() {
  return getDatabases().nodesByType.getKeys({}).asArray;
}

function countNodes(typeName) {
  if (!typeName) {
    const stats = getDatabases().nodes.getStats(); // @ts-ignore

    return Number(stats.entryCount || 0); // FIXME: add -1 when restoring shared structures key
  }

  const {
    nodesByType
  } = getDatabases();
  return nodesByType.getValuesCount(typeName);
}

async function runQuery(args) {
  if (process.env.GATSBY_EXPERIMENTAL_LMDB_INDEXES) {
    return await (0, _runQuery.doRunQuery)({
      datastore: lmdbDatastore,
      databases: getDatabases(),
      ...args
    });
  }

  return Promise.resolve((0, _runFastFilters.runFastFiltersAndSort)(args));
}

let lastOperationPromise = Promise.resolve();

function updateDataStore(action) {
  switch (action.type) {
    case `DELETE_CACHE`:
      {
        const dbs = getDatabases(); // Force sync commit

        dbs.nodes.transactionSync(() => {
          dbs.nodes.clear();
          dbs.nodesByType.clear();
          dbs.metadata.clear();
          dbs.indexes.clear();
        });
        break;
      }

    case `SET_PROGRAM`:
      {
        // TODO: remove this when we have support for incremental indexes in lmdb
        clearIndexes();
        break;
      }

    case `CREATE_NODE`:
    case `ADD_FIELD_TO_NODE`:
    case `ADD_CHILD_NODE_TO_PARENT_NODE`:
    case `DELETE_NODE`:
      {
        const dbs = getDatabases();
        lastOperationPromise = Promise.all([(0, _nodes.updateNodes)(dbs.nodes, action), (0, _nodesByType.updateNodesByType)(dbs.nodesByType, action)]);
      }
  }
}

function clearIndexes() {
  const dbs = getDatabases();
  dbs.nodes.transactionSync(() => {
    dbs.metadata.clear();
    dbs.indexes.clear();
  });
}
/**
 * Resolves when all the data is synced
 */


async function ready() {
  await lastOperationPromise;
}

function setupLmdbStore() {
  (0, _redux.replaceReducer)({
    nodes: (state = new Map(), action) => action.type === `DELETE_CACHE` ? new Map() : state,
    nodesByType: (state = new Map(), action) => action.type === `DELETE_CACHE` ? new Map() : state
  });

  _redux.emitter.on(`*`, action => {
    if (action) {
      updateDataStore(action);
    }
  }); // TODO: remove this when we have support for incremental indexes in lmdb


  clearIndexes();
  return lmdbDatastore;
}
//# sourceMappingURL=lmdb-datastore.js.map