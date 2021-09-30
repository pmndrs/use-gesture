"use strict";

exports.__esModule = true;
exports.createPageDependency = void 0;

var _ = require("../");

var _internal = require("./internal");

const createPageDependency = ({
  path,
  nodeId,
  connection
}) => {
  const {
    queries
  } = _.store.getState(); // Check that the dependencies aren't already recorded so we
  // can avoid creating lots of very noisy actions.


  let nodeDependencyExists = false;
  let connectionDependencyExists = false;

  if (!nodeId) {
    nodeDependencyExists = true;
  }

  if (nodeId && queries.byNode.has(nodeId) && queries.byNode.get(nodeId).has(path)) {
    nodeDependencyExists = true;
  }

  if (!connection) {
    connectionDependencyExists = true;
  }

  if (connection && queries.byConnection.has(connection) && queries.byConnection.get(connection).has(path)) {
    connectionDependencyExists = true;
  }

  if (nodeDependencyExists && connectionDependencyExists) {
    return;
  } // It's new, let's dispatch it


  _.store.dispatch((0, _internal.createPageDependency)({
    path,
    nodeId,
    connection
  }));
};

exports.createPageDependency = createPageDependency;
//# sourceMappingURL=add-page-dependency.js.map