exports.handlers = {
  mdxFlowExpression: handleMdxExpression,
  mdxTextExpression: handleMdxExpression
}

exports.unsafe = [
  {character: '{', inConstruct: ['phrasing']},
  {atBreak: true, character: '{'}
]

var eol = /\r?\n|\r/g

function handleMdxExpression(node) {
  var value = node.value || ''
  return '{' + (node.type === 'mdxFlowExpression' ? indent(value) : value) + '}'
}

function indent(value) {
  var result = []
  var start = 0
  var line = 0
  var match

  while ((match = eol.exec(value))) {
    one(value.slice(start, match.index))
    result.push(match[0])
    start = match.index + match[0].length
    line++
  }

  one(value.slice(start))

  return result.join('')

  function one(slice) {
    result.push((line && slice ? '  ' : '') + slice)
  }
}
