"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var semver = require("semver"), errors = require("@changesets/errors"), getDependentsGraph = require("@changesets/get-dependents-graph");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var semver__default = _interopDefault(semver);

function _defineProperty(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value: value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter((function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }))), keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
      _defineProperty(target, key, source[key]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    }));
  }
  return target;
}

function incrementVersion(release, preInfo) {
  if ("none" === release.type) return release.oldVersion;
  let version = semver.inc(release.oldVersion, release.type);
  if (void 0 !== preInfo && "exit" !== preInfo.state.mode) {
    let preVersion = preInfo.preVersions.get(release.name);
    if (void 0 === preVersion) throw new errors.InternalError(`preVersion for ${release.name} does not exist when preState is defined`);
    version += `-${preInfo.state.tag}.${preVersion}`;
  }
  return version;
}

function determineDependents({releases: releases, packagesByName: packagesByName, dependencyGraph: dependencyGraph, preInfo: preInfo, config: config}) {
  let updated = !1, pkgsToSearch = [ ...releases.values() ];
  for (;pkgsToSearch.length > 0; ) {
    const nextRelease = pkgsToSearch.shift();
    if (!nextRelease) continue;
    const pkgDependents = dependencyGraph.get(nextRelease.name);
    if (!pkgDependents) throw new Error("Error in determining dependents - could not find package in repository: " + nextRelease.name);
    pkgDependents.map((dependent => {
      let type;
      const dependentPackage = packagesByName.get(dependent);
      if (!dependentPackage) throw new Error("Dependency map is incorrect");
      if (config.ignore.includes(dependent)) type = "none"; else {
        const dependencyVersionRanges = getDependencyVersionRanges(dependentPackage.packageJson, nextRelease.name);
        for (const {depType: depType, versionRange: versionRange} of dependencyVersionRanges) if (shouldBumpMajor({
          dependent: dependent,
          depType: depType,
          versionRange: versionRange,
          releases: releases,
          nextRelease: nextRelease,
          preInfo: preInfo,
          onlyUpdatePeerDependentsWhenOutOfRange: config.___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH.onlyUpdatePeerDependentsWhenOutOfRange
        })) type = "major"; else if (!(releases.has(dependent) && "none" !== releases.get(dependent).type || "always" !== config.___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH.updateInternalDependents && semver__default.default.satisfies(incrementVersion(nextRelease, preInfo), "*" === versionRange ? nextRelease.oldVersion : versionRange))) switch (depType) {
         case "dependencies":
         case "optionalDependencies":
         case "peerDependencies":
          "major" !== type && "minor" !== type && (type = "patch");
          break;

         case "devDependencies":
          "major" !== type && "minor" !== type && "patch" !== type && (type = "none");
        }
      }
      return releases.has(dependent) && releases.get(dependent).type === type && (type = void 0), 
      {
        name: dependent,
        type: type,
        pkgJSON: dependentPackage.packageJson
      };
    })).filter((({type: type}) => type)).forEach((({name: name, type: type, pkgJSON: pkgJSON}) => {
      updated = !0;
      const existing = releases.get(name);
      if (existing && "major" === type && "major" !== existing.type) existing.type = "major", 
      pkgsToSearch.push(existing); else {
        let newDependent = {
          name: name,
          type: type,
          oldVersion: pkgJSON.version,
          changesets: []
        };
        pkgsToSearch.push(newDependent), releases.set(name, newDependent);
      }
    }));
  }
  return updated;
}

function getDependencyVersionRanges(dependentPkgJSON, dependencyName) {
  const DEPENDENCY_TYPES = [ "dependencies", "devDependencies", "peerDependencies", "optionalDependencies" ], dependencyVersionRanges = [];
  for (const type of DEPENDENCY_TYPES) {
    const deps = dependentPkgJSON[type];
    deps && (deps[dependencyName] && dependencyVersionRanges.push({
      depType: type,
      versionRange: deps[dependencyName].replace("workspace:", "")
    }));
  }
  return dependencyVersionRanges;
}

