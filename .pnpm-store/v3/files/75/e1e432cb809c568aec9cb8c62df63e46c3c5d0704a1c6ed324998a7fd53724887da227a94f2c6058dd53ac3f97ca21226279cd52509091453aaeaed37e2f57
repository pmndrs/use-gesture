var acorn = require('acorn')
var acornJsx = require('acorn-jsx')
var combine = require('micromark/dist/util/combine-extensions')
var expression = require('micromark-extension-mdx-expression')
var jsx = require('micromark-extension-mdx-jsx')
var md = require('micromark-extension-mdx-md')
var esm = require('micromark-extension-mdxjs-esm')

module.exports = create

function create(options) {
  var settings = Object.assign(
    {
      acorn: acorn.Parser.extend(acornJsx()),
      acornOptions: {ecmaVersion: 2020, sourceType: 'module'},
      addResult: true
    },
    options
  )
  return combine([esm(settings), expression(settings), jsx(settings), md])
}
