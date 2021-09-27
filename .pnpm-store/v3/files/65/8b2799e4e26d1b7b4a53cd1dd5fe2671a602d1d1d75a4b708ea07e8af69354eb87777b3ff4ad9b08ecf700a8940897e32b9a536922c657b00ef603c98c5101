let SizeLimitError = require('./size-limit-error')

module.exports = function parseArgs(plugins, argv) {
  let args = { files: [] }
  for (let i = 2; i < argv.length; i++) {
    let arg = argv[i]

    if (arg === '--limit') {
      args.limit = argv[++i]
    } else if (arg === '--debug') {
      args.debug = true
    } else if (arg === '--save-bundle') {
      if (!plugins.has('webpack')) {
        throw new SizeLimitError('argWithoutWebpack', 'save-bundle')
      }
      let nextArg = argv[++i]
      if (!nextArg || nextArg.startsWith('--')) {
        throw new SizeLimitError('argWithoutParameter', 'save-bundle', 'DIR')
      }
      args.saveBundle = nextArg
    } else if (arg === '--clean-dir') {
      if (!argv.includes('--save-bundle')) {
        throw new SizeLimitError(
          'argWithoutAnotherArg',
          'clean-dir',
          'save-bundle'
        )
      }
      args.cleanDir = true
    } else if (arg === '--hide-passed') {
      args.hidePassed = true
    } else if (arg === '--why') {
      if (!plugins.has('webpack')) {
        throw new SizeLimitError('argWithoutWebpack', 'why')
      }
      args.why = true
    } else if (arg === '--watch') {
      args.watch = true
    } else if (arg === '--highlight-less') {
      args.highlightLess = true
    } else if (arg[0] !== '-') {
      args.files.push(arg)
    } else if (arg === '--silent') {
      args.isSilentMode = arg
    } else if (arg !== '--json') {
      throw new SizeLimitError('unknownArg', arg)
    }
  }
  return args
}
