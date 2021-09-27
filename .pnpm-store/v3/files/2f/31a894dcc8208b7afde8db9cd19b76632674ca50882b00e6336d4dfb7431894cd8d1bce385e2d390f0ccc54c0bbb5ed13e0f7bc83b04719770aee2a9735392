"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.nodeManifestReducer = void 0;

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

const nodeManifestReducer = (state = [], action) => {
  switch (action.type) {
    case `CREATE_NODE_MANIFEST`:
      {
        const {
          manifestId,
          pluginName,
          node
        } = action.payload;

        if (typeof manifestId !== `string`) {
          _reporter.default.warn(`Plugin ${pluginName} called unstable_createNodeManifest with a manifestId that isn't a string.`);

          return state;
        }

        if (!(node !== null && node !== void 0 && node.id)) {
          _reporter.default.warn(`Plugin ${pluginName} called unstable_createNodeManifest but didn't provide a node.`);

          return state;
        }

        state.push({ ...action.payload,
          node: {
            id: node.id
          }
        });
        return state;
      }

    case `DELETE_NODE_MANIFESTS`:
      {
        state = [];
        return state;
      }

    default:
      return state;
  }
};

exports.nodeManifestReducer = nodeManifestReducer;
//# sourceMappingURL=node-manifest.js.map