"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.loadConfigAndPlugins = loadConfigAndPlugins;

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _gatsbyTelemetry = _interopRequireDefault(require("gatsby-telemetry"));

var _preferDefault = require("../bootstrap/prefer-default");

var _getConfigFile = require("../bootstrap/get-config-file");

var _loadPlugins = require("../bootstrap/load-plugins");

var _actions = require("../redux/actions");

var _loadThemes = _interopRequireDefault(require("../bootstrap/load-themes"));

var _redux = require("../redux");

var _handleFlags = _interopRequireDefault(require("../utils/handle-flags"));

var _flags = _interopRequireDefault(require("../utils/flags"));

async function loadConfigAndPlugins({
  siteDirectory,
  processFlags = false
}) {
  // Try opening the site's gatsby-config.js file.
  const {
    configModule,
    configFilePath
  } = await (0, _getConfigFile.getConfigFile)(siteDirectory, `gatsby-config`);
  let config = (0, _preferDefault.preferDefault)(configModule); // The root config cannot be exported as a function, only theme configs

  if (typeof config === `function`) {
    _reporter.default.panic({
      id: `10126`,
      context: {
        configName: `gatsby-config`,
        siteDirectory
      }
    });
  }

  if (config && processFlags) {
    // Setup flags
    if (config) {
      // Get flags
      const {
        enabledConfigFlags,
        unknownFlagMessage,
        unfitFlagMessage,
        message
      } = (0, _handleFlags.default)(_flags.default, config.flags);

      if (unknownFlagMessage !== ``) {
        _reporter.default.warn(unknownFlagMessage);
      }

      if (unfitFlagMessage !== ``) {
        _reporter.default.warn(unfitFlagMessage);
      } //  set process.env for each flag


      enabledConfigFlags.forEach(flag => {
        process.env[flag.env] = `true`;
      }); // Print out message.

      if (message !== ``) {
        _reporter.default.info(message);
      } //  track usage of feature


      enabledConfigFlags.forEach(flag => {
        if (flag.telemetryId) {
          _gatsbyTelemetry.default.trackFeatureIsUsed(flag.telemetryId);
        }
      }); // Track the usage of config.flags

      if (config.flags) {
        _gatsbyTelemetry.default.trackFeatureIsUsed(`ConfigFlags`);
      }
    }
  } // theme gatsby configs can be functions or objects


  if (config) {
    const plugins = await (0, _loadThemes.default)(config, {
      configFilePath,
      rootDir: siteDirectory
    });
    config = plugins.config;
  }

  _redux.store.dispatch(_actions.internalActions.setSiteConfig(config));

  const flattenedPlugins = await (0, _loadPlugins.loadPlugins)(config, siteDirectory);
  return {
    config,
    flattenedPlugins
  };
}
//# sourceMappingURL=load-config-and-plugins.js.map