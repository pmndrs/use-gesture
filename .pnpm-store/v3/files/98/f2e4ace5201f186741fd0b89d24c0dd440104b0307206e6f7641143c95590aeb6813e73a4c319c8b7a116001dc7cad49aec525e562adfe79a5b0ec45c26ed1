# micromark-extension-mdx-jsx

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[micromark][]** extension to support [MDX][mdx-js] (or MDX.js) JSX.

This package provides the low-level modules for integrating with the micromark
tokenizer but has no handling of compiling to HTML: go to a syntax tree instead.

You should use this with [`mdast-util-mdx-jsx`][util] (**[mdast][]**).
Alternatively, use either [`micromark-extension-mdx`][mdx] or
[`micromark-extension-mdxjs`][mdxjs] with [`mdast-util-mdx`][mdast-util-mdx] to
support all of MDX (or MDX.js).
Or, use it through [`remark-mdx`][remark-mdx] (**[remark][]**).

## Install

[npm][]:

```sh
npm install micromark-extension-mdx-jsx
```

## Use

See [`mdast-util-mdx-jsx`][util] for an example.

## API

### `syntax(options?)`

Support [MDX][mdx-js] (or MDX.js) JSX.

The export of `syntax` is a function that can be called with options and returns
an extension for the micromark parser (to tokenize JSX; can be passed in
`extensions`).

##### `options`

###### `options.acorn`

Acorn parser to use ([`Acorn`][acorn], optional).

###### `options.acornOptions`

Options to pass to acorn (`Object`, default: `{ecmaVersion: 2020, sourceType:
'module'}`).
All fields can be set.
Positional info (`loc`, `range`) is set on ES nodes regardless of acorn options.

###### `options.addResult`

Whether to add an `estree` field to the `mdxTextJsx` and `mdxFlowJsx` tokens
with the results from acorn (`boolean`, default: `false`).

## Syntax

This extensions support both MDX and MDX.js.
The first is agnostic to the programming language (it could contain attribute
expressions and attribute value expressions with Rust or so), the last is
specific to JavaScript (in which case attribute expressions must be spread
expressions).
To turn on gnostic mode, pass `acorn`.

The syntax of JSX supported here is described in [W3C Backus–Naur form][w3c-bnf]
with the following additions:

1.  **`A - B`** — matches any string that matches `A` but does not match `B`.
2.  **`'string'`** — same as **`"string"`** but with single quotes.
3.  **`BREAK`** — lookahead match for a block break opportunity (either
    EOF (end of file), U+000A LINE FEED (LF), U+000D CARRIAGE RETURN (CR), or
    another JSX tag)

The syntax is defined as follows, however, do note that interleaving (mixing)
of markdown and MDX is defined elsewhere, and that the constraints are imposed
in [`mdast-util-mdx-jsx`][util].

<!--grammar start-->

<pre><code>; Entries
<a id=x-mdx-flow href=#x-mdx-flow>mdxFlow</a> ::= *<a href=#x-space-or-tab>spaceOrTab</a> <a href=#x-element>element</a> *<a href=#x-space-or-tab>spaceOrTab</a> BREAK
<a id=x-mdx-text href=#x-mdx-text>mdxText</a> ::= <a href=#x-element>element</a>

<a id=x-element href=#x-element>element</a> ::= <a href=#x-self-closing>selfClosing</a> | <a href=#x-closed>closed</a>
<a id=x-self-closing href=#x-self-closing>selfClosing</a> ::=
  ; constraint: tag MUST be named, MUST NOT be closing, and MUST be self-closing
  <a href=#x-tag>tag</a>
<a id=x-closed href=#x-closed>closed</a> ::=
  ; constraint: tag MUST NOT be closing and MUST NOT be self-closing
  <a href=#x-tag>tag</a>
  *<a href=#x-data>data</a>
  ; constraint: tag MUST be closing, MUST NOT be self-closing, MUST NOT have
  ; attributes, and either both tags MUST have the same name or both tags MUST
  ; be nameless
  <a href=#x-tag>tag</a>

<a id=x-data href=#x-data>data</a> ::= <a href=#x-element>element</a> | <a href=#x-text>text</a>

