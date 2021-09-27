<div align="center">
  <h1>jest-chain</h1>

🃏⛓

Chain Jest matchers together to create one powerful assertion

</div>

<hr />

[![Build Status](https://img.shields.io/travis/mattphillips/jest-chain.svg?style=flat-square)](https://travis-ci.org/mattphillips/jest-chain)
[![Code Coverage](https://img.shields.io/codecov/c/github/mattphillips/jest-chain.svg?style=flat-square)](https://codecov.io/github/mattphillips/jest-chain)
[![version](https://img.shields.io/npm/v/jest-chain.svg?style=flat-square)](https://www.npmjs.com/package/jest-chain)
[![downloads](https://img.shields.io/npm/dm/jest-chain.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jest-chain&from=2017-09-14)
[![MIT License](https://img.shields.io/npm/l/jest-chain.svg?style=flat-square)](https://github.com/mattphillips/jest-chain/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Roadmap](https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square)](https://github.com/mattphillips/jest-chain/blob/master/docs/ROADMAP.md)
[![Examples](https://img.shields.io/badge/%F0%9F%92%A1-examples-ff615b.svg?style=flat-square)](https://github.com/mattphillips/jest-chain/blob/master/docs/EXAMPLES.md)

* 🍸 Less code duplication
* 🤗 Chain core and custom matchers together
* 👾 Expressive assertions
* 🚨 Fail fast assertions

## Problem

Often in [Jest](https://facebook.github.io/jest/) when you are writing tests you may want to perform multiple assertions on the
same variable. Currently to achieve this you have to write an individual `expect` for each
assertion.

For example:

```js
it('add 1 and 1', () => {
  const actual = 1 + 1;
  expect(actual).toBe(2);
  expect(actual).toBeGreaterThan(1);
  expect(actual).toBeLessThan(3);
});
```

With `jest-chain` this can instead be written by chaining the matchers together:

```js
it('add 1 and 1', () => {
  expect(1 + 1)
    .toBe(2)
    .toBeGreaterThan(1)
    .toBeLessThan(3);
});
```

## Installation

With npm:

```sh
npm install --save-dev jest-chain
```

With yarn:

```sh
yarn add -D jest-chain
```

## Setup

Add `jest-chain` to your Jest `setupFilesAfterEnv` configuration. [See for help](https://jestjs.io/docs/en/next/configuration#setupfilesafterenv-array)

### Jest >v24

```json
"jest": {
  "setupFilesAfterEnv": ["jest-chain"]
}
```

### Jest <v23

```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-chain"
}
```

If you are already using another test framework, like [jest-extended](https://github.com/jest-community/jest-extended), then you should create a test setup file and `require` each of the frameworks you are using (including `jest-chain` 😉)

For example:

```js
// ./testSetup.js
require('jest-chain');
require('any other test framework libraries you are using');
```

Then in your Jest config:

```json
"jest": {
  "setupTestFrameworkScriptFile": "./testSetup.js"
}
```

## Typescript

If your editor does not recognise the chained jest matchers, add a `global.d.ts` file to your project with:


```js
import 'jest-chain';
```

__Note:__ if you are using any other custom matcher libraries then make sure that the `jest-chain` type import is at the bottom so that the types can chain core matchers with your customer matcher library.

## Usage

Use Jest's `expect` function the same way you would normally but with the ability to chain any
matcher to another, including nested matchers such as: `.not`, `.resolves` and `.rejects`.

`jest-chain` supports custom Jest matchers, like [jest-extended](https://github.com/jest-community/jest-extended), in the usual way with `expect.extend(matcher)`.
Each of these custom matchers are also chainable.

Some examples:

```js
expect([1, 2, 3])
  .toHaveLength(3)
  .toEqual([1, 2, 3]);
```

```js
// with jest-extended
expect([1, 2, 3])
  .toBeArray()
  .toBeArrayOfSize(3)
  .toEqual([1, 2, 3])
  .toIncludeAnyMembers([1, 2]);

expect(100)
  .toBePositive()
  .toBeGreaterThan(99)
  .toBeLessThan(101)
  .toBeNumber()
  .not.toBeNaN()
  .toBe(100);

expect('hello world')
  .toBeString()
  .toEqualCaseInsensitive('HELLO WORLD')
  .toStartWith('hello')
  .toEndWith('world')
  .not.toInclude('!')
  .toBe('hello world');
```

**Matcher failures will fail fast from left to right, they have no impact on each other. 🎉**

_Note: `jest-chain` does not currently support asymmetric matcher chaining, if you want this please send a PR_ 😊

## LICENSE

[MIT](/LICENSE)
