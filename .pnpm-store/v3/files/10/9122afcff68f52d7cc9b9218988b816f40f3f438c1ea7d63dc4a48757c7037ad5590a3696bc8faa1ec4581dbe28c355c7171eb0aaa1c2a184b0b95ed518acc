"use strict";

exports.__esModule = true;
exports.createFlush = createFlush;

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _time = _interopRequireWildcard(require("@turist/time"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  join
} = require(`path`);

const {
  fork,
  spawnSync
} = require(`child_process`);

function createFlush(isTrackingEnabled) {
  return async function flush() {
    if (!isTrackingEnabled) {
      return;
    }

    if ((0, _gatsbyCoreUtils.isCI)()) {
      spawnSync(process.execPath, [join(__dirname, `send.js`)], {
        execArgv: [],
        timeout: (0, _time.default)(1, _time.TimeUnit.Minute)
      });
      return;
    } // Submit events on background with out blocking the main process
    // nor relying on it's life cycle


    const forked = fork(join(__dirname, `send.js`), {
      detached: true,
      stdio: `ignore`,
      execArgv: []
    });
    forked.unref();
  };
}