"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.setInferenceMetadata = setInferenceMetadata;
exports.buildSchema = buildSchema;

var _redux = require("../../../redux");

var _schema = require("../../../schema");

var _apiRunnerNode = _interopRequireDefault(require("../../api-runner-node"));

var _state = require("./state");

function setInferenceMetadata() {
  (0, _state.setState)([`inferenceMetadata`]);
}

async function buildSchema() {
  var _workerStore$config$p, _workerStore$config;

  const workerStore = _redux.store.getState(); // pathPrefix: '' will at least be defined when config is loaded


  if (((_workerStore$config$p = workerStore === null || workerStore === void 0 ? void 0 : (_workerStore$config = workerStore.config) === null || _workerStore$config === void 0 ? void 0 : _workerStore$config.pathPrefix) !== null && _workerStore$config$p !== void 0 ? _workerStore$config$p : null) === null) {
    throw Error(`Config loading didn't finish before attempting to build schema in worker`);
  }

  setInferenceMetadata();
  await (0, _apiRunnerNode.default)(`createSchemaCustomization`); // build() runs other lifecycles like "createResolvers" or "setFieldsOnGraphQLNodeType" internally

  await (0, _schema.build)({
    fullMetadataBuild: false,
    freeze: true,
    parentSpan: {}
  });
}
//# sourceMappingURL=schema.js.map