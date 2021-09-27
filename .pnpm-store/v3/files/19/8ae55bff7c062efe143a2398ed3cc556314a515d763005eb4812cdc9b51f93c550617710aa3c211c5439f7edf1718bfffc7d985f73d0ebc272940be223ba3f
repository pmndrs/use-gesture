# mem

> [Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input

Memory is automatically released when an item expires or the cache is cleared.

By default, **only the first argument is considered** and it only works with [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). If you need to cache multiple arguments or cache `object`s *by value*, have a look at alternative [caching strategies](#caching-strategy) below.

## Install

```
$ npm install mem
```

## Usage

```js
const mem = require('mem');

let i = 0;
const counter = () => ++i;
const memoized = mem(counter);

memoized('foo');
//=> 1

// Cached as it's the same argument
memoized('foo');
//=> 1

// Not cached anymore as the argument changed
memoized('bar');
//=> 2

memoized('bar');
//=> 2

// Only the first argument is considered by default
memoized('bar', 'foo');
//=> 2
```

##### Works fine with promise returning functions

```js
const mem = require('mem');

let i = 0;
const counter = async () => ++i;
const memoized = mem(counter);

(async () => {
	console.log(await memoized());
	//=> 1

	// The return value didn't increase as it's cached
	console.log(await memoized());
	//=> 1
})();
```

```js
const mem = require('mem');
const got = require('got');
const delay = require('delay');

const memGot = mem(got, {maxAge: 1000});

(async () => {
	await memGot('https://sindresorhus.com');

	// This call is cached
	await memGot('https://sindresorhus.com');

	await delay(2000);

	// This call is not cached as the cache has expired
	await memGot('https://sindresorhus.com');
})();
```

### Caching strategy

By default, only the first argument is compared via exact equality (`===`) to determine whether a call is identical.

```js
const power = mem((a, b) => Math.power(a, b));

power(2, 2); // => 4, stored in cache with the key 2 (number)
power(2, 3); // => 4, retrieved from cache at key 2 (number), it's wrong
```

You will have to use the `cache` and `cacheKey` options appropriate to your function. In this specific case, the following could work:

```js
const power = mem((a, b) => Math.power(a, b), {
  cacheKey: arguments_ => arguments_.join(',')
});

power(2, 2); // => 4, stored in cache with the key '2,2' (both arguments as one string)
power(2, 3); // => 8, stored in cache with the key '2,3'
```

More advanced examples follow.

#### Example: Options-like argument

If your function accepts an object, it won't be memoized out of the box:

```js
const heavyMemoizedOperation = mem(heavyOperation);

heavyMemoizedOperation({full: true}); // Stored in cache with the object as key
heavyMemoizedOperation({full: true}); // Stored in cache with the object as key, again
// The objects look the same but for JS they're two different objects
```

You might want to serialize or hash them, for example using `JSON.stringify` or something like [serialize-javascript](https://github.com/yahoo/serialize-javascript), which can also serialize `RegExp`, `Date` and so on.

```js
const heavyMemoizedOperation = mem(heavyOperation, {cacheKey: JSON.stringify});

heavyMemoizedOperation({full: true}); // Stored in cache with the key '[{"full":true}]' (string)
heavyMemoizedOperation({full: true}); // Retrieved from cache
```

The same solution also works if it accepts multiple serializable objects:

```js
const heavyMemoizedOperation = mem(heavyOperation, {cacheKey: JSON.stringify});

heavyMemoizedOperation('hello', {full: true}); // Stored in cache with the key '["hello",{"full":true}]' (string)
heavyMemoizedOperation('hello', {full: true}); // Retrieved from cache
```

#### Example: Multiple non-serializable arguments

If your function accepts multiple arguments that aren't supported by `JSON.stringify` (e.g. DOM elements and functions), you can instead extend the initial exact equality (`===`) to work on multiple arguments using [`many-keys-map`](https://github.com/fregante/many-keys-map):

```js
const ManyKeysMap = require('many-keys-map');

const addListener = (emitter, eventName, listener) => emitter.on(eventName, listener);

const addOneListener = mem(addListener, {
	cacheKey: arguments_ => arguments_, // Use *all* the arguments as key
	cache: new ManyKeysMap() // Correctly handles all the arguments for exact equality
});

addOneListener(header, 'click', console.log); // `addListener` is run, and it's cached with the `arguments` array as key
addOneListener(header, 'click', console.log); // `addListener` is not run again
addOneListener(mainContent, 'load', console.log); // `addListener` is run, and it's cached with the `arguments` array as key
```

Better yet, if your function’s arguments are compatible with `WeakMap`, you should use [`deep-weak-map`](https://github.com/futpib/deep-weak-map) instead of `many-keys-map`. This will help avoid memory leaks.

## API

### mem(fn, options?)

#### fn

Type: `Function`

Function to be memoized.

#### options

Type: `object`

##### maxAge

Type: `number`\
Default: `Infinity`

Milliseconds until the cache expires.

##### cacheKey

Type: `Function`\
Default: `arguments_ => arguments_[0]`\
Example: `arguments_ => JSON.stringify(arguments_)`

Determines the cache key for storing the result based on the function arguments. By default, **only the first argument is considered**.

A `cacheKey` function can return any type supported by `Map` (or whatever structure you use in the `cache` option).

Refer to the [caching strategies](#caching-strategy) section for more information.

##### cache

Type: `object`\
Default: `new Map()`

Use a different cache storage. Must implement the following methods: `.has(key)`, `.get(key)`, `.set(key, value)`, `.delete(key)`, and optionally `.clear()`. You could for example use a `WeakMap` instead or [`quick-lru`](https://github.com/sindresorhus/quick-lru) for a LRU cache.

Refer to the [caching strategies](#caching-strategy) section for more information.

### mem.decorator(options)

Returns a [decorator](https://github.com/tc39/proposal-decorators) to memoize class methods or static class methods.

Notes:

- Only class methods and getters/setters can be memoized, not regular functions (they aren't part of the proposal);
- Only [TypeScript’s decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators) are supported, not [Babel’s](https://babeljs.io/docs/en/babel-plugin-proposal-decorators), which use a different version of the proposal;
- Being an experimental feature, they need to be enabled with `--experimentalDecorators`; follow TypeScript’s docs.

#### options

Type: `object`

Same as options for `mem()`.

```ts
import mem = require('mem');

class Example {
	index = 0

	@mem.decorator()
	counter() {
		return ++this.index;
	}
}

class ExampleWithOptions {
	index = 0

	@mem.decorator({maxAge: 1000})
	counter() {
		return ++this.index;
	}
}
```

### mem.clear(fn)

Clear all cached data of a memoized function.

#### fn

Type: `Function`

Memoized function.

## Tips

### Cache statistics

If you want to know how many times your cache had a hit or a miss, you can make use of [stats-map](https://github.com/SamVerschueren/stats-map) as a replacement for the default cache.

#### Example

```js
const mem = require('mem');
const StatsMap = require('stats-map');
const got = require('got');

const cache = new StatsMap();
const memGot = mem(got, {cache});

(async () => {
	await memGot('https://sindresorhus.com');
	await memGot('https://sindresorhus.com');
	await memGot('https://sindresorhus.com');

	console.log(cache.stats);
	//=> {hits: 2, misses: 1}
})();
```

## Related

- [p-memoize](https://github.com/sindresorhus/p-memoize) - Memoize promise-returning & async functions

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-mem?utm_source=npm-mem&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
