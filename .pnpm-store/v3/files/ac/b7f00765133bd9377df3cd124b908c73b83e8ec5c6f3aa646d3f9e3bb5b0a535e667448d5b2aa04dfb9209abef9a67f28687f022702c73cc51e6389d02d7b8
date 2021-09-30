# three-stdlib

[![Version](https://img.shields.io/npm/v/three-stdlib?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/three-stdlib)
[![Downloads](https://img.shields.io/npm/dt/three-stdlib.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/three-stdlib)
[![Twitter](https://img.shields.io/twitter/follow/pmndrs?label=%40pmndrs&style=flat&colorA=000000&colorB=000000&logo=twitter&logoColor=000000)](https://twitter.com/pmndrs)
[![Discord](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=000000)](https://discord.gg/ZZjjNvJ)
[![release](https://github.com/pmndrs/three-stdlib/actions/workflows/main.yml/badge.svg?style=flat&colorA=000000&colorB=000000)](https://github.com/pmndrs/three-stdlib/actions/workflows/main.yml)

Stand-alone version of [threejs/examples/jsm](https://github.com/mrdoob/three.js/tree/dev/examples/jsm) written in Typescript & built for ESM & CJS.

## Basic usage

    npm install three-stdlib

```ts
// Export collection
import * as STDLIB from 'three-stdlib'
// Flatbundle
import { OrbitControls, ... } from 'three-stdlib'
// Pick individual objects
import { OrbitControls } from 'three-stdlib/controls/OrbitControls'
```

## Problem

`threejs/examples` were always considered as something that you need to copy/paste into your project and adapt to your needs. But that's not how people use them. This causes numerous issues & little support.

## Solution

- Real, npm/node conform esm modules with marked dependencies
- Class based, optimized for tree-shaking, no global pollution, exports instead of collections
- A build system for esm and cjs
- Single flatbundle as well as individual transpiles
- Typesafety with simple annotation-like types
- CI, tests, linting, formatting (prettier)

But most importantly, allowing the people that use and rely on these primitives to hold a little stake, and to distribute the weight of maintaining it.

Let's give jsm/examples the care it deserves!

## How to contribute

If you want to get involved you could do any of the following:

- Create amazing stories for these examples for our dedicate storybook
- Convert some of the files to Typescript
- Add new examples for the library you think could be awesome for others
