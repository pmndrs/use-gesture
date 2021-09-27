"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.buildProductionBundle = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpack2 = _interopRequireDefault(require("../utils/webpack.config"));

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _showExperimentNotice = require("../utils/show-experiment-notice");

const buildProductionBundle = async (program, parentSpan) => {
  const {
    directory
  } = program;
  const compilerConfig = await (0, _webpack2.default)(program, directory, `build-javascript`, null, {
    parentSpan
  });
  return new Promise((resolve, reject) => {
    const compiler = (0, _webpack.default)(compilerConfig);
    const THIRTY_SECONDS = 30 * 1000;
    let cancelCacheNotice;

    if (process.env.gatsby_executing_command === `build` && !process.env.GATSBY_EXPERIMENTAL_PRESERVE_WEBPACK_CACHE) {
      cancelCacheNotice = (0, _showExperimentNotice.showExperimentNoticeAfterTimeout)(`Persistent webpack caching`, `https://github.com/gatsbyjs/gatsby/discussions/28331`, `which enables webpack's persist caching and changes Gatsby's cache clearing behavior to not clear webpack's
cache unless you run "gatsby clean" or delete the .cache folder manually.
Here's how to try it:

module.exports = {
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [...]
}`, THIRTY_SECONDS);
    }

    compiler.run((err, stats) => {
      if (cancelCacheNotice) {
        cancelCacheNotice();
      } // stats can only be empty when an error occurs. Adding it to the if makes typescript happy.


      if (err || !stats) {
        return reject(err);
      }

      if (stats.hasErrors()) {
        return reject(stats.compilation.errors);
      }

      let activity;

      if (process.env.GATSBY_EXPERIMENTAL_PRESERVE_WEBPACK_CACHE) {
        activity = _reporter.default.activityTimer(`Caching JavaScript and CSS webpack compilation`, {
          parentSpan
        });
        activity.start();
      }

      const waitForCompilerClose = new Promise((resolve, reject) => {
        compiler.close(error => {
          if (activity) {
            activity.end();
          }

          if (error) {
            return reject(error);
          }

          return resolve();
        });
      });
      return resolve({
        stats,
        waitForCompilerClose
      });
    });
  });
};

exports.buildProductionBundle = buildProductionBundle;
//# sourceMappingURL=build-javascript.js.map