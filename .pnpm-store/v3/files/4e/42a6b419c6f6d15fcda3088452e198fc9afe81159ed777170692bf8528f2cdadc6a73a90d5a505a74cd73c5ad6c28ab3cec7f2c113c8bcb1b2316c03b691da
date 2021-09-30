var expression = require('mdast-util-mdx-expression/to-markdown')
var jsx = require('mdast-util-mdx-jsx/to-markdown')
var esm = require('mdast-util-mdxjs-esm/to-markdown')
var configure = require('mdast-util-to-markdown/lib/configure')

var base = configure(
  {handlers: {}, join: [], unsafe: [], options: {}},
  {extensions: [expression, jsx, esm]}
)

module.exports = Object.assign(base.options, {
  handlers: base.handlers,
  join: base.join,
  unsafe: base.unsafe
})
