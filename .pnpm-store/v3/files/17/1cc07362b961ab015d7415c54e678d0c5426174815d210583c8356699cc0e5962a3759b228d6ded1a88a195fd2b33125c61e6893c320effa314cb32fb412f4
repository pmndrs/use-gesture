html-entities
=============

Fastest HTML entities library.

Comes with both TypeScript and Flow types.

Installation
------------

```bash
$ npm install html-entities
```

Usage
-----

### encode(text, options)

Encodes text replacing HTML special characters (`<>&"'`) plus other character ranges depending on `mode` option value.

```js
import {encode} from 'html-entities';

encode('< > " \' & © ∆');
// -> '&lt; &gt; &quot; &apos; &amp; © ∆'

encode('< ©', {mode: 'nonAsciiPrintable'});
// -> '&lt; &copy;'

encode('< ©', {mode: 'nonAsciiPrintable', level: 'xml'});
// -> '&lt; &#169;'
```

Options:

#### level

 * `all` alias to `html5` (default).
 * `html5` uses `HTML5` named references.
 * `html4` uses `HTML4` named references.
 * `xml` uses `XML` named references.

#### mode

 * `specialChars` encodes only HTML special characters (default).
 * `nonAscii` encodes HTML special characters and everything outside of the [ASCII character range](https://en.wikipedia.org/wiki/ASCII).
 * `nonAsciiPrintable` encodes HTML special characters and everything outiside of the [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters).
 * `extensive` encodes all non-printable characters, non-ASCII characters and all characters with named references.

#### numeric

 * `decimal` uses decimal numbers when encoding html entities. i.e. `&#169;` (default).
 * `hexadecimal` uses hexadecimal numbers when encoding html entities. i.e. `&#xa9;`.


### decode(text, options)

Decodes text replacing entities to characters. Unknown entities are left as is.

```js
import {decode} from 'html-entities';

decode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;');
// -> '< > " \' & © ∆'

decode('&copy;', {level: 'html5'});
// -> '©'

decode('&copy;', {level: 'xml'});
// -> '&copy;'
```

Options:

#### level

 * `all` alias to `html5` (default).
 * `html5` uses `HTML5` named references.
 * `html4` uses `HTML4` named references.
 * `xml` uses `XML` named references.

#### scope

 * `body` emulates behavior of browser when parsing tag bodies: entities without semicolon are also replaced (default).
 * `attribute` emulates behavior of browser when parsing tag attributes: entities without semicolon are replaced when not followed by equality sign `=`.
 * `strict` ignores entities without semicolon.

### decodeEntity(text, options)

Decodes a single HTML entity. Unknown entitiy is left as is.

```js
import {decodeEntity} from 'html-entities';

decodeEntity('&lt;');
// -> '<'

decodeEntity('&copy;', {level: 'html5'});
// -> '©'

decodeEntity('&copy;', {level: 'xml'});
// -> '&copy;'
```

Options:

#### level

 * `all` alias to `html5` (default).
 * `html5` uses `HTML5` named references.
 * `html4` uses `HTML4` named references.
 * `xml` uses `XML` named references.

Performance
-----------

Statistically significant comparison with other libraries using `benchmark.js`.
Results by this library are marked with `*`.
The source code of the benchmark is available at `benchmark/benchmark.ts`.

```
Common

    Initialization / Load speed

      * #1: html-entities x 2,544,400 ops/sec ±4.52% (77 runs sampled)
        #2: entities x 1,757,526 ops/sec ±3.99% (81 runs sampled)
        #3: he x 1,281,542 ops/sec ±9.31% (74 runs sampled)

HTML5

    Encode test

      * #1: html-entities.encode - html5, nonAscii x 402,711 ops/sec ±0.61% (92 runs sampled)
      * #2: html-entities.encode - html5, nonAsciiPrintable x 402,631 ops/sec ±2.99% (92 runs sampled)
      * #3: html-entities.encode - html5, extensive x 269,162 ops/sec ±0.26% (97 runs sampled)
        #4: entities.encodeNonAsciiHTML x 260,447 ops/sec ±2.53% (95 runs sampled)
        #5: entities.encodeHTML x 101,059 ops/sec ±3.99% (91 runs sampled)
        #6: he.encode x 93,180 ops/sec ±3.17% (92 runs sampled)

    Decode test

      * #1: html-entities.decode - html5, attribute x 340,043 ops/sec ±2.82% (92 runs sampled)
      * #2: html-entities.decode - html5, body x 330,002 ops/sec ±1.52% (87 runs sampled)
      * #3: html-entities.decode - html5, strict x 320,582 ops/sec ±5.34% (88 runs sampled)
        #4: entities.decodeHTMLStrict x 286,294 ops/sec ±3.14% (89 runs sampled)
        #5: entities.decodeHTML x 232,856 ops/sec ±3.05% (90 runs sampled)
        #6: he.decode x 163,300 ops/sec ±0.62% (92 runs sampled)

HTML4

    Encode test

      * #1: html-entities.encode - html4, nonAsciiPrintable x 391,885 ops/sec ±0.27% (95 runs sampled)
      * #2: html-entities.encode - html4, nonAscii x 400,086 ops/sec ±2.54% (94 runs sampled)
      * #3: html-entities.encode - html4, extensive x 193,623 ops/sec ±2.70% (92 runs sampled)

    Decode test

      * #1: html-entities.decode - html4, attribute x 356,174 ops/sec ±0.49% (96 runs sampled)
      * #2: html-entities.decode - html4, body x 342,666 ops/sec ±2.38% (91 runs sampled)
      * #3: html-entities.decode - html4, strict x 341,667 ops/sec ±4.46% (87 runs sampled)

XML

    Encode test

      * #1: html-entities.encode - xml, nonAscii x 450,968 ops/sec ±2.73% (92 runs sampled)
      * #2: html-entities.encode - xml, nonAsciiPrintable x 432,058 ops/sec ±4.12% (93 runs sampled)
      * #3: html-entities.encode - xml, extensive x 265,336 ops/sec ±3.41% (93 runs sampled)
        #4: entities.encodeXML x 254,862 ops/sec ±3.01% (95 runs sampled)

    Decode test

      * #1: html-entities.decode - xml, strict x 432,820 ops/sec ±0.53% (89 runs sampled)
      * #2: html-entities.decode - xml, attribute x 426,037 ops/sec ±0.75% (94 runs sampled)
      * #3: html-entities.decode - xml, body x 424,618 ops/sec ±3.47% (93 runs sampled)
        #4: entities.decodeXML x 378,536 ops/sec ±2.48% (93 runs sampled)

Escaping

    Escape test

      * #1: html-entities.encode - xml, specialChars x 1,424,362 ops/sec ±0.55% (95 runs sampled)
        #2: he.escape x 962,420 ops/sec ±3.12% (94 runs sampled)
        #3: entities.escapeUTF8 x 443,138 ops/sec ±1.06% (90 runs sampled)
        #4: entities.escape x 197,515 ops/sec ±2.73% (91 runs sampled)
```

License
-------

MIT

Security contact information
----------------------------

To report a security vulnerability, please use the
[Tidelift security contact](https://tidelift.com/security). Tidelift will
coordinate the fix and disclosure.

`html-entities` for enterprise
------------------------------

Available as part of the Tidelift Subscription

The maintainers of `html-entities` and thousands of other packages are working with
Tidelift to deliver commercial support and maintenance for the open source
dependencies you use to build your applications. Save time, reduce risk, and
improve code health, while paying the maintainers of the exact dependencies you
use.
[Learn more.](https://tidelift.com/subscription/pkg/npm-html-entities?utm_source=npm-html-entities&utm_medium=referral&utm_campaign=enterprise)
