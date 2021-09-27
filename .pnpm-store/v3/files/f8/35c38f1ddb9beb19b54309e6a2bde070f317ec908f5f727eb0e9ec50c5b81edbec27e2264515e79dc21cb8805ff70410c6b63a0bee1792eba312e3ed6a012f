'use strict'

module.exports = factoryTag

var id = require('estree-util-is-identifier-name')
var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var markdownLineEndingOrSpace = require('micromark/dist/character/markdown-line-ending-or-space')
var markdownSpace = require('micromark/dist/character/markdown-space')
var esWhitespace = require('micromark/dist/character/unicode-whitespace')
var fromCharCode = require('micromark/dist/constant/from-char-code')
var factoryExpression = require('micromark-extension-mdx-expression/lib/factory-expression')
var VMessage = require('vfile-message')

function factoryTag(
  effects,
  ok,
  nok,
  acorn,
  acornOptions,
  addResult,
  tagType,
  tagMarkerType,
  tagClosingMarkerType,
  tagSelfClosingMarker,
  tagNameType,
  tagNamePrimaryType,
  tagNameMemberMarkerType,
  tagNameMemberType,
  tagNamePrefixMarkerType,
  tagNameLocalType,
  tagExpressionAttributeType,
  tagExpressionAttributeMarkerType,
  tagExpressionAttributeValueType,
  tagAttributeType,
  tagAttributeNameType,
  tagAttributeNamePrimaryType,
  tagAttributeNamePrefixMarkerType,
  tagAttributeNameLocalType,
  tagAttributeInitializerMarkerType,
  tagAttributeValueLiteralType,
  tagAttributeValueLiteralMarkerType,
  tagAttributeValueLiteralValueType,
  tagAttributeValueExpressionType,
  tagAttributeValueExpressionMarkerType,
  tagAttributeValueExpressionMarkerValue
) {
  var self = this
  var returnState
  var marker

  return start

  function start(code) {
    // Always `<`
    effects.enter(tagType)
    effects.enter(tagMarkerType)
    effects.consume(code)
    effects.exit(tagMarkerType)
    return afterStart
  }

  function afterStart(code) {
    // Deviate from JSX, which allows arbitrary whitespace.
    // See: <https://github.com/micromark/micromark-extension-mdx-jsx/issues/7>.
    if (markdownLineEnding(code) || markdownSpace(code)) {
      return nok(code)
    }

    // Any other ES whitespace does not get this treatment.
    returnState = beforeName
    return optionalEsWhitespace(code)
  }

  // Right after `<`, before an optional name.
  function beforeName(code) {
    // Closing tag.
    if (code === 47 /* `/` */) {
      effects.enter(tagClosingMarkerType)
      effects.consume(code)
      effects.exit(tagClosingMarkerType)
      returnState = beforeClosingTagName
      return optionalEsWhitespace
    }

    // Fragment opening tag.
    if (code === 62 /* `>` */) {
      return tagEnd(code)
    }

    // Start of a name.
    if (id.start(code)) {
      effects.enter(tagNameType)
      effects.enter(tagNamePrimaryType)
      effects.consume(code)
      return primaryName
    }

    crash(
      code,
      'before name',
      'a character that can start a name, such as a letter, `$`, or `_`' +
        (code === 33 /* `!` */
          ? ' (note: to create a comment in MDX, use `{/* text */}`)'
          : '')
    )
  }

  // At the start of a closing tag, right after `</`.
  function beforeClosingTagName(code) {
    // Fragment closing tag.
    if (code === 62 /* `>` */) {
      return tagEnd(code)
    }

    // Start of a closing tag name.
    if (id.start(code)) {
      effects.enter(tagNameType)
      effects.enter(tagNamePrimaryType)
      effects.consume(code)
      return primaryName
    }

    crash(
      code,
      'before name',
      'a character that can start a name, such as a letter, `$`, or `_`' +
        (code === 42 /* `*` */ || code === 47 /* `/` */
          ? ' (note: JS comments in JSX tags are not supported in MDX)'
          : '')
    )
  }

  // Inside the primary name.
  function primaryName(code) {
    // Continuation of name: remain.
    if (code === 45 /* `-` */ || id.cont(code)) {
      effects.consume(code)
      return primaryName
    }

    // End of name.
    if (
      code === 46 /* `.` */ ||
      code === 47 /* `/` */ ||
      code === 58 /* `:` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      markdownLineEndingOrSpace(code) ||
      esWhitespace(code)
    ) {
      effects.exit(tagNamePrimaryType)
      returnState = afterPrimaryName
      return optionalEsWhitespace(code)
    }

    crash(
      code,
      'in name',
      'a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag' +
        (code === 64 /* `@` */
          ? ' (note: to create a link in MDX, use `[text](url)`)'
          : '')
    )
  }

  // After a name.
  function afterPrimaryName(code) {
    // Start of a member name.
    if (code === 46 /* `.` */) {
      effects.enter(tagNameMemberMarkerType)
      effects.consume(code)
      effects.exit(tagNameMemberMarkerType)
      returnState = beforeMemberName
      return optionalEsWhitespace
    }

    // Start of a local name.
    if (code === 58 /* `:` */) {
      effects.enter(tagNamePrefixMarkerType)
      effects.consume(code)
      effects.exit(tagNamePrefixMarkerType)
      returnState = beforeLocalName
      return optionalEsWhitespace
    }

    // End of name.
    if (
      code === 47 /* `/` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      id.start(code)
    ) {
      effects.exit(tagNameType)
      return beforeAttribute(code)
    }

    crash(
      code,
      'after name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag'
    )
  }

  // We’ve seen a `.` and are expecting a member name.
  function beforeMemberName(code) {
    // Start of a member name.
    if (id.start(code)) {
      effects.enter(tagNameMemberType)
      effects.consume(code)
      return memberName
    }

    crash(
      code,
      'before member name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag'
    )
  }

  // Inside the member name.
  function memberName(code) {
    // Continuation of member name: stay in state
    if (code === 45 /* `-` */ || id.cont(code)) {
      effects.consume(code)
      return memberName
    }

    // End of member name (note that namespaces and members can’t be combined).
    if (
      code === 46 /* `.` */ ||
      code === 47 /* `/` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      markdownLineEndingOrSpace(code) ||
      esWhitespace(code)
    ) {
      effects.exit(tagNameMemberType)
      returnState = afterMemberName
      return optionalEsWhitespace(code)
    }

    crash(
      code,
      'in member name',
      'a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag' +
        (code === 64 /* `@` */
          ? ' (note: to create a link in MDX, use `[text](url)`)'
          : '')
    )
  }

  // After a member name: this is the same as `afterPrimaryName` but we don’t
  // expect colons.
  function afterMemberName(code) {
    // Start another member name.
    if (code === 46 /* `.` */) {
      effects.enter(tagNameMemberMarkerType)
      effects.consume(code)
      effects.exit(tagNameMemberMarkerType)
      returnState = beforeMemberName
      return optionalEsWhitespace
    }

    // End of name.
    if (
      code === 47 /* `/` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      id.start(code)
    ) {
      effects.exit(tagNameType)
      return beforeAttribute(code)
    }

    crash(
      code,
      'after member name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag'
    )
  }

  // We’ve seen a `:`, and are expecting a local name.
  function beforeLocalName(code) {
    // Start of a local name.
    if (id.start(code)) {
      effects.enter(tagNameLocalType)
      effects.consume(code)
      return localName
    }

    crash(
      code,
      'before local name',
      'a character that can start a name, such as a letter, `$`, or `_`' +
        (code === 43 /* `+` */ || (code > 46 && code < 58) /* `/` - `9` */
          ? ' (note: to create a link in MDX, use `[text](url)`)'
          : '')
    )
  }

  // Inside the local name.
  function localName(code) {
    // Continuation of local name: stay in state
    if (code === 45 /* `-` */ || id.cont(code)) {
      effects.consume(code)
      return localName
    }

    // End of local name (note that we don’t expect another colon, or a member).
    if (
      code === 47 /* `/` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      markdownLineEndingOrSpace(code) ||
      esWhitespace(code)
    ) {
      effects.exit(tagNameLocalType)
      returnState = afterLocalName
      return optionalEsWhitespace(code)
    }

    crash(
      code,
      'in local name',
      'a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag'
    )
  }

  // After a local name: this is the same as `afterPrimaryName` but we don’t
  // expect colons or periods.
  function afterLocalName(code) {
    // End of name.
    if (
      code === 47 /* `/` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      id.start(code)
    ) {
      effects.exit(tagNameType)
      return beforeAttribute(code)
    }

    crash(
      code,
      'after local name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag'
    )
  }

  function beforeAttribute(code) {
    // Mark as self-closing.
    if (code === 47 /* `/` */) {
      effects.enter(tagSelfClosingMarker)
      effects.consume(code)
      effects.exit(tagSelfClosingMarker)
      returnState = selfClosing
      return optionalEsWhitespace
    }

    // End of tag.
    if (code === 62 /* `>` */) {
      return tagEnd(code)
    }

    // Attribute expression.
    if (code === 123 /* `{` */) {
      return factoryExpression.call(
        self,
        effects,
        afterAttributeExpression,
        nok,
        acorn,
        acornOptions,
        addResult,
        tagExpressionAttributeType,
        tagExpressionAttributeMarkerType,
        tagExpressionAttributeValueType,
        true
      )(code)
    }

    // Start of an attribute name.
    if (id.start(code)) {
      effects.enter(tagAttributeType)
      effects.enter(tagAttributeNameType)
      effects.enter(tagAttributeNamePrimaryType)
      effects.consume(code)
      return attributePrimaryName
    }

    crash(
      code,
      'before attribute name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag'
    )
  }

  // At the start of an attribute expression.
  function afterAttributeExpression(code) {
    returnState = beforeAttribute
    return optionalEsWhitespace(code)
  }

  // In the attribute name.
  function attributePrimaryName(code) {
    // Continuation of the attribute name.
    if (code === 45 /* `-` */ || id.cont(code)) {
      effects.consume(code)
      return attributePrimaryName
    }

    // End of attribute name or tag.
    if (
      code === 47 /* `/` */ ||
      code === 58 /* `:` */ ||
      code === 61 /* `=` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      markdownLineEndingOrSpace(code) ||
      esWhitespace(code)
    ) {
      effects.exit(tagAttributeNamePrimaryType)
      returnState = afterAttributePrimaryName
      return optionalEsWhitespace(code)
    }

    crash(
      code,
      'in attribute name',
      'an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag'
    )
  }

  // After an attribute name, probably finding an equals.
  function afterAttributePrimaryName(code) {
    // Start of a local name.
    if (code === 58 /* `:` */) {
      effects.enter(tagAttributeNamePrefixMarkerType)
      effects.consume(code)
      effects.exit(tagAttributeNamePrefixMarkerType)
      returnState = beforeAttributeLocalName
      return optionalEsWhitespace
    }

    // Start of an attribute value.
    if (code === 61 /* `=` */) {
      effects.exit(tagAttributeNameType)
      effects.enter(tagAttributeInitializerMarkerType)
      effects.consume(code)
      effects.exit(tagAttributeInitializerMarkerType)
      returnState = beforeAttributeValue
      return optionalEsWhitespace
    }

    // End of tag / new attribute.
    if (
      code === 47 /* `/` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      markdownLineEndingOrSpace(code) ||
      esWhitespace(code) ||
      id.start(code)
    ) {
      effects.exit(tagAttributeNameType)
      effects.exit(tagAttributeType)
      returnState = beforeAttribute
      return optionalEsWhitespace(code)
    }

    crash(
      code,
      'after attribute name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag'
    )
  }

  // We’ve seen a `:`, and are expecting a local name.
  function beforeAttributeLocalName(code) {
    // Start of a local name.
    if (id.start(code)) {
      effects.enter(tagAttributeNameLocalType)
      effects.consume(code)
      return attributeLocalName
    }

    crash(
      code,
      'before local attribute name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag'
    )
  }

  // In the local attribute name.
  function attributeLocalName(code) {
    // Continuation of the local attribute name.
    if (code === 45 /* `-` */ || id.cont(code)) {
      effects.consume(code)
      return attributeLocalName
    }

    // End of tag / attribute name.
    if (
      code === 47 /* `/` */ ||
      code === 61 /* `=` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      markdownLineEndingOrSpace(code) ||
      esWhitespace(code)
    ) {
      effects.exit(tagAttributeNameLocalType)
      effects.exit(tagAttributeNameType)
      returnState = afterAttributeLocalName
      return optionalEsWhitespace(code)
    }

    crash(
      code,
      'in local attribute name',
      'an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag'
    )
  }

  // After a local attribute name, expecting an equals.
  function afterAttributeLocalName(code) {
    // Start of an attribute value.
    if (code === 61 /* `=` */) {
      effects.enter(tagAttributeInitializerMarkerType)
      effects.consume(code)
      effects.exit(tagAttributeInitializerMarkerType)
      returnState = beforeAttributeValue
      return optionalEsWhitespace
    }

    // End of tag / new attribute.
    if (
      code === 47 /* `/` */ ||
      code === 62 /* `>` */ ||
      code === 123 /* `{` */ ||
      id.start(code)
    ) {
      effects.exit(tagAttributeType)
      return beforeAttribute(code)
    }

    crash(
      code,
      'after local attribute name',
      'a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag'
    )
  }

  // After an attribute value initializer, expecting quotes and such.
  function beforeAttributeValue(code) {
    // Start of double- or single quoted value.
    if (code === 34 /* `"` */ || code === 39 /* `'` */) {
      effects.enter(tagAttributeValueLiteralType)
      effects.enter(tagAttributeValueLiteralMarkerType)
      effects.consume(code)
      effects.exit(tagAttributeValueLiteralMarkerType)
      marker = code
      return attributeValueQuotedStart
    }

    // Start of an assignment expression.
    if (code === 123 /* `{` */) {
      return factoryExpression.call(
        self,
        effects,
        afterAttributeValueExpression,
        nok,
        acorn,
        acornOptions,
        addResult,
        tagAttributeValueExpressionType,
        tagAttributeValueExpressionMarkerType,
        tagAttributeValueExpressionMarkerValue,
        false,
        true
      )(code)
    }

    crash(
      code,
      'before attribute value',
      'a character that can start an attribute value, such as `"`, `\'`, or `{`' +
        (code === 60 /* `<` */
          ? ' (note: to use an element or fragment as a prop value in MDX, use `{<element />}`)'
          : '')
    )
  }

  function afterAttributeValueExpression(code) {
    effects.exit(tagAttributeType)
    returnState = beforeAttribute
    return optionalEsWhitespace(code)
  }

  // At the start of a quoted attribute value.
  function attributeValueQuotedStart(code) {
    if (code === null /* EOF */) {
      crash(
        code,
        'in attribute value',
        'a corresponding closing quote `' + fromCharCode(marker) + '`'
      )
    }

    if (code === marker) {
      effects.enter(tagAttributeValueLiteralMarkerType)
      effects.consume(code)
      effects.exit(tagAttributeValueLiteralMarkerType)
      effects.exit(tagAttributeValueLiteralType)
      effects.exit(tagAttributeType)
      marker = undefined
      returnState = beforeAttribute
      return optionalEsWhitespace
    }

    if (markdownLineEnding(code)) {
      returnState = attributeValueQuotedStart
      return optionalEsWhitespace(code)
    }

    effects.enter(tagAttributeValueLiteralValueType)
    return attributeValueQuoted(code)
  }

  // In a quoted attribute value.
  function attributeValueQuoted(code) {
    if (code === null || code === marker || markdownLineEnding(code)) {
      effects.exit(tagAttributeValueLiteralValueType)
      return attributeValueQuotedStart(code)
    }

    // Continuation.
    effects.consume(code)
    return attributeValueQuoted
  }

  // Right after the slash on a tag, e.g., `<asd /`.
  function selfClosing(code) {
    // End of tag.
    if (code === 62 /* `>` */) {
      return tagEnd(code)
    }

    crash(
      code,
      'after self-closing slash',
      '`>` to end the tag' +
        (code === 42 /* `*` */ || code === 47 /* `/` */
          ? ' (note: JS comments in JSX tags are not supported in MDX)'
          : '')
    )
  }

  // At a `>`.
  function tagEnd(code) {
    /* istanbul ignore if - never passed */
    if (code !== 62 /* `>` */) throw new Error('expected `>`')
    effects.enter(tagMarkerType)
    effects.consume(code)
    effects.exit(tagMarkerType)
    effects.exit(tagType)
    return ok
  }

  // Optionally start whitespace.
  function optionalEsWhitespace(code) {
    if (markdownLineEnding(code)) {
      effects.enter('lineEnding')
      effects.consume(code)
      effects.exit('lineEnding')
      return optionalEsWhitespace
    }

    if (markdownSpace(code) || esWhitespace(code)) {
      effects.enter('esWhitespace')
      return optionalEsWhitespaceContinue(code)
    }

    return returnState(code)
  }

  // Continue optional whitespace.
  function optionalEsWhitespaceContinue(code) {
    if (
      markdownLineEnding(code) ||
      !(markdownSpace(code) || esWhitespace(code))
    ) {
      effects.exit('esWhitespace')
      return optionalEsWhitespace(code)
    }

    effects.consume(code)
    return optionalEsWhitespaceContinue
  }

  // Crash at a nonconforming character.
  function crash(code, at, expect) {
    throw new VMessage(
      'Unexpected ' +
        (code === null
          ? 'end of file'
          : 'character `' +
            (code === 96 /* `` ` `` */ ? '` ` `' : fromCharCode(code)) +
            '` (' +
            serializeCharCode(code) +
            ')') +
        ' ' +
        at +
        ', expected ' +
        expect,
      self.now(),
      'micromark-extension-mdx-jsx:unexpected-' +
        (code === null ? 'eof' : 'character')
    )
  }
}

function serializeCharCode(code) {
  var value = code.toString(16).toUpperCase()
  while (value.length < 4) value = '0' + value
  return 'U+' + value
}
