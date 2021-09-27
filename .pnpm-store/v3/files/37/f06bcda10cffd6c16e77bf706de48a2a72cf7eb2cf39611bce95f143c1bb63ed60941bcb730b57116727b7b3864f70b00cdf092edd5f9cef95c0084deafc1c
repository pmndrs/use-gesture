exports.enter = {
  mdxFlowExpression: enterMdxFlowExpression,
  mdxTextExpression: enterMdxTextExpression
}
exports.exit = {
  mdxFlowExpression: exitMdxExpression,
  mdxFlowExpressionChunk: exitMdxExpressionData,
  mdxTextExpression: exitMdxExpression,
  mdxTextExpressionChunk: exitMdxExpressionData
}

var stripIndent = require('strip-indent')

function enterMdxFlowExpression(token) {
  this.enter({type: 'mdxFlowExpression', value: ''}, token)
  this.buffer()
}

function enterMdxTextExpression(token) {
  this.enter({type: 'mdxTextExpression', value: ''}, token)
  this.buffer()
}

function exitMdxExpression(token) {
  var value = this.resume()
  var node = this.exit(token)

  node.value = token.type === 'mdxFlowExpression' ? dedent(value) : value

  if (token.estree) {
    node.data = {estree: token.estree}
  }
}

function exitMdxExpressionData(token) {
  this.config.enter.data.call(this, token)
  this.config.exit.data.call(this, token)
}

function dedent(value) {
  var firstLineEnding = /\r?\n|\r/.exec(value)
  var position = firstLineEnding
    ? firstLineEnding.index + firstLineEnding[0].length
    : -1

  if (position > -1) {
    return value.slice(0, position) + stripIndent(value.slice(position))
  }

  return value
}
