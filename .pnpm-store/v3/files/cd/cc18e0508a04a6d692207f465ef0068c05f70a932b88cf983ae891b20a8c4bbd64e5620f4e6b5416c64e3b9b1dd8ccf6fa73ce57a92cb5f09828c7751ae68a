exports.canContainEols = ['mdxJsxTextElement']
exports.enter = {
  mdxJsxFlowTag: enterMdxJsxTag,
  mdxJsxFlowTagClosingMarker: enterMdxJsxTagClosingMarker,
  mdxJsxFlowTagAttribute: enterMdxJsxTagAttribute,
  mdxJsxFlowTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
  mdxJsxFlowTagAttributeValueLiteral: buffer,
  mdxJsxFlowTagAttributeValueExpression: buffer,
  mdxJsxFlowTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker,

  mdxJsxTextTag: enterMdxJsxTag,
  mdxJsxTextTagClosingMarker: enterMdxJsxTagClosingMarker,
  mdxJsxTextTagAttribute: enterMdxJsxTagAttribute,
  mdxJsxTextTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
  mdxJsxTextTagAttributeValueLiteral: buffer,
  mdxJsxTextTagAttributeValueExpression: buffer,
  mdxJsxTextTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker
}
exports.exit = {
  mdxJsxFlowTagClosingMarker: exitMdxJsxTagClosingMarker,
  mdxJsxFlowTagNamePrimary: exitMdxJsxTagNamePrimary,
  mdxJsxFlowTagNameMember: exitMdxJsxTagNameMember,
  mdxJsxFlowTagNameLocal: exitMdxJsxTagNameLocal,
  mdxJsxFlowTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
  mdxJsxFlowTagExpressionAttributeValue: data,
  mdxJsxFlowTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
  mdxJsxFlowTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
  mdxJsxFlowTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
  mdxJsxFlowTagAttributeValueLiteralValue: data,
  mdxJsxFlowTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
  mdxJsxFlowTagAttributeValueExpressionValue: data,
  mdxJsxFlowTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
  mdxJsxFlowTag: exitMdxJsxTag,

  mdxJsxTextTagClosingMarker: exitMdxJsxTagClosingMarker,
  mdxJsxTextTagNamePrimary: exitMdxJsxTagNamePrimary,
  mdxJsxTextTagNameMember: exitMdxJsxTagNameMember,
  mdxJsxTextTagNameLocal: exitMdxJsxTagNameLocal,
  mdxJsxTextTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
  mdxJsxTextTagExpressionAttributeValue: data,
  mdxJsxTextTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
  mdxJsxTextTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
  mdxJsxTextTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
  mdxJsxTextTagAttributeValueLiteralValue: data,
  mdxJsxTextTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
  mdxJsxTextTagAttributeValueExpressionValue: data,
  mdxJsxTextTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
  mdxJsxTextTag: exitMdxJsxTag
}

var parseEntities = require('parse-entities')
var stringifyPosition = require('unist-util-stringify-position')
var VMessage = require('vfile-message')

function buffer() {
  this.buffer()
}

function data(token) {
  this.config.enter.data.call(this, token)
  this.config.exit.data.call(this, token)
}

function enterMdxJsxTag(token) {
  if (!this.getData('mdxJsxTagStack')) this.setData('mdxJsxTagStack', [])

  this.setData('mdxJsxTag', {
    name: null,
    attributes: [],
    start: token.start,
    end: token.end
  })

  this.buffer()
}

function enterMdxJsxTagClosingMarker(token) {
  if (!this.getData('mdxJsxTagStack').length) {
    throw new VMessage(
      'Unexpected closing slash `/` in tag, expected an open tag first',
      {start: token.start, end: token.end},
      'mdast-util-mdx-jsx:unexpected-closing-slash'
    )
  }
}

function enterMdxJsxTagAnyAttribute(token) {
  if (this.getData('mdxJsxTag').close) {
    throw new VMessage(
      'Unexpected attribute in closing tag, expected the end of the tag',
      {start: token.start, end: token.end},
      'mdast-util-mdx-jsx:unexpected-attribute'
    )
  }
}

