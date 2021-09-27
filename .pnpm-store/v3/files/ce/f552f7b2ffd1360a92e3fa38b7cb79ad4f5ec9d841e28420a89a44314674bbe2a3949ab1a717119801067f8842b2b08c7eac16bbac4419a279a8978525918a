"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.warnAboutNodeManifestMappingProblems = warnAboutNodeManifestMappingProblems;
exports.getPageDataDigestForPagePath = getPageDataDigestForPagePath;
exports.processNodeManifest = processNodeManifest;
exports.processNodeManifests = processNodeManifests;
exports.foundPageByToLogIds = void 0;

var _datastore = require("./../datastore");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

var _redux = require("../redux/");

var _actions = require("../redux/actions");

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _pageData = require("./page-data");

var _gatsbyCoreUtils = require("gatsby-core-utils");

/**
 * Finds a final built page by nodeId
 *
 * Note that this function wont work properly in `gatsby develop`
 * since develop no longer runs all page queries when creating pages.
 * We use the node id to query mapping to find the right page but
 * this mapping only exists once you've visited a page in your browser.
 * When this fn is being used for routing to previews the user wont necessarily have
 * visited the page in the browser yet.
 */
async function findPageOwnedByNodeId({
  nodeId
}) {
  var _byNode$get, _byNode$get$values, _byNode$get$values$ne;

  const state = _redux.store.getState();

  const {
    pages,
    nodes
  } = state;
  const {
    byNode
  } = state.queries; // in development queries are run on demand so we wont have an accurate nodeId->pages map until those pages are visited in the browser. We want this mapping before the page is visited in the browser so we can route to the right page in the browser.
  // So in development we can just use the Map of all pages (pagePath -> pageNode)
  // but for builds (preview inc builds or regular builds) we will have a full map
  // of all nodeId's to pages they're queried on and we can use that instead since it
  // will be a much smaller list of pages, resulting in better performance for large sites

  const usingPagesMap = `development` === process.env.NODE_ENV;
  const pagePathSetOrMap = usingPagesMap ? // this is a Map of page path to page node
  pages : // this is a Set of page paths
  byNode === null || byNode === void 0 ? void 0 : byNode.get(nodeId); // the default page path is the first page found in
  // node id to page query tracking

  let pagePath = byNode === null || byNode === void 0 ? void 0 : (_byNode$get = byNode.get(nodeId)) === null || _byNode$get === void 0 ? void 0 : (_byNode$get$values = _byNode$get.values()) === null || _byNode$get$values === void 0 ? void 0 : (_byNode$get$values$ne = _byNode$get$values.next()) === null || _byNode$get$values$ne === void 0 ? void 0 : _byNode$get$values$ne.value;
  let foundPageBy = pagePath ? `queryTracking` : `none`; // but if we have more than one page where this node shows up
  // we need to try to be more specific

  if (pagePathSetOrMap && pagePathSetOrMap.size > 1) {
    let ownerPagePath;
    let foundOwnerNodeId = false; // for each page this nodeId is queried in

    for (const pathOrPageObject of pagePathSetOrMap.values()) {
      // if we haven't found a page with this nodeId
      // set as page.ownerNodeId then run this logic.
      // this condition is on foundOwnerNodeId instead of ownerPagePath
      // in case we find a page with the nodeId in page.context.id
      // and then later in the loop there's a page with this nodeId
      // set on page.ownerNodeId.
      // We always want to prefer ownerPagePath over context.id
      if (foundOwnerNodeId) {
        break;
      }

      const path = usingPagesMap ? // in development we're using a Map, so the value here is a page object
      pathOrPageObject.path : // in builds we're using a Set so the page path is the value
      pathOrPageObject;
      const fullPage = pages.get(path);
      foundOwnerNodeId = (fullPage === null || fullPage === void 0 ? void 0 : fullPage.ownerNodeId) === nodeId;
      const foundPageIdInContext = (fullPage === null || fullPage === void 0 ? void 0 : fullPage.context.id) === nodeId;

      if (foundOwnerNodeId) {
        foundPageBy = `ownerNodeId`;
      } else if (foundPageIdInContext && fullPage) {
        var _nodes$get;

        const pageCreatedByPluginName = (_nodes$get = nodes.get(fullPage.pluginCreatorId)) === null || _nodes$get === void 0 ? void 0 : _nodes$get.name;
        const pageCreatedByFilesystemPlugin = pageCreatedByPluginName === `gatsby-plugin-page-creator`;
        foundPageBy = pageCreatedByFilesystemPlugin ? `filesystem-route-api` : `context.id`;
      }

      if (fullPage && (foundOwnerNodeId || // if there's no specified owner look to see if
      // pageContext has an `id` variable which matches our
      // nodeId. Using an "id" as a variable in queries is common
      // and if we don't have an owner this is a better guess
      // of an owner than grabbing the first page query we find
      // that's mapped to this node id.
      // this also makes this work with the filesystem Route API without
      // changing that API.
      foundPageIdInContext)) {
        // save this path to use in our manifest!
        ownerPagePath = fullPage.path;
      }
    }

    if (ownerPagePath) {
      pagePath = ownerPagePath;
    }
  }

  return {
    page: {
      path: pagePath || null
    },
    foundPageBy
  };
} // these id's correspond to error id's in
// packages/gatsby-cli/src/structured-errors/error-map.ts


