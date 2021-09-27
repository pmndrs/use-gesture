const path = require(`path`);

/**
 * return source path given a locator
 * @param {*} sourceLocator 
 * @returns 
 */
function getSourceLocation(sourceLocator, pnpapi) {
  if (!sourceLocator) return null;

  const sourceInformation = pnpapi.getPackageInformation(sourceLocator);

  if (!sourceInformation)
    throw new Error(`Couldn't find the package to use as resolution source`);

  if (!sourceInformation.packageLocation)
    throw new Error(
      `The package to use as resolution source seem to not have been installed - maybe it's a devDependency not installed in prod?`
    );

  return sourceInformation.packageLocation.replace(/\/?$/, `/`);
}

/**
 *
 * @param {*} sourceLocator
 * @param {*} filter
 * @returns
 */
function makeResolver(opts) {
  const { sourceLocator, filter, pnpapi } = opts || {};
  const sourceLocation = getSourceLocation(sourceLocator, pnpapi);
  return (resolver) => {
    const BACKWARD_PATH = /^\.\.([\\\/]|$)/;

    const resolvedHook = resolver.ensureHook(`resolve`);

    // Prevents the SymlinkPlugin from kicking in. We need the symlinks to be preserved because that's how we deal with peer dependencies ambiguities.
    resolver.getHook(`file`).intercept({
      register: (tapInfo) => {
        return tapInfo.name !== `SymlinkPlugin`
          ? tapInfo
          : Object.assign({}, tapInfo, {
              fn: (request, resolveContext, callback) => {
                callback();
              },
            });
      },
    });

    resolver
      .getHook(`after-module`)
      .tapAsync(`PnpResolver`, (request, resolveContext, callback) => {
        // rethrow pnp errors if we have any for this request
        return callback(
          resolveContext.pnpErrors &&
            resolveContext.pnpErrors.get(request.context.issuer)
        );
      });

    // Register a plugin that will resolve bare imports into the package location on the filesystem before leaving the rest of the resolution to Webpack
    resolver
      .getHook(`before-module`)
      .tapAsync(`PnpResolver`, (requestContext, resolveContext, callback) => {
        let request = requestContext.request;
        let issuer = requestContext.context.issuer;

        // When using require.context, issuer seems to be false (cf https://github.com/webpack/webpack-dev-server/blob/d0725c98fb752d8c0b1e8c9067e526e22b5f5134/client-src/default/index.js#L94)
        if (!issuer) {
          issuer = `${requestContext.path}/`;
          // We only support issuer when they're absolute paths. I'm not sure the opposite can ever happen, but better check here.
        } else if (!path.isAbsolute(issuer)) {
          throw new Error(
            `Cannot successfully resolve this dependency - issuer not supported (${issuer})`
          );
        }

        if (filter) {
          const relative = path.relative(filter, issuer);
          if (path.isAbsolute(relative) || BACKWARD_PATH.test(relative)) {
            return callback(null);
          }
        }

        let resolutionIssuer = sourceLocation || issuer;
        let resolution;

        try {
          resolution = pnpapi.resolveToUnqualified(request, resolutionIssuer, {
            considerBuiltins: false,
          });
        } catch (error) {
          if (resolveContext.missingDependencies)
            resolveContext.missingDependencies.add(requestContext.path);

          if (resolveContext.log) resolveContext.log(error.message);

          resolveContext.pnpErrors = resolveContext.pnpErrors || new Map();
          resolveContext.pnpErrors.set(issuer, error);

          return callback();
        }

        resolver.doResolve(
          resolvedHook,
          Object.assign({}, requestContext, {
            request: resolution,
          }),
          null,
          resolveContext,
          callback
        );
      });
  };
}

module.exports.makeResolver = makeResolver;
