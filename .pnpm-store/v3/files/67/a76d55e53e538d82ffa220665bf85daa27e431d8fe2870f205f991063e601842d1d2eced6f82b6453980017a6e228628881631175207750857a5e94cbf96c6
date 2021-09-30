'use strict'

module.exports = mdxjs

var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var unicodeWhitespace = require('micromark/dist/character/unicode-whitespace')
var blank = require('micromark/dist/tokenize/partial-blank-line')
var eventsToAcorn = require('micromark-extension-mdx-expression/lib/util-events-to-acorn')
var VMessage = require('vfile-message')

var nextBlankConstruct = {tokenize: tokenizeNextBlank, partial: true}

var allowedAcornTypes = [
  'ExportAllDeclaration',
  'ExportDefaultDeclaration',
  'ExportNamedDeclaration',
  'ImportDeclaration'
]

function mdxjs(options) {
  var exportImportConstruct = {tokenize: tokenizeExportImport, concrete: true}
  var acornOptions
  var acorn

  if (!options || !options.acorn || !options.acorn.parse) {
    throw new Error('Expected an `acorn` instance passed in as `options.acorn`')
  }

  acorn = options.acorn
  acornOptions = Object.assign(
    {ecmaVersion: 2020, sourceType: 'module'},
    options.acornOptions || {}
  )

  // Lowercase E (`e`) and lowercase I (`i`).
  return {flow: {101: exportImportConstruct, 105: exportImportConstruct}}

  function tokenizeExportImport(effects, ok, nok) {
    var self = this
    var definedModuleSpecifiers =
      self.parser.definedModuleSpecifiers ||
      (self.parser.definedModuleSpecifiers = [])
    var eventStart = this.events.length + 1 // Add the main `mdxjsEsm` token
    var index = 0
    var buffer

    return self.interrupt ? nok : start

    function start(code) {
      /* istanbul ignore else - handled by mm */
      if (code === 101 /* `e` */) {
        buffer = 'export'
      } else if (code === 105 /* `i` */) {
        buffer = 'import'
      } else {
        throw new Error('Expected `e` or `i`')
      }

      // Do not support indent (the easiest check for containers).
      if (self.now().column !== 1) return nok(code)

      effects.enter('mdxjsEsm')
      effects.enter('mdxjsEsmData')
      return keyword(code)
    }

    function keyword(code) {
      if (code === buffer.charCodeAt(index++)) {
        effects.consume(code)
        return index === buffer.length ? after : keyword
      }

      return nok(code)
    }

    function after(code) {
      if (unicodeWhitespace(code)) {
        effects.consume(code)
        return rest
      }

      return nok(code)
    }

    function rest(code) {
      if (code === null) {
        return atEnd(code)
      }

      if (markdownLineEnding(code)) {
        return effects.check(nextBlankConstruct, atEnd, atEol)(code)
      }

      effects.consume(code)
      return rest
    }

    function atEol(code) {
      effects.exit('mdxjsEsmData')
      return lineStart(code)
    }

    function lineStart(code) {
      if (markdownLineEnding(code)) {
        effects.enter('lineEnding')
        effects.consume(code)
        effects.exit('lineEnding')
        return lineStart
      }

      effects.enter('mdxjsEsmData')
      return rest(code)
    }

    function atEnd(code) {
      var result
      var index
      var offset
      var token

      effects.exit('mdxjsEsmData')

      result = eventsToAcorn(
        acorn,
        acornOptions,
        self.events.slice(eventStart),
        {
          prefix: definedModuleSpecifiers.length
            ? 'var ' + definedModuleSpecifiers.join(',') + '\n'
            : ''
        }
      )

      if (code !== null && result.swallow) {
        return lineStart(code)
      }

      if (result.error) {
        throw new VMessage(
          'Could not parse import/exports with acorn: ' + String(result.error),
          {
            line: result.error.loc.line,
            column: result.error.loc.column + 1,
            offset: result.error.pos
          },
          'micromark-extension-mdxjs-esm:acorn'
        )
      }

      index = -1

      // Remove the `VariableDeclaration`
      if (definedModuleSpecifiers.length) {
        result.estree.body.shift()
      }

      while (++index < result.estree.body.length) {
        token = result.estree.body[index]

        if (allowedAcornTypes.indexOf(token.type) < 0) {
          throw new VMessage(
            'Unexpected `' +
              token.type +
              '` in code: only import/exports are supported',
            {
              start: {
                line: token.loc.start.line,
                column: token.loc.start.column + 1,
                offset: token.start
              },
              end: {
                line: token.loc.end.line,
                column: token.loc.end.column + 1,
                offset: token.end
              }
            },
            'micromark-extension-mdxjs-esm:non-esm'
          )
        }
        // Otherwise, when we’re not interrupting (hacky, because `interrupt` is
        // used to parse containers and “sniff” if this is ESM), collect all the
        // local values that are imported.
        else if (token.type === 'ImportDeclaration' && !self.interrupt) {
          offset = -1

          while (++offset < token.specifiers.length) {
            definedModuleSpecifiers.push(token.specifiers[offset].local.name)
          }
        }
      }

      token = effects.exit('mdxjsEsm')
      if (options.addResult) token.estree = result.estree
      return ok(code)
    }
  }
}

function tokenizeNextBlank(effects, ok, nok) {
  return start

  function start(code) {
    effects.exit('mdxjsEsmData')
    effects.enter('lineEndingBlank')
    effects.consume(code)
    effects.exit('lineEndingBlank')
    return effects.attempt(blank, ok, nok)
  }
}
