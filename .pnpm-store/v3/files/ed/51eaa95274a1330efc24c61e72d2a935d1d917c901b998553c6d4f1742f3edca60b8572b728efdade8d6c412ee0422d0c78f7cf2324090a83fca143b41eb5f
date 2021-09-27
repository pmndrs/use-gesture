# mdast-util-mdx-expression

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Extension for [`mdast-util-from-markdown`][from-markdown] and/or
[`mdast-util-to-markdown`][to-markdown] to support MDX (or MDX.js) expressions.
When parsing (`from-markdown`), must be combined with
[`micromark-extension-mdx-expression`][extension].

This utility handles parsing and serializing.
See [`micromark-extension-mdx-expression`][extension] for how the syntax works.

You probably should use either [`micromark-extension-mdx`][mdx] or
[`micromark-extension-mdxjs`][mdxjs] with [`mdast-util-mdx`][mdast-util-mdx]
(which both include this package) to support all of MDX (or MDX.js).
Or use it all through `remark-mdx` or `remark-mdxjs` (**[remark][]**).

## Install

[npm][]:

```sh
npm install mdast-util-mdx-expression
```

## Use

Say we have an MDX.js file, `example.mdx`:

```mdx
{
  a + 1
}

b {true}.
```

And our script, `example.js`, looks as follows:

```js
var fs = require('fs')
var acorn = require('acorn')
var syntax = require('micromark-extension-mdx-expression')
var fromMarkdown = require('mdast-util-from-markdown')
var toMarkdown = require('mdast-util-to-markdown')
var mdxExpression = require('mdast-util-mdx-expression')

var doc = fs.readFileSync('example.mdx')

var tree = fromMarkdown(doc, {
  extensions: [syntax({acorn: acorn, addResult: true})],
  mdastExtensions: [mdxExpression.fromMarkdown]
})

console.log(tree)

var out = toMarkdown(tree, {extensions: [mdxExpression.toMarkdown]})

console.log(out)
```

Now, running `node example` yields (positional info removed for brevity):

```js
{
  type: 'root',
  children: [
    {
      type: 'mdxFlowExpression',
      value: '\na + 1\n',
      data: {
        estree: {
          type: 'BinaryExpression',
          left: {type: 'Identifier', name: 'a'},
          operator: '+',
          right: {type: 'Literal', value: 1}
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'b '},
        {
          type: 'mdxTextExpression',
          value: 'true',
          data: {
            estree: {type: 'Literal', value: true}
          }
        },
        {type: 'text', value: '.'}
      ]
    }
  ]
}
```

```markdown
{
  a + 1
}

b {true}.
```

## API

### `mdxExpression.fromMarkdown`

### `mdxExpression.toMarkdown`

> Note: the separate extensions are also available at
> `mdast-util-mdx-expression/from-markdown` and
> `mdast-util-mdx-expression/to-markdown`.

Support MDX (or MDX.js) expressions.
The exports are extensions, respectively for
[`mdast-util-from-markdown`][from-markdown] and
[`mdast-util-to-markdown`][to-markdown].

When using the [syntax extension with `addResult`][extension], nodes will have
a `data.estree` field set to an [ESTree][].

The indent of the value of `MDXFlowExpression`s is stripped.

## Syntax tree

The following interfaces are added to **[mdast][]** by this utility.

### Nodes

#### `MDXFlowExpression`

```idl
interface MDXFlowExpression <: Literal {
  type: "mdxFlowExpression"
}
```

**MDXFlowExpression** (**[Literal][dfn-literal]**) represents a JavaScript
expression embedded in flow (block).
It can be used where **[flow][dfn-flow-content]** content is expected.
Its content is represented by its `value` field.

For example, the following markdown:

```markdown
{
  1 + 1
}
```

Yields:

```js
{type: 'mdxFlowExpression', value: '\n1 + 1\n'}
```

#### `MDXTextExpression`

```idl
interface MDXTextExpression <: Literal {
  type: "mdxTextExpression"
}
```

**MDXTextExpression** (**[Literal][dfn-literal]**) represents a JavaScript
expression embedded in text (span, inline).
It can be used where **[phrasing][dfn-phrasing-content]** content is expected.
Its content is represented by its `value` field.

For example, the following markdown:

```markdown
a {1 + 1} b.
```

Yields:

```js
{type: 'mdxTextExpression', value: '1 + 1'}
```

### Content model

#### `FlowContent` (MDX expression)

```idl
type FlowContentMdxExpression = MDXFlowExpression | FlowContent
```

#### `PhrasingContent` (MDX expression)

```idl
type PhrasingContentMdxExpression = MDXTextExpression | PhrasingContent
```

## Related

*   [`remarkjs/remark`][remark]
    — markdown processor powered by plugins
*   `remarkjs/remark-mdx`
    — remark plugin to support MDX
*   `remarkjs/remark-mdxjs`
    — remark plugin to support MDX.js
*   [`syntax-tree/mdast-util-from-markdown`][from-markdown]
    — mdast parser using `micromark` to create mdast from markdown
*   [`syntax-tree/mdast-util-to-markdown`][to-markdown]
    — mdast serializer to create markdown from mdast
*   [`syntax-tree/mdast-util-mdx`][mdast-util-mdx]
    — mdast utility to support MDX
*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`micromark/micromark-extension-mdx-expression`][extension]
    — micromark extension to parse MDX expressions

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/mdast-util-mdx-expression/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/mdast-util-mdx-expression/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-mdx-expression.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-mdx-expression

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-mdx-expression.svg

[downloads]: https://www.npmjs.com/package/mdast-util-mdx-expression

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-mdx-expression.svg

[size]: https://bundlephobia.com/result?p=mdast-util-mdx-expression

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[mdast]: https://github.com/syntax-tree/mdast

[remark]: https://github.com/remarkjs/remark

[from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown

[to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown

[micromark]: https://github.com/micromark/micromark

[extension]: https://github.com/micromark/micromark-extension-mdxjs-esm

[mdx]: https://github.com/micromark/micromark-extension-mdx

[mdxjs]: https://github.com/micromark/micromark-extension-mdxjs

[mdast-util-mdx]: https://github.com/syntax-tree/mdast-util-mdx

[estree]: https://github.com/estree/estree

[dfn-literal]: https://github.com/syntax-tree/mdast#literal

[dfn-flow-content]: #flowcontent-mdx-expression

[dfn-phrasing-content]: #phrasingcontent-mdx-expression
