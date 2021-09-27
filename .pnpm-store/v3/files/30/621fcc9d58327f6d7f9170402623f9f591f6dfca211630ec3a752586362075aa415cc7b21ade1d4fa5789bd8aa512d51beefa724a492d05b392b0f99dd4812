"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.resolvePlugin = resolvePlugin;
exports.loadPlugins = loadPlugins;

var _lodash = _interopRequireDefault(require("lodash"));

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _glob = _interopRequireDefault(require("glob"));

var _validate = require("./validate");

var _redux = require("../../redux");

var _fsExistsCached = require("fs-exists-cached");

var _createNodeId = require("../../utils/create-node-id");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _resolveFrom = require("resolve-from");

const GATSBY_CLOUD_PLUGIN_NAME = `gatsby-plugin-gatsby-cloud`;
const TYPESCRIPT_PLUGIN_NAME = `gatsby-plugin-typescript`;

function createFileContentHash(root, globPattern) {
  const hash = _crypto.default.createHash(`md5`);

  const files = _glob.default.sync(`${root}/${globPattern}`, {
    nodir: true
  });

  files.forEach(filepath => {
    hash.update(_fs.default.readFileSync(filepath));
  });
  return hash.digest(`hex`);
}
/**
 * Make sure key is unique to plugin options. E.g. there could
 * be multiple source-filesystem plugins, with different names
 * (docs, blogs).
 *
 * @param name Name of the plugin
 */


const createPluginId = (name, pluginObject = null) => (0, _createNodeId.createNodeId)(name + (pluginObject ? JSON.stringify(pluginObject.options) : ``), `Plugin`);
/**
 * @param plugin
 * This should be a plugin spec object where possible but can also be the
 * name of a plugin.
 *
 * When it is a name, it can be a name of a local plugin, the name of a plugin
 * located in node_modules, or a Gatsby internal plugin. In the last case the
 * plugin will be an absolute path.
 * @param rootDir
 * This is the project location, from which are found the plugins
 */


function resolvePlugin(plugin, rootDir) {
  const pluginName = _lodash.default.isString(plugin) ? plugin : plugin.resolve; // Respect the directory that the plugin was sourced from initially

  rootDir = !_lodash.default.isString(plugin) && plugin.parentDir || rootDir; // Only find plugins when we're not given an absolute path

  if (!(0, _fsExistsCached.sync)(pluginName) && rootDir) {
    // Find the plugin in the local plugins folder
    const resolvedPath = (0, _gatsbyCoreUtils.slash)(_path.default.join(rootDir, `plugins/${pluginName}`));

    if ((0, _fsExistsCached.sync)(resolvedPath)) {
      if ((0, _fsExistsCached.sync)(`${resolvedPath}/package.json`)) {
        const packageJSON = JSON.parse(_fs.default.readFileSync(`${resolvedPath}/package.json`, `utf-8`));
        const name = packageJSON.name || pluginName;
        (0, _validate.warnOnIncompatiblePeerDependency)(name, packageJSON);
        return {
          resolve: resolvedPath,
          name,
          id: createPluginId(name),
          version: packageJSON.version || createFileContentHash(resolvedPath, `**`)
        };
      } else {
        // Make package.json a requirement for local plugins too
        throw new Error(`Plugin ${pluginName} requires a package.json file`);
      }
    }
  }
  /**
   * Here we have an absolute path to an internal plugin, or a name of a module
   * which should be located in node_modules.
   */


  try {
    const requireSource = rootDir !== null ? (0, _gatsbyCoreUtils.createRequireFromPath)(`${rootDir}/:internal:`) : require; // If the path is absolute, resolve the directory of the internal plugin,
    // otherwise resolve the directory containing the package.json

    const resolvedPath = (0, _gatsbyCoreUtils.slash)(_path.default.dirname(requireSource.resolve(_path.default.isAbsolute(pluginName) ? pluginName : `${pluginName}/package.json`)));
    const packageJSON = JSON.parse(_fs.default.readFileSync(`${resolvedPath}/package.json`, `utf-8`));
    (0, _validate.warnOnIncompatiblePeerDependency)(packageJSON.name, packageJSON);
    return {
      resolve: resolvedPath,
      id: createPluginId(packageJSON.name),
      name: packageJSON.name,
      version: packageJSON.version
    };
  } catch (err) {
    if (process.env.gatsby_log_level === `verbose`) {
      _reporter.default.panicOnBuild(`plugin "${pluginName} threw the following error:\n`, err);
    } else {
      _reporter.default.panicOnBuild(`There was a problem loading plugin "${pluginName}". Perhaps you need to install its package?\nUse --verbose to see actual error.`);
    }

    throw new Error(`unreachable`);
  }
}

function addGatsbyPluginCloudPluginWhenInstalled(plugins, processPlugin, rootDir) {
  const cloudPluginLocation = (0, _resolveFrom.silent)(rootDir, GATSBY_CLOUD_PLUGIN_NAME);

  if (cloudPluginLocation) {
    plugins.push(processPlugin({
      resolve: cloudPluginLocation,
      options: {}
    }));
  }
}

