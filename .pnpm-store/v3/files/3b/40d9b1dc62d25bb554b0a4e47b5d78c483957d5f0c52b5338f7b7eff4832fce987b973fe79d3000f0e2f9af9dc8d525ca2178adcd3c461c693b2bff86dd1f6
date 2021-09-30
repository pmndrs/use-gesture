"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.reverseFixedPagePath = reverseFixedPagePath;
exports.readPageData = readPageData;
exports.removePageData = removePageData;
exports.pageDataExists = pageDataExists;
exports.waitUntilPageQueryResultsAreStored = waitUntilPageQueryResultsAreStored;
exports.savePageQueryResult = savePageQueryResult;
exports.readPageQueryResult = readPageQueryResult;
exports.writePageData = writePageData;
exports.isFlushEnqueued = isFlushEnqueued;
exports.flush = flush;
exports.enqueueFlush = enqueueFlush;
exports.handleStalePageData = handleStalePageData;

var _fs = require("@nodelib/fs.walk");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _fastq = _interopRequireDefault(require("fastq"));

var _path = _interopRequireDefault(require("path"));

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _websocketManager = require("./websocket-manager");

var _webpackStatus = require("./webpack-status");

var _redux = require("../redux");

var _queries = require("../redux/reducers/queries");

var _datastore = require("../datastore");

function reverseFixedPagePath(pageDataRequestPath) {
  return pageDataRequestPath === `index` ? `/` : pageDataRequestPath;
}

async function readPageData(publicDir, pagePath) {
  const filePath = (0, _gatsbyCoreUtils.generatePageDataPath)(publicDir, pagePath);
  const rawPageData = await _fsExtra.default.readFile(filePath, `utf-8`);
  return JSON.parse(rawPageData);
}

async function removePageData(publicDir, pagePath) {
  const filePath = (0, _gatsbyCoreUtils.generatePageDataPath)(publicDir, pagePath);

  if (_fsExtra.default.existsSync(filePath)) {
    return await _fsExtra.default.remove(filePath);
  }

  return Promise.resolve();
}

function pageDataExists(publicDir, pagePath) {
  return _fsExtra.default.existsSync((0, _gatsbyCoreUtils.generatePageDataPath)(publicDir, pagePath));
}

let lmdbPageQueryResultsCache;

function getLMDBPageQueryResultsCache() {
  if (!lmdbPageQueryResultsCache) {
    const GatsbyCacheLmdbImpl = require(`./cache-lmdb`).default;

    lmdbPageQueryResultsCache = new GatsbyCacheLmdbImpl({
      name: `internal-tmp-query-results`,
      encoding: `string`
    }).init();
  }

  return lmdbPageQueryResultsCache;
}

let savePageQueryResultsPromise = Promise.resolve();

function waitUntilPageQueryResultsAreStored() {
  return savePageQueryResultsPromise;
}

async function savePageQueryResult(programDir, pagePath, stringifiedResult) {
  if ((0, _datastore.isLmdbStore)()) {
    savePageQueryResultsPromise = getLMDBPageQueryResultsCache().set(pagePath, stringifiedResult);
  } else {
    const pageQueryResultsPath = _path.default.join(programDir, `.cache`, `json`, `${pagePath.replace(/\//g, `_`)}.json`);

    await _fsExtra.default.outputFile(pageQueryResultsPath, stringifiedResult);
  }
}

async function readPageQueryResult(publicDir, pagePath) {
  if ((0, _datastore.isLmdbStore)()) {
    const stringifiedResult = await getLMDBPageQueryResultsCache().get(pagePath);

    if (typeof stringifiedResult === `string`) {
      return stringifiedResult;
    }

    throw new Error(`Couldn't find temp query result for "${pagePath}".`);
  } else {
    const pageQueryResultsPath = _path.default.join(publicDir, `..`, `.cache`, `json`, `${pagePath.replace(/\//g, `_`)}.json`);

    return _fsExtra.default.readFile(pageQueryResultsPath);
  }
}

async function writePageData(publicDir, {
  componentChunkName,
  matchPath,
  path: pagePath,
  staticQueryHashes
}) {
  const result = await readPageQueryResult(publicDir, pagePath);
  const outputFilePath = (0, _gatsbyCoreUtils.generatePageDataPath)(publicDir, pagePath);
  let body = `{
    "componentChunkName": "${componentChunkName}",
    "path": "${pagePath}",
    "result": ${result},
    "staticQueryHashes": ${JSON.stringify(staticQueryHashes)}`;

  if (matchPath) {
    body += `,
    "matchPath": "${matchPath}"`;
  }

  body += `}`; // transform asset size to kB (from bytes) to fit 64 bit to numbers

  const pageDataSize = Buffer.byteLength(body) / 1000;

  _redux.store.dispatch({
    type: `ADD_PAGE_DATA_STATS`,
    payload: {
      pagePath,
      filePath: outputFilePath,
      size: pageDataSize,
      pageDataHash: (0, _gatsbyCoreUtils.createContentDigest)(body)
    }
  });

  await _fsExtra.default.outputFile(outputFilePath, body);
  return body;
}

