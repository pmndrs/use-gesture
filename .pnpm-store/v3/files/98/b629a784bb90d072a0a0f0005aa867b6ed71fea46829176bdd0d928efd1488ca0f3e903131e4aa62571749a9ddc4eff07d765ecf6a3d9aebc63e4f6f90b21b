'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var semver = require('semver');
var errors = require('@changesets/errors');
var getDependentsGraph = require('@changesets/get-dependents-graph');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var semver__default = /*#__PURE__*/_interopDefault(semver);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function incrementVersion(release, preInfo) {
  if (release.type === "none") {
    return release.oldVersion;
  }

  let version = semver.inc(release.oldVersion, release.type);

  if (preInfo !== undefined && preInfo.state.mode !== "exit") {
    let preVersion = preInfo.preVersions.get(release.name);

    if (preVersion === undefined) {
      throw new errors.InternalError(`preVersion for ${release.name} does not exist when preState is defined`);
    } // why are we adding this ourselves rather than passing 'pre' + versionType to semver.inc?
    // because semver.inc with prereleases is confusing and this seems easier


    version += `-${preInfo.state.tag}.${preVersion}`;
  }

  return version;
}

/*
  WARNING:
  Important note for understanding how this package works:

  We are doing some kind of wacky things with manipulating the objects within the
  releases array, despite the fact that this was passed to us as an argument. We are
  aware that this is generally bad practice, but have decided to to this here as
  we control the entire flow of releases.

  We could solve this by inlining this function, or by returning a deep-cloned then
  modified array, but we decided both of those are worse than this solution.
*/

function determineDependents({
  releases,
  packagesByName,
  dependencyGraph,
  preInfo,
  config
}) {
  let updated = false; // NOTE this is intended to be called recursively

  let pkgsToSearch = [...releases.values()];

  while (pkgsToSearch.length > 0) {
    // nextRelease is our dependency, think of it as "avatar"
    const nextRelease = pkgsToSearch.shift();
    if (!nextRelease) continue; // pkgDependents will be a list of packages that depend on nextRelease ie. ['avatar-group', 'comment']

    const pkgDependents = dependencyGraph.get(nextRelease.name);

    if (!pkgDependents) {
      throw new Error(`Error in determining dependents - could not find package in repository: ${nextRelease.name}`);
    }

    pkgDependents.map(dependent => {
      let type;
      const dependentPackage = packagesByName.get(dependent);
      if (!dependentPackage) throw new Error("Dependency map is incorrect");

      if (config.ignore.includes(dependent)) {
        type = "none";
      } else {
        const dependencyVersionRanges = getDependencyVersionRanges(dependentPackage.packageJson, nextRelease.name);

        for (const {
          depType,
          versionRange
        } of dependencyVersionRanges) {
          if (shouldBumpMajor({
            dependent,
            depType,
            versionRange,
            releases,
            nextRelease,
            preInfo,
            onlyUpdatePeerDependentsWhenOutOfRange: config.___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH.onlyUpdatePeerDependentsWhenOutOfRange
          })) {
            type = "major";
          } else {
            if ( // TODO validate this - I don't think it's right anymore
            (!releases.has(dependent) || releases.get(dependent).type === "none") && (config.___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH.updateInternalDependents === "always" || !semver__default['default'].satisfies(incrementVersion(nextRelease, preInfo), // to deal with a * versionRange that comes from workspace:* dependencies as the wildcard will match anything
            versionRange === "*" ? nextRelease.oldVersion : versionRange))) {
              switch (depType) {
                case "dependencies":
                case "optionalDependencies":
                case "peerDependencies":
                  if (type !== "major" && type !== "minor") {
                    type = "patch";
                  }

                  break;

                case "devDependencies":
                  {
                    // We don't need a version bump if the package is only in the devDependencies of the dependent package
                    if (type !== "major" && type !== "minor" && type !== "patch") {
                      type = "none";
                    }
                  }
              }
            }
          }
        }
      }

      if (releases.has(dependent) && releases.get(dependent).type === type) {
        type = undefined;
      }

      return {
        name: dependent,
        type,
        pkgJSON: dependentPackage.packageJson
      };
    }).filter(({
      type
    }) => type).forEach( // @ts-ignore - I don't know how to make typescript understand that the filter above guarantees this and I got sick of trying
    ({
      name,
      type,
      pkgJSON
    }) => {
      // At this point, we know if we are making a change
      updated = true;
      const existing = releases.get(name); // For things that are being given a major bump, we check if we have already
      // added them here. If we have, we update the existing item instead of pushing it on to search.
      // It is safe to not add it to pkgsToSearch because it should have already been searched at the
      // largest possible bump type.

      if (existing && type === "major" && existing.type !== "major") {
        existing.type = "major";
        pkgsToSearch.push(existing);
      } else {
        let newDependent = {
          name,
          type,
          oldVersion: pkgJSON.version,
          changesets: []
        };
        pkgsToSearch.push(newDependent);
        releases.set(name, newDependent);
      }
    });
  }

  return updated;
}
/*
  Returns an array of objects in the shape { depType: DependencyType, versionRange: string }
  The array can contain more than one elements in case a dependency appears in multiple
  dependency lists. For example, a package that is both a peerDepenency and a devDependency.
*/

