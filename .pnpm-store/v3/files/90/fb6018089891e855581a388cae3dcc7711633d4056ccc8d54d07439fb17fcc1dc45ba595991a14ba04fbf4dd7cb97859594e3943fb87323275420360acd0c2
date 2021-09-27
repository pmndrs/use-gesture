# fast-copy

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

A [blazing fast](#benchmarks) deep object copier

## Table of contents

- [fast-copy](#fast-copy)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [Options](#options)
      - [isStrict](#isstrict)
      - [realm](#realm)
  - [Types supported](#types-supported)
  - [Benchmarks](#benchmarks)
      - [Simple objects](#simple-objects)
      - [Complex objects](#complex-objects)
      - [Big data](#big-data)
      - [Circular objects](#circular-objects)
      - [Special objects](#special-objects)
  - [Development](#development)

## Usage

```javascript
import copy from "fast-copy";
import { deepEqual } from "fast-equals";

const object = {
  array: [123, { deep: "value" }],
  map: new Map([["foo", {}], [{ bar: "baz" }, "quz"]])
};

const copiedObject = copy(object);

console.log(copiedObject === object); // false
console.log(deepEqual(copiedObject, object)); // true
```

## Options

#### isStrict

Starting in `2.0.0`, you can use the `isStrict` option to copy the object based on strict standards, meaning:

- Properties retain their original property descriptor
- Non-enumerable properties are copied
- Non-standard properties (e.g., keys on an `Array` object) are copied

This is significantly slower, so you should only use this if you believe it necessary.

```javascript
console.log(copy(object, { isStrict: true }));
```

**NOTE**: This option is also aliased as `copy.strict`.

```javascript
console.log(copy.strict(object));
```

#### realm

Under the hood, `fast-copy` uses `instanceof` to determine object types, which can cause false negatives when used in combination with `iframe`-based objects. To handle this edge case, you can pass the `realm` in options, which identifies which realm the object comes from and will use that realm to drive both comparisons and constructors for the copies.

```html
<iframe srcdoc="<script>var arr = ['foo', 'bar'];</script>"></iframe>
```

```javascript
const iframe = document.querySelector("iframe");
const arr = iframe.contentWindow.arr;

console.log(copy(arr, { realm: iframe.contentWindow })); // ['foo', 'bar']
```

## Types supported

The following object types are deeply cloned when they are either properties on the object passed, or the object itself:

- `Array`
- `ArrayBuffer`
- `Blob`
- `Buffer`
- `DataView`
- `Date`
- `Float32Array`
- `Float64Array`
- `Int8Array`
- `Int16Array`
- `Int32Array`
- `Map`
- `Object`
- `RegExp`
- `Set`
- `Uint8Array`
- `Uint8ClampedArray`
- `Uint16Array`
- `Uint32Array`
- `React` components
- Custom constructors

The following object types are copied directly, as they are either primitives, cannot be cloned, or the common use-case implementation does not expect cloning:

- `AsyncFunction`
- `Boolean`
- `Error`
- `Function`
- `GeneratorFunction`
- `Number`
- `Null`
- `Promise`
- `String`
- `Symbol`
- `Undefined`
- `WeakMap`
- `WeakSet`

Circular objects are supported out of the box as well. By default a cache based on `WeakSet` is used, but if `WeakSet` is not available then a standard `Object` fallback is used. The benchmarks quoted below are based on use of `WeakSet`.

## Benchmarks

#### Simple objects

_Small number of properties, all values are primitives_

|                    | Operations / second |
| ------------------ | ------------------- |
| **fast-copy**      | **2,692,822**       |
| clone              | 1,420,277           |
| lodash.cloneDeep   | 1,277,213           |
| fast-deepclone     | 768,982             |
| ramda              | 719,948             |
| fast-clone         | 567,342             |
| deepclone          | 509,547             |
| fast-copy (strict) | 420,804             |

#### Complex objects

_Large number of properties, values are a combination of primitives and complex objects_

|                    | Operations / second |
| ------------------ | ------------------- |
| **fast-copy**      | **109,352**         |
| fast-deepclone     | 101,808             |
| ramda              | 93,103              |
| deepclone          | 74,270              |
| fast-clone         | 49,911              |
| clone              | 46,355              |
| lodash.cloneDeep   | 43,900              |
| fast-copy (strict) | 33,440              |

#### Big data

_Very large number of properties with high amount of nesting, mainly objects and arrays_

|                    | Operations / second |
| ------------------ | ------------------- |
| **fast-copy**      | 123                 |
| fast-deepclone     | 101                 |
| fast-clone         | 93                  |
| lodash.cloneDeep   | 92                  |
| deepclone          | 66                  |
| clone              | 50                  |
| fast-copy (strict) | 42                  |
| ramda              | 5                   |

#### Circular objects

_Objects that deeply reference themselves_

|                            | Operations / second |
| -------------------------- | ------------------- |
| **fast-copy**              | **1,143,074**       |
| ramda                      | 750,430             |
| clone                      | 722,632             |
| lodash.cloneDeep           | 580,005             |
| deepclone                  | 490,824             |
| fast-deepclone             | 446,585             |
| fast-copy (strict)         | 321,678             |
| fast-clone (not supported) | 0                   |

#### Special objects

_Custom constructors, React components, etc_

|                    | Operations / second |
| ------------------ | ------------------- |
| **fast-copy**      | **78,422**          |
| clone              | 52,165              |
| lodash.cloneDeep   | 39,648              |
| ramda              | 32,372              |
| fast-deepclone     | 27,518              |
| fast-clone         | 27,495              |
| deepclone          | 16,552              |
| fast-copy (strict) | 12,509              |

## Development

Standard practice, clone the repo and `yarn` (or `npm i`) to get the dependencies. The following npm scripts are available:

- benchmark => run benchmark tests against other equality libraries
- build => build dist files with `rollup`
- clean => run `rimraf` on the `dist` folder
- dev => start webpack playground App
- dist => run `build` and `build:minified` scripts
- lint => run ESLint on all files in `src` folder (also runs on `dev` script)
- lint:fix => run `lint` script, but with auto-fixer
- prepublishOnly => run `lint`, `test:coverage`, and `dist` scripts
- release => run `prepublishOnly` and release with new version
- release:beta => run `prepublishOnly` and release with new beta version
- release:dry => run `prepublishOnly` and simulate a new release
- start => run `dev`
- test => run AVA with NODE_ENV=test on all files in `test` folder
- test:coverage => run same script as `test` with code coverage calculation via `nyc`
- test:watch => run same script as `test` but keep persistent watcher
