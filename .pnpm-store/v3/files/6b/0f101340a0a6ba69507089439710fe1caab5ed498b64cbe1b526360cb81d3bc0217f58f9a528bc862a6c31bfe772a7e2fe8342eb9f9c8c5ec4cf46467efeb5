"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onPreBootstrap = onPreBootstrap;
exports.onCreateDevServer = onCreateDevServer;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _path2 = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _lodash = _interopRequireDefault(require("lodash"));

var _multer = _interopRequireDefault(require("multer"));

var express = _interopRequireWildcard(require("express"));

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _formatWebpackMessages = _interopRequireDefault(require("react-dev-utils/formatWebpackMessages"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

var _cookie = _interopRequireDefault(require("cookie"));

var _webpackErrorUtils = require("../../utils/webpack-error-utils");

var _actions = require("../../redux/actions");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// We use an ancient version of path-to-regexp as it has breaking changes to express v4
// see: https://github.com/pillarjs/path-to-regexp/tree/77df63869075cfa5feda1988642080162c584427#compatibility-with-express--4x
const isProductionEnv = process.env.gatsby_executing_command !== `develop`;
// During development, we lazily compile functions only when they're requested.
// Here we keep track of which functions have been requested so are "active"
const activeDevelopmentFunctions = new Set();
let activeEntries = {};

async function ensureFunctionIsCompiled(functionObj, compiledFunctionsDir) {
  // stat the compiled function. If it's there, then return.
  let compiledFileExists = false;

  try {
    compiledFileExists = !!(await _fsExtra.default.stat(functionObj.absoluteCompiledFilePath));
  } catch (e) {// ignore
  }

  if (compiledFileExists) {
    return;
  } else {
    // Otherwise, restart webpack by touching the file and watch for the file to be
    // compiled.
    const time = new Date();

    _fsExtra.default.utimesSync(functionObj.originalAbsoluteFilePath, time, time);

    await new Promise(resolve => {
      const watcher = _chokidar.default // Watch the root of the compiled function directory in .cache as chokidar
      // can't watch files in directories that don't yet exist.
      .watch(compiledFunctionsDir).on(`add`, async _path => {
        if (_path === functionObj.absoluteCompiledFilePath) {
          await watcher.close();
          resolve(null);
        }
      });
    });
  }
} // Create glob type w/ glob, plugin name, root path


const createGlobArray = (siteDirectoryPath, plugins) => {
  const globs = []; // Add the default site src/api directory.

  globs.push({
    globPattern: `${siteDirectoryPath}/src/api/**/*.{js,ts}`,
    rootPath: _path2.default.join(siteDirectoryPath, `src/api`),
    pluginName: `default-site-plugin`
  }); // Add each plugin

  plugins.forEach(plugin => {
    // Ignore the "default" site plugin (aka the src tree) as we're
    // already watching that.
    if (plugin.name === `default-site-plugin`) {
      return;
    } // Ignore any plugins we include by default. In the very unlikely case
    // we want to ship default functions, we'll special case add them. In the
    // meantime, we'll avoid extra FS IO.


    if (plugin.resolve.includes(`internal-plugin`)) {
      return;
    }

    if (plugin.resolve.includes(`gatsby-plugin-typescript`)) {
      return;
    }

    if (plugin.resolve.includes(`gatsby-plugin-page-creator`)) {
      return;
    }

    const glob = {
      globPattern: `${plugin.resolve}/src/api/${plugin.name}/**/*.{js,ts}`,
      rootPath: _path2.default.join(plugin.resolve, `src/api`),
      pluginName: plugin.name
    };
    globs.push(glob);
  }); // Only return unique paths

  return _lodash.default.union(globs);
};

async function globAsync(pattern, options = {}) {
  return await new Promise((resolve, reject) => {
    (0, _glob.default)(pattern, options, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

const createWebpackConfig = async ({
  siteDirectoryPath,
  store,
  reporter
}) => {
  const compiledFunctionsDir = _path2.default.join(siteDirectoryPath, `.cache`, `functions`);

  const globs = createGlobArray(siteDirectoryPath, store.getState().flattenedPlugins); // Glob and return object with relative/absolute paths + which plugin
  // they belong to.

  const allFunctions = await Promise.all(globs.map(async glob => {
    const knownFunctions = [];
    const files = await globAsync(glob.globPattern);
    files.map(file => {
      const originalAbsoluteFilePath = file;

      const originalRelativeFilePath = _path2.default.relative(glob.rootPath, file);

      const {
        dir,
        name
      } = _path2.default.parse(originalRelativeFilePath); // Ignore the original extension as all compiled functions now end with js.


      const compiledFunctionName = _path2.default.join(dir, name + `.js`);

      const compiledPath = _path2.default.join(compiledFunctionsDir, compiledFunctionName);

      const finalName = (0, _gatsbyCoreUtils.urlResolve)(dir, name === `index` ? `` : name);
      knownFunctions.push({
        functionRoute: finalName,
        pluginName: glob.pluginName,
        originalAbsoluteFilePath,
        originalRelativeFilePath,
        relativeCompiledFilePath: compiledFunctionName,
        absoluteCompiledFilePath: compiledPath,
        matchPath: (0, _gatsbyCoreUtils.getMatchPath)(finalName)
      });
    });
    return knownFunctions;
  })); // Combine functions by the route name so that functions in the default
  // functions directory can override the plugin's implementations.
  // @ts-ignore - Seems like a TS bug: https://github.com/microsoft/TypeScript/issues/28010#issuecomment-713484584

  const knownFunctions = _lodash.default.unionBy(...allFunctions, func => func.functionRoute);

  store.dispatch(_actions.internalActions.setFunctions(knownFunctions)); // Write out manifest for use by `gatsby serve` and plugins

  _fsExtra.default.writeFileSync(_path2.default.join(compiledFunctionsDir, `manifest.json`), JSON.stringify(knownFunctions, null, 4)); // Load environment variables from process.env.GATSBY_* and .env.* files.
  // Logic is shared with webpack.config.js
  // node env should be DEVELOPMENT | PRODUCTION as these are commonly used in node land


  const nodeEnv = process.env.NODE_ENV || `development`; // config env is dependent on the env that it's run, this can be anything from staging-production
  // this allows you to set use different .env environments or conditions in gatsby files

  const configEnv = process.env.GATSBY_ACTIVE_ENV || nodeEnv;

  const envFile = _path2.default.join(siteDirectoryPath, `./.env.${configEnv}`);

  let parsed = {};

  try {
    parsed = _dotenv.default.parse(_fsExtra.default.readFileSync(envFile, {
      encoding: `utf8`
    }));
  } catch (err) {
    if (err.code !== `ENOENT`) {
      reporter.error(`There was a problem processing the .env file (${envFile})`, err);
    }
  }

  const envObject = Object.keys(parsed).reduce((acc, key) => {
    acc[key] = JSON.stringify(parsed[key]);
    return acc;
  }, {});
  const varsFromProcessEnv = Object.keys(process.env).reduce((acc, key) => {
    acc[key] = JSON.stringify(process.env[key]);
    return acc;
  }, {}); // Don't allow overwriting of NODE_ENV, PUBLIC_DIR as to not break gatsby things

  envObject.NODE_ENV = JSON.stringify(nodeEnv);
  envObject.PUBLIC_DIR = JSON.stringify(`${siteDirectoryPath}/public`);
  const mergedEnvVars = Object.assign(envObject, varsFromProcessEnv);
  const processEnvVars = Object.keys(mergedEnvVars).reduce((acc, key) => {
    acc[`process.env.${key}`] = mergedEnvVars[key];
    return acc;
  }, {
    "process.env": `({})`
  });
  const entries = {};
  const precompileDevFunctions = isProductionEnv || process.env.GATSBY_PRECOMPILE_DEVELOP_FUNCTIONS === `true` || process.env.GATSBY_PRECOMPILE_DEVELOP_FUNCTIONS === `1`;
  const functionsList = precompileDevFunctions ? knownFunctions : activeDevelopmentFunctions;
  functionsList.forEach(functionObj => {
    // Get path without the extension (as it could be ts or js)
    const parsedFile = _path2.default.parse(functionObj.originalRelativeFilePath);

    const compiledNameWithoutExtension = _path2.default.join(parsedFile.dir, parsedFile.name);

    entries[compiledNameWithoutExtension] = functionObj.originalAbsoluteFilePath;
  });
  activeEntries = entries;
  const stage = isProductionEnv ? `functions-production` : `functions-development`;
  return {
    entry: entries,
    output: {
      path: compiledFunctionsDir,
      filename: `[name].js`,
      libraryTarget: `commonjs2`
    },
    target: `node`,
    // Minification is expensive and not as helpful for serverless functions.
    optimization: {
      minimize: false
    },
    // Resolve files ending with .ts and the default extensions of .js, .json, .wasm
    resolve: {
      extensions: [`.ts`, `...`]
    },
    // Have webpack save its cache to the .cache/webpack directory
    cache: {
      type: `filesystem`,
      name: stage,
      cacheLocation: _path2.default.join(siteDirectoryPath, `.cache`, `webpack`, `stage-` + stage)
    },
    mode: isProductionEnv ? `production` : `development`,
    // watch: !isProductionEnv,
    module: {
      rules: [{
        test: [/.js$/, /.ts$/],
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/typescript`]
          }
        }
      }]
    },
    plugins: [new _webpack.default.DefinePlugin(processEnvVars)]
  };
};

let isFirstBuild = true;

async function onPreBootstrap({
  reporter,
  store
}) {
  const activity = reporter.activityTimer(`Compiling Gatsby Functions`);
  activity.start();
  const {
    program: {
      directory: siteDirectoryPath
    }
  } = store.getState();
  reporter.verbose(`Attaching functions to development server`);

  const compiledFunctionsDir = _path2.default.join(siteDirectoryPath, `.cache`, `functions`);

  await _fsExtra.default.ensureDir(compiledFunctionsDir);
  await _fsExtra.default.emptyDir(compiledFunctionsDir);

  try {
    // We do this ungainly thing as we need to make accessible
    // the resolve/reject functions to our shared callback function
    // eslint-disable-next-line
    await new Promise(async (resolve, reject) => {
      const config = await createWebpackConfig({
        siteDirectoryPath,
        store,
        reporter
      });

      function callback(err, stats) {
        const rawMessages = stats.toJson({
          moduleTrace: false
        });

        if (rawMessages.warnings.length > 0) {
          (0, _webpackErrorUtils.reportWebpackWarnings)(rawMessages.warnings, reporter);
        }

        if (err) return reject(err);
        const errors = stats.compilation.errors || []; // If there's errors, reject in production and print to the console
        // in development.

        if (isProductionEnv) {
          if (errors.length > 0) return reject(stats.compilation.errors);
        } else {
          const formatted = (0, _formatWebpackMessages.default)({
            errors: rawMessages.errors.map(e => e.message),
            warnings: []
          });
          reporter.error(formatted.errors);
        } // Log success in dev


        if (!isProductionEnv) {
          if (isFirstBuild) {
            isFirstBuild = false;
          } else {
            reporter.success(`Re-building functions`);
          }
        }

        return resolve(null);
      }

      if (isProductionEnv) {
        (0, _webpack.default)(config).run(callback);
      } else {
        // When in watch mode, you call things differently
        let compiler = (0, _webpack.default)(config).watch({}, callback);
        const globs = createGlobArray(siteDirectoryPath, store.getState().flattenedPlugins); // Watch for env files to change and restart the webpack watcher.

        _chokidar.default.watch([`${siteDirectoryPath}/.env*`, ...globs.map(glob => glob.globPattern)], {
          ignoreInitial: true
        }).on(`all`, async (event, path) => {
          // Ignore change events from the API directory for functions we're
          // already watching.
          if (event === `change` && Object.values(activeEntries).includes(path) && path.includes(`/src/api/`)) {
            return;
          }

          reporter.log(`Restarting function watcher due to change to "${path}"`); // Otherwise, restart the watcher

          compiler.close(async () => {
            const config = await createWebpackConfig({
              siteDirectoryPath,
              store,
              reporter
            });
            compiler = (0, _webpack.default)(config).watch({}, callback);
          });
        });
      }
    });
  } catch (e) {
    activity.panic(`Failed to compile Gatsby Functions.`, e);
  }

  activity.end();
}

async function onCreateDevServer({
  reporter,
  app,
  store
}) {
  reporter.verbose(`Attaching functions to development server`);
  const {
    program: {
      directory: siteDirectoryPath
    }
  } = store.getState();

  const compiledFunctionsDir = _path2.default.join(siteDirectoryPath, `.cache`, `functions`);

  app.use(`/api/*`, (0, _multer.default)().any(), express.urlencoded({
    extended: true
  }), (req, _, next) => {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return next();
    }

    req.cookies = _cookie.default.parse(cookies);
    return next();
  }, express.text(), express.json(), express.raw(), async (req, res, next) => {
    const {
      "0": pathFragment
    } = req.params;
    const {
      functions
    } = store.getState(); // Check first for exact matches.

    let functionObj = functions.find(({
      functionRoute
    }) => functionRoute === pathFragment);

    if (!functionObj) {
      // Check if there's any matchPaths that match.
      // We loop until we find the first match.
      functions.some(f => {
        let exp;
        const keys = [];

        if (f.matchPath) {
          exp = (0, _pathToRegexp.default)(f.matchPath, keys);
        }

        if (exp && exp.exec(pathFragment) !== null) {
          functionObj = f;
          const matches = [...pathFragment.match(exp)].slice(1);
          const newParams = {};
          matches.forEach((match, index) => newParams[keys[index].name] = match);
          req.params = newParams;
          return true;
        } else {
          return false;
        }
      });
    }

    if (functionObj) {
      activeDevelopmentFunctions.add(functionObj);
      await ensureFunctionIsCompiled(functionObj, compiledFunctionsDir);
      reporter.verbose(`Running ${functionObj.functionRoute}`);
      const start = Date.now();
      const pathToFunction = functionObj.absoluteCompiledFilePath;

      try {
        delete require.cache[require.resolve(pathToFunction)];

        const fn = require(pathToFunction);

        const fnToExecute = fn && fn.default || fn;
        await Promise.resolve(fnToExecute(req, res));
      } catch (e) {
        // Override the default error with something more specific.
        if (e.message.includes(`fnToExecute is not a function`)) {
          e.message = `${functionObj.originalAbsoluteFilePath} does not export a function.`;
        }

        reporter.error(e); // Don't send the error if that would cause another error.

        if (!res.headersSent) {
          res.status(500).send(`Error when executing function "${functionObj.originalAbsoluteFilePath}":<br /><br />${e.message}`);
        }
      }

      const end = Date.now();
      reporter.log(`Executed function "/api/${functionObj.functionRoute}" in ${end - start}ms`);
    } else {
      next();
    }
  });
}
//# sourceMappingURL=gatsby-node.js.map