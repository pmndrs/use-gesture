'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var semver = require('semver');
var chalk = require('chalk');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var semver__default = /*#__PURE__*/_interopDefault(semver);
var chalk__default = /*#__PURE__*/_interopDefault(chalk);

// This is a modified version of the graph-getting in bolt
const DEPENDENCY_TYPES = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

const getAllDependencies = config => {
  const allDependencies = new Map();

  for (const type of DEPENDENCY_TYPES) {
    const deps = config[type];
    if (!deps) continue;

    for (const name of Object.keys(deps)) {
      const depVersion = deps[name];

      if ((depVersion.startsWith("link:") || depVersion.startsWith("file:")) && type === "devDependencies") {
        continue;
      }

      allDependencies.set(name, depVersion);
    }
  }

  return allDependencies;
};

function getDependencyGraph(packages, opts) {
  const graph = new Map();
  let valid = true;
  const packagesByName = {
    [packages.root.packageJson.name]: packages.root
  };
  const queue = [packages.root];

  for (const pkg of packages.packages) {
    queue.push(pkg);
    packagesByName[pkg.packageJson.name] = pkg;
  }

  for (const pkg of queue) {
    const {
      name
    } = pkg.packageJson;
    const dependencies = [];
    const allDependencies = getAllDependencies(pkg.packageJson);

    for (let [depName, depVersion] of allDependencies) {
      const match = packagesByName[depName];
      if (!match) continue;
      const expected = match.packageJson.version;

      if (depVersion.startsWith("workspace:")) {
        depVersion = depVersion.substr(10);
      } else if ((opts === null || opts === void 0 ? void 0 : opts.bumpVersionsWithWorkspaceProtocolOnly) === true) {
        continue;
      } // internal dependencies only need to semver satisfy, not '==='


      if (!semver__default['default'].satisfies(expected, depVersion)) {
        valid = false;
        console.error(`Package ${chalk__default['default'].cyan(`"${name}"`)} must depend on the current version of ${chalk__default['default'].cyan(`"${depName}"`)}: ${chalk__default['default'].green(`"${expected}"`)} vs ${chalk__default['default'].red(`"${depVersion}"`)}`);
        continue;
      }

      dependencies.push(depName);
    }

    graph.set(name, {
      pkg,
      dependencies
    });
  }

  return {
    graph,
    valid
  };
}

function getDependentsGraph(packages, opts) {
  const graph = new Map();
  const {
    graph: dependencyGraph
  } = getDependencyGraph(packages, {
    bumpVersionsWithWorkspaceProtocolOnly: (opts === null || opts === void 0 ? void 0 : opts.bumpVersionsWithWorkspaceProtocolOnly) === true
  });
  const dependentsLookup = {};
  packages.packages.forEach(pkg => {
    dependentsLookup[pkg.packageJson.name] = {
      pkg,
      dependents: []
    };
  });
  packages.packages.forEach(pkg => {
    const dependent = pkg.packageJson.name;
    const valFromDependencyGraph = dependencyGraph.get(dependent);

    if (valFromDependencyGraph) {
      const dependencies = valFromDependencyGraph.dependencies;
      dependencies.forEach(dependency => {
        dependentsLookup[dependency].dependents.push(dependent);
      });
    }
  });
  Object.keys(dependentsLookup).forEach(key => {
    graph.set(key, dependentsLookup[key]);
  });
  const simplifiedDependentsGraph = new Map();
  graph.forEach((pkgInfo, pkgName) => {
    simplifiedDependentsGraph.set(pkgName, pkgInfo.dependents);
  });
  return simplifiedDependentsGraph;
}

exports.getDependentsGraph = getDependentsGraph;
