"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.loadConfigAndPlugins = loadConfigAndPlugins;

var _loadConfigAndPlugins = require("../../../bootstrap/load-config-and-plugins");

var _redux = require("../../../redux");

var _apiRunnerNode = _interopRequireDefault(require("../../api-runner-node"));

async function loadConfigAndPlugins(...args) {
  const [{
    siteDirectory
  }] = args;

  _redux.store.dispatch({
    type: `SET_PROGRAM`,
    payload: { ..._redux.store.getState().program,
      directory: siteDirectory
    }
  });

  await (0, _loadConfigAndPlugins.loadConfigAndPlugins)(...args); // Cache is already initialized

  await (0, _apiRunnerNode.default)(`unstable_onPluginInit`);
}
//# sourceMappingURL=load-config-and-plugins.js.map