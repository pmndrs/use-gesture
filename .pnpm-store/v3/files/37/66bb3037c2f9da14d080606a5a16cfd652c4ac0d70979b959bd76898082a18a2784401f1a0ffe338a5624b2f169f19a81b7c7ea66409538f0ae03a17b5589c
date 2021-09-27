'use strict'

module.exports = mdxJsx

var createJsxText = require('./jsx-text')
var createJsxFlow = require('./jsx-flow')

function mdxJsx(options) {
  var settings = options || {}
  var acorn = settings.acorn
  var addResult = settings.addResult
  var acornOptions

  if (acorn) {
    if (!acorn.parseExpressionAt) {
      throw new Error(
        'Expected a proper `acorn` instance passed in as `options.acorn`'
      )
    }

    acornOptions = Object.assign(
      {ecmaVersion: 2020, sourceType: 'module'},
      options.acornOptions || {},
      {locations: true}
    )
  } else if (settings.acornOptions || addResult) {
    throw new Error('Expected an `acorn` instance passed in as `options.acorn`')
  }

  return {
    flow: {60: createJsxFlow(acorn, acornOptions, addResult)},
    text: {60: createJsxText(acorn, acornOptions, addResult)}
  }
}
