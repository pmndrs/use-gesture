const path = require(`path`);
const {resolveModuleName} = require(`ts-pnp`);
const {makeResolver} = require('./resolver');

function nothing() {
  // ¯\_(ツ)_/¯
}

function getModuleLocator(module, pnpapi) {
  const moduleLocation = typeof module === `string`
    ? module
    : module.filename;

  if (!moduleLocation)
    throw new Error(`The specified module doesn't seem to exist on the filesystem`);

  const moduleLocator = pnpapi.findPackageLocator(moduleLocation);

  if (!moduleLocator)
    throw new Error(`the specified module doesn't seem to be part of the dependency tree`);

  return moduleLocator;
}

function getDependencyLocator(sourceLocator, name, pnpapi) {

  const {packageDependencies} = pnpapi.getPackageInformation(sourceLocator);
  const reference = packageDependencies.get(name);

  return {name, reference};
}

module.exports = process.versions.pnp ? {
  apply: makeResolver({pnpapi: require(`pnpapi`)}),
} : {
  apply: nothing,
};

module.exports.makePlugin = (locator, filter) => process.versions.pnp ? {
  apply: makeResolver({sourceLocator: locator, filter, pnpapi: require(`pnpapi`)}),
} : {
  apply: nothing,
};

module.exports.moduleLoader = (module) => {
  if (process.versions.pnp) {
    const pnpapi = require(`pnpapi`);
    return {
      apply: makeResolver({
        sourceLocator: getModuleLocator(module, pnpapi),
        pnpapi,
      }),
    };
  }
  return {
    apply: nothing,
  };
};

module.exports.topLevelLoader = process.versions.pnp ? {
  apply: makeResolver({sourceLocator: {name: null, reference: null}, pnpapi: require(`pnpapi`)}),
} : {
  apply: nothing,
};

module.exports.bind = (filter, module, dependency) => {
  if (process.versions.pnp) {
    const pnpapi = require(`pnpapi`);
    return {
      apply: makeResolver({
        sourceLocator: dependency
          ? getDependencyLocator(getModuleLocator(module, pnpapi), dependency, pnpapi)
          : getModuleLocator(module, pnpapi),
        filter,
        pnpapi,
      }),
    };
  }
  return {
    apply: nothing,
  };
};

module.exports.tsLoaderOptions = (options = {}) => process.versions.pnp ? Object.assign({}, options, {
  resolveModuleName: resolveModuleName,
  resolveTypeReferenceDirective: resolveModuleName,
}) : options;

module.exports.forkTsCheckerOptions = (options = {}) => process.versions.pnp ? Object.assign({}, options, {
  resolveModuleNameModule: require.resolve(`./ts`),
  resolveTypeReferenceDirectiveModule: require.resolve(`./ts`),
}) : options;
