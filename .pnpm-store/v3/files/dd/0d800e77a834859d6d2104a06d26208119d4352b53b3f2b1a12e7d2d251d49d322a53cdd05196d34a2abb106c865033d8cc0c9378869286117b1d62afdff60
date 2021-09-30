let SizeLimitError = require('size-limit/size-limit-error')
let { readdir } = require('fs').promises
let { nanoid } = require('nanoid/non-secure')
let { tmpdir } = require('os')
let { join } = require('path')
let rm = require('size-limit/rm')

let convertConfig = require('./convert-config')
let runWebpack = require('./run-webpack')
let getConfig = require('./get-config')

const WEBPACK_EMPTY_PROJECT = 962
const WEBPACK_EMPTY_PROJECT_GZIP = 461
const WEBPACK_EMPTY_PROJECT_IMPORT = 965
const WEBPACK_EMPTY_PROJECT_IMPORT_GZIP = 473

function getFiles(stats, check) {
  let entries = {}
  if (check.entry) {
    for (let i of check.entry) {
      if (stats.entrypoints[i]) {
        entries[i] = stats.entrypoints[i]
      } else {
        throw new SizeLimitError('unknownEntry', i)
      }
    }
  } else {
    entries = stats.entrypoints
  }

  return Object.keys(entries)
    .reduce((assets, i) => assets.concat(entries[i].assets), [])
    .map(i => {
      if (check.webpackConfig.output && check.webpackConfig.output.path) {
        return join(check.webpackConfig.output.path, i)
      } else {
        return join(process.cwd(), 'dist', i)
      }
    })
}

async function isDirNotEmpty(dir) {
  try {
    let files = await readdir(dir)
    return !!files.length
  } catch (e) {
    if (e.code === 'ENOENT') return false
    throw e
  }
}

let self = {
  name: '@size-limit/webpack',

  async before(config) {
    if (config.saveBundle) {
      if (config.cleanDir) {
        await rm(config.saveBundle)
      } else {
        let notEmpty = await isDirNotEmpty(config.saveBundle)
        if (notEmpty) {
          throw new SizeLimitError('bundleDirNotEmpty', config.saveBundle)
        }
      }
    }
  },

  async step20(config, check) {
    if (check.webpack === false) return
    check.webpackOutput = config.saveBundle
    if (!check.webpackOutput) {
      check.webpackOutput = join(tmpdir(), `size-limit-${nanoid()}`)
    }
    if (check.config) {
      check.webpackConfig = require(check.config)
      convertConfig(check.webpackConfig, config.configPath)
    } else {
      check.webpackConfig = await getConfig(config, check, check.webpackOutput)
      if (check.modifyWebpackConfig) {
        check.webpackConfig = check.modifyWebpackConfig(check.webpackConfig)
      }
    }
  },

  wait40: 'Adding to empty webpack project',
  async step40(config, check) {
    if (check.webpackConfig && check.webpack !== false) {
      check.bundles = getFiles(await runWebpack(check), check)
    }
  },

  async step61(config, check) {
    if (check.bundles) {
      if (typeof check.size === 'undefined') {
        throw new SizeLimitError('missedPlugin', 'file')
      }
      if (check.import && check.gzip === false) {
        check.size -= WEBPACK_EMPTY_PROJECT_IMPORT
      } else if (check.import) {
        check.size -= WEBPACK_EMPTY_PROJECT_IMPORT_GZIP
      } else if (check.gzip === false) {
        check.size -= WEBPACK_EMPTY_PROJECT
      } else {
        check.size -= WEBPACK_EMPTY_PROJECT_GZIP
      }
    }
  },

  async finally(config, check) {
    if (check.webpackOutput && !config.saveBundle) {
      await rm(check.webpackOutput)
    }
  }
}

module.exports = [self]
