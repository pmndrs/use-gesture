"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.StaticQueryMapper = void 0;

var _path = _interopRequireDefault(require("path"));

var _ConcatenatedModule = _interopRequireDefault(require("webpack/lib/optimize/ConcatenatedModule"));

var _lodash = require("lodash");

var _jsChunkNames = require("../js-chunk-names");

var _pageData = require("../page-data");

/**
 * Checks if a module matches a resourcePath
 */
function doesModuleMatchResourcePath(resourcePath, webpackModule) {
  if (!(webpackModule instanceof _ConcatenatedModule.default)) {
    return webpackModule.resource === resourcePath;
  } // ConcatenatedModule is a collection of modules so we have to go deeper to actually get it


  return webpackModule.modules.some(innerModule => innerModule.resource === resourcePath);
}
/**
 * A helper to set/get path resolving
 */


function getRealPath(cache, componentPath) {
  if (!cache.has(componentPath)) {
    cache.set(componentPath, _path.default.resolve(componentPath));
  }

  return cache.get(componentPath);
}
/**
 * Grab the actual webpackModule from the resourcePath
 * We return staticQueries and componentPaths cause that's what we care about
 */


function getWebpackModulesByResourcePaths(modules, staticQueries, components) {
  const realPathCache = new Map();
  const webpackModulesByStaticQueryId = new Map();
  const webpackModulesByComponentId = new Map();
  modules.forEach(webpackModule => {
    for (const [id, staticQuery] of staticQueries) {
      const staticQueryComponentPath = getRealPath(realPathCache, staticQuery.componentPath);

      if (!doesModuleMatchResourcePath(staticQueryComponentPath, webpackModule)) {
        continue;
      }

      webpackModulesByStaticQueryId.set(id, webpackModule);
    }

    for (const [id, component] of components) {
      const componentComponentPath = getRealPath(realPathCache, component.componentPath);

      if (!doesModuleMatchResourcePath(componentComponentPath, webpackModule)) {
        continue;
      }

      webpackModulesByComponentId.set(id, webpackModule);
    }
  });
  return {
    webpackModulesByStaticQueryId,
    webpackModulesByComponentId
  };
}
/**
 * Chunks can be async so the group might not represent a pageComponent group
 * We'll need to search for it.
 */


function getChunkGroupsDerivedFromEntrypoint(chunkGroup, entrypoint) {
  // when it's imported by any globals or async-requires we know we have the correct chunkgroups.
  // Async modules won't have hasParent listed
  if (chunkGroup.hasParent(entrypoint)) {
    return [chunkGroup];
  }

  let chunkGroups = [];

  for (const parentChunkGroup of chunkGroup.getParents()) {
    const newChunkGroup = getChunkGroupsDerivedFromEntrypoint(parentChunkGroup, entrypoint);
    chunkGroups = chunkGroups.concat(newChunkGroup);
  }

  return chunkGroups;
}

class StaticQueryMapper {
  constructor(store) {
    this.store = store;
    this.name = `StaticQueryMapper`;
  }

