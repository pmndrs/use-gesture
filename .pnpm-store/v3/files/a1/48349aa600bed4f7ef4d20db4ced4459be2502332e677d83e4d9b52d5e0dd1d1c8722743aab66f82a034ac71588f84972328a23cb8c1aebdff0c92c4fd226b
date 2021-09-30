'use strict'

module.exports = factoryExpression

var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var factoryWhitespace = require('micromark/dist/tokenize/factory-whitespace')
var VMessage = require('vfile-message')
var eventsToAcorn = require('./util-events-to-acorn')

function factoryExpression(
  effects,
  ok,
  nok,
  acorn,
  acornOptions,
  addResult,
  expressionType,
  expressionMarkerType,
  expressionChunkType,
  spread,
  forbidEmpty
) {
  var self = this
  var eventStart = this.events.length + 3 // Add main and marker token
  var balance = 1
  var startPosition
  var lastCrash

  return start

  function start(code) {
    // Always a `{`
    effects.enter(expressionType)
    effects.enter(expressionMarkerType)
    effects.consume(code)
    effects.exit(expressionMarkerType)
    startPosition = self.now()
    return atBreak
  }

  function atBreak(code) {
    if (code === null) {
      throw (
        lastCrash ||
        new VMessage(
          'Unexpected end of file in expression, expected a corresponding closing brace for `{`',
          self.now(),
          'micromark-extension-mdx-expression:unexpected-eof'
        )
      )
    }

    if (code === 125) {
      return atClosingBrace(code)
    }

    if (markdownLineEnding(code)) {
      return factoryWhitespace(effects, atBreak)(code)
    }

    effects.enter(expressionChunkType)
    return inside(code)
  }

  function inside(code) {
    if (code === null || code === 125 || markdownLineEnding(code)) {
      effects.exit(expressionChunkType)
      return atBreak(code)
    }

    if (code === 123 && !acorn) {
      effects.consume(code)
      balance++
      return inside
    }

    effects.consume(code)
    return inside
  }

  function atClosingBrace(code) {
    var result
    var token
    var estree

    balance--

    // Agnostic mode: count balanced braces.
    if (!acorn) {
      if (balance) {
        effects.enter(expressionChunkType)
        effects.consume(code)
        return inside
      }

      effects.enter(expressionMarkerType)
      effects.consume(code)
      effects.exit(expressionMarkerType)
      effects.exit(expressionType)
      return ok
    }

    // Gnostic mode: parse w/ acorn.
    result = eventsToAcorn(acorn, acornOptions, self.events.slice(eventStart), {
      start: startPosition,
      expression: true,
      // To do next major: remove double meaning of `spread` and only accept
      // `forbidEmpty` here.
      allowEmpty: !spread && !forbidEmpty,
      prefix: spread ? '({' : '',
      suffix: spread ? '})' : ''
    })
    estree = result.estree

    // Get the spread value.
    if (
      spread &&
      estree &&
      // The next checks should always be the case, as we wrap in `d={}`
      estree.type === 'Program' &&
      estree.body[0] &&
      estree.body[0].type === 'ExpressionStatement' &&
      estree.body[0].expression.type === 'ObjectExpression'
    ) {
      if (estree.body[0].expression.properties[1]) {
        throw new VMessage(
          'Unexpected extra content in spread: only a single spread is supported',
          {
            line: estree.body[0].expression.properties[1].loc.start.line,
            column:
              estree.body[0].expression.properties[1].loc.start.column + 1,
            offset: estree.body[0].expression.properties[1].start
          },
          'micromark-extension-mdx-expression:spread-extra'
        )
      } else if (
        estree.body[0].expression.properties[0].type !== 'SpreadElement'
      ) {
        throw new VMessage(
          'Unexpected `' +
            estree.body[0].expression.properties[0].type +
            '` in code: only spread elements are supported',
          {
            line: estree.body[0].expression.properties[0].loc.start.line,
            column:
              estree.body[0].expression.properties[0].loc.start.column + 1,
            offset: estree.body[0].expression.properties[0].start
          },
          'micromark-extension-mdx-expression:non-spread'
        )
      }
    }

    if (result.error) {
      lastCrash = new VMessage(
        'Could not parse expression with acorn: ' + result.error.message,
        {
          line: result.error.loc.line,
          column: result.error.loc.column + 1,
          offset: result.error.pos
        },
        'micromark-extension-mdx-expression:acorn'
      )

      if (code !== null && result.swallow) {
        effects.enter(expressionChunkType)
        effects.consume(code)
        return inside
      }

      throw lastCrash
    }

    effects.enter(expressionMarkerType)
    effects.consume(code)
    effects.exit(expressionMarkerType)
    token = effects.exit(expressionType)
    if (addResult) token.estree = estree
    return ok
  }
}
