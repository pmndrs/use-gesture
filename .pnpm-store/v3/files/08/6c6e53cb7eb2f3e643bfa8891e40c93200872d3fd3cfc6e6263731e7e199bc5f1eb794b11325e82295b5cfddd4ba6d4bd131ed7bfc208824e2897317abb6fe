"use strict";

exports.__esModule = true;
exports.CacheFolderResolver = void 0;

/**
 * To support PNP we have to make sure dependencies resolved from the .cache folder should be resolved from the gatsby package directory
 */
class CacheFolderResolver {
  constructor(requestsFolder) {
    this.requestsFolder = requestsFolder;
  }

  apply(resolver) {
    if (!process.versions.pnp) {
      return;
    }

    const target = resolver.ensureHook(`raw-module`);
    resolver.getHook(`raw-module`).tapAsync(`CacheFolderResolver`, (request, resolveContext, callback) => {
      const req = request.request;

      if (!req) {
        return callback();
      }

      if (!request.path.startsWith(this.requestsFolder)) {
        return callback();
      }

      const packageMatch = /^(@[^/]+\/)?[^/]+/.exec(req);

      if (!packageMatch) {
        return callback();
      } // We change the issuer but keep everything as is and re-run resolve


      const obj = { ...request,
        path: __dirname
      };
      return resolver.doResolve(target, obj, `change issuer to gatsby package by cache-folder-resolver to fix pnp`, resolveContext, callback);
    });
  }

}

exports.CacheFolderResolver = CacheFolderResolver;
//# sourceMappingURL=cache-folder-resolver.js.map