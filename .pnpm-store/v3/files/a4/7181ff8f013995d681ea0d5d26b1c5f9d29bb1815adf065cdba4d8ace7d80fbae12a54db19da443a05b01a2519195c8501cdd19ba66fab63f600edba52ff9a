module.exports = {
  results(process, args, config) {
    if (args && args.debug) {
      process.stdout.write(JSON.stringify(config, null, 2) + '\n')
    }
  },

  error(process, args, config) {
    if (args && args.debug) {
      process.stderr.write(JSON.stringify(config, null, 2) + '\n')
    }
  }
}
