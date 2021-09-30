'use strict'

module.exports = createJsxFlow

var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var factorySpace = require('micromark/dist/tokenize/factory-space')
var factoryTag = require('./factory-tag')

function createJsxFlow(acorn, acornOptions, addResult) {
  return {tokenize: tokenizeJsxFlow, concrete: true}

  function tokenizeJsxFlow(effects, ok, nok) {
    var self = this

    return start

    function start(code) {
      return factoryTag.call(
        self,
        effects,
        factorySpace(effects, after, 'whitespace'),
        nok,
        acorn,
        acornOptions,
        addResult,
        'mdxJsxFlowTag',
        'mdxJsxFlowTagMarker',
        'mdxJsxFlowTagClosingMarker',
        'mdxJsxFlowTagSelfClosingMarker',
        'mdxJsxFlowTagName',
        'mdxJsxFlowTagNamePrimary',
        'mdxJsxFlowTagNameMemberMarker',
        'mdxJsxFlowTagNameMember',
        'mdxJsxFlowTagNamePrefixMarker',
        'mdxJsxFlowTagNameLocal',
        'mdxJsxFlowTagExpressionAttribute',
        'mdxJsxFlowTagExpressionAttributeMarker',
        'mdxJsxFlowTagExpressionAttributeValue',
        'mdxJsxFlowTagAttribute',
        'mdxJsxFlowTagAttributeName',
        'mdxJsxFlowTagAttributeNamePrimary',
        'mdxJsxFlowTagAttributeNamePrefixMarker',
        'mdxJsxFlowTagAttributeNameLocal',
        'mdxJsxFlowTagAttributeInitializerMarker',
        'mdxJsxFlowTagAttributeValueLiteral',
        'mdxJsxFlowTagAttributeValueLiteralMarker',
        'mdxJsxFlowTagAttributeValueLiteralValue',
        'mdxJsxFlowTagAttributeValueExpression',
        'mdxJsxFlowTagAttributeValueExpressionMarker',
        'mdxJsxFlowTagAttributeValueExpressionValue'
      )(code)
    }

    function after(code) {
      // Another tag.
      if (code === 60 /* `<` */) {
        return start(code)
      }

      return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
    }
  }
}
