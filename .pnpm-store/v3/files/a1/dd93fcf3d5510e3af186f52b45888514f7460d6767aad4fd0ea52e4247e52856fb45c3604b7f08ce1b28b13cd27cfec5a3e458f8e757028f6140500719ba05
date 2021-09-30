'use strict'

exports.start = start
exports.cont = cont
exports.name = name

var id = require('./regex')

/**
 * Checks if the given character code can start an identifier.
 *
 * @param {number} code
 */
// To do: support astrals.
function start(code) {
  return id.start.test(String.fromCharCode(code))
}

/**
 * Checks if the given character code can continue an identifier.
 *
 * @param {number} code
 */
// To do: support astrals.
function cont(code) {
  var character = String.fromCharCode(code)
  return id.start.test(character) || id.cont.test(character)
}

/**
 * Checks if the given string is a valid identifier name.
 *
 * @param {string} name
 */
function name(name) {
  var index = -1

  while (++index < name.length) {
    if (!(index ? cont : start)(name.charCodeAt(index))) return false
  }

  // `false` if `name` is empty.
  return index > 0
}