let isFlushPending = false;
let isFlushing = false;

function isFlushEnqueued() {
  return isFlushPending;
}

async function flush() {
  if (isFlushing) {
    // We're already in the middle of a flush
    return;
  }

  await waitUntilPageQueryResultsAreStored();
  isFlushPending = false;
  isFlushing = true;

  const {
    pendingPageDataWrites,
    pages,
    program,
    staticQueriesByTemplate,
    queries
  } = _redux.store.getState();

  const {
    pagePaths
  } = pendingPageDataWrites;

  const writePageDataActivity = _reporter.default.createProgress(`Writing page-data.json files to public directory`, pagePaths.size, 0);

  writePageDataActivity.start();
  const flushQueue = (0, _fastq.default)(async (pagePath, cb) => {
    const page = pages.get(pagePath); // It's a gloomy day in Bombay, let me tell you a short story...
    // Once upon a time, writing page-data.json files were atomic
    // After this change (#24808), they are not and this means that
    // between adding a pending write for a page and actually flushing
    // them, a page might not exist anymore щ（ﾟДﾟщ）
    // This is why we need this check

    if (page) {
      var _program$_, _program$_2;

      if ((program === null || program === void 0 ? void 0 : (_program$_ = program._) === null || _program$_ === void 0 ? void 0 : _program$_[0]) === `develop` && process.env.GATSBY_EXPERIMENTAL_QUERY_ON_DEMAND || ("" === `4` ? page.mode !== `SSG` : false)) {
        // check if already did run query for this page
        // with query-on-demand we might have pending page-data write due to
        // changes in static queries assigned to page template, but we might not
        // have query result for it
        const query = queries.trackedQueries.get(page.path);

        if (!query) {
          // this should not happen ever
          throw new Error(`We have a page, but we don't have registered query for it (???)`);
        }

        if ((0, _queries.hasFlag)(query.dirty, _queries.FLAG_DIRTY_NEW_PAGE)) {
          // query results are not written yet
          return cb(null, true);
        }
      }

      const staticQueryHashes = staticQueriesByTemplate.get(page.componentPath) || [];
      const result = await writePageData(_path.default.join(program.directory, `public`), { ...page,
        staticQueryHashes
      });
      writePageDataActivity.tick();

      if ((program === null || program === void 0 ? void 0 : (_program$_2 = program._) === null || _program$_2 === void 0 ? void 0 : _program$_2[0]) === `develop`) {
        _websocketManager.websocketManager.emitPageData({
          id: pagePath,
          result: JSON.parse(result)
        });
      }
    }

    _redux.store.dispatch({
      type: `CLEAR_PENDING_PAGE_DATA_WRITE`,
      payload: {
        page: pagePath
      }
    });

    return cb(null, true);
  }, 25);

  for (const pagePath of pagePaths) {
    flushQueue.push(pagePath, () => {});
  }

  if (!flushQueue.idle()) {
    await new Promise(resolve => {
      flushQueue.drain = resolve;
    });
  }

  writePageDataActivity.end();
  isFlushing = false;
  return;
}

function enqueueFlush() {
  if ((0, _webpackStatus.isWebpackStatusPending)()) {
    isFlushPending = true;
  } else {
    flush();
  }
}

async function handleStalePageData() {
  if (!(await _fsExtra.default.pathExists(`public/page-data`))) {
    return;
  } // public directory might have stale page-data files from previous builds
  // we get the list of those and compare against expected page-data files
  // and remove ones that shouldn't be there anymore


  const activity = _reporter.default.activityTimer(`Cleaning up stale page-data`);

  activity.start();
  const pageDataFilesFromPreviousBuilds = await new Promise((resolve, reject) => {
    const results = new Set();
    const stream = (0, _fs.walkStream)(`public/page-data`);
    stream.on(`data`, data => {
      if (data.name === `page-data.json`) {
        results.add(data.path);
      }
    });
    stream.on(`error`, e => {
      reject(e);
    });
    stream.on(`end`, () => resolve(results));
  });
  const expectedPageDataFiles = new Set();

  _redux.store.getState().pages.forEach(page => {
    expectedPageDataFiles.add((0, _gatsbyCoreUtils.generatePageDataPath)(`public`, page.path));
  });

  const deletionPromises = [];
  pageDataFilesFromPreviousBuilds.forEach(pageDataFilePath => {
    if (!expectedPageDataFiles.has(pageDataFilePath)) {
      deletionPromises.push(_fsExtra.default.remove(pageDataFilePath));
    }
  });
  await Promise.all(deletionPromises);
  activity.end();
}
//# sourceMappingURL=page-data.js.map