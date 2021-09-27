<div align="center">
	<h1 align="center">meros</h1>
	<p align="center"><code>yarn add meros</code> makes reading multipart responses simple</p>
	<hr />
	<span>
		<a href="https://github.com/maraisr/meros/actions?query=workflow:CI+branch:main">
			<img src="https://github.com/maraisr/meros/workflows/CI/badge.svg?query=branch:main"/>
		</a>
		<a href="https://npm.im/meros">
			<img src="https://img.shields.io/npm/dm/meros" alt="downloads"/>
		</a>
		<a href="https://bundlephobia.com/result?p=meros">
			<img src="https://badgen.net/bundlephobia/minzip/meros" alt="size"/>
		</a>
	</span>
</div>

## ⚡ Features

- No dependencies
- Super [performant](#-benchmark)
- Supports _any_<sup>1</sup> `content-type`
- _preamble_ and _epilogue_ don't yield
- Browser-Compatible
- Plugs into existing libraries like Relay and rxjs

## ⚙️ Install

```sh
yarn add meros
```

## 🚀 Usage

```ts
// Rely on bundler/environment dection
import { meros } from 'meros';

const parts = await fetch('/api').then(meros);

// As a simple Async Generator
for await (const part of parts) {
  // Do something with this part
}

// Used with rxjs streams
from(parts).pipe(
  tap((part) => {
    // Do something with it
  }),
);
```

## _Specific Environment_

```ts
// Browser
import { meros } from 'meros/browser';
// import { meros } from 'https://cdn.skypack.dev/meros';

const parts = await fetch('/api').then(meros);

// Node
import http from 'http';
import { meros } from 'meros/node';

const response = await new Promise((resolve) => {
  const request = http.get(`http://my-domain/mock-ep`, (response) => {
    resolve(response);
  });
  request.end();
});

const parts = await meros(response);
```

## 🎒 Notes

This library aims to implement [RFC1341] in its entirety, however we aren't
there yet. That being said, you may very well use this library in other
scenarios like streaming in file form uploads.

Please note; be sure to define a boundary that can be guaranteed to never
collide with things from the body:

> _Because encapsulation boundaries must not appear in the body parts being
> encapsulated, a user agent must exercise care to choose a unique boundary._
>
> <small>~ [RFC1341] 7.2.1</small>

- `meros` comes from Ancient Greek μέρος méros, meaning "part".

### _Caveats_

- No support the `/alternative` , `/digest` _or_ `/parallel` subtype at this
  time.
- No support for
  [nested multiparts](https://tools.ietf.org/html/rfc1341#appendix-C)

## 🔎 API

Meros offers two flavours, both for the browser and for node; but their api's
are fundamentally the same.

> **Note:** The type `Response` is used loosely here and simply alludes to
> Node's `IncomingMessage` or the browser's `Response` type.

### `meros(response: Response, options?: Options)`

Returns: `Promise<Response | AsyncGenerator<Part | Part[]>`

Meros returns a promise that will resolve to an `AsyncGenerator` if the response
is of `multipart/mixed` mime, or simply returns the `Response` if something
else; helpful for middlewares. The idea here being that you run meros as a chain
off fetch.

```ts
fetch('/api').then(meros);
```

> If the `content-type` is **NOT** a multipart, then meros will resolve with the
> response argument.
>
> <details>
> <summary>Example on how to handle this case</summary>
>
> ```ts
> import { meros } from 'meros';
>
> const response = await fetch('/api'); // Assume this returns json
> const parts = await meros(response);
>
> if (parts[Symbol.asyncIterator] < 'u') {
>   for await (const part of parts) {
>     // Do something with this part
>   }
> } else {
>   const data = await parts.json();
> }
> ```
>
> </details>

each `Part` gives you access to:

- `json: boolean` ~ Tells you the `body` would be a JavaScript object of your
  defined generic `T`.
- `headers: object` ~ A key-value pair of all headers discovered from this part.
- `body: T | Fallback` ~ Is the _body_ of the part, either as a JavaScript
  object (noted by `json`) _or_ the base type of the environment
  (`Buffer | string`, for Node and Browser respectively).

#### `options.multiple: boolean`

Default: `false`

Setting this to `true` will yield once for all available parts of a chunk,
rather than yielding once per part. This is an optimization technique for
technologies like GraphQL where rather than commit the payload to the store, to
be added-to in the next process-tick we can simply do that synchronously.

> **Important:** This will alter the behaviour and yield arrays—than yield
> payloads.

```ts
const chunks = await fetch('/api').then((response) =>
  meros(response, { multiple: true }),
);

// As a simple Async Generator
for await (const parts of chunks) {
  for (const part of parts) {
    // Do something with this part, maybe aggregate?
  }
}
```

## 💨 Benchmark

```
Validation :: node
✔ meros
✘ it-multipart (FAILED @ "should match reference patch set")

Benchmark :: node
  meros                     x 289,318 ops/sec ±1.21% (81 runs sampled)
  it-multipart              x 173,136 ops/sec ±0.85% (80 runs sampled)

Validation :: browser
✔ meros
✘ fetch-multipart-graphql (FAILED @ "should match reference patch set")

Benchmark :: browser
  meros                     x 1,000,417 ops/sec ±1.41% (81 runs sampled)
  fetch-multipart-graphql   x 353,207 ops/sec ±0.92% (83 runs sampled)
```

> Ran with Node v15.8.0

## ❤ Thanks

Special thanks to [Luke Edwards](https://github.com/lukeed) for performance
guidance and high level api design.

## License

MIT © [Marais Rossouw](https://marais.io)

<details>
<summary>Footnote</summary>

> 1: By default, we'll look for JSON, and parse that for you. If not, we'll give
> you the body as what was streamed.

</details>

[rfc1341]: https://tools.ietf.org/html/rfc1341 'The Multipart Content-Type'
