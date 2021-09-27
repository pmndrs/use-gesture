'use strict'

var VMessage = require('vfile-message')

module.exports = eventsToAcorn

// Parse a list of micromark events with acorn.
function eventsToAcorn(acorn, acornOptions, events, config) {
  var before = config.prefix || ''
  var after = config.suffix || ''
  var comments = []
  var acornConfig = Object.assign({}, acornOptions, {onComment: comments})
  var value
  var swallow = false
  var estree
  var exception
  var index = -1
  var chunks = []
  var lines = {}
  var mdStartOffset
  var source
  var token
  var point
  var isEmptyExpression

  /* istanbul ignore else - not passed by `micromark-extension-mdxjs-esm`. */
  if (config.start) {
    mdStartOffset = config.start.offset
    lines[config.start.line] = config.start
  }

  // Assume only void events (and `enter` followed immediately by an `exit`).
  while (++index < events.length) {
    token = events[index][1]

    if (events[index][0] === 'exit') {
      chunks.push(events[index][2].sliceSerialize(token))

      /* istanbul ignore if - `micromark-extension-mdxjs-esm` doesn’t pass
       * `start` */
      if (mdStartOffset === undefined) {
        mdStartOffset = events[index][1].start.offset
      }

      if (
        !(token.start.line in lines) ||
        lines[token.start.line].offset > token.start.offset
      ) {
        lines[token.start.line] = token.start
      }
    }
  }

  source = chunks.join('')
  value = before + source + after

  isEmptyExpression = config.expression && empty(source)

  if (isEmptyExpression && !config.allowEmpty) {
    throw new VMessage(
      'Unexpected empty expression',
      parseOffsetToUnistPoint(0),
      'micromark-extension-mdx-expression:unexpected-empty-expression'
    )
  }

  try {
    estree =
      config.expression && !isEmptyExpression
        ? acorn.parseExpressionAt(value, 0, acornConfig)
        : acorn.parse(value, acornConfig)
  } catch (error) {
    point = parseOffsetToUnistPoint(error.pos)
    error.message = String(error.message).replace(/ \(\d+:\d+\)$/, '')
    error.pos = point.offset
    error.loc = {line: point.line, column: point.column - 1}
    exception = error
    swallow =
      error.raisedAt >= before.length + source.length ||
      // Broken comments are raised at their start, not their end.
      error.message === 'Unterminated comment'
  }

  if (estree && config.expression && !isEmptyExpression) {
    if (empty(value.slice(estree.end, value.length - after.length))) {
      estree = {
        type: 'Program',
        start: 0,
        end: before.length + source.length,
        body: [
          {
            type: 'ExpressionStatement',
            expression: estree,
            start: 0,
            end: before.length + source.length
          }
        ],
        sourceType: 'module'
      }
    } else {
      point = parseOffsetToUnistPoint(estree.end)
      exception = new Error('Unexpected content after expression')
      exception.pos = point.offset
      exception.loc = {line: point.line, column: point.column - 1}
      estree = undefined
    }
  }

  if (estree) {
    estree.comments = comments
    visit(estree)
  }

  return {estree: estree, error: exception, swallow: swallow}

  function visit(esnode) {
    var point
    var key
    var index

    // Not a node.
    if (
      !(
        esnode &&
        typeof esnode === 'object' &&
        'type' in esnode &&
        'end' in esnode
      )
    ) {
      return
    }

    /* istanbul ignore else - acorn seems to always nicely add position info,
     * but make sure we don’t crash if some weird extension doesn’t. */
    if ('start' in esnode && 'end' in esnode) {
      point = parseOffsetToUnistPoint(esnode.start)
      esnode.start = point.offset
      esnode.loc = {start: {line: point.line, column: point.column - 1}}
      point = parseOffsetToUnistPoint(esnode.end)
      esnode.end = point.offset
      esnode.loc.end = {line: point.line, column: point.column - 1}
      esnode.range = [esnode.start, esnode.end]
    } else {
      esnode.start = undefined
      esnode.end = undefined
      esnode.loc = undefined
      esnode.range = undefined
    }

    for (key in esnode) {
      if (esnode[key] && typeof esnode[key] === 'object') {
        if ('length' in esnode[key]) {
          index = -1

          while (++index < esnode[key].length) {
            visit(esnode[key][index])
          }
        } else {
          visit(esnode[key])
        }
      }
    }
  }

  function parseOffsetToUnistPoint(offset) {
    // First, get the offset in `source` (the string of “markdown”)
    var srcOffset = offset - before.length
    var line
    var lineStart

    if (srcOffset < 0) srcOffset = 0
    else if (srcOffset > source.length) srcOffset = source.length

    srcOffset += mdStartOffset

    // Then, update it
    for (line in lines) {
      // First line we find.
      if (!lineStart) lineStart = lines[line]

      if (lines[line].offset > offset) break

      lineStart = lines[line]
    }

    return {
      line: lineStart.line,
      column: lineStart.column + (srcOffset - lineStart.offset),
      offset: srcOffset
    }
  }
}

function empty(value) {
  return /^\s*$/.test(
    value
      // Multiline comments.
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Line comments.
      // EOF instead of EOL is specifically not allowed, because that would
      // mean the closing brace is on the commented-out line
      .replace(/\/\/[^\r\n]*(\r\n|\n|\r)/g, '')
  )
}