function getDependencyVersionRanges(dependentPkgJSON, dependencyName) {
  const DEPENDENCY_TYPES = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
  const dependencyVersionRanges = [];

  for (const type of DEPENDENCY_TYPES) {
    const deps = dependentPkgJSON[type];
    if (!deps) continue;

    if (deps[dependencyName]) {
      dependencyVersionRanges.push({
        depType: type,
        versionRange: deps[dependencyName].replace("workspace:", "")
      });
    }
  }

  return dependencyVersionRanges;
}

function shouldBumpMajor({
  dependent,
  depType,
  versionRange,
  releases,
  nextRelease,
  preInfo,
  onlyUpdatePeerDependentsWhenOutOfRange
}) {
  // we check if it is a peerDependency because if it is, our dependent bump type might need to be major.
  return depType === "peerDependencies" && nextRelease.type !== "none" && nextRelease.type !== "patch" && ( // 1. If onlyUpdatePeerDependentsWhenOutOfRange set to true, bump major if the version is leaving the range.
  // 2. If onlyUpdatePeerDependentsWhenOutOfRange set to false, bump major regardless whether or not the version is leaving the range.
  !onlyUpdatePeerDependentsWhenOutOfRange || !semver__default['default'].satisfies(incrementVersion(nextRelease, preInfo), versionRange)) && ( // bump major only if the dependent doesn't already has a major release.
  !releases.has(dependent) || releases.has(dependent) && releases.get(dependent).type !== "major");
}

// This function takes in changesets and returns one release per
// package listed in the changesets
function flattenReleases(changesets, packagesByName, ignoredPackages) {
  let releases = new Map();
  changesets.forEach(changeset => {
    changeset.releases // Filter out ignored packages because they should not trigger a release
    // If their dependencies need updates, they will be added to releases by `determineDependents()` with release type `none`
    .filter(({
      name
    }) => !ignoredPackages.includes(name)).forEach(({
      name,
      type
    }) => {
      let release = releases.get(name);
      let pkg = packagesByName.get(name);

      if (!pkg) {
        throw new Error(`Could not find package information for ${name}`);
      }

      if (!release) {
        release = {
          name,
          type,
          oldVersion: pkg.packageJson.version,
          changesets: [changeset.id]
        };
      } else {
        // If the type was already major, we never need to update it
        if (release.type === "minor" && type === "major") {
          release.type = type;
        } else if (release.type === "patch" && (type === "major" || type === "minor")) {
          release.type = type;
        } // Check whether the bumpType will change
        // If the bumpType has changed recalc newVersion
        // push new changeset to releases


        release.changesets.push(changeset.id);
      }

      releases.set(name, release);
    });
  });
  return releases;
}

