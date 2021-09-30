"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.runPageQueries = runPageQueries;

var _query = require("../query");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _assertStore = require("../utils/assert-store");

var _showExperimentNotice = require("../utils/show-experiment-notice");

var _gatsbyCoreUtils = require("gatsby-core-utils");

const ONE_MINUTE = 1 * 60 * 1000;

async function runPageQueries({
  parentSpan,
  queryIds,
  store,
  program,
  graphqlRunner
}) {
  (0, _assertStore.assertStore)(store);
  const state = store.getState();

  if (!queryIds) {
    return;
  }

  const {
    pageQueryIds
  } = queryIds;

  if (pageQueryIds.length === 0) {
    return;
  }

  const activity = _reporter.default.createProgress(`run page queries`, pageQueryIds.length, 0, {
    id: `page-query-running`,
    parentSpan
  }); // TODO: This is hacky, remove with a refactor of PQR itself


  if (!process.env.GATSBY_EXPERIMENTAL_PARALLEL_QUERY_RUNNING) {
    activity.start();
  }

  let cancelNotice;

  if (process.env.gatsby_executing_command === `develop` && !process.env.GATSBY_EXPERIMENTAL_QUERY_ON_DEMAND && !(0, _gatsbyCoreUtils.isCI)()) {
    cancelNotice = (0, _showExperimentNotice.showExperimentNoticeAfterTimeout)(`Query On Demand`, `https://gatsby.dev/query-on-demand-feedback`, `which avoids running page queries in development until you visit a page — so a lot less upfront work. Here's how to try it:

modules.exports = {
  flags: { QUERY_ON_DEMAND: true },
  plugins: [...]
}
`, ONE_MINUTE);
  }

  await (0, _query.processPageQueries)(pageQueryIds, {
    state,
    activity,
    graphqlRunner,
    graphqlTracing: program === null || program === void 0 ? void 0 : program.graphqlTracing
  });

  if (cancelNotice) {
    cancelNotice();
  }

  if (!process.env.GATSBY_EXPERIMENTAL_PARALLEL_QUERY_RUNNING) {
    activity.done();
  }
}
//# sourceMappingURL=run-page-queries.js.map