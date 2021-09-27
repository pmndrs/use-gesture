"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _betterOpn = _interopRequireDefault(require("better-opn"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _compression = _interopRequireDefault(require("compression"));

var _express = _interopRequireDefault(require("express"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("@gatsbyjs/reach-router/lib/utils");

var _signalExit = _interopRequireDefault(require("signal-exit"));

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _multer = _interopRequireDefault(require("multer"));

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

var _cookie = _interopRequireDefault(require("cookie"));

var _gatsbyTelemetry = _interopRequireDefault(require("gatsby-telemetry"));

var _detectPortInUseAndPrompt = require("../utils/detect-port-in-use-and-prompt");

var _getConfigFile = require("../bootstrap/get-config-file");

var _preferDefault = require("../bootstrap/prefer-default");

var _prepareUrls = require("../utils/prepare-urls");

(0, _signalExit.default)(() => {
  _gatsbyTelemetry.default.trackCli(`SERVE_STOP`);
});

const readMatchPaths = async program => {
  const filePath = _path.default.join(program.directory, `.cache`, `match-paths.json`);

  let rawJSON = `[]`;

  try {
    rawJSON = await _fsExtra.default.readFile(filePath, `utf8`);
  } catch (error) {
    _reporter.default.warn(error);

    _reporter.default.warn(`Could not read ${_chalk.default.bold(`match-paths.json`)} from the .cache directory`);

    _reporter.default.warn(`Client-side routing will not work correctly. Maybe you need to re-run ${_chalk.default.bold(`gatsby build`)}?`);
  }

  return JSON.parse(rawJSON);
};

const matchPathRouter = (matchPaths, options) => (req, res, next) => {
  const {
    url
  } = req;

  if (req.accepts(`html`)) {
    const matchPath = matchPaths.find(({
      matchPath
    }) => (0, _utils.match)(matchPath, url) !== null);

    if (matchPath) {
      return res.sendFile(_path.default.join(matchPath.path, `index.html`), options, err => {
        if (err) {
          next();
        }
      });
    }
  }

  return next();
};

module.exports = async program => {
  _gatsbyTelemetry.default.trackCli(`SERVE_START`);

  _gatsbyTelemetry.default.startBackgroundUpdate();

  let {
    prefixPaths,
    port,
    open,
    host
  } = program;
  port = typeof port === `string` ? parseInt(port, 10) : port;
  const {
    configModule
  } = await (0, _getConfigFile.getConfigFile)(program.directory, `gatsby-config`);
  const config = (0, _preferDefault.preferDefault)(configModule);
  const {
    pathPrefix: configPathPrefix
  } = config || {};
  const pathPrefix = prefixPaths && configPathPrefix ? configPathPrefix : `/`;

  const root = _path.default.join(program.directory, `public`);

  const app = (0, _express.default)(); // eslint-disable-next-line new-cap

  const router = _express.default.Router();

  app.use(_gatsbyTelemetry.default.expressMiddleware(`SERVE`));
  router.use((0, _compression.default)());
  router.use(_express.default.static(`public`, {
    dotfiles: `allow`
  }));
  const matchPaths = await readMatchPaths(program);
  router.use(matchPathRouter(matchPaths, {
    root
  }));

  const compiledFunctionsDir = _path.default.join(program.directory, `.cache`, `functions`);

  let functions = [];

  try {
    functions = JSON.parse(_fsExtra.default.readFileSync(_path.default.join(compiledFunctionsDir, `manifest.json`), `utf-8`));
  } catch (e) {// ignore
  }

  if (functions) {
    app.use(`/api/*`, (0, _multer.default)().any(), _express.default.urlencoded({
      extended: true
    }), (req, _, next) => {
      const cookies = req.headers.cookie;

      if (!cookies) {
        return next();
      }

      req.cookies = _cookie.default.parse(cookies);
      return next();
    }, _express.default.text(), _express.default.json(), _express.default.raw(), async (req, res, next) => {
      const {
        "0": pathFragment
      } = req.params; // Check first for exact matches.

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
            functionObj = f; // @ts-ignore - TS bug? https://stackoverflow.com/questions/50234481/typescript-2-8-3-type-must-have-a-symbol-iterator-method-that-returns-an-iterato

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
        const pathToFunction = functionObj.absoluteCompiledFilePath;
        const start = Date.now();

        try {
          delete require.cache[require.resolve(pathToFunction)];

          const fn = require(pathToFunction);

          const fnToExecute = fn && fn.default || fn;
          await Promise.resolve(fnToExecute(req, res));
        } catch (e) {
          console.error(e); // Don't send the error if that would cause another error.

          if (!res.headersSent) {
            res.sendStatus(500);
          }
        }

        const end = Date.now();
        console.log(`Executed function "/api/${functionObj.functionRoute}" in ${end - start}ms`);
        return;
      } else {
        next();
      }
    });
  }

  router.use((req, res, next) => {
    if (req.accepts(`html`)) {
      return res.status(404).sendFile(`404.html`, {
        root
      });
    }

    return next();
  });
  app.use(function (_, res, next) {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
  });
  app.use(pathPrefix, router);

  function printInstructions(appName, urls) {
    console.log();
    console.log(`You can now view ${_chalk.default.bold(appName)} in the browser.`);
    console.log();

    if (urls.lanUrlForTerminal) {
      console.log(`  ${_chalk.default.bold(`Local:`)}            ${urls.localUrlForTerminal}`);
      console.log(`  ${_chalk.default.bold(`On Your Network:`)}  ${urls.lanUrlForTerminal}`);
    } else {
      console.log(`  ${urls.localUrlForTerminal}`);
    }
  }

  const startListening = () => {
    app.listen(port, host, () => {
      const urls = (0, _prepareUrls.prepareUrls)(program.ssl ? `https` : `http`, program.host, port);
      printInstructions(program.sitePackageJson.name || `(Unnamed package)`, urls);

      if (open) {
        _reporter.default.info(`Opening browser...`);

        Promise.resolve((0, _betterOpn.default)(urls.localUrlForBrowser)).catch(() => _reporter.default.warn(`Browser not opened because no browser was found`));
      }
    });
  };

  try {
    port = await (0, _detectPortInUseAndPrompt.detectPortInUseAndPrompt)(port);
    startListening();
  } catch (e) {
    if (e.message === `USER_REJECTED`) {
      return;
    }

    throw e;
  }
};
//# sourceMappingURL=serve.js.map