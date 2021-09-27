# mdast-util-mdxjs-esm

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Extension for [`mdast-util-from-markdown`][from-markdown] and/or
[`mdast-util-to-markdown`][to-markdown] to support MDX.js ESM import/exports.
When parsing (`from-markdown`), must be combined with
[`micromark-extension-mdxjs-esm`][extension].

This utility handles parsing and serializing.
See [`micromark-extension-mdxjs-esm`][extension] for how the syntax works.

You probably should use [`micromark-extension-mdxjs`][mdxjs] with
[`mdast-util-mdx`][mdast-util-mdx] (which includes this package) to support all
of MDX.js.
Or use it all through [`remark-mdx`][remark-mdx] (**[remark][]**).

## Install

[npm][]:

```sh
npm install mdast-util-mdxjs-esm
```

## Use

Say we have an MDX.js file, `example.mdx`:

```mdx
import a from 'b'
export var c = ''

d
```

And our script, `example.js`, looks as follows:

```js
var fs = require('fs')
var acorn = require('acorn')
var syntax = require('micromark-extension-mdxjs-esm')
var fromMarkdown = require('mdast-util-from-markdown')
var toMarkdown = require('mdast-util-to-markdown')
var mdxjsEsm = require('mdast-util-mdxjs-esm')

var doc = fs.readFileSync('example.mdx')

var tree = fromMarkdown(doc, {
  extensions: [syntax({acorn: acorn, addResult: true})],
  mdastExtensions: [mdxjsEsm.fromMarkdown]
})

console.log(tree)

var out = toMarkdown(tree, {extensions: [mdxjsEsm.toMarkdown]})

console.log(out)
```

Now, running `node example` yields (positional info removed for brevity):

```js
{
  type: 'root',
  children: [
    {
      type: 'mdxjsEsm',
      value: "import a from 'b'\nexport var c = ''",
      data: {
        estree: {
          type: 'Program',
          body: [
            {
              type: 'ImportDeclaration',
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier',
                  local: {type: 'Identifier', name: 'a'}
                }
              ],
              source: {type: 'Literal', value: 'b', raw: "'b'"}
            },
            {
              type: 'ExportNamedDeclaration',
              declaration: {
                type: 'VariableDeclaration',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {type: 'Identifier', name: 'c'},
                    init: {type: 'Literal', value: '', raw: "''"}
                  }
                ],
                kind: 'var'
              },
              specifiers: [],
              source: null
            }
          ],
          sourceType: 'module'
        }
      }
    },
    {type: 'paragraph', children: [{type: 'text', value: 'd'}]}
  ]
}
```

```markdown
import a from 'b'
export var c = ''

d
```

## API

### `mdxjsEsm.fromMarkdown`

### `mdxjsEsm.toMarkdown`

> Note: the separate extensions are also available at
> `mdast-util-mdxjs-esm/from-markdown` and `mdast-util-mdxjs-esm/to-markdown`.

Support MDX.js ESM import/exports.
The exports are extensions, respectively for
[`mdast-util-from-markdown`][from-markdown] and
[`mdast-util-to-markdown`][to-markdown].

When using the [syntax extension with `addResult`][extension], nodes will have
a `data.estree` field set to an [ESTree][]

## Syntax tree

The following interfaces are added to **[mdast][]** by this utility.

### Nodes

#### `MDXJSEsm`

```idl
interface MDXJSEsm <: Literal {
  type: "mdxjsEsm"
}
```

**MDXJSEsm** (**[Literal][dfn-literal]**) represents ESM import/exports embedded
in MDX.
It can be used where **[flow][dfn-flow-content]** content is expected.
Its content is represented by its `value` field.

For example, the following Markdown:

```markdown
import a from 'b'
```

Yields:

```js
{
  type: 'mdxjsEsm',
  value: 'import a from \'b\''
}
```

### Content model

#### `FlowContent` (MDX.js ESM)

```idl
type FlowContentMdxjsEsm = MDXJSEsm | FlowContent
```

Note that when ESM is present, it can only exist as top-level content: if it has
a *[parent][dfn-parent]*, that parent must be **[Root][dfn-root]**.

## Related

*   [`remarkjs/remark`][remark]
    — markdown processor powered by plugins
*   [`remarkjs/remark-mdx`][remark-mdx]
    — remark plugin to support MDX
*   [`syntax-tree/mdast-util-from-markdown`][from-markdown]
    — mdast parser using `micromark` to create mdast from markdown
*   [`syntax-tree/mdast-util-to-markdown`][to-markdown]
    — mdast serializer to create markdown from mdast
*   [`syntax-tree/mdast-util-mdx`][mdast-util-mdx]
    — mdast utility to support MDX
*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`micromark/micromark-extension-mdxjs-esm`][extension]
    — micromark extension to parse MDX.js ESM

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

[build-badge]: https://github.com/syntax-tree/mdast-util-mdxjs-esm/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/mdast-util-mdxjs-esm/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-mdxjs-esm.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-mdxjs-esm

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-mdxjs-esm.svg

[downloads]: https://www.npmjs.com/package/mdast-util-mdxjs-esm

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-mdxjs-esm.svg

[size]: https://bundlephobia.com/result?p=mdast-util-mdxjs-esm

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

[mdxjs]: https://github.com/micromark/micromark-extension-mdxjs

[mdast-util-mdx]: https://github.com/syntax-tree/mdast-util-mdx

[estree]: https://github.com/estree/estree

[dfn-literal]: https://github.com/syntax-tree/mdast#literal

[dfn-parent]: https://github.com/syntax-tree/unist#parent-1

[dfn-root]: https://github.com/syntax-tree/mdast#root

[dfn-flow-content]: #flowcontent-mdxjs-esm

[remark-mdx]: https://github.com/mdx-js/mdx/tree/next/packages/remark-mdx
