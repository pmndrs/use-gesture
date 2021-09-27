"use strict";

exports.__esModule = true;
exports.trackFeatureIsUsed = trackFeatureIsUsed;
exports.trackCli = trackCli;
exports.captureEvent = captureEvent;
exports.trackError = trackError;
exports.trackBuildError = trackBuildError;
exports.setDefaultTags = setDefaultTags;
exports.decorateEvent = decorateEvent;
exports.setTelemetryEnabled = setTelemetryEnabled;
exports.startBackgroundUpdate = startBackgroundUpdate;
exports.isTrackingEnabled = isTrackingEnabled;
exports.aggregateStats = aggregateStats;
exports.addSiteMeasurement = addSiteMeasurement;
exports.expressMiddleware = expressMiddleware;
exports.setDefaultComponentId = setDefaultComponentId;
exports.setGatsbyCliVersion = setGatsbyCliVersion;

var _telemetry = require("./telemetry");

exports.AnalyticsTracker = _telemetry.AnalyticsTracker;
exports.IAggregateStats = _telemetry.IAggregateStats;
exports.ITelemetryTagsPayload = _telemetry.ITelemetryTagsPayload;
exports.ITelemetryOptsPayload = _telemetry.ITelemetryOptsPayload;
exports.IDefaultTelemetryTagsPayload = _telemetry.IDefaultTelemetryTagsPayload;

var _createFlush = require("./create-flush");

var _time = _interopRequireWildcard(require("@turist/time"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const instance = new _telemetry.AnalyticsTracker();
const flush = (0, _createFlush.createFlush)(instance.isTrackingEnabled());
process.on(`exit`, flush); // For long running commands we want to occasionally flush the data
//
// The data is also sent on exit.

const intervalDuration = process.env.TELEMETRY_BUFFER_INTERVAL;
const interval = intervalDuration && Number.isFinite(+intervalDuration) ? Math.max(Number(intervalDuration), 1000) : (0, _time.default)(10, _time.TimeUnit.Minute);

function tick() {
  flush().catch(console.error).then(() => setTimeout(tick, interval));
}

function trackFeatureIsUsed(name) {
  instance.trackFeatureIsUsed(name);
}

function trackCli(input, tags, opts) {
  instance.trackCli(input, tags, opts);
}

function captureEvent(input, tags, opts) {
  instance.captureEvent(input, tags, opts);
}

function trackError(input, tags) {
  instance.captureError(input, tags);
}

function trackBuildError(input, tags) {
  instance.captureBuildError(input, tags);
}

function setDefaultTags(tags) {
  instance.decorateAll(tags);
}

function decorateEvent(event, tags) {
  instance.decorateNextEvent(event, tags);
}

function setTelemetryEnabled(enabled) {
  instance.setTelemetryEnabled(enabled);
}

function startBackgroundUpdate() {
  setTimeout(tick, interval);
}

function isTrackingEnabled() {
  return instance.isTrackingEnabled();
}

function aggregateStats(data) {
  return instance.aggregateStats(data);
}

function addSiteMeasurement(event, obj) {
  instance.addSiteMeasurement(event, obj);
}

function expressMiddleware(source) {
  return function (req, _res, next) {
    try {
      instance.trackActivity(`${source}_ACTIVE`, {
        userAgent: req.headers[`user-agent`]
      });
    } catch (e) {// ignore
    }

    next();
  };
} // Internal


function setDefaultComponentId(componentId) {
  instance.componentId = componentId;
}

function setGatsbyCliVersion(version) {
  instance.gatsbyCliVersion = version;
}

module.exports = {
  trackFeatureIsUsed,
  trackCli,
  trackError,
  trackBuildError,
  setDefaultTags,
  decorateEvent,
  setTelemetryEnabled,
  startBackgroundUpdate,
  isTrackingEnabled,
  aggregateStats,
  addSiteMeasurement,
  expressMiddleware,
  setDefaultComponentId,
  setGatsbyCliVersion
};