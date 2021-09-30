"use strict";

exports.__esModule = true;
exports.default = void 0;

var _repositoryId = require("gatsby-telemetry/lib/repository-id");

var _babelPluginRemoveGraphqlQueries = require("babel-plugin-remove-graphql-queries");

const sampleSite = (experimentName, percentage) => {
  const bucketNumber = (0, _babelPluginRemoveGraphqlQueries.murmurhash)(experimentName + `` + JSON.stringify((0, _repositoryId.getRepositoryId)().repositoryId)) % 100;
  return bucketNumber < percentage;
};

var _default = sampleSite;
exports.default = _default;
//# sourceMappingURL=sample-site-for-experiment.js.map