function shouldBumpMajor({dependent: dependent, depType: depType, versionRange: versionRange, releases: releases, nextRelease: nextRelease, preInfo: preInfo, onlyUpdatePeerDependentsWhenOutOfRange: onlyUpdatePeerDependentsWhenOutOfRange}) {
  return "peerDependencies" === depType && "none" !== nextRelease.type && "patch" !== nextRelease.type && (!onlyUpdatePeerDependentsWhenOutOfRange || !semver__default.default.satisfies(incrementVersion(nextRelease, preInfo), versionRange)) && (!releases.has(dependent) || releases.has(dependent) && "major" !== releases.get(dependent).type);
}

function flattenReleases(changesets, packagesByName, ignoredPackages) {
  let releases = new Map;
  return changesets.forEach((changeset => {
    changeset.releases.filter((({name: name}) => !ignoredPackages.includes(name))).forEach((({name: name, type: type}) => {
      let release = releases.get(name), pkg = packagesByName.get(name);
      if (!pkg) throw new Error("Could not find package information for " + name);
      release ? ("minor" === release.type && "major" === type ? release.type = type : "patch" !== release.type || "major" !== type && "minor" !== type || (release.type = type), 
      release.changesets.push(changeset.id)) : release = {
        name: name,
        type: type,
        oldVersion: pkg.packageJson.version,
        changesets: [ changeset.id ]
      }, releases.set(name, release);
    }));
  })), releases;
}

function applyLinks(releases, packagesByName, linked) {
  let updated = !1;
  if (!linked) return updated;
  for (let linkedPackages of linked) {
    let highestReleaseType, highestVersion, releasingLinkedPackages = [ ...releases.values() ].filter((release => linkedPackages.includes(release.name) && "none" !== release.type));
    if (!(releasingLinkedPackages.length < 1)) {
      for (let pkg of releasingLinkedPackages) highestReleaseType ? ("major" === pkg.type || "minor" === pkg.type && "major" !== highestReleaseType) && (highestReleaseType = pkg.type) : highestReleaseType = pkg.type;
      for (let linkedPackage of linkedPackages) {
        let pkg = packagesByName.get(linkedPackage);
        if (!pkg) throw console.error(`FATAL ERROR IN CHANGESETS! We were unable to version for linked package: ${linkedPackage} in linkedPackages: ${linkedPackages.toString()}`), 
        new Error("fatal: could not resolve linked packages");
        (void 0 === highestVersion || semver__default.default.gt(pkg.packageJson.version, highestVersion)) && (highestVersion = pkg.packageJson.version);
      }
      if (!highestVersion || !highestReleaseType) throw new Error("Large internal changesets error in calculating linked versions. Please contact the maintainers");
      for (let linkedPackage of releasingLinkedPackages) linkedPackage.type !== highestReleaseType && (updated = !0, 
      linkedPackage.type = highestReleaseType), linkedPackage.oldVersion !== highestVersion && (updated = !0, 
      linkedPackage.oldVersion = highestVersion);
    }
  }
  return updated;
}

function getPreVersion(version) {
  let parsed = semver.parse(version), preVersion = void 0 === parsed.prerelease[1] ? -1 : parsed.prerelease[1];
  if ("number" != typeof preVersion) throw new errors.InternalError("preVersion is not a number");
  return preVersion++, preVersion;
}

function getSnapshotSuffix(snapshot) {
  if (void 0 === snapshot) return;
  const now = new Date;
  let tag = "";
  return "string" == typeof snapshot && (tag = "-" + snapshot), `${tag}-${[ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds() ].join("")}`;
}

function getNewVersion(release, preInfo, snapshotSuffix, useCalculatedVersionForSnapshots) {
  if (snapshotSuffix && !useCalculatedVersionForSnapshots) return "0.0.0" + snapshotSuffix;
  const calculatedVersion = incrementVersion(release, preInfo);
  return snapshotSuffix && useCalculatedVersionForSnapshots ? `${calculatedVersion}${snapshotSuffix}` : calculatedVersion;
}