function enterMdxJsxTagSelfClosingMarker(token) {
  if (this.getData('mdxJsxTag').close) {
    throw new VMessage(
      'Unexpected self-closing slash `/` in closing tag, expected the end of the tag',
      {start: token.start, end: token.end},
      'mdast-util-mdx-jsx:unexpected-self-closing-slash'
    )
  }
}

function exitMdxJsxTagClosingMarker() {
  this.getData('mdxJsxTag').close = true
}

function exitMdxJsxTagNamePrimary(token) {
  this.getData('mdxJsxTag').name = this.sliceSerialize(token)
}

function exitMdxJsxTagNameMember(token) {
  this.getData('mdxJsxTag').name += '.' + this.sliceSerialize(token)
}

function exitMdxJsxTagNameLocal(token) {
  this.getData('mdxJsxTag').name += ':' + this.sliceSerialize(token)
}

function enterMdxJsxTagAttribute(token) {
  enterMdxJsxTagAnyAttribute.call(this, token)
  this.getData('mdxJsxTag').attributes.push({
    type: 'mdxJsxAttribute',
    name: null,
    value: null
  })
}

function enterMdxJsxTagExpressionAttribute(token) {
  enterMdxJsxTagAnyAttribute.call(this, token)
  this.getData('mdxJsxTag').attributes.push({
    type: 'mdxJsxExpressionAttribute',
    value: null
  })
  this.buffer()
}

function exitMdxJsxTagExpressionAttribute(token) {
  var attributes = this.getData('mdxJsxTag').attributes
  attributes[attributes.length - 1].value = this.resume()

  if (token.estree) {
    attributes[attributes.length - 1].data = {estree: token.estree}
  }
}

function exitMdxJsxTagAttributeNamePrimary(token) {
  var attributes = this.getData('mdxJsxTag').attributes
  attributes[attributes.length - 1].name = this.sliceSerialize(token)
}

function exitMdxJsxTagAttributeNameLocal(token) {
  var attributes = this.getData('mdxJsxTag').attributes
  attributes[attributes.length - 1].name += ':' + this.sliceSerialize(token)
}

function exitMdxJsxTagAttributeValueLiteral() {
  var attributes = this.getData('mdxJsxTag').attributes
  attributes[attributes.length - 1].value = parseEntities(this.resume(), {
    nonTerminated: false
  })
}

function exitMdxJsxTagAttributeValueExpression(token) {
  var attributes = this.getData('mdxJsxTag').attributes

  attributes[attributes.length - 1].value = {
    type: 'mdxJsxAttributeValueExpression',
    value: this.resume()
  }

  if (token.estree) {
    attributes[attributes.length - 1].value.data = {estree: token.estree}
  }
}

function exitMdxJsxTagSelfClosingMarker() {
  this.getData('mdxJsxTag').selfClosing = true
}

function exitMdxJsxTag(token) {
  var tag = this.getData('mdxJsxTag')
  var stack = this.getData('mdxJsxTagStack')
  var tail = stack[stack.length - 1]

  if (tag.close && tail.name !== tag.name) {
    throw new VMessage(
      'Unexpected closing tag `' +
        serializeAbbreviatedTag(tag) +
        '`, expected corresponding closing tag for `' +
        serializeAbbreviatedTag(tail) +
        '` (' +
        stringifyPosition(tail) +
        ')',
      {start: token.start, end: token.end},
      'mdast-util-mdx-jsx:end-tag-mismatch'
    )
  }

  // End of a tag, so drop the buffer.
  this.resume()

  if (tag.close) {
    stack.pop()
  } else {
    this.enter(
      {
        type:
          token.type === 'mdxJsxTextTag'
            ? 'mdxJsxTextElement'
            : 'mdxJsxFlowElement',
        name: tag.name,
        attributes: tag.attributes,
        children: []
      },
      token
    )
  }

  if (tag.selfClosing || tag.close) {
    this.exit(token)
  } else {
    stack.push(tag)
  }
}

// Serialize a tag, excluding attributes.
// `self-closing` is not supported, because we don’t need it yet.
function serializeAbbreviatedTag(tag) {
  return '<' + (tag.close ? '/' : '') + (tag.name || '') + '>'
}
