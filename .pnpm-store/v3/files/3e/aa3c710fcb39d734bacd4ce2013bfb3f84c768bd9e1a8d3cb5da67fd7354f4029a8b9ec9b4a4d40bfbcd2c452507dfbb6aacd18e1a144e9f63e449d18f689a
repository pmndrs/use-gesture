"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.startServer = startServer;

var _webpackHotMiddleware = _interopRequireDefault(require("@gatsbyjs/webpack-hot-middleware"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _got = _interopRequireDefault(require("got"));

var _webpack = _interopRequireDefault(require("webpack"));

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _expressGraphql = require("express-graphql");

var _graphqlPlaygroundMiddlewareExpress = _interopRequireDefault(require("graphql-playground-middleware-express"));

var _gatsbyGraphiqlExplorer = _interopRequireDefault(require("gatsby-graphiql-explorer"));

var _graphql = require("graphql");

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _gatsbyTelemetry = _interopRequireDefault(require("gatsby-telemetry"));

var _launchEditor = _interopRequireDefault(require("react-dev-utils/launchEditor"));

var _codeFrame = require("@babel/code-frame");

var _path = require("../utils/path");

var _webpack2 = _interopRequireDefault(require("../utils/webpack.config"));

var _redux = require("../redux");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var WorkerPool = _interopRequireWildcard(require("../utils/worker/pool"));

var _developStatic = require("../commands/develop-static");

var _context = _interopRequireDefault(require("../schema/context"));

var _websocketManager = require("../utils/websocket-manager");

var _showExperimentNotice = require("../utils/show-experiment-notice");

var _pageData = require("./page-data");

var _getPageData = require("./get-page-data");

var _findPageByPath = require("./find-page-by-path");

var _apiRunnerNode = _interopRequireDefault(require("../utils/api-runner-node"));

var path = _interopRequireWildcard(require("path"));

var _types = require("../commands/types");

var _stackTraceUtils = require("./stack-trace-utils");

var _developPreloadHeaders = require("./develop-preload-headers");

var _loadingIndicator = require("./loading-indicator");

var _renderDevHtml = require("./dev-ssr/render-dev-html");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function startServer(program, app, workerPool = WorkerPool.create()) {
  const directory = program.directory;

  const webpackActivity = _reporter.default.activityTimer(`Building development bundle`, {
    id: `webpack-develop`
  });

  webpackActivity.start(); // loading indicator
  // write virtual module always to not fail webpack compilation, but only add express route handlers when
  // query on demand is enabled and loading indicator is not disabled

  (0, _loadingIndicator.writeVirtualLoadingIndicatorModule)();
  const THIRTY_SECONDS = 30 * 1000;
  let cancelDevJSNotice;

  if (process.env.gatsby_executing_command === `develop` && !process.env.GATSBY_EXPERIMENTAL_PRESERVE_WEBPACK_CACHE && !(0, _gatsbyCoreUtils.isCI)()) {
    cancelDevJSNotice = (0, _showExperimentNotice.showExperimentNoticeAfterTimeout)(`Preserve webpack's Cache`, `https://github.com/gatsbyjs/gatsby/discussions/28331`, `which changes Gatsby's cache clearing behavior to not clear webpack's
cache unless you run "gatsby clean" or delete the .cache folder manually.
Here's how to try it:

module.exports = {
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [...]
}`, THIRTY_SECONDS);
  } // Remove the following when merging GATSBY_EXPERIMENTAL_DEV_SSR


  const directoryPath = (0, _path.withBasePath)(directory);

  const {
    buildRenderer,
    doBuildPages
  } = require(`../commands/build-html`);

  const createIndexHtml = async activity => {
    try {
      const {
        rendererPath
      } = await buildRenderer(program, _types.Stage.DevelopHTML, activity.span);
      await doBuildPages(rendererPath, [`/`], activity, workerPool, _types.Stage.DevelopHTML);
    } catch (err) {
      if (err.name !== `WebpackError`) {
        _reporter.default.panic(err);

        return;
      }

      _reporter.default.panic(_reporter.default.stripIndent`
          There was an error compiling the html.js component for the development server.
          See our docs page on debugging HTML builds for help https://gatsby.dev/debug-html
        `, err);
    }
  };

  const indexHTMLActivity = _reporter.default.phantomActivity(`building index.html`, {});

  let pageRenderer;

  if (process.env.GATSBY_EXPERIMENTAL_DEV_SSR) {
    const {
      buildRenderer
    } = require(`../commands/build-html`);

    pageRenderer = (await buildRenderer(program, _types.Stage.DevelopHTML)).rendererPath;

    const {
      initDevWorkerPool
    } = require(`./dev-ssr/render-dev-html`);

    initDevWorkerPool();
  } else {
    indexHTMLActivity.start();
    await createIndexHtml(indexHTMLActivity);
    indexHTMLActivity.end();
  }

  const devConfig = await (0, _webpack2.default)(program, directory, `develop`, program.port, {
    parentSpan: webpackActivity.span
  });
  const compiler = (0, _webpack.default)(devConfig);
  /**
   * Set up the express app.
   **/

  app.use((0, _compression.default)());
  app.use(_gatsbyTelemetry.default.expressMiddleware(`DEVELOP`));
  app.use((0, _webpackHotMiddleware.default)(compiler, {
    log: false,
    path: `/__webpack_hmr`,
    heartbeat: 10 * 1000
  }));
  app.use((0, _cors.default)());
  /**
   * Pattern matching all endpoints with graphql or graphiql with 1 or more leading underscores
   */

  const graphqlEndpoint = `/_+graphi?ql`;

  if (process.env.GATSBY_GRAPHQL_IDE === `playground`) {
    app.get(graphqlEndpoint, (0, _graphqlPlaygroundMiddlewareExpress.default)({
      endpoint: `/___graphql`
    }), () => {});
  } else {
    (0, _gatsbyGraphiqlExplorer.default)(app, {
      graphqlEndpoint,
      getFragments: function getFragments() {
        const fragments = [];

        for (const def of _redux.store.getState().definitions.values()) {
          if (def.def.kind === _graphql.Kind.FRAGMENT_DEFINITION) {
            fragments.push(def.def);
          }
        }

        return fragments;
      }
    });
  }

  app.use(graphqlEndpoint, (0, _expressGraphql.graphqlHTTP)(() => {
    const {
      schema,
      schemaCustomization
    } = _redux.store.getState();

    if (!schemaCustomization.composer) {
      throw new Error(`A schema composer was not created in time. This is likely a gatsby bug. If you experienced this please create an issue.`);
    }

    return {
      schema,
      graphiql: false,

      extensions() {
        return {
          enableRefresh: process.env.ENABLE_GATSBY_REFRESH_ENDPOINT,
          refreshToken: process.env.GATSBY_REFRESH_TOKEN
        };
      },

      context: (0, _context.default)({
        schema,
        schemaComposer: schemaCustomization.composer,
        context: {},
        customContext: schemaCustomization.context
      }),

      customFormatErrorFn(err) {
        return { ...(0, _graphql.formatError)(err),
          extensions: {
            stack: err.stack ? err.stack.split(`\n`) : []
          }
        };
      }

    };
  }));
  /**
   * Refresh external data sources.
   * This behavior is disabled by default, but the ENABLE_GATSBY_REFRESH_ENDPOINT env var enables it
   * If no GATSBY_REFRESH_TOKEN env var is available, then no Authorization header is required
   **/

  const REFRESH_ENDPOINT = `/__refresh`;

  const refresh = async (req, pluginName) => {
    _redux.emitter.emit(`WEBHOOK_RECEIVED`, {
      webhookBody: req.body,
      pluginName
    });
  };

  app.post(`${REFRESH_ENDPOINT}/:plugin_name?`, _express.default.json(), (req, res) => {
    const pluginName = req.params[`plugin_name`];
    const enableRefresh = process.env.ENABLE_GATSBY_REFRESH_ENDPOINT;
    const refreshToken = process.env.GATSBY_REFRESH_TOKEN;
    const authorizedRefresh = !refreshToken || req.headers.authorization === refreshToken;

    if (enableRefresh && authorizedRefresh) {
      refresh(req, pluginName);
      res.status(200);
      res.setHeader(`content-type`, `application/json`);
    } else {
      res.status(authorizedRefresh ? 404 : 403);
      res.json({
        error: enableRefresh ? `Authorization failed. Make sure you add authorization header to your refresh requests` : `Refresh endpoint is not enabled. Run gatsby with "ENABLE_GATSBY_REFRESH_ENDPOINT=true" environment variable set.`,
        isEnabled: !!process.env.ENABLE_GATSBY_REFRESH_ENDPOINT
      });
    }

    res.end();
  });
  app.get(`/__open-stack-frame-in-editor`, (req, res) => {
    const fileName = path.resolve(process.cwd(), req.query.fileName);
    const lineNumber = parseInt(req.query.lineNumber, 10);
    (0, _launchEditor.default)(fileName, isNaN(lineNumber) ? 1 : lineNumber);
    res.end();
  });
  app.get(`/page-data/:pagePath(*)/page-data.json`, async (req, res, next) => {
    const requestedPagePath = req.params.pagePath;

    if (!requestedPagePath) {
      next();
      return;
    }

    const potentialPagePath = (0, _pageData.reverseFixedPagePath)(requestedPagePath);
    const page = (0, _findPageByPath.findPageByPath)(_redux.store.getState(), potentialPagePath, false);

    if (page) {
      try {
        let pageData;

        if (process.env.GATSBY_EXPERIMENTAL_QUERY_ON_DEMAND) {
          const start = Date.now();
          pageData = await (0, _getPageData.getPageData)(page.path);

          _gatsbyTelemetry.default.trackCli(`RUN_QUERY_ON_DEMAND`, {
            name: `getPageData`,
            duration: Date.now() - start
          });
        } else {
          pageData = await (0, _pageData.readPageData)(path.join(_redux.store.getState().program.directory, `public`), page.path);
        }

        res.status(200).send(pageData);
        return;
      } catch (e) {
        _reporter.default.error(`Error loading a result for the page query in "${requestedPagePath}" / "${potentialPagePath}". Query was not run and no cached result was found.`, e);
      }
    }

    res.status(404).send({
      path: potentialPagePath
    });
  }); // Disable directory indexing i.e. serving index.html from a directory.
  // This can lead to serving stale html files during development.
  //
  // We serve by default an empty index.html that sets up the dev environment.

  app.use((0, _developStatic.developStatic)(`public`, {
    index: false
  }));
  const webpackDevMiddlewareInstance = (0, _webpackDevMiddleware.default)(compiler, {
    publicPath: devConfig.output.publicPath,
    stats: `errors-only`,
    serverSideRender: true
  });
  app.use(webpackDevMiddlewareInstance);
  app.get(`/__original-stack-frame`, async (req, res) => {
    var _res$locals, _res$locals$webpack, _res$locals$webpack$d, _res$locals$webpack$d2, _req$query, _compilation$codeGene, _compilation$codeGene2;

    const compilation = (_res$locals = res.locals) === null || _res$locals === void 0 ? void 0 : (_res$locals$webpack = _res$locals.webpack) === null || _res$locals$webpack === void 0 ? void 0 : (_res$locals$webpack$d = _res$locals$webpack.devMiddleware) === null || _res$locals$webpack$d === void 0 ? void 0 : (_res$locals$webpack$d2 = _res$locals$webpack$d.stats) === null || _res$locals$webpack$d2 === void 0 ? void 0 : _res$locals$webpack$d2.compilation;
    const emptyResponse = {
      codeFrame: `No codeFrame could be generated`,
      sourcePosition: null,
      sourceContent: null
    };

    if (!compilation) {
      res.json(emptyResponse);
      return;
    }

    const moduleId = req === null || req === void 0 ? void 0 : (_req$query = req.query) === null || _req$query === void 0 ? void 0 : _req$query.moduleId;
    const lineNumber = parseInt(req.query.lineNumber, 10);
    const columnNumber = parseInt(req.query.columnNumber, 10);
    let fileModule;

    for (const module of compilation.modules) {
      const moduleIdentifier = compilation.chunkGraph.getModuleId(module);

      if (moduleIdentifier === moduleId) {
        fileModule = module;
        break;
      }
    }

    if (!fileModule) {
      res.json(emptyResponse);
      return;
    } // We need the internal webpack file that is used in the bundle, not the module source.
    // It doesn't have the correct sourceMap.


    const webpackSource = compilation === null || compilation === void 0 ? void 0 : (_compilation$codeGene = compilation.codeGenerationResults) === null || _compilation$codeGene === void 0 ? void 0 : (_compilation$codeGene2 = _compilation$codeGene.get(fileModule)) === null || _compilation$codeGene2 === void 0 ? void 0 : _compilation$codeGene2.sources.get(`javascript`);
    const sourceMap = webpackSource === null || webpackSource === void 0 ? void 0 : webpackSource.map();

    if (!sourceMap) {
      res.json(emptyResponse);
      return;
    }

    const position = {
      line: lineNumber,
      column: columnNumber
    };
    const result = await (0, _stackTraceUtils.findOriginalSourcePositionAndContent)(sourceMap, position);
    const sourcePosition = result === null || result === void 0 ? void 0 : result.sourcePosition;
    const sourceLine = sourcePosition === null || sourcePosition === void 0 ? void 0 : sourcePosition.line;
    const sourceColumn = sourcePosition === null || sourcePosition === void 0 ? void 0 : sourcePosition.column;
    const sourceContent = result === null || result === void 0 ? void 0 : result.sourceContent;

    if (!sourceContent || !sourceLine) {
      res.json(emptyResponse);
      return;
    }

    const codeFrame = (0, _codeFrame.codeFrameColumns)(sourceContent, {
      start: {
        line: sourceLine,
        column: sourceColumn !== null && sourceColumn !== void 0 ? sourceColumn : 0
      }
    }, {
      highlightCode: true
    });
    res.json({
      codeFrame,
      sourcePosition,
      sourceContent
    });
  }); // Expose access to app for advanced use cases

  const {
    developMiddleware
  } = _redux.store.getState().config;

  if (developMiddleware) {
    developMiddleware(app, program);
  } // Set up API proxy.


  const {
    proxy
  } = _redux.store.getState().config;

  if (proxy) {
    proxy.forEach(({
      prefix,
      url
    }) => {
      app.use(`${prefix}/*`, (req, res) => {
        const proxiedUrl = url + req.originalUrl;
        const {
          // remove `host` from copied headers
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          headers: {
            host,
            ...headers
          },
          method
        } = req;
        req.pipe(_got.default.stream(proxiedUrl, {
          headers,
          method,
          decompress: false
        }).on(`response`, response => res.writeHead(response.statusCode || 200, response.headers)).on(`error`, (err, _, response) => {
          if (response) {
            res.writeHead(response.statusCode || 400, response.headers);
          } else {
            const message = `Error when trying to proxy request "${req.originalUrl}" to "${proxiedUrl}"`;

            _reporter.default.error(message, err);

            res.sendStatus(500);
          }
        })).pipe(res);
      });
    }, (0, _cors.default)());
  }

  await (0, _apiRunnerNode.default)(`onCreateDevServer`, {
    app,
    deferNodeMutation: true
  }); // In case nothing before handled hot-update - send 404.
  // This fixes "Unexpected token < in JSON at position 0" runtime
  // errors after restarting development server and
  // cause automatic hard refresh in the browser.

  app.use(/.*\.hot-update\.json$/i, (_, res) => {
    res.status(404).end();
  }); // Render an HTML page and serve it.

  if (process.env.GATSBY_EXPERIMENTAL_DEV_SSR) {
    app.get(`*`, async (req, res, next) => {
      _gatsbyTelemetry.default.trackFeatureIsUsed(`GATSBY_EXPERIMENTAL_DEV_SSR`);

      const pathObj = (0, _findPageByPath.findPageByPath)(_redux.store.getState(), decodeURI(req.path));

      if (!pathObj) {
        return next();
      }

      await (0, _developPreloadHeaders.appendPreloadHeaders)(pathObj.path, res);

      const htmlActivity = _reporter.default.phantomActivity(`building HTML for path`, {});

      htmlActivity.start();

      try {
        const renderResponse = await (0, _renderDevHtml.renderDevHTML)({
          path: pathObj.path,
          page: pathObj,
          skipSsr: req.query[`skip-ssr`] || false,
          store: _redux.store,
          htmlComponentRendererPath: `${program.directory}/public/render-page.js`,
          directory: program.directory
        });
        res.status(200).send(renderResponse);
      } catch (error) {
        // The page errored but couldn't read the page component.
        // This is a race condition when a page is deleted but its requested
        // immediately after before anything can recompile.
        if (error === `404 page`) {
          return next();
        } // renderDevHTML throws an error with these information


        const lineNumber = error === null || error === void 0 ? void 0 : error.line;
        const columnNumber = error === null || error === void 0 ? void 0 : error.column;
        const filePath = error === null || error === void 0 ? void 0 : error.filename;
        const sourceContent = error === null || error === void 0 ? void 0 : error.sourceContent;

        _reporter.default.error({
          id: `11614`,
          context: {
            path: pathObj.path,
            filePath: filePath,
            line: lineNumber,
            column: columnNumber
          }
        });

        const emptyResponse = {
          codeFrame: `No codeFrame could be generated`,
          sourcePosition: null,
          sourceContent: null
        };

        if (!sourceContent || !lineNumber) {
          res.json(emptyResponse);
          return null;
        }

        const codeFrame = (0, _codeFrame.codeFrameColumns)(sourceContent, {
          start: {
            line: lineNumber,
            column: columnNumber !== null && columnNumber !== void 0 ? columnNumber : 0
          }
        }, {
          highlightCode: true
        });
        const message = {
          codeFrame,
          source: filePath,
          line: lineNumber,
          column: columnNumber !== null && columnNumber !== void 0 ? columnNumber : 0,
          sourceMessage: error === null || error === void 0 ? void 0 : error.message,
          stack: error === null || error === void 0 ? void 0 : error.stack
        };

        try {
          // Generate a shell for client-only content -- for the error overlay
          const clientOnlyShell = await (0, _renderDevHtml.renderDevHTML)({
            path: pathObj.path,
            page: pathObj,
            skipSsr: true,
            store: _redux.store,
            error: message,
            htmlComponentRendererPath: `${program.directory}/public/render-page.js`,
            directory: program.directory
          });
          res.send(clientOnlyShell);
        } catch (e) {
          _reporter.default.error({
            id: `11616`,
            context: {
              sourceMessage: e.message
            },
            filePath: e.filename,
            location: {
              start: {
                line: e.line,
                column: e.column
              }
            }
          });

          const minimalHTML = `<head><title>Failed to Server Render (SSR)</title></head><body><h1>Failed to Server Render (SSR)</h1><h2>Error message:</h2><p>${e.message}</p><h2>File:</h2><p>${e.filename}:${e.line}:${e.column}</p><h2>Stack:</h2><pre><code>${e.stack}</code></pre></body>`;
          res.send(minimalHTML).status(500);
        }
      }

      htmlActivity.end();
      return null;
    });
  }

  if (process.env.GATSBY_EXPERIMENTAL_QUERY_ON_DEMAND && process.env.GATSBY_QUERY_ON_DEMAND_LOADING_INDICATOR === `true`) {
    (0, _loadingIndicator.routeLoadingIndicatorRequests)(app);
  }

  app.use(async (req, res) => {
    // in this catch-all block we don't support POST so we should 404
    if (req.method === `POST`) {
      res.status(404).end();
      return;
    }

    const fullUrl = req.protocol + `://` + req.get(`host`) + req.originalUrl; // This isn't used in development.

    if (fullUrl.endsWith(`app-data.json`)) {
      res.json({
        webpackCompilationHash: `123`
      }); // If this gets here, it's a non-existent file so just send back 404.
    } else if (fullUrl.endsWith(`.json`)) {
      res.json({}).status(404);
    } else {
      await (0, _developPreloadHeaders.appendPreloadHeaders)(req.path, res);

      if (process.env.GATSBY_EXPERIMENTAL_DEV_SSR) {
        try {
          const {
            renderDevHTML
          } = require(`./dev-ssr/render-dev-html`);

          const renderResponse = await renderDevHTML({
            path: `/dev-404-page/`,
            // Let renderDevHTML figure it out.
            page: undefined,
            store: _redux.store,
            htmlComponentRendererPath: pageRenderer,
            directory: program.directory
          });
          res.status(404).send(renderResponse);
        } catch (e) {
          _reporter.default.error({
            id: `11615`,
            context: {
              sourceMessage: e.message
            },
            filePath: e.filename,
            location: {
              start: {
                line: e.line,
                column: e.column
              }
            }
          });

          res.send(e).status(500);
        }
      } else {
        res.sendFile(directoryPath(`.cache/develop-html/index.html`), err => {
          if (err) {
            res.status(500).end();
          }
        });
      }
    }
  });
  /**
   * Set up the HTTP server and socket.io.
   **/

  const server = new _http.default.Server(app);

  const socket = _websocketManager.websocketManager.init({
    server
  }); // hardcoded `localhost`, because host should match `target` we set
  // in http proxy in `develop-proxy`


  const listener = server.listen(program.port, `localhost`);

  if (!process.env.GATSBY_EXPERIMENTAL_DEV_SSR) {
    const chokidar = require(`chokidar`);

    const {
      slash
    } = require(`gatsby-core-utils`); // Register watcher that rebuilds index.html every time html.js changes.


    const watchGlobs = [`src/html.js`, `plugins/**/gatsby-ssr.js`].map(path => slash(directoryPath(path)));
    chokidar.watch(watchGlobs).on(`change`, async () => {
      await createIndexHtml(indexHTMLActivity); // eslint-disable-next-line no-unused-expressions

      socket === null || socket === void 0 ? void 0 : socket.to(`clients`).emit(`reload`);
    });
  }

  return {
    compiler,
    listener,
    webpackActivity,
    cancelDevJSNotice,
    websocketManager: _websocketManager.websocketManager,
    workerPool,
    webpackWatching: webpackDevMiddlewareInstance.context.watching
  };
}
//# sourceMappingURL=start-server.js.map