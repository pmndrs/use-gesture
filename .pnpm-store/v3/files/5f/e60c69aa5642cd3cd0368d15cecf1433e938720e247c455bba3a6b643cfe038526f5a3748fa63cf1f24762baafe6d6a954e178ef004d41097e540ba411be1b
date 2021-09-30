# mdast-util-mdx

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Extension for [`mdast-util-from-markdown`][from-markdown] and/or
[`mdast-util-to-markdown`][to-markdown] to support MDX (or MDX.js) in
**[mdast][]**.
When parsing (`from-markdown`), must be combined with either
[`micromark-extension-mdx`][mdx] or [`micromark-extension-mdxjs`][mdxjs].

You might instead want to use this package through `remark-mdx` or
`remark-mdxjs` with **[remark][]**.

Alternatively, the extensions can be used separately:

*   [`mdast-util-mdx-expression`](https://github.com/syntax-tree/mdast-util-mdx-expression)
    — support MDX (or MDX.js) expressions
*   [`mdast-util-mdx-jsx`](https://github.com/syntax-tree/mdast-util-mdx-jsx)
    — support MDX (or MDX.js) JSX
*   [`mdast-util-mdxjs-esm`](https://github.com/syntax-tree/mdast-util-mdxjs-esm)
    — support MDX.js ESM

## Install

[npm][]:

```sh
npm install mdast-util-mdx
```

## Use

Say we have the following file, `example.mdx`:

```markdown
import Box from "place"

Here’s an expression:

{
  1 + 1 /* } */
}

Which you can also put inline: {1+1}.

<Box>
  <SmallerBox>
    - Lists, which can be indented.
  </SmallerBox>
</Box>
```

And our script, `example.js`, looks as follows:

```js
var fs = require('fs')
var fromMarkdown = require('mdast-util-from-markdown')
var toMarkdown = require('mdast-util-to-markdown')
var syntax = require('micromark-extension-mdxjs')
var mdx = require('mdast-util-mdx')

var doc = fs.readFileSync('example.mdx')

var tree = fromMarkdown(doc, {
  extensions: [syntax()],
  mdastExtensions: [mdx.fromMarkdown]
})

console.log(tree)

var out = toMarkdown(tree, {extensions: [mdx.toMarkdown]})

console.log(out)
```

Now, running `node example` yields (positional info removed for brevity):

```js
{
  type: 'root',
  children: [
    {
      type: 'mdxjsEsm',
      value: 'import Box from "place"',
      data: {
        estree: {
          type: 'Program',
          body: [
            {
              type: 'ImportDeclaration',
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier',
                  local: {type: 'Identifier', name: 'Box'}
                }
              ],
              source: {type: 'Literal', value: 'place'}
            }
          ],
          sourceType: 'module'
        }
      }
    },
    {
      type: 'paragraph',
      children: [{type: 'text', value: 'Here’s an expression:'}]
    },
    {
      type: 'mdxFlowExpression',
      value: '\n1 + 1 /* } */\n',
      data: {
        estree: {
          type: 'BinaryExpression',
          left: {type: 'Literal', value: 1},
          operator: '+',
          right: {type: 'Literal', value: 1}
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'Which you can also put inline: '},
        {
          type: 'mdxTextExpression',
          value: '1+1',
          data: {
            estree: {
              type: 'BinaryExpression',
              left: {type: 'Literal', value: 1},
              operator: '+',
              right: {type: 'Literal', value: 1}
            }
          }
        },
        {type: 'text', value: '.'}
      ]
    },
    {
      type: 'mdxJsxFlowElement',
      name: 'Box',
      attributes: [],
      children: [
        {
          type: 'mdxJsxFlowElement',
          name: 'SmallerBox',
          attributes: [],
          children: [
            {
              type: 'list',
              ordered: false,
              start: null,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {type: 'text', value: 'Lists, which can be indented.'}
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

```markdown
import Box from "place"

Here’s an expression:

{
  1 + 1 /* } */
}

Which you can also put inline: {1+1}.

<Box>
  <SmallerBox>
    *   Lists, which can be indented.
  </SmallerBox>
</Box>
```

## API

### `mdx.fromMarkdown`

### `mdx.toMarkdown`

> Note: the separate extensions are also available at
> `mdast-util-mdx/from-markdown` and `mdast-util-mdx/to-markdown`.

Support MDX (or MDX.js).
The exports of `fromMarkdown` is an extension for
[`mdast-util-from-markdown`][from-markdown].
The export of `toMarkdown` is an extension for
[`mdast-util-to-markdown`][to-markdown].

There are no options.

## Related

*   [`remarkjs/remark`][remark]
    — markdown processor powered by plugins
*   `remarkjs/remark-mdx`
    — remark plugin to support MDX
*   `remarkjs/remark-mdxjs`
    — remark plugin to support MDX.js
*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`micromark/micromark-extension-mdx`][mdx]
    — micromark extension to parse MDX
*   [`micromark/micromark-extension-mdxjs`][mdxjs]
    — micromark extension to parse MDX.js
*   [`syntax-tree/mdast-util-from-markdown`][from-markdown]
    — mdast parser using `micromark` to create mdast from markdown
*   [`syntax-tree/mdast-util-to-markdown`][to-markdown]
    — mdast serializer to create markdown from mdast

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

[build-badge]: https://github.com/syntax-tree/mdast-util-mdx/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/mdast-util-mdx/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-mdx.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-mdx

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-mdx.svg

[downloads]: https://www.npmjs.com/package/mdast-util-mdx

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-mdx.svg

[size]: https://bundlephobia.com/result?p=mdast-util-mdx

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

[mdx]: https://github.com/micromark/micromark-extension-mdx

[mdxjs]: https://github.com/micromark/micromark-extension-mdxjs
