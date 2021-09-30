# micromark-extension-mdxjs

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[micromark][]** extension to support MDX.js.
Use [`micromark-extension-mdx`][mdx] instead to support MDX agnostic to JS.

This package provides the low-level modules for integrating with the micromark
tokenizer but has no handling of compiling to HTML: go to a syntax tree instead.

You probably should use this package with [`mdast-util-mdx`][mdast-util-mdx]
(**[mdast][]**) or alternatively use both through [`remark-mdx`][remark-mdx]
(**[remark][]**).

The extensions can be used separately:

*   [`micromark/micromark-extension-mdx-expression`][mdx-expression]
    — support MDX (or MDX.js) expressions
*   [`micromark/micromark-extension-mdx-jsx`][mdx-jsx]
    — support MDX (or MDX.js) JSX
*   [`micromark/micromark-extension-mdx-md`][mdx-md]
    — turn some markdown features off for MDX (or MDX.js)
*   [`micromark/micromark-extension-mdxjs-esm`][mdxjs-esm]
    — support MDX.js ESM import/exports

## Install

[npm][]:

```sh
npm install micromark-extension-mdxjs
```

## Use

See [`mdast-util-mdx`][mdast-util-mdx] for an example.

## API

### `syntax(options)`

Support MDX.js.

The export is a function that can be called to return an extension for the
micromark parser (to tokenize MDX; can be passed in `extensions`).

##### `options`

Options are the same as for `mdx-expression`, `mdx-jsx`, and `mdxjs-esm`, but
come predefined to support JS inside MDX.

###### `options.acorn`

Acorn parser to use ([`Acorn`][acorn], default:
`acorn.Parser.extend(acornJsx())`).

###### `options.acornOptions`

Options to pass to acorn (`Object`, default: `{ecmaVersion: 2020, sourceType:
'module'}`).

###### `options.addResult`

Whether to add an `estree` field to tokens with the results from acorn
(`boolean`, default: `true`).

## Related

*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`micromark/micromark-extension-mdx`][mdx]
    — micromark extension to support MDX (agnostic to JS)
*   [`micromark/micromark-extension-mdx-expression`][mdx-expression]
    — micromark extension to support MDX (or MDX.js) expressions
*   [`micromark/micromark-extension-mdx-jsx`][mdx-jsx]
    — micromark extension to support MDX (or MDX.js) JSX
*   [`micromark/micromark-extension-mdx-md`][mdx-md]
    — micromark extension to support misc MDX changes
*   [`micromark/micromark-extension-mdxjs-esm`][mdxjs-esm]
    — micromark extension to support MDX.js ESM import/exports
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

[build-badge]: https://github.com/micromark/micromark-extension-mdxjs/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-mdxjs/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-mdxjs.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-mdxjs

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-mdxjs.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-mdxjs

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-mdxjs.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-mdxjs

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

[mdx]: https://github.com/micromark/micromark-extension-mdx

[mdx-expression]: https://github.com/micromark/micromark-extension-mdx-expression

[mdx-jsx]: https://github.com/micromark/micromark-extension-mdx-jsx

[mdx-md]: https://github.com/micromark/micromark-extension-mdx-md

[mdxjs-esm]: https://github.com/micromark/micromark-extension-mdxjs-esm

[mdast-util-mdx]: https://github.com/syntax-tree/mdast-util-mdx

[acorn]: https://github.com/acornjs/acorn

[remark-mdx]: https://github.com/mdx-js/mdx/tree/next/packages/remark-mdx
