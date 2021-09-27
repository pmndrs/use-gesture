const process = require('process')

function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(
    stream &&
      stream.isTTY &&
      process.env.TERM !== 'dumb' &&
      !('CI' in process.env)
  )
}
module.exports = function () { return isInteractive(); };