/*
  WARNING:
  Important note for understanding how this package works:

  We are doing some kind of wacky things with manipulating the objects within the
  releases array, despite the fact that this was passed to us as an argument. We are
  aware that this is generally bad practice, but have decided to to this here as
  we control the entire flow of releases.

  We could solve this by inlining this function, or by returning a deep-cloned then
  modified array, but we decided both of those are worse than this solution.
*/
function applyLinks(releases, packagesByName, linked) {
  let updated = false;
  if (!linked) return updated; // We do this for each set of linked packages

  for (let linkedPackages of linked) {
    // First we filter down to all the relevent releases for one set of linked packages
    let releasingLinkedPackages = [...releases.values()].filter(release => linkedPackages.includes(release.name) && release.type !== "none"); // If we proceed any further we do extra work with calculating highestVersion for things that might
    // not need one, as they only have workspace based packages

    if (releasingLinkedPackages.length < 1) continue;
    let highestReleaseType;
    let highestVersion;

    for (let pkg of releasingLinkedPackages) {
      // Note that patch is implictly set here, but never needs to override another value
      if (!highestReleaseType) {
        highestReleaseType = pkg.type;
      } else if (pkg.type === "major") {
        highestReleaseType = pkg.type;
      } else if (pkg.type === "minor" && highestReleaseType !== "major") {
        highestReleaseType = pkg.type;
      }
    } // Next we determine what the highest version among the linked packages will be


    for (let linkedPackage of linkedPackages) {
      let pkg = packagesByName.get(linkedPackage);

      if (pkg) {
        if (highestVersion === undefined || semver__default['default'].gt(pkg.packageJson.version, highestVersion)) {
          highestVersion = pkg.packageJson.version;
        }
      } else {
        console.error(`FATAL ERROR IN CHANGESETS! We were unable to version for linked package: ${linkedPackage} in linkedPackages: ${linkedPackages.toString()}`);
        throw new Error(`fatal: could not resolve linked packages`);
      }
    }

    if (!highestVersion || !highestReleaseType) throw new Error(`Large internal changesets error in calculating linked versions. Please contact the maintainers`); // Finally, we update the packages so all of them are on the highest version

    for (let linkedPackage of releasingLinkedPackages) {
      if (linkedPackage.type !== highestReleaseType) {
        updated = true;
        linkedPackage.type = highestReleaseType;
      }

      if (linkedPackage.oldVersion !== highestVersion) {
        updated = true;
        linkedPackage.oldVersion = highestVersion;
      }
    }
  }

  return updated;
}

function getPreVersion(version) {
  let parsed = semver.parse(version);
  let preVersion = parsed.prerelease[1] === undefined ? -1 : parsed.prerelease[1];

  if (typeof preVersion !== "number") {
    throw new errors.InternalError("preVersion is not a number");
  }

  preVersion++;
  return preVersion;
}

function getSnapshotSuffix(snapshot) {
  if (snapshot === undefined) {
    return;
  }

  const now = new Date();
  let dateAndTime = [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()].join("");
  let tag = "";
  if (typeof snapshot === "string") tag = `-${snapshot}`;
  return `${tag}-${dateAndTime}`;
}

function getNewVersion(release, preInfo, snapshotSuffix, useCalculatedVersionForSnapshots) {
  /**
   * Using version as 0.0.0 so that it does not hinder with other version release
   * For example;
   * if user has a regular pre-release at 1.0.0-beta.0 and then you had a snapshot pre-release at 1.0.0-canary-git-hash
   * and a consumer is using the range ^1.0.0-beta, most people would expect that range to resolve to 1.0.0-beta.0
   * but it'll actually resolve to 1.0.0-canary-hash. Using 0.0.0 solves this problem because it won't conflict with other versions.
   *
   * You can set `useCalculatedVersionForSnapshots` flag to true to use calculated versions if you don't care about the above problem.
   */
  if (snapshotSuffix && !useCalculatedVersionForSnapshots) {
    return `0.0.0${snapshotSuffix}`;
  }

  const calculatedVersion = incrementVersion(release, preInfo);

  if (snapshotSuffix && useCalculatedVersionForSnapshots) {
    return `${calculatedVersion}${snapshotSuffix}`;
  }

  return calculatedVersion;
}