function assembleReleasePlan(changesets, packages, config, preState, snapshot) {
  let packagesByName = new Map(packages.packages.map((x => [ x.packageJson.name, x ])));
  const relevantChangesets = getRelevantChangesets(changesets, config.ignore, preState), preInfo = getPreInfo(changesets, packagesByName, config, preState), snapshotSuffix = getSnapshotSuffix(snapshot);
  let releases = flattenReleases(relevantChangesets, packagesByName, config.ignore), dependencyGraph = getDependentsGraph.getDependentsGraph(packages, {
    bumpVersionsWithWorkspaceProtocolOnly: config.bumpVersionsWithWorkspaceProtocolOnly
  }), releasesValidated = !1;
  for (;!1 === releasesValidated; ) {
    let dependentAdded = determineDependents({
      releases: releases,
      packagesByName: packagesByName,
      dependencyGraph: dependencyGraph,
      preInfo: preInfo,
      config: config
    });
    releasesValidated = !applyLinks(releases, packagesByName, config.linked) && !dependentAdded;
  }
  if ("exit" === (null == preInfo ? void 0 : preInfo.state.mode)) for (let pkg of packages.packages) 0 !== preInfo.preVersions.get(pkg.packageJson.name) && (releases.has(pkg.packageJson.name) || releases.set(pkg.packageJson.name, {
    type: "patch",
    name: pkg.packageJson.name,
    changesets: [],
    oldVersion: pkg.packageJson.version
  }));
  return {
    changesets: relevantChangesets,
    releases: [ ...releases.values() ].map((incompleteRelease => _objectSpread2(_objectSpread2({}, incompleteRelease), {}, {
      newVersion: getNewVersion(incompleteRelease, preInfo, snapshotSuffix, config.___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH.useCalculatedVersionForSnapshots)
    }))),
    preState: null == preInfo ? void 0 : preInfo.state
  };
}

function getRelevantChangesets(changesets, ignored, preState) {
  for (const changeset of changesets) {
    const ignoredPackages = [], notIgnoredPackages = [];
    for (const release of changeset.releases) ignored.find((ignoredPackageName => ignoredPackageName === release.name)) ? ignoredPackages.push(release.name) : notIgnoredPackages.push(release.name);
    if (ignoredPackages.length > 0 && notIgnoredPackages.length > 0) throw new Error(`Found mixed changeset ${changeset.id}\nFound ignored packages: ${ignoredPackages.join(" ")}\nFound not ignored packages: ${notIgnoredPackages.join(" ")}\nMixed changesets that contain both ignored and not ignored packages are not allowed`);
  }
  if (preState && "exit" !== preState.mode) {
    let usedChangesetIds = new Set(preState.changesets);
    return changesets.filter((changeset => !usedChangesetIds.has(changeset.id)));
  }
  return changesets;
}

function getPreInfo(changesets, packagesByName, config, preState) {
  if (void 0 === preState) return;
  let updatedPreState = _objectSpread2(_objectSpread2({}, preState), {}, {
    initialVersions: _objectSpread2({}, preState.initialVersions)
  }), preVersions = new Map;
  if (void 0 !== updatedPreState) {
    for (const [, pkg] of packagesByName) void 0 === updatedPreState.initialVersions[pkg.packageJson.name] && (updatedPreState.initialVersions[pkg.packageJson.name] = pkg.packageJson.version);
    for (const [, pkg] of packagesByName) preVersions.set(pkg.packageJson.name, getPreVersion(pkg.packageJson.version));
    for (let linkedGroup of config.linked) {
      let highestPreVersion = 0;
      for (let linkedPackage of linkedGroup) highestPreVersion = Math.max(getPreVersion(packagesByName.get(linkedPackage).packageJson.version), highestPreVersion);
      for (let linkedPackage of linkedGroup) preVersions.set(linkedPackage, highestPreVersion);
    }
    updatedPreState.changesets = changesets.map((changeset => changeset.id));
  }
  return {
    state: updatedPreState,
    preVersions: preVersions
  };
}

exports.default = assembleReleasePlan;
