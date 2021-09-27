probe-image-size
================

[![Build Status](https://img.shields.io/travis/nodeca/probe-image-size/master.svg?style=flat)](https://travis-ci.org/nodeca/probe-image-size)
[![NPM version](https://img.shields.io/npm/v/probe-image-size.svg?style=flat)](https://www.npmjs.org/package/probe-image-size)
[![Coverage Status](https://coveralls.io/repos/github/nodeca/probe-image-size/badge.svg?branch=master)](https://coveralls.io/github/nodeca/probe-image-size?branch=master)

> Get image size without full download. Supported image types:
> JPG, GIF, PNG, WebP, BMP, TIFF, SVG, PSD, ICO.

Key features:

- small size, no heavy dependencies
- works with remote and local data
- effective with big images (speed/memory), download minimal data from remotes
- easy to browserify (splitted to components)


Install
-------

```bash
npm install probe-image-size
```

Example
-------

```js
const probe = require('probe-image-size');

// Get by URL
let result = await probe('http://example.com/image.jpg');
console.log(result); // =>
/*
  {
    width: xx,
    height: yy,
    type: 'jpg',
    mime: 'image/jpeg',
    wUnits: 'px',
    hUnits: 'px',
    url: 'http://example.com/image.jpg'
  }
*/


// By URL with options
let result = await probe('http://example.com/image.jpg', { rejectUnauthorized: false });
console.log(result);


// From the stream
let result = await probe(require('fs').createReadStream('image.jpg'));
console.log(result);


// From a Buffer (sync)
let data = require('fs').readFileSync('image.jpg');
console.log(probe.sync(data));
```


API
---

Note:

- You can access/browserify `stream.js` / `http.js` / `sync.js` directly.
- If you don't like `http.js` dependencies, you can create your own wrapper
  for `stream.js`.

### probe(src [, options|keepOpen]) -> Promise

- `src` can be of this types:
  - _String_ - URL to fetch
  - _Stream_ - readable stream
- `options` - HTTP only. See [`needle` documentation](https://github.com/tomas/needle#request-options), and customized [defaults](https://github.com/nodeca/probe-image-size/blob/master/http.js#L13).
- `keepOpen` (Boolean) - stream only. Keep stream open after parser finishes
  (input stream will be closed by default)

`result` (Promise) contains:

```js
{
  width: XX,
  height: YY,
  length: ZZ,   // byte length of the file (if available, HTTP only)
  type: ...,    // image 'type' (usual file name extention)
  mime: ...,    // mime type
  wUnits: 'px', // width units type ('px' by default, can be different for SVG)
  hUnits: 'px', // height units type ('px' by default, can be different for SVG)
  url: ...,     // HTTP only, last url for the image in chain of redirects
                // (if no redirects, same as src)
  variants: [ { width, height }, ... ] | undefined // full list of sizes for ICO
}
```

Returned errors can be extended with 2 fields:

- `code` - equals to `ECONTENT` if the library failed to parse the file;
- `status` - equals to a HTTP status code if it receives a non-200 response.


### sync.probe(src) -> result|null

Sync version can eat arrays, typed arrays and buffers. On success it returns
the same result as async version. On fail it returns null.

__Note.__ Formats like JPEG & TIFF can store size anywhere (far from the head).
That usually does not happens, but if you need guarantees - always provide full
file content to sync methods. We strongly recommend to use async version
as memory-friendly.


Similar projects
----------------

- [image-size](https://github.com/netroy/image-size)


Support probe-image-size
------------------------

You can support this project via [Tidelift subscription](https://tidelift.com/subscription/pkg/npm-probe-image-size?utm_source=npm-probe-image-size&utm_medium=referral&utm_campaign=readme).
