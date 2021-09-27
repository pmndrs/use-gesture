var combine = require('micromark/dist/util/combine-extensions')
var expression = require('micromark-extension-mdx-expression')
var jsx = require('micromark-extension-mdx-jsx')
var md = require('micromark-extension-mdx-md')

module.exports = create

function create() {
  return combine([expression(), jsx(), md])
}
