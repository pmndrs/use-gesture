let { dirname, join } = require('path')

module.exports = function convertConfig(config, root) {
  let resolveModulesPaths = [join(dirname(root), 'node_modules')]
  if (!config.resolveLoader) config.resolveLoader = {}
  if (!config.resolve) config.resolve = {}
  config.resolveLoader.modules = resolveModulesPaths
  config.resolve.modules = resolveModulesPaths
}
