# micromark-extension-mdx-md

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[micromark][]** extension to turn some markdown features off for MDX.

This package provides the low-level modules for integrating with the micromark
tokenizer but has no handling of compiling to HTML.

There is no corresponding **[mdast][]** utility.
But you can use this through either [`micromark-extension-mdx`][mdx] or
[`micromark-extension-mdxjs`][mdxjs] with [`mdast-util-mdx`][mdast-util-mdx] to
support all of MDX (or MDX.js).
Or, use it through `remark-mdx` or `remark-mdxjs` (**[remark][]**).

## Install

[npm][]:

```sh
npm install micromark-extension-mdx-md
```

## Use

```js
var mdxMd = require('micromark-extension-mdx-md')

micromark('...', {extensions: [mdxMd]})
```

## API

### `syntax()`

Turn some markdown features (HTML, autolinks, indented code) off for
[MDX][mdx-js] (or MDX.js).

The export of `syntax` is an extension for the micromark parser (to not tokenize
some constructs; can be passed in `extensions`).

There are no options yet.

## Related

*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`micromark/micromark-extension-mdx`][mdx]
    — micromark extension to support MDX
*   [`micromark/micromark-extension-mdxjs`][mdxjs]
    — micromark extension to support MDX.js
*   [`micromark/micromark-extension-mdx-expression`][mdx-expression]
    — micromark extension to support MDX (or MDX.js) expressions
*   [`micromark/micromark-extension-mdx-jsx`][mdx-jsx]
    — micromark extension to support MDX (or MDX.js) JSX
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

[build-badge]: https://github.com/micromark/micromark-extension-mdx-md/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-mdx-md/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-mdx-md.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-mdx-md

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-mdx-md.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-mdx-md

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-mdx-md.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-mdx-md

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

[mdx-jsx]: https://github.com/micromark/micromark-extension-mdx-jsx

[mdxjs-esm]: https://github.com/micromark/micromark-extension-mdxjs-esm

[mdx]: https://github.com/micromark/micromark-extension-mdx

[mdxjs]: https://github.com/micromark/micromark-extension-mdxjs

[mdast-util-mdx]: https://github.com/syntax-tree/mdast-util-mdx
