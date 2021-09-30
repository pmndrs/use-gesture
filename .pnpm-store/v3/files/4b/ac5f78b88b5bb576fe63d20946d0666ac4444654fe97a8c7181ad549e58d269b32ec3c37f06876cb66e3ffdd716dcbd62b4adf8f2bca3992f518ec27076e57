# tsd ![CI](https://github.com/SamVerschueren/tsd/workflows/CI/badge.svg)

> Check TypeScript type definitions


## Install

```
$ npm install tsd
```


## Overview

This tool lets you write tests for your type definitions (i.e. your `.d.ts` files) by creating files with the `.test-d.ts` extension.

These `.test-d.ts` files will not be executed, and not even compiled in the standard way. Instead, these files will be parsed for special constructs such as `expectError<Foo>(bar)` and then statically analyzed against your type definitions.


## Usage

Let's assume we wrote a `index.d.ts` type definition for our concat module.

```ts
declare const concat: {
	(value1: string, value2: string): string;
	(value1: number, value2: number): string;
};

export default concat;
```

In order to test this definition, add a `index.test-d.ts` file.

```ts
import concat from '.';

concat('foo', 'bar');
concat(1, 2);
```

Running `npx tsd` as a command will verify that the type definition works correctly.

Let's add some extra [assertions](#assertions). We can assert the return type of our function call to match a certain type.

```ts
import {expectType} from 'tsd';
import concat from '.';

expectType<string>(concat('foo', 'bar'));
expectType<string>(concat(1, 2));
```

The `tsd` command will succeed again.

We change our implementation and type definition to return a `number` when both inputs are of type `number`.

```ts
declare const concat: {
	(value1: string, value2: string): string;
	(value1: number, value2: number): number;
};

export default concat;
```

If we don't change the test file and we run the `tsd` command again, the test will fail.

<img src="media/screenshot.png" width="1330">

### Strict type assertions

Type assertions are strict. This means that if you expect the type to be `string | number` but the argument is of type `string`, the tests will fail.

```ts
import {expectType} from 'tsd';
import concat from '.';

expectType<string>(concat('foo', 'bar'));
expectType<string | number>(concat('foo', 'bar'));
```

If we run `tsd`, we will notice that it reports an error because the `concat` method returns the type `string` and not `string | number`.

<img src="media/strict-assert.png" width="1330">

If you still want loose type assertion, you can use `expectAssignable` for that.

```ts
import {expectType, expectAssignable} from 'tsd';
import concat from '.';

expectType<string>(concat('foo', 'bar'));
expectAssignable<string | number>(concat('foo', 'bar'));
```

### Top-level `await`

If your method returns a `Promise`, you can use top-level `await` to resolve the value instead of wrapping it in an `async` [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

```ts
import {expectType, expectError} from 'tsd';
import concat from '.';

expectType<Promise<string>>(concat('foo', 'bar'));

expectType<string>(await concat('foo', 'bar'));

expectError(await concat(true, false));
```

### Test directory

When you have spread your tests over multiple files, you can store all those files in a test directory called `test-d`. If you want to use another directory name, you can change it in `package.json`.

```json
{
	"name": "my-module",
	"tsd": {
		"directory": "my-test-dir"
	}
}
```

Now you can put all your test files in the `my-test-dir` directory.

### Custom TypeScript config

By default, `tsd` applies the following configuration:

```json5
{
	"strict": true,
	"jsx": "react",
	"target": "es2017",
	"lib": ["es2017"],
	"module": "commonjs",
	// The following option is set and is not overridable:
	"moduleResolution": "node"
}
```

These options will be overridden if a `tsconfig.json` file is found in your project. You also have the possibility to provide a custom config by specifying it in `package.json`:

```json
{
	"name": "my-module",
	"tsd": {
		"compilerOptions": {
			"strict": false
		}
	}
}
```

*Default options will apply if you don't override them explicitly.* You can't override the `moduleResolution` option.

## Assertions

### expectType&lt;T&gt;(value)

Check that the type of `value` is identical to type `T`.

### expectNotType&lt;T&gt;(value)

Check that the type of `value` is not identical to type `T`.

### expectAssignable&lt;T&gt;(value)

Check that the type of `value` is assignable to type `T`.

### expectNotAssignable&lt;T&gt;(value)

Check that the type of `value` is not assignable to type `T`.

### expectError(function)

Check if the function call has argument type errors.

### expectError&lt;T&gt;(value)

Check if a value is of the provided type `T`.

### expectDeprecated(value)

Check that `value` is marked a [`@deprecated`](https://jsdoc.app/tags-deprecated.html).

### expectNotDeprecated(value)

Check that `value` is not marked a [`@deprecated`](https://jsdoc.app/tags-deprecated.html).

### printType(value)

Print the type of `value` as a warning.

Useful if you don't know the exact type of the expression passed to `printType()` or the type is too complex to write out by hand.


## Programmatic API

You can use the programmatic API to retrieve the diagnostics and do something with them. This can be useful to run the tests with AVA, Jest or any other testing framework.

```ts
import tsd from 'tsd';

(async () => {
	const diagnostics = await tsd();

	console.log(diagnostics.length);
	//=> 2
})();
```

### tsd([options])

Retrieve the type definition diagnostics of the project.

#### options

Type: `object`

##### cwd

Type: `string`<br>
Default: `process.cwd()`

Current working directory of the project to retrieve the diagnostics for.

##### typingsFile

Type: `string`<br>
Default: The `types` property in `package.json`.

Path to the type definition file you want to test. This can be useful when using a test runner to test specific type definitions per test.

##### testFiles

Type: `string[]`<br>
Default: Finds files with `.test-d.ts` or `.test-d.tsx` extension.

An array of test files with their path. Uses [globby](https://github.com/sindresorhus/globby) under the hood so that you can fine tune test file discovery.

## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
