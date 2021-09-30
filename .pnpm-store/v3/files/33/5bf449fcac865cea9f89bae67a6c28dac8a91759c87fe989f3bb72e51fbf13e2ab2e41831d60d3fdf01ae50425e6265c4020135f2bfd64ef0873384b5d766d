exports.handlers = {
  mdxJsxFlowElement: mdxElement,
  mdxJsxTextElement: mdxElement
}

exports.unsafe = [
  {character: '<', inConstruct: ['phrasing']},
  {atBreak: true, character: '<'}
]

exports.fences = true
exports.resourceLink = true

mdxElement.peek = peekElement

var encode = require('stringify-entities/light')
var flow = require('mdast-util-to-markdown/lib/util/container-flow')
var phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing')
var checkQuote = require('mdast-util-to-markdown/lib/util/check-quote')

var eol = /\r?\n|\r/g

// eslint-disable-next-line complexity
function mdxElement(node, _, context) {
  var selfClosing = node.name && (!node.children || !node.children.length)
  var quote = checkQuote(context)
  var exit = context.enter(node.type)
  var index = -1
  var attributes = []
  var attribute
  var result
  var value

  // None.
  if (node.attributes && node.attributes.length) {
    if (!node.name) {
      throw new Error('Cannot serialize fragment w/ attributes')
    }

    while (++index < node.attributes.length) {
      attribute = node.attributes[index]

      if (attribute.type === 'mdxJsxExpressionAttribute') {
        result = '{' + (attribute.value || '') + '}'
      } else {
        if (!attribute.name) {
          throw new Error('Cannot serialize attribute w/o name')
        }

        result =
          attribute.name +
          (attribute.value == null
            ? ''
            : '=' +
              (typeof attribute.value === 'object'
                ? '{' + (attribute.value.value || '') + '}'
                : quote + encode(attribute.value, {subset: [quote]}) + quote))
      }

      attributes.push(result)
    }
  }

  value =
    '<' +
    (node.name || '') +
    (node.type === 'mdxJsxFlowElement' && attributes.length > 1
      ? // Flow w/ multiple attributes.
        '\n' + indent(attributes.join('\n')) + '\n'
      : attributes.length // Text or flow w/ a single attribute.
      ? ' ' + dedentStart(indent(attributes.join(' ')))
      : '') +
    (selfClosing ? '/' : '') +
    '>' +
    (node.children && node.children.length
      ? node.type === 'mdxJsxFlowElement'
        ? '\n' + indent(flow(node, context)) + '\n'
        : phrasing(node, context, {before: '<', after: '>'})
      : '') +
    (selfClosing ? '' : '</' + (node.name || '') + '>')

  exit()
  return value
}

function peekElement() {
  return '<'
}

function dedentStart(value) {
  return value.replace(/^ +/, '')
}

function indent(value) {
  var result = []
  var start = 0
  var match

  while ((match = eol.exec(value))) {
    one(value.slice(start, match.index))
    result.push(match[0])
    start = match.index + match[0].length
  }

  one(value.slice(start))

  return result.join('')

  function one(slice) {
    result.push((slice ? '  ' : '') + slice)
  }
}