const foundPageByToLogIds = {
  none: `11801`,
  [`context.id`]: `11802`,
  queryTracking: `11803`,
  [`filesystem-route-api`]: `success`,
  ownerNodeId: `success`
};
/**
 * Takes in some info about a node manifest and the page we did or didn't find for it, then warns and returns the warning string
 */

exports.foundPageByToLogIds = foundPageByToLogIds;

function warnAboutNodeManifestMappingProblems({
  inputManifest,
  pagePath,
  foundPageBy
}) {
  let logId;

  switch (foundPageBy) {
    case `none`:
    case `context.id`:
    case `queryTracking`:
      {
        logId = foundPageByToLogIds[foundPageBy];

        _reporter.default.error({
          id: logId,
          context: {
            inputManifest,
            pagePath
          }
        });

        break;
      }

    case `filesystem-route-api`:
    case `ownerNodeId`:
      logId = `success`;
      break;

    default:
      {
        throw Error(`Node Manifest mapping is in an impossible state`);
      }
  }

  return {
    logId
  };
}
/**
 * Retrieves the content digest of a page-data.json file for use in creating node manifest files.
 */


async function getPageDataDigestForPagePath(pagePath, directory) {
  if ( // if no page was created for the node we're creating a manifest for, there wont be a page path.
  !pagePath || process.env.NODE_ENV !== `production` && process.env.NODE_ENV !== `test`) {
    return null;
  }

  try {
    const publicDirectory = _path.default.join(directory || _redux.store.getState().program.directory, `public`);

    const pageData = await (0, _pageData.readPageData)(publicDirectory, pagePath);
    const pageDataDigest = (0, _gatsbyCoreUtils.createContentDigest)(pageData);
    return pageDataDigest;
  } catch (e) {
    _reporter.default.warn(`No page-data.json found for ${pagePath} while processing node manifests.`);

    return null;
  }
}
/**
 * Prepares and then writes out an individual node manifest file to be used for routing to previews. Manifest files are added via the public unstable_createNodeManifest action
 */


async function processNodeManifest(inputManifest) {
  const nodeId = inputManifest.node.id;
  const fullNode = (0, _datastore.getNode)(nodeId);

  if (!fullNode) {
    _reporter.default.warn(`Plugin ${inputManifest.pluginName} called unstable_createNodeManifest for a node which doesn't exist with an id of ${nodeId}.`);

    return null;
  } // map the node to a page that was created


  const {
    page: nodeManifestPage,
    foundPageBy
  } = await findPageOwnedByNodeId({
    nodeId
  });
  warnAboutNodeManifestMappingProblems({
    inputManifest,
    pagePath: nodeManifestPage.path,
    foundPageBy
  });
  const pageDataDigest = await getPageDataDigestForPagePath(nodeManifestPage.path);
  const finalManifest = {
    node: inputManifest.node,
    page: nodeManifestPage,
    foundPageBy,
    pageDataDigest
  };

  const gatsbySiteDirectory = _redux.store.getState().program.directory; // write out the manifest file


  const manifestFilePath = _path.default.join(gatsbySiteDirectory, `public`, `__node-manifests`, inputManifest.pluginName, `${inputManifest.manifestId}.json`);

  const manifestFileDir = _path.default.dirname(manifestFilePath);

  await _fsExtra.default.ensureDir(manifestFileDir);
  await _fsExtra.default.writeJSON(manifestFilePath, finalManifest);
  return finalManifest;
}
/**
 * Grabs all pending node manifests, processes them, writes them to disk,
 * and then removes them from the store.
 * Manifest files are added via the public unstable_createNodeManifest action in sourceNodes
 */


async function processNodeManifests() {
  const {
    nodeManifests
  } = _redux.store.getState();

  const totalManifests = nodeManifests.length;

  if (totalManifests === 0) {
    return;
  }

  const processedManifests = await Promise.all(nodeManifests.map(manifest => processNodeManifest(manifest)));
  let totalProcessedManifests = 0;
  let totalFailedManifests = 0;
  processedManifests.forEach(manifest => {
    if (manifest) {
      totalProcessedManifests++;
    } else {
      totalFailedManifests++;
    }
  });

  const pluralize = length => length > 1 || length === 0 ? `s` : ``;

  _reporter.default.info(`Wrote out ${totalProcessedManifests} node page manifest file${pluralize(totalProcessedManifests)}${totalFailedManifests > 0 ? `. ${totalFailedManifests} manifest${pluralize(totalFailedManifests)} couldn't be processed.` : ``}`); // clean up all pending manifests from the store


  _redux.store.dispatch(_actions.internalActions.deleteNodeManifests());
}
//# sourceMappingURL=node-manifest.js.map