function assembleReleasePlan(changesets, packages, config, // intentionally not using an optional parameter here so the result of `readPreState` has to be passed in here
preState, snapshot) {
  let packagesByName = new Map(packages.packages.map(x => [x.packageJson.name, x]));
  const relevantChangesets = getRelevantChangesets(changesets, config.ignore, preState);
  const preInfo = getPreInfo(changesets, packagesByName, config, preState); // Caching the snapshot version here and use this if it is snapshot release

  const snapshotSuffix = getSnapshotSuffix(snapshot); // releases is, at this point a list of all packages we are going to releases,
  // flattened down to one release per package, having a reference back to their
  // changesets, and with a calculated new versions

  let releases = flattenReleases(relevantChangesets, packagesByName, config.ignore);
  let dependencyGraph = getDependentsGraph.getDependentsGraph(packages, {
    bumpVersionsWithWorkspaceProtocolOnly: config.bumpVersionsWithWorkspaceProtocolOnly
  });
  let releasesValidated = false;

  while (releasesValidated === false) {
    // The map passed in to determineDependents will be mutated
    let dependentAdded = determineDependents({
      releases,
      packagesByName,
      dependencyGraph,
      preInfo,
      config
    }); // The map passed in to determineDependents will be mutated

    let linksUpdated = applyLinks(releases, packagesByName, config.linked);
    releasesValidated = !linksUpdated && !dependentAdded;
  }

  if ((preInfo === null || preInfo === void 0 ? void 0 : preInfo.state.mode) === "exit") {
    for (let pkg of packages.packages) {
      // If a package had a prerelease, but didn't trigger a version bump in the regular release,
      // we want to give it a patch release.
      // Detailed explaination at https://github.com/atlassian/changesets/pull/382#discussion_r434434182
      if (preInfo.preVersions.get(pkg.packageJson.name) !== 0) {
        if (!releases.has(pkg.packageJson.name)) {
          releases.set(pkg.packageJson.name, {
            type: "patch",
            name: pkg.packageJson.name,
            changesets: [],
            oldVersion: pkg.packageJson.version
          });
        }
      }
    }
  }

  return {
    changesets: relevantChangesets,
    releases: [...releases.values()].map(incompleteRelease => {
      return _objectSpread2(_objectSpread2({}, incompleteRelease), {}, {
        newVersion: getNewVersion(incompleteRelease, preInfo, snapshotSuffix, config.___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH.useCalculatedVersionForSnapshots)
      });
    }),
    preState: preInfo === null || preInfo === void 0 ? void 0 : preInfo.state
  };
}

function getRelevantChangesets(changesets, ignored, preState) {
  for (const changeset of changesets) {
    // Using the following 2 arrays to decide whether a changeset
    // contains both ignored and not ignored packages
    const ignoredPackages = [];
    const notIgnoredPackages = [];

    for (const release of changeset.releases) {
      if (ignored.find(ignoredPackageName => ignoredPackageName === release.name)) {
        ignoredPackages.push(release.name);
      } else {
        notIgnoredPackages.push(release.name);
      }
    }

    if (ignoredPackages.length > 0 && notIgnoredPackages.length > 0) {
      throw new Error(`Found mixed changeset ${changeset.id}\n` + `Found ignored packages: ${ignoredPackages.join(" ")}\n` + `Found not ignored packages: ${notIgnoredPackages.join(" ")}\n` + "Mixed changesets that contain both ignored and not ignored packages are not allowed");
    }
  }

  if (preState && preState.mode !== "exit") {
    let usedChangesetIds = new Set(preState.changesets);
    return changesets.filter(changeset => !usedChangesetIds.has(changeset.id));
  }

  return changesets;
}

function getPreInfo(changesets, packagesByName, config, preState) {
  if (preState === undefined) {
    return;
  }

  let updatedPreState = _objectSpread2(_objectSpread2({}, preState), {}, {
    initialVersions: _objectSpread2({}, preState.initialVersions)
  });

  let preVersions = new Map();

  if (updatedPreState !== undefined) {
    for (const [, pkg] of packagesByName) {
      if (updatedPreState.initialVersions[pkg.packageJson.name] === undefined) {
        updatedPreState.initialVersions[pkg.packageJson.name] = pkg.packageJson.version;
      }
    } // Populate preVersion
    // preVersion is the map between package name and its next pre version number.


    for (const [, pkg] of packagesByName) {
      preVersions.set(pkg.packageJson.name, getPreVersion(pkg.packageJson.version));
    }

    for (let linkedGroup of config.linked) {
      let highestPreVersion = 0;

      for (let linkedPackage of linkedGroup) {
        highestPreVersion = Math.max(getPreVersion(packagesByName.get(linkedPackage).packageJson.version), highestPreVersion);
      }

      for (let linkedPackage of linkedGroup) {
        preVersions.set(linkedPackage, highestPreVersion);
      }
    }

    updatedPreState.changesets = changesets.map(changeset => changeset.id);
  }

  return {
    state: updatedPreState,
    preVersions
  };
}

exports.default = assembleReleasePlan;
