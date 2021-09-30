"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.satisfiesSemvers = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _semver = _interopRequireDefault(require("semver"));

var _sampleSiteForExperiment = _interopRequireDefault(require("./sample-site-for-experiment"));

const satisfiesSemvers = semverConstraints => {
  // Check each semver check for the flag.
  // If any are false, then the flag doesn't pass
  const result = _lodash.default.toPairs(semverConstraints).every(([packageName, semverConstraint]) => {
    let packageVersion;

    try {
      packageVersion = require(`${packageName}/package.json`).version;
    } catch (e) {
      return false;
    } // We care if the semver check doesn't pass.


    return _semver.default.satisfies(packageVersion, semverConstraint, {
      includePrerelease: true
    });
  });

  return result;
};

exports.satisfiesSemvers = satisfiesSemvers;
const activeFlags = [{
  name: `FAST_DEV`,
  env: `GATSBY_EXPERIMENTAL_FAST_DEV`,
  command: `develop`,
  telemetryId: `FastDev`,
  experimental: false,
  description: `Enable all experiments aimed at improving develop server start time.`,
  includedFlags: [`DEV_SSR`, `PRESERVE_FILE_DOWNLOAD_CACHE`, `DEV_WEBPACK_CACHE`],
  testFitness: () => true
}, {
  name: `DEV_SSR`,
  env: `GATSBY_EXPERIMENTAL_DEV_SSR`,
  command: `develop`,
  telemetryId: `DevSsr`,
  experimental: false,
  description: `Server Side Render (SSR) pages on full reloads during develop. Helps you detect SSR bugs and fix them without needing to do full builds. See umbrella issue for how to update custom webpack config.`,
  umbrellaIssue: `https://gatsby.dev/dev-ssr-feedback`,
  testFitness: () => {
    if ((0, _sampleSiteForExperiment.default)(`DEV_SSR`, 20)) {
      return `OPT_IN`;
    } else {
      return true;
    }
  }
}, {
  name: `QUERY_ON_DEMAND`,
  env: `GATSBY_EXPERIMENTAL_QUERY_ON_DEMAND`,
  command: `develop`,
  telemetryId: false,
  experimental: false,
  description: `Only run queries when needed instead of running all queries upfront. Speeds starting the develop server.`,
  umbrellaIssue: `https://gatsby.dev/query-on-demand-feedback`,
  noCI: true,
  testFitness: () => `LOCKED_IN`
}, {
  name: `LAZY_IMAGES`,
  env: `GATSBY_EXPERIMENTAL_LAZY_IMAGES`,
  command: `develop`,
  telemetryId: false,
  experimental: false,
  description: `Don't process images during development until they're requested from the browser. Speeds starting the develop server. Requires gatsby-plugin-sharp@2.10.0 or above.`,
  umbrellaIssue: `https://gatsby.dev/lazy-images-feedback`,
  noCI: true,
  testFitness: () => {
    const semverConstraints = {
      // Because of this, this flag will never show up
      "gatsby-plugin-sharp": `>=2.10.0`
    };

    if (satisfiesSemvers(semverConstraints)) {
      return `LOCKED_IN`;
    } else {
      // gatsby-plugin-sharp is either not installed or not new enough so
      // just disable — it won't work anyways.
      return false;
    }
  },
  requires: `Requires gatsby-plugin-sharp@2.10.0 or above.`
}, {
  name: `PRESERVE_WEBPACK_CACHE`,
  env: `GATSBY_EXPERIMENTAL_PRESERVE_WEBPACK_CACHE`,
  command: `all`,
  telemetryId: `PreserveWebpackCache`,
  experimental: false,
  description: `Use webpack's persistent caching and don't delete webpack's cache when changing gatsby-node.js & gatsby-config.js files.`,
  umbrellaIssue: `https://gatsby.dev/cache-clearing-feedback`,
  testFitness: () => `LOCKED_IN`
}, {
  name: `DEV_WEBPACK_CACHE`,
  env: `GATSBY_EXPERIMENTAL_DEV_WEBPACK_CACHE`,
  command: `develop`,
  telemetryId: `DevWebackCache`,
  experimental: false,
  description: `Enable webpack's persistent caching during development. Speeds up the start of the development server.`,
  umbrellaIssue: `https://gatsby.dev/cache-clearing-feedback`,
  testFitness: () => `LOCKED_IN`
}, {
  name: `PRESERVE_FILE_DOWNLOAD_CACHE`,
  env: `GATSBY_EXPERIMENTAL_PRESERVE_FILE_DOWNLOAD_CACHE`,
  command: `all`,
  telemetryId: `PreserveFileDownloadCache`,
  experimental: false,
  description: `Don't delete the downloaded files cache when changing gatsby-node.js & gatsby-config.js files.`,
  umbrellaIssue: `https://gatsby.dev/cache-clearing-feedback`,
  testFitness: () => true
}, {
  name: `PARALLEL_SOURCING`,
  env: `GATSBY_EXPERIMENTAL_PARALLEL_SOURCING`,
  command: `all`,
  telemetryId: `ParallelSourcing`,
  experimental: true,
  description: `Run all source plugins at the same time instead of serially. For sites with multiple source plugins, this can speedup sourcing and transforming considerably.`,
  umbrellaIssue: `https://gatsby.dev/parallel-sourcing-feedback`,
  testFitness: () => true
}, {
  name: `FUNCTIONS`,
  env: `GATSBY_EXPERIMENTAL_FUNCTIONS`,
  command: `all`,
  telemetryId: `Functions`,
  experimental: false,
  description: `Compile Serverless functions in your Gatsby project and write them to disk, ready to deploy to Gatsby Cloud`,
  umbrellaIssue: `https://gatsby.dev/functions-feedback`,
  testFitness: () => `LOCKED_IN`
}, {
  name: `LMDB_STORE`,
  env: `GATSBY_EXPERIMENTAL_LMDB_STORE`,
  command: `all`,
  telemetryId: `LmdbStore`,
  experimental: true,
  umbrellaIssue: `https://gatsby.dev/lmdb-feedback`,
  description: `Store nodes in a persistent embedded database (vs in-memory). Lowers peak memory usage. Requires Node v14.10 or above.`,
  testFitness: () => {
    if ("" === `4`) {
      return `LOCKED_IN`;
    }

    const [major, minor] = process.versions.node.split(`.`);
    return Number(major) === 14 && Number(minor) >= 10 || Number(major) > 14;
  },
  requires: `Requires Node v14.10 or above.`
}, {
  name: `PARALLEL_QUERY_RUNNING`,
  env: `GATSBY_EXPERIMENTAL_PARALLEL_QUERY_RUNNING`,
  command: `build`,
  telemetryId: `PQR`,
  experimental: true,
  umbrellaIssue: `https://gatsby.dev/pqr-feedback`,
  description: `Parallelize running page queries in order to better saturate all available cores. Improves time it takes to run queries during gatsby build. Requires Node v14.10 or above.`,
  includedFlags: [`LMDB_STORE`],
  testFitness: () => {
    if ("" === `4`) {
      return `LOCKED_IN`;
    }

    const [major, minor] = process.versions.node.split(`.`);
    return Number(major) === 14 && Number(minor) >= 10 || Number(major) > 14;
  },
  requires: `Requires Node v14.10 or above.`
}];
var _default = activeFlags;
exports.default = _default;
//# sourceMappingURL=flags.js.map