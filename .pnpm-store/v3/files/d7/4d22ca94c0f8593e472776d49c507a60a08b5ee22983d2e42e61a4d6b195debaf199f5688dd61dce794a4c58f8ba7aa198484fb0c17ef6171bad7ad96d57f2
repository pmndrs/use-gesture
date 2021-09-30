"use strict";

exports.__esModule = true;
exports.getDependencies = getDependencies;

var _fsExtra = require("fs-extra");

function getDependencies() {
  const data = parsePackageJson();
  return {
    dependencies: mapData(data === null || data === void 0 ? void 0 : data.dependencies),
    devDependencies: mapData(data === null || data === void 0 ? void 0 : data.devDependencies)
  };
}

function mapData(deps) {
  if (!deps) {
    return undefined;
  }

  return Object.entries(deps).map(([name, version]) => {
    return {
      name,
      version
    };
  }).map(({
    name,
    version
  }) => `${name}@${version}`);
}

function parsePackageJson() {
  try {
    const packageJson = (0, _fsExtra.readFileSync)(`./package.json`, `utf8`);

    if (!packageJson) {
      return {
        dependencies: {},
        devDependencies: {}
      };
    }

    return JSON.parse(packageJson);
  } catch (e) {
    return {
      dependencies: {},
      devDependencies: {}
    };
  }
}