"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.loadPlugins = loadPlugins;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("../../redux");

var nodeAPIs = _interopRequireWildcard(require("../../utils/api-node-docs"));

var browserAPIs = _interopRequireWildcard(require("../../utils/api-browser-docs"));

var _apiSsrDocs = _interopRequireDefault(require("../../../cache-dir/api-ssr-docs"));

var _load = require("./load");

var _validate = require("./validate");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const getAPI = api => _lodash.default.keys(api).reduce((merged, key) => {
  merged[key] = _lodash.default.keys(api[key]);
  return merged;
}, {}); // Create a "flattened" array of plugins with all subplugins
// brought to the top-level. This simplifies running gatsby-* files
// for subplugins.


const flattenPlugins = plugins => {
  const flattened = [];

  const extractPlugins = plugin => {
    if (plugin.pluginOptions && plugin.pluginOptions.plugins) {
      plugin.pluginOptions.plugins.forEach(subPlugin => {
        flattened.push(subPlugin);
        extractPlugins(subPlugin);
      });
    }
  };

  plugins.forEach(plugin => {
    flattened.push(plugin);
    extractPlugins(plugin);
  });
  return flattened;
};

function normalizePlugin(plugin) {
  var _plugin$options;

  if (typeof plugin === `string`) {
    return {
      resolve: plugin,
      options: {}
    };
  }

  if ((_plugin$options = plugin.options) !== null && _plugin$options !== void 0 && _plugin$options.plugins) {
    plugin.options = { ...plugin.options,
      plugins: normalizePlugins(plugin.options.plugins)
    };
  }

  return plugin;
}

function normalizePlugins(plugins) {
  return (plugins || []).map(normalizePlugin);
}

const normalizeConfig = (config = {}) => {
  return { ...config,
    plugins: (config.plugins || []).map(normalizePlugin)
  };
};

async function loadPlugins(rawConfig = {}, rootDir) {
  // Turn all strings in plugins: [`...`] into the { resolve: ``, options: {} } form
  const config = normalizeConfig(rawConfig); // Show errors for invalid plugin configuration

  await (0, _validate.validateConfigPluginsOptions)(config, rootDir);
  const currentAPIs = getAPI({
    browser: browserAPIs,
    node: nodeAPIs,
    ssr: _apiSsrDocs.default
  }); // Collate internal plugins, site config plugins, site default plugins

  const pluginInfos = (0, _load.loadPlugins)(config, rootDir); // Create a flattened array of the plugins

  const pluginArray = flattenPlugins(pluginInfos); // Work out which plugins use which APIs, including those which are not
  // valid Gatsby APIs, aka 'badExports'

  const x = (0, _validate.collatePluginAPIs)({
    currentAPIs,
    flattenedPlugins: pluginArray
  }); // From this point on, these are fully-resolved plugins.

  let flattenedPlugins = x.flattenedPlugins;
  const badExports = x.badExports; // Show errors for any non-Gatsby APIs exported from plugins

  await (0, _validate.handleBadExports)({
    currentAPIs,
    badExports
  }); // Show errors when ReplaceRenderer has been implemented multiple times

  flattenedPlugins = (0, _validate.handleMultipleReplaceRenderers)({
    flattenedPlugins
  }); // If we get this far, everything looks good. Update the store

  _redux.store.dispatch({
    type: `SET_SITE_FLATTENED_PLUGINS`,
    payload: flattenedPlugins
  });

  return flattenedPlugins;
}
//# sourceMappingURL=index.js.map