  apply(compiler) {
    const {
      components,
      staticQueryComponents
    } = this.store.getState();
    compiler.hooks.done.tap(this.name, stats => {
      const compilation = stats.compilation; // We only care about the main compilation
      // Chunkgraph should always be available when it's done but you know typescript.

      if (compilation.compiler.parentCompilation || !compilation.chunkGraph) {
        return;
      }

      const staticQueriesByChunkGroup = new Map();
      const chunkGroupsWithPageComponents = new Set();
      const chunkGroupsByComponentPath = new Map();
      const {
        webpackModulesByStaticQueryId,
        webpackModulesByComponentId
      } = getWebpackModulesByResourcePaths(compilation.modules, staticQueryComponents, components);
      const appEntryPoint = compilation.entrypoints.has(`app`) ? compilation.entrypoints.get(`app`) : compilation.entrypoints.get(`commons`); // group hashes by chunkGroup for ease of use

      for (const [staticQueryId, webpackModule] of webpackModulesByStaticQueryId) {
        let chunkGroupsDerivedFromEntrypoints = [];

        for (const chunk of compilation.chunkGraph.getModuleChunksIterable(webpackModule)) {
          for (const chunkGroup of chunk.groupsIterable) {
            if (chunkGroup === appEntryPoint) {
              chunkGroupsDerivedFromEntrypoints.push(chunkGroup);
            } else {
              chunkGroupsDerivedFromEntrypoints = chunkGroupsDerivedFromEntrypoints.concat(getChunkGroupsDerivedFromEntrypoint(chunkGroup, appEntryPoint));
            }
          }
        } // loop over all component chunkGroups or global ones


        chunkGroupsDerivedFromEntrypoints.forEach(chunkGroup => {
          var _staticQueriesByChunk;

          const staticQueryHashes = (_staticQueriesByChunk = staticQueriesByChunkGroup.get(chunkGroup)) !== null && _staticQueriesByChunk !== void 0 ? _staticQueriesByChunk : [];
          staticQueryHashes.push(staticQueryComponents.get(staticQueryId).hash);
          staticQueriesByChunkGroup.set(chunkGroup, staticQueryHashes);
        });
      } // group chunkGroups by componentPaths for ease of use


      for (const [componentPath, webpackModule] of webpackModulesByComponentId) {
        for (const chunk of compilation.chunkGraph.getModuleChunksIterable(webpackModule)) {
          for (const chunkGroup of chunk.groupsIterable) {
            // When it's a direct import from app entrypoint (async-requires) we know we have the correct chunkGroup
            if (chunkGroup.name === (0, _jsChunkNames.generateComponentChunkName)(componentPath)) {
              chunkGroupsWithPageComponents.add(chunkGroup);
              chunkGroupsByComponentPath.set(componentPath, chunkGroup);
            }
          }
        }
      }

      let globalStaticQueries = [];

      for (const [chunkGroup, staticQueryHashes] of staticQueriesByChunkGroup) {
        // When a chunkgroup is not part of a pageComponent we know it's part of a global group.
        if (!chunkGroupsWithPageComponents.has(chunkGroup)) {
          globalStaticQueries = globalStaticQueries.concat(staticQueryHashes);
        }
      }

      components.forEach(component => {
        const allStaticQueries = new Set(globalStaticQueries);

        if (chunkGroupsByComponentPath.has(component.componentPath)) {
          const chunkGroup = chunkGroupsByComponentPath.get(component.componentPath);

          if (chunkGroup && staticQueriesByChunkGroup.has(chunkGroup)) {
            ;
            staticQueriesByChunkGroup.get(chunkGroup).forEach(staticQuery => {
              allStaticQueries.add(staticQuery);
            });
          }
        } // modules, chunks, chunkgroups can all have not-deterministic orders so
        // just sort array of static queries we produced to ensure final result is deterministic


        const staticQueryHashes = Array.from(allStaticQueries).sort();

        if (!(0, _lodash.isEqual)(this.store.getState().staticQueriesByTemplate.get(component.componentPath), staticQueryHashes)) {
          this.store.dispatch({
            type: `ADD_PENDING_TEMPLATE_DATA_WRITE`,
            payload: {
              componentPath: component.componentPath,
              pages: component.pages
            }
          });
          this.store.dispatch({
            type: `SET_STATIC_QUERIES_BY_TEMPLATE`,
            payload: {
              componentPath: component.componentPath,
              staticQueryHashes
            }
          });
        }
      }); // In dev mode we want to write page-data when compilation succeeds

      if (!stats.hasErrors() && compiler.watchMode) {
        (0, _pageData.enqueueFlush)();
      }
    });
  }

}

exports.StaticQueryMapper = StaticQueryMapper;
//# sourceMappingURL=static-query-mapper.js.map