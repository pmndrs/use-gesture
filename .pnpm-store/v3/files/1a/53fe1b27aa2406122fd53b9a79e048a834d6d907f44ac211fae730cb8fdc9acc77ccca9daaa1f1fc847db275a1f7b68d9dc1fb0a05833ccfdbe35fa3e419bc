const MESSAGES = {
  noPackage: () =>
    'Size Limit didn’t find *package.json*. ' +
    'Create npm package and run Size Limit there.',
  unknownArg: arg =>
    `Unknown argument *${arg}*. Check command for typo and read docs.`,
  argWithoutWebpack: arg =>
    `Argument *--${arg}* works only with *@size-limit/webpack* plugin` +
    (arg === 'why' ? '. You can add Bundle Analyzer to you own bundler.' : ''),
  argWithoutAnotherArg: (arg, anotherArg) =>
    `Argument *--${arg}* works only with *--${anotherArg}* argument`,
  argWithoutParameter: (arg, parameter) =>
    `Missing parameter *${parameter}* for *--${arg}* argument`,
  noConfig: () => 'Create Size Limit config in *package.json*',
  noArrayConfig: () => 'Size Limit config must contain *an array*',
  emptyConfig: () => 'Size Limit config must *not be empty*',
  noObjectCheck: () => 'Size Limit config array should contain *only objects*',
  pathNotString: () =>
    'The *path* in Size Limit config ' +
    'must be *a string* or *an array of strings*',
  entryNotString: () =>
    'The *entry* in Size Limit config ' +
    'must be *a string* or *an array of strings*',
  pluginlessConfig: (opt, mod) =>
    `Config option *${opt}* needs *@size-limit/${mod}* plugin`,
  multiPluginlessConfig: (opt, mod1, mod2) =>
    `Config option *${opt}* needs *@size-limit/${mod1}* ` +
    `or *@size-limit/${mod2}* plugin`,
  timeWithoutPlugin: () => 'Add *@size-limit/time* plugin to use time limit',
  unknownOption: opt =>
    `Unknown option *${opt}* in config. Check Size Limit docs and version.`,
  missedPlugin: mod => `Add *@size-limit/${mod}* plugin to Size Limit`,
  unknownEntry: entry =>
    `Size Limit didn’t find *${entry}* entry in custom Webpack config`,
  brotliUnsupported: () =>
    'Update your Node.js to version >= v11.7.0 to use Brotli',
  cmdError: (cmd, error) => (error ? `${cmd} error: ${error}` : `${cmd} error`),
  bundleDirNotEmpty: dir =>
    `The directory *${dir}* is not empty. ` +
    'Pass *--clean-dir* if you want to remove it'
}

const ADD_CONFIG_EXAMPLE = {
  noConfig: true,
  emptyConfig: true,
  noObjectCheck: true,
  noArrayConfig: true,
  pathNotString: true
}

class SizeLimitError extends Error {
  constructor(type, ...args) {
    super(MESSAGES[type](...args))
    this.name = 'SizeLimitError'
    if (ADD_CONFIG_EXAMPLE[type]) {
      this.example =
        '  "size-limit": [\n' +
        '    {\n' +
        '      "path": "dist/bundle.js",\n' +
        '      "limit": "10 kB"\n' +
        '    }\n' +
        '  ]\n'
    }
  }
}

module.exports = SizeLimitError