function loadPlugins(config = {}, rootDir) {
  // Instantiate plugins.
  const plugins = [];
  const configuredPluginNames = new Set(); // Create fake little site with a plugin for testing this
  // w/ snapshots. Move plugin processing to its own module.
  // Also test adding to redux store.

  function processPlugin(plugin) {
    if (_lodash.default.isString(plugin)) {
      const info = resolvePlugin(plugin, rootDir);
      return { ...info,
        pluginOptions: {
          plugins: []
        }
      };
    } else {
      plugin.options = plugin.options || {}; // Throw an error if there is an "option" key.

      if (_lodash.default.isEmpty(plugin.options) && !_lodash.default.isEmpty(plugin.option)) {
        throw new Error(`Plugin "${plugin.resolve}" has an "option" key in the configuration. Did you mean "options"?`);
      } // Plugins can have plugins.


      const subplugins = [];

      if (plugin.options.plugins) {
        plugin.options.plugins.forEach(p => {
          subplugins.push(processPlugin(p));
        });
        plugin.options.plugins = subplugins;
      } // Add some default values for tests as we don't actually
      // want to try to load anything during tests.


      if (plugin.resolve === `___TEST___`) {
        const name = `TEST`;
        return {
          id: createPluginId(name, plugin),
          name,
          version: `0.0.0-test`,
          pluginOptions: {
            plugins: []
          },
          resolve: `__TEST__`
        };
      }

      const info = resolvePlugin(plugin, rootDir);
      return { ...info,
        id: createPluginId(info.name, plugin),
        pluginOptions: _lodash.default.merge({
          plugins: []
        }, plugin.options)
      };
    }
  } // Add internal plugins


  const internalPlugins = [`../../internal-plugins/dev-404-page`, `../../internal-plugins/load-babel-config`, `../../internal-plugins/internal-data-bridge`, `../../internal-plugins/prod-404`, `../../internal-plugins/webpack-theme-component-shadowing`, `../../internal-plugins/bundle-optimisations`, `../../internal-plugins/functions`].filter(Boolean);
  internalPlugins.forEach(relPath => {
    const absPath = _path.default.join(__dirname, relPath);

    plugins.push(processPlugin(absPath));
  }); // Add plugins from the site config.

  if (config.plugins) {
    config.plugins.forEach(plugin => {
      const processedPlugin = processPlugin(plugin);
      plugins.push(processedPlugin);
      configuredPluginNames.add(processedPlugin.name);
    });
  } // the order of all of these page-creators matters. The "last plugin wins",
  // so the user's site comes last, and each page-creator instance has to
  // match the plugin definition order before that. This works fine for themes
  // because themes have already been added in the proper order to the plugins
  // array


  plugins.forEach(plugin => {
    plugins.push(processPlugin({
      resolve: require.resolve(`gatsby-plugin-page-creator`),
      options: {
        path: (0, _gatsbyCoreUtils.slash)(_path.default.join(plugin.resolve, `src/pages`)),
        pathCheck: false
      }
    }));
  });

  if (!configuredPluginNames.has(GATSBY_CLOUD_PLUGIN_NAME) && (process.env.GATSBY_CLOUD === `true` || process.env.GATSBY_CLOUD === `1`)) {
    addGatsbyPluginCloudPluginWhenInstalled(plugins, processPlugin, rootDir);
  } // Suppor Typescript by default but allow users to override it


  if (!configuredPluginNames.has(TYPESCRIPT_PLUGIN_NAME)) {
    plugins.push(processPlugin({
      resolve: require.resolve(TYPESCRIPT_PLUGIN_NAME),
      options: {
        // TODO(@mxstbr): Do not hard-code these defaults but infer them from the
        // pluginOptionsSchema of gatsby-plugin-typescript
        allExtensions: false,
        isTSX: false,
        jsxPragma: `React`
      }
    }));
  } // Add the site's default "plugin" i.e. gatsby-x files in root of site.


  plugins.push({
    resolve: (0, _gatsbyCoreUtils.slash)(process.cwd()),
    id: createPluginId(`default-site-plugin`),
    name: `default-site-plugin`,
    version: createFileContentHash(process.cwd(), `gatsby-*`),
    pluginOptions: {
      plugins: []
    }
  });

  const program = _redux.store.getState().program; // default options for gatsby-plugin-page-creator


  let pageCreatorOptions = {
    path: (0, _gatsbyCoreUtils.slash)(_path.default.join(program.directory, `src/pages`)),
    pathCheck: false
  };

  if (config.plugins) {
    const pageCreatorPlugin = config.plugins.find(plugin => typeof plugin !== `string` && plugin.resolve === `gatsby-plugin-page-creator` && (0, _gatsbyCoreUtils.slash)(plugin.options && plugin.options.path || ``) === (0, _gatsbyCoreUtils.slash)(_path.default.join(program.directory, `src/pages`)));

    if (pageCreatorPlugin) {
      // override the options if there are any user specified options
      pageCreatorOptions = pageCreatorPlugin.options;
    }
  }

  plugins.push(processPlugin({
    resolve: require.resolve(`gatsby-plugin-page-creator`),
    options: pageCreatorOptions
  }));
  return plugins;
}
//# sourceMappingURL=load.js.map