; constraint: markdown whitespace (<a href=#x-space-or-tab>spaceOrTab</a> | '\r' | '\n') is NOT
; allowed directly after `&lt;` in order to allow `1 &lt; 3` in markdown.
<a id=x-tag href=#x-tag>tag</a> ::=
  '<' *1<a href=#x-closing>closing</a>
  *1(*<a href=#x-whitespace>whitespace</a> <a href=#x-name>name</a> *1<a href=#x-attributes-after-identifier>attributesAfterIdentifier</a> *1<a href=#x-closing>closing</a>)
  *<a href=#x-whitespace>whitespace</a> '>'

<a id=x-attributes-after-identifier href=#x-attributes-after-identifier>attributesAfterIdentifier</a> ::=
  1*<a href=#x-whitespace>whitespace</a> (<a href=#x-attributes-boolean>attributesBoolean</a> | <a href=#x-attributes-value>attributesValue</a>) |
  *<a href=#x-whitespace>whitespace</a> <a href=#x-attributes-expression>attributesExpression</a> |
<a id=x-attributes-after-value href=#x-attributes-after-value>attributesAfterValue</a> ::=
  *<a href=#x-whitespace>whitespace</a> (<a href=#x-attributes-boolean>attributesBoolean</a> | <a href=#x-attributes-expression>attributesExpression</a> | <a href=#x-attributes-value>attributesValue</a>)
<a name=attributes-boolean href=#x-attributes-boolean>attributesBoolean</a> ::= <a href=#x-key>key</a> *1<a href=#x-attributes-after-identifier>attributesAfterIdentifier</a>
; Note: in gnostic mode the value of the expression must instead be a single valid ES spread
; expression
<a name=attributes-expression href=#x-attributes-expression>attributesExpression</a> ::= <a href=#x-expression>expression</a> *1<a href=#x-attributes-after-value>attributesAfterValue</a>
<a name=attributes-value href=#x-attributes-value>attributesValue</a> ::= <a href=#x-key>key</a> <a href=#x-initializer>initializer</a> *1<a href=#x-attributes-after-value>attributesAfterValue</a>

<a id=x-closing href=#x-closing>closing</a> ::= *<a href=#x-whitespace>whitespace</a> '/'

<a id=x-name href=#x-name>name</a> ::= <a href=#x-identifier>identifier</a> *1(<a href=#x-local>local</a> | <a href=#x-members>members</a>)
<a id=x-key href=#x-key>key</a> ::= <a href=#x-identifier>identifier</a> *1<a href=#x-local>local</a>
<a id=x-local href=#x-local>local</a> ::= *<a href=#x-whitespace>whitespace</a> ':' *<a href=#x-whitespace>whitespace</a> <a href=#x-identifier>identifier</a>
<a id=x-members href=#x-members>members</a> ::= <a href=#x-member>member</a> *<a href=#x-member>member</a>
<a id=x-member href=#x-member>member</a> ::= *<a href=#x-whitespace>whitespace</a> '.' *<a href=#x-whitespace>whitespace</a> <a href=#x-identifier>identifier</a>

<a id=x-identifier href=#x-identifier>identifier</a> ::= <a href=#x-identifier-start>identifierStart</a> *<a href=#x-identifier-part>identifierPart</a>
<a id=x-initializer href=#x-initializer>initializer</a> ::= *<a href=#x-whitespace>whitespace</a> '=' *<a href=#x-whitespace>whitespace</a> <a href=#x-value>value</a>
<a id=x-value href=#x-value>value</a> ::= <a href=#x-double-quoted>doubleQuoted</a> | <a href=#x-single-quoted>singleQuoted</a> | <a href=#x-expression>expression</a>
; Note: in gnostic mode the value must instead be a single valid ES expression
<a id=x-expression href=#x-expression>expression</a> ::= '{' *(<a href=#x-expression-text>expressionText</a> | <a href=#x-expression>expression</a>) '}'

<a id=x-double-quoted href=#x-double-quoted>doubleQuoted</a> ::= '"' *<a href=#x-double-quoted-text>doubleQuotedText</a> '"'
<a id=x-single-quoted href=#x-single-quoted>singleQuoted</a> ::= "'" *<a href=#x-single-quoted-text>singleQuotedText</a> "'"

<a id=x-space-or-tab href=#x-space-or-tab>spaceOrTab</a> ::= ' ' | '\t'
<a id=x-text href=#x-text>text</a> ::= <a href=#x-character>character</a> - '<' - '{'
<a id=x-whitespace href=#x-whitespace>whitespace</a> ::= <a href=#x-es-whitespace>esWhitespace</a>
<a id=x-double-quoted-text href=#x-double-quoted-text>doubleQuotedText</a> ::= <a href=#x-character>character</a> - '"'
<a id=x-single-quoted-text href=#x-single-quoted-text>singleQuotedText</a> ::= <a href=#x-character>character</a> - "'"
<a id=x-expression-text href=#x-expression-text>expressionText</a> ::= <a href=#x-character>character</a> - '{' - '}'
<a id=x-identifier-start href=#x-identifier-start>identifierStart</a> ::= <a href=#x-es-identifier-start>esIdentifierStart</a>
<a id=x-identifier-part href=#x-identifier-part>identifierPart</a> ::= <a href=#x-es-identifier-part>esIdentifierPart</a> | '-'

; Unicode
; Any unicode code point
<a id=x-character href=#x-character>character</a> ::=

; ECMAScript
; See “IdentifierStart”: &lt;<a href=https://tc39.es/ecma262/#prod-IdentifierStart>https://tc39.es/ecma262/#prod-IdentifierStart</a>>
<a id=x-es-identifier-start href=#x-es-identifier-start>esIdentifierStart</a> ::=
; See “IdentifierPart”: &lt;<a href=https://tc39.es/ecma262/#prod-IdentifierPart>https://tc39.es/ecma262/#prod-IdentifierPart</a>>
<a id=x-es-identifier-part href=#x-es-identifier-part>esIdentifierPart</a> ::=
; See “Whitespace”: &lt;<a href=https://tc39.es/ecma262/#prod-WhiteSpace>https://tc39.es/ecma262/#prod-WhiteSpace</a>>
<a id=x-es-whitespace href=#x-es-whitespace>esWhitespace</a> ::=
</code></pre>

<!--grammar end-->

## Errors

In gnostic mode, expressions are parsed with
[`micromark-extension-mdx-expression`][mdx-expression], which also throws
certain errors.

### Unexpected end of file $at, expected $expect

This error occurs for many different reasons if something was opened but not
closed (source: `micromark-extension-mdx-jsx`, rule id: `unexpected-eof`).

Some examples are:

```markdown
<
</
<a
<a:
<a.
<a b
<a b:
<a b=
<a b="
<a b='
<a b={
<a/
```

### Unexpected character $at, expected $expect

This error occurs for many different reasons if an unexpected character is seen
(source: `micromark-extension-mdx-jsx`, rule id: `unexpected-character`).

Some examples are:

```markdown
<.>
</.>
<a?>
<a:+>
<a./>
<a b!>
<a b:1>
<a b=>
<a/->
```

## Tokens

Many tokens are used:

*   `mdxJsxFlowTag` for the whole JSX tag (`<a>`)
*   `mdxJsxTextTag` ^
*   `mdxJsxFlowTagMarker` for the tag markers (`<`, `>`)
*   `mdxJsxTextTagMarker` ^
*   `mdxJsxFlowTagClosingMarker` for the `/` marking a closing tag (`</a>`)
*   `mdxJsxTextTagClosingMarker` ^
*   `mdxJsxFlowTagSelfClosingMarker` for the `/` marking a self-closing tag
    (`<a/>`)
*   `mdxJsxTextTagSelfClosingMarker` ^
*   `mdxJsxFlowTagName` for the whole tag name (`a:b` in `<a:b>`)
*   `mdxJsxTextTagName` ^
*   `mdxJsxFlowTagNamePrimary` for the first name (`a` in `<a:b>`)
*   `mdxJsxTextTagNamePrimary` ^
*   `mdxJsxFlowTagNameMemberMarker` for the `.` marking in members (`<a.b>`)
*   `mdxJsxTextTagNameMemberMarker` ^
*   `mdxJsxFlowTagNameMember` for member names (`b` in `<a:b>`)
*   `mdxJsxTextTagNameMember` ^
*   `mdxJsxFlowTagNamePrefixMarker` for the `:` between primary and local
    (`<a:b>`)
*   `mdxJsxTextTagNamePrefixMarker` ^
*   `mdxJsxFlowTagNameLocal` for the local name (`b` in `<a:b>`)
*   `mdxJsxTextTagNameLocal` ^
*   `mdxJsxFlowTagExpressionAttribute` for whole expression attributes
    (`<a {...b}>`)
*   `mdxJsxTextTagExpressionAttribute` ^
*   `mdxJsxFlowTagExpressionAttributeMarker` for `{`, `}` in expression
    attributes
*   `mdxJsxTextTagExpressionAttributeMarker` ^
*   `mdxJsxFlowTagExpressionAttributeValue` for chunks of what’s inside
    expression attributes
*   `mdxJsxTextTagExpressionAttributeValue` ^
*   `mdxJsxFlowTagAttribute` for a whole normal attribute (`<a b>`)
*   `mdxJsxTextTagAttribute` ^
*   `mdxJsxFlowTagAttributeName` for the whole name of an attribute (`b:c` in
    `<a b:c>`)
*   `mdxJsxTextTagAttributeName` ^
*   `mdxJsxFlowTagAttributeNamePrimary` for the first name of an attribute (`b`
    in `<a b:c>`)
*   `mdxJsxTextTagAttributeNamePrimary` ^
*   `mdxJsxFlowTagAttributeNamePrefixMarker` for the `:` between primary and
    local (`<a b:c>`)
*   `mdxJsxTextTagAttributeNamePrefixMarker` ^
*   `mdxJsxFlowTagAttributeNameLocal` for the local name of an attribute (`c`
    in `<a b:c>`)
*   `mdxJsxTextTagAttributeNameLocal` ^
*   `mdxJsxFlowTagAttributeInitializerMarker` for the `=` between an attribute
    name and value
*   `mdxJsxTextTagAttributeInitializerMarker` ^
*   `mdxJsxFlowTagAttributeValueLiteral` for a string attribute value
    (`<a b="">`)
*   `mdxJsxTextTagAttributeValueLiteral` ^
*   `mdxJsxFlowTagAttributeValueLiteralMarker` for the quotes around a string
    attribute value (`"` or `'`)
*   `mdxJsxTextTagAttributeValueLiteralMarker` ^
*   `mdxJsxFlowTagAttributeValueLiteralValue` for chunks of what’s inside
    string attribute values
*   `mdxJsxTextTagAttributeValueLiteralValue` ^
*   `mdxJsxFlowTagAttributeValueExpression` for an expression attribute value
    (`<a b={1}>`)
*   `mdxJsxTextTagAttributeValueExpression` ^
*   `mdxJsxFlowTagAttributeValueExpressionMarker` for the `{` and `}` of
    expression attribute values
*   `mdxJsxTextTagAttributeValueExpressionMarker` ^
*   `mdxJsxFlowTagAttributeValueExpressionValue` for chunks of what’s inside
    expression attribute values
*   `mdxJsxTextTagAttributeValueExpressionValue` ^

## Related

*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`micromark/micromark-extension-mdx`][mdx]
    — micromark extension to support MDX
*   [`micromark/micromark-extension-mdxjs`][mdxjs]
    — micromark extension to support MDX.js
*   [`micromark/micromark-extension-mdx-expression`][mdx-expression]
    — micromark extension to support MDX (or MDX.js) expressions
*   [`micromark/micromark-extension-mdx-md`][mdx-md]
    — micromark extension to support misc MDX changes
*   [`micromark/micromark-extension-mdxjs-esm`][mdxjs-esm]
    — micromark extension to support MDX.js import/exports
*   [`syntax-tree/mdast-util-mdx`][mdast-util-mdx]
    — mdast utility to support MDX (or MDX.js)

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark-extension-mdx-jsx/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-mdx-jsx/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-mdx-jsx.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-mdx-jsx

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-mdx-jsx.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-mdx-jsx

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-mdx-jsx.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-mdx-jsx

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/micromark/.github/blob/HEAD/contributing.md

[support]: https://github.com/micromark/.github/blob/HEAD/support.md

[coc]: https://github.com/micromark/.github/blob/HEAD/code-of-conduct.md

[micromark]: https://github.com/micromark/micromark

[remark]: https://github.com/remarkjs/remark

[mdast]: https://github.com/syntax-tree/mdast

[mdx-js]: https://github.com/mdx-js/mdx

[mdx-expression]: https://github.com/micromark/micromark-extension-mdx-expression

[mdx-md]: https://github.com/micromark/micromark-extension-mdx-md

[mdxjs-esm]: https://github.com/micromark/micromark-extension-mdxjs-esm

[mdx]: https://github.com/micromark/micromark-extension-mdx

[mdxjs]: https://github.com/micromark/micromark-extension-mdxjs

[util]: https://github.com/syntax-tree/mdast-util-mdx-jsx

[mdast-util-mdx]: https://github.com/syntax-tree/mdast-util-mdx

[w3c-bnf]: https://www.w3.org/Notation.html

[acorn]: https://github.com/acornjs/acorn

[remark-mdx]: https://github.com/mdx-js/mdx/tree/next/packages/remark-mdx
