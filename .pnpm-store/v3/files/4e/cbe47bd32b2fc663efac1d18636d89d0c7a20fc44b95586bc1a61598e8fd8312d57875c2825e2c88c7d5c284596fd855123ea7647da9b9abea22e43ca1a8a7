"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var spawn = require("spawndamnit"), fs = require("fs"), path = require("path"), getPackages = require("@manypkg/get-packages"), errors = require("@changesets/errors"), isSubdir = require("is-subdir"), util = require("util");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var spawn__default = _interopDefault(spawn), fs__default = _interopDefault(fs), path__default = _interopDefault(path), isSubdir__default = _interopDefault(isSubdir);

const isInDir = dir => subdir => isSubdir__default.default(dir, subdir);

async function add(pathToFile, cwd) {
  const gitCmd = await spawn__default.default("git", [ "add", pathToFile ], {
    cwd: cwd
  });
  return 0 !== gitCmd.code && console.log(pathToFile, gitCmd.stderr.toString()), 0 === gitCmd.code;
}

async function commit(message, cwd) {
  return 0 === (await spawn__default.default("git", [ "commit", "-m", message, "--allow-empty" ], {
    cwd: cwd
  })).code;
}

async function tag(tagStr, cwd) {
  return 0 === (await spawn__default.default("git", [ "tag", tagStr, "-m", tagStr ], {
    cwd: cwd
  })).code;
}

async function getDivergedCommit(cwd, ref) {
  const cmd = await spawn__default.default("git", [ "merge-base", ref, "HEAD" ], {
    cwd: cwd
  });
  if (0 !== cmd.code) throw new Error(`Failed to find where HEAD diverged from ${ref}. Does ${ref} exist?`);
  return cmd.stdout.toString().trim();
}

const getCommitThatAddsFile = util.deprecate((async (gitPath, cwd) => (await getCommitsThatAddFiles([ gitPath ], cwd))[0]), "Use the bulk getCommitsThatAddFiles function instead");

async function getCommitsThatAddFiles(gitPaths, cwd) {
  const map = new Map;
  let remaining = gitPaths;
  for (;;) {
    const commitInfos = await Promise.all(remaining.map(findCommitAndParent));
    let commitsWithMissingParents = [];
    for (const info of commitInfos) info.commitSha && (info.parentSha ? map.set(info.path, info.commitSha) : commitsWithMissingParents.push(info));
    if (0 === commitsWithMissingParents.length) break;
    if (!await isRepoShallow()) {
      for (const unresolved of commitsWithMissingParents) map.set(unresolved.path, unresolved.commitSha);
      break;
    }
    await deepenCloneBy(50), remaining = commitsWithMissingParents.map((p => p.path));
  }
  return gitPaths.map((p => map.get(p)));
  async function findCommitAndParent(gitPath) {
    const logResult = await spawn__default.default("git", [ "log", "--diff-filter=A", "--max-count=1", "--pretty=format:%h:%p", gitPath ], {
      cwd: cwd
    }), [commitSha, parentSha] = logResult.stdout.toString().split(":");
    return {
      path: gitPath,
      commitSha: commitSha,
      parentSha: parentSha
    };
  }
  async function isRepoShallow() {
    const isShallowRepoOutput = (await spawn__default.default("git", [ "rev-parse", "--is-shallow-repository" ], {
      cwd: cwd
    })).stdout.toString().trim();
    if ("--is-shallow-repository" === isShallowRepoOutput) {
      const gitDir = (await spawn__default.default("git", [ "rev-parse", "--git-dir" ], {
        cwd: cwd
      })).stdout.toString().trim(), fullGitDir = path__default.default.resolve(cwd, gitDir);
      return fs__default.default.existsSync(path__default.default.join(fullGitDir, "shallow"));
    }
    return "true" === isShallowRepoOutput;
  }
  async function deepenCloneBy(by) {
    await spawn__default.default("git", [ "fetch", "--deepen=" + by ], {
      cwd: cwd
    });
  }
}

async function getChangedFilesSince({cwd: cwd, ref: ref, fullPath: fullPath = !1}) {
  const divergedAt = await getDivergedCommit(cwd, ref), cmd = await spawn__default.default("git", [ "diff", "--name-only", divergedAt ], {
    cwd: cwd
  });
  if (0 !== cmd.code) throw new Error(`Failed to diff against ${divergedAt}. Is ${divergedAt} a valid ref?`);
  const files = cmd.stdout.toString().trim().split("\n").filter((a => a));
  return fullPath ? files.map((file => path__default.default.resolve(cwd, file))) : files;
}

async function getChangedChangesetFilesSinceRef({cwd: cwd, ref: ref}) {
  try {
    const divergedAt = await getDivergedCommit(cwd, ref), cmd = await spawn__default.default("git", [ "diff", "--name-only", "--diff-filter=d", divergedAt ], {
      cwd: cwd
    });
    let tester = /.changeset\/[^/]+\.md$/;
    return cmd.stdout.toString().trim().split("\n").filter((file => tester.test(file)));
  } catch (err) {
    if (err instanceof errors.GitError) return [];
    throw err;
  }
}

async function getChangedPackagesSinceRef({cwd: cwd, ref: ref}) {
  const changedFiles = await getChangedFilesSince({
    ref: ref,
    cwd: cwd,
    fullPath: !0
  });
  let packages = await getPackages.getPackages(cwd);
  const fileToPackage = {};
  return packages.packages.forEach((pkg => {
    return changedFiles.filter((dir = pkg.dir, subdir => isSubdir__default.default(dir, subdir))).forEach((fileName => {
      const prevPkg = fileToPackage[fileName] || {
        dir: ""
      };
      pkg.dir.length > prevPkg.dir.length && (fileToPackage[fileName] = pkg);
    }));
    var dir;
  })), Object.values(fileToPackage).filter(((pkg, idx, packages) => packages.indexOf(pkg) === idx));
}

exports.add = add, exports.commit = commit, exports.getChangedChangesetFilesSinceRef = getChangedChangesetFilesSinceRef, 
exports.getChangedFilesSince = getChangedFilesSince, exports.getChangedPackagesSinceRef = getChangedPackagesSinceRef, 
exports.getCommitThatAddsFile = getCommitThatAddsFile, exports.getCommitsThatAddFiles = getCommitsThatAddFiles, 
exports.getDivergedCommit = getDivergedCommit, exports.tag = tag;
