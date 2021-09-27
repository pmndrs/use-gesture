const isUnicodeSupported = require('./isUnicodeSupported')

const main = {
  info: 'ℹ',
  success: '✔',
  warning: '⚠',
  error: '✖'
}

const fallback = {
  info: 'i',
  success: '√',
  warning: '‼',
  error: '×'
}

const logSymbols = isUnicodeSupported() ? main : fallback

module.exports = logSymbols
