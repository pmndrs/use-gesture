'use strict'

module.exports = createJsxText

var factoryTag = require('./factory-tag')

function createJsxText(acorn, acornOptions, addResult) {
  return {tokenize: tokenizeJsxText}

  function tokenizeJsxText(effects, ok, nok) {
    return factoryTag.call(
      this,
      effects,
      ok,
      nok,
      acorn,
      acornOptions,
      addResult,
      'mdxJsxTextTag',
      'mdxJsxTextTagMarker',
      'mdxJsxTextTagClosingMarker',
      'mdxJsxTextTagSelfClosingMarker',
      'mdxJsxTextTagName',
      'mdxJsxTextTagNamePrimary',
      'mdxJsxTextTagNameMemberMarker',
      'mdxJsxTextTagNameMember',
      'mdxJsxTextTagNamePrefixMarker',
      'mdxJsxTextTagNameLocal',
      'mdxJsxTextTagExpressionAttribute',
      'mdxJsxTextTagExpressionAttributeMarker',
      'mdxJsxTextTagExpressionAttributeValue',
      'mdxJsxTextTagAttribute',
      'mdxJsxTextTagAttributeName',
      'mdxJsxTextTagAttributeNamePrimary',
      'mdxJsxTextTagAttributeNamePrefixMarker',
      'mdxJsxTextTagAttributeNameLocal',
      'mdxJsxTextTagAttributeInitializerMarker',
      'mdxJsxTextTagAttributeValueLiteral',
      'mdxJsxTextTagAttributeValueLiteralMarker',
      'mdxJsxTextTagAttributeValueLiteralValue',
      'mdxJsxTextTagAttributeValueExpression',
      'mdxJsxTextTagAttributeValueExpressionMarker',
      'mdxJsxTextTagAttributeValueExpressionValue'
    )
  }
}
