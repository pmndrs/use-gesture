var expression = require('mdast-util-mdx-expression/from-markdown')
var jsx = require('mdast-util-mdx-jsx/from-markdown')
var esm = require('mdast-util-mdxjs-esm/from-markdown')

var own = {}.hasOwnProperty

module.exports = configure([expression, jsx, esm])

function configure(extensions) {
  var config = {canContainEols: []}
  var index = -1

  while (++index < extensions.length) {
    extension(config, extensions[index])
  }

  return config
}

function extension(config, extension) {
  var key
  var left
  var right

  for (key in extension) {
    left = own.call(config, key) ? config[key] : (config[key] = {})
    right = extension[key]

    if (key === 'canContainEols') {
      config[key] = [].concat(left, right)
    } else {
      Object.assign(left, right)
    }
  }
}
