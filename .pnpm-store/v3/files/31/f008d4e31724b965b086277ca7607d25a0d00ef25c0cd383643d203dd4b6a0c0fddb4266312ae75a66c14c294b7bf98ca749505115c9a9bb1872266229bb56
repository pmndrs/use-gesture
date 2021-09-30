# extract-files changelog

## 9.0.0

### Major

- Updated Node.js support to `^10.17.0 || ^12.0.0 || >= 13.7.0`.
- Updated dev dependencies, some of which require newer Node.js versions than previously supported.
- Renamed the `lib` directory to `public`; existing deep import or require paths must be updated.
- Removed the package `module` field.

### Patch

- Removed Node.js v13 and added v14 to the versions tested in GitHub Actions.
- Simplified the GitHub Actions CI config with the [`npm install-test`](https://docs.npmjs.com/cli/install-test.html) command.
- Improved JSDoc code examples.
- Updated EditorConfig.
- No longer transpile tests with Babel, or test ESM.
- Simplified the Babel config and scripts, ensuring `.js` files are parsed as scripts.
- Removed unnecessary `.js` file extensions from `require` paths.
- Documented all the ways to `import` and `require` the public API.
- Tweaked the readme setup instructions.

## 8.1.0

### Minor

- Updated the package `exports` field:

  - Deep imports to specific files are now allowed, e.g.

    ```js
    import extractFiles from 'extract-files/lib/extractFiles.js';
    ```

    ```js
    const extractFiles = require('extract-files/lib/extractFiles');
    ```

  - The `package.json` can now be required, e.g.

    ```js
    const pkg = require('extract-files/package.json');
    ```

    ```js
    // With Node.js --experimental-json-modules flag.
    import pkg from 'extract-files/package.json';
    ```

### Patch

- Updated dev dependencies.
- Updated the package `engines.node` field to `10 - 12 || >= 13.7` to reflect the package `exports` related breaking changes in `extract-files@8.0.0`.
- Improved the package `prepare:prettier` and `test:prettier` scripts.
- Reordered the package `test:eslint` script args for consistency with `test:prettier`.
- Configured Prettier option `semi` to the default, `true`.
- Restructured the `src` directory so `lib` and `test` files are separate with their own `.babelrc.js` files.

## 8.0.0

### Major

- Added a [package `exports` field](https://nodejs.org/api/esm.html#esm_package_exports) to support native ESM in Node.js.
- Some source and published files are now `.js` (CJS) instead of `.mjs` (ESM), so undocumented deep imports may no longer work. [This approach avoids the dual package hazard](https://nodejs.org/api/esm.html#esm_approach_1_use_an_es_module_wrapper).

### Patch

- Updated dependencies.
- Removed [`@babel/plugin-proposal-class-properties`](https://npm.im/@babel/plugin-proposal-class-properties) from dev dependencies and the Babel config.
- Lint fixes for [`prettier`](https://npm.im/prettier) v2.
- Ensure GitHub Actions run on pull request.
- Improved the `ExtractableFileMatcher` JSDoc typedef.
- Size limit test the published CJS files as well as the ESM.

## 7.0.0

### Major

- Updated Node.js support from v8.10+ to v10+.
- Replaced [`tap`](https://npm.im/tap) and [`nyc`](https://npm.im/nyc) with [`test-director`](https://npm.im/test-director), [`coverage-node`](https://npm.im/coverage-node) and [`hard-rejection`](https://npm.im/hard-rejection) to improve the dev experience, test ESM natively with Node.js, and reduce the dev install size by ~78.8 MB. These new dev dependencies require Node.js v10+.

### Patch

- Updated dev dependencies.
- Removed the now redundant [`eslint-plugin-import-order-alphabetical`](https://npm.im/eslint-plugin-import-order-alphabetical) dev dependency.
- Stop using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).
- More thorough tests.
- Use strict mode for scripts.
- Renamed some package scripts.

## 6.0.0

### Major

- Updated Node.js support from v6+ to v8.10+.

### Minor

- Added the ability to customize what are extractable files, fixing [#10](https://github.com/jaydenseric/extract-files/issues/10) via [#11](https://github.com/jaydenseric/extract-files/pull/11):
  - Added a new third parameter to the `extractFiles` function, for specifying a custom extractable file matcher.
  - Export a new `isExtractableFile` function that is used as the default extractable file matcher for the `extractFiles` function. This can be used in a custom extractable file matcher implementation to match the default extractable files, along with additional custom files.
- Setup [GitHub Sponsors funding](https://github.com/sponsors/jaydenseric):
  - Added `.github/funding.yml` to display a sponsor button in GitHub.
  - Added a `package.json` `funding` field to enable npm CLI funding features.

### Patch

- Updated dev dependencies.
- Replaced the [`size-limit`](https://npm.im/size-limit) dev dependency with [`@size-limit/preset-small-lib`](https://npm.im/@size-limit/preset-small-lib).
- Added a new [`babel-plugin-transform-require-extensions`](https://npm.im/babel-plugin-transform-require-extensions) dev dependency and ensured ESM import specifiers in both source and published `.mjs` files contain file names with extensions, which [are mandatory in the final Node.js ESM implementation](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions). Published CJS `.js` files now also have file extensions in `require` paths.
- Added a package `module` field.
- Removed now redundant ESLint disable `require-jsdoc` comments.
- Use GitHub Actions instead of Travis for CI.
- Redid the test scripts and enforced 100% code coverage.
- Run size limit tests last in the package `test` script as they are the slowest.
- Only size limit test the ESM build.
- Updated the package `test:tap` script to workaround a [`tap` bug](https://github.com/tapjs/node-tap/issues/624).
- Simplified the `prepublishOnly` script.
- Ordered `plugins` before `presets` in Babel config as they run first.
- Reduced the size of the published `package.json` by moving dev tool config to files.
- Only target the root `lib` directory in `.gitignore` and `.eslintignore`.
- Removed `package-lock.json` from `.gitignore` and `.prettierignore` as it’s disabled in `.npmrc` anyway.
- Prevented ESLint from ignoring dotfiles.
- Clarified that Opera Mini isn’t supported in the Browserslist queries and readme “Support” section.

## 5.0.1

### Patch

- Updated dev dependencies.
- Instance (e.g. [`new Date()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)) references are copied to the clone instead of recursed as objects; fixing [jaydenseric/apollo-upload-client#138](https://github.com/jaydenseric/apollo-upload-client/issues/138) via [#9](https://github.com/jaydenseric/extract-files/pull/9).
- Test more types of input.

## 5.0.0

### Major

- `extractFiles` has a new return signature and no longer mutates the original input, fixing [#8](https://github.com/jaydenseric/extract-files/issues/8). It returns an object with `clone`, a clone of the original input value with files recursively replaced with `null`, and `files`, a `Map` instance keying each extracted file to an array of object paths.

### Minor

- Files can now be used as the root value passed to `extractFiles`.

### Patch

- Updated dev dependencies.
- Updated package description.
- Moved JSDoc type definitions into the index file.
- Manually composed package exports instead of relying on `*`.
- Improved tests.
- Added a paragraph explaining the GraphQL use case to the readme.

## 4.1.0

### Minor

- Support more browsers by changing the [Browserslist](https://github.com/browserslist/browserslist) query from [`> 1%`](https://browserl.ist/?q=%3E+1%25) to [`> 0.5%, not dead`](https://browserl.ist/?q=%3E+0.5%25%2C+not+dead).

### Patch

- Updated dev dependencies.
- Ensure Babel reads from the package `browserslist` field due to [a sneaky `@babel/preset-env` breaking change](https://github.com/babel/babel/pull/8509).
- Updated package scripts and config for the new [`husky`](https://npm.im/husky) version.
- Removed the package `module` field. Webpack by default resolves extensionless paths the same way Node.js in `--experimental-modules` mode does; `.mjs` files are preferred. Tools misconfigured or unable to resolve `.mjs` can get confused when `module` points to an `.mjs` ESM file and they attempt to resolve named imports from `.js` CJS files.
- Added a `ReactNativeFileSubstitute` type example.
- Move JSDoc typedefs to the end of files to make it quicker to find the code.
- Regenerated the readme API docs using the latest [`jsdoc-md`](https://npm.im/jsdoc-md) version.
- Tests now log if the environment is CJS or ESM (`--experimental-modules`) and the `NODE_ENV`.

## 4.0.0

### Major

- `extractFiles` is a named export again, and there is no longer a default export; mixed named and default exports causes native ESM and CJS interoperability issues.
- `isObject` is no longer exported. It was not a documented API anyway.
- Removed the `ReactNativeFile` static function `list`. It added surface area to the API and bundles and is simple to do manually.

### Minor

- Updated Babel, removing the `@babel/runtime` dependency.
- Refactored package scripts to use `prepare` to support installation via Git (e.g. `npm install jaydenseric/extract-files`).
- Package [marked side-effect free](https://webpack.js.org/guides/tree-shaking#mark-the-file-as-side-effect-free) for bundlers and tree-shaking.

### Patch

- Use [`jsdoc-md`](https://npm.im/jsdoc-md) to generate readme API docs from source JSDoc, which has been much improved.
- Use [`tap`](https://npm.im/tap) instead of [`ava`](https://npm.im/ava). Tests no longer transpile on the fly, are faster and AVA no longer dictates the Babel version.
- Tests run against the actual dist `.mjs` and `.js` files in both native ESM (`--experimental-modules`) and CJS environments.
- Added a package `test:size` script, using [`size-limit`](https://npm.im/size-limit) to guarantee < 500 byte ESM and CJS bundle sizes.
- Removed the package clean script `rimraf` dev dependency in favour of native `rm -rf`.
- Removed the package `fix` script.
- Renamed the `MODULE` environment variable to `BABEL_ESM` to be more specific for the package `prepare:mjs` script.
- Lint `.json`, `.yml` and `.md` files.
- Use `.prettierignore` to leave `package.json` formatting to npm.
- Use [`eslint-config-env`](https://npm.im/eslint-config-env).
- Compact package `repository` field.
- Updated package description.
- HTTPS package author URL.
- Added package keywords.
- Replaced [shields.io](https://shields.io) readme badges with:
  - A [Badgen](https://badgen.net) npm version badge.
  - An official Travis badge that only tracks `master` branch.
- Changelog version entries now have “Major”, “Minor” and “Patch” subheadings.

## 3.1.0

### Minor

- Added support for [`Blob`](https://developer.mozilla.org/en/docs/Web/API/Blob) types, via [#5](https://github.com/jaydenseric/extract-files/pull/5).

### Patch

- Updated dependencies.

## 3.0.0

### Major

- The `extractFiles` function is now the default export.
- Replace extracted files with `null` instead of deletion, fixing [#4](https://github.com/jaydenseric/extract-files/issues/4).

### Patch

- Updated dev dependencies.
- Simplified npm scripts.

## 2.1.1

### Patch

- Setup Travis to test using the latest stable Node.js version and the oldest supported in `package.json` `engines` (v6.10).
- Added a Travis readme badge.

## 2.1.0

### Minor

- Support [browsers with >1% global usage](http://browserl.ist/?q=%3E1%25) (was >2%).
- Target Node.js v6.10+ for transpilation and polyfills via `package.json` `engines`.
- Support Node.js native ESM via `--experimental-modules`:
  - Module files now have `.mjs` extension.
  - Modular project structure that works better for native ESM.
- Reduced bundle size, fixing [#3](https://github.com/jaydenseric/extract-files/issues/3):
  - Using `babel-preset-env` to handle polyfills so only required ones are included for supported environments.
  - Using `Array.prototype.slice.call` to convert `FileList` instances to arrays instead of `Array.from` which requires a lot of polyfills.

### Patch

- Updated dependencies.
- Updated Prettier and ESLint config.
- Prettier formats distribution code as well as source code, along with the readme and changelog.
- No more source maps; Prettier does not support them.
- Added a clean step to builds.
- Renamed `dist` directory to `lib`.
- Using Babel directly instead of Rollup.
- Smarter Babel config with `.babelrc.js`.
- Added links to readme badges.
- Updated the readme support section.

## 2.0.1

### Patch

- Updated dependencies.
- Fixed incorrect usage example code for `ReactNativeFile.list`, via [#1](https://github.com/jaydenseric/extract-files/pull/1).

## 2.0.0

### Major

- Extracted file paths no longer begin with `.` when no tree path is passed to `extractFiles`.

### Patch

- Updated dev dependencies.

## 1.1.0

### Minor

- Added tests.

### Patch

- Updated dev dependencies.
- Removed `lint-staged`, linting and tests now run on commit.
- Fixed `extractFiles` bugs by using logic that worked in [`apollo-upload-client@5`](https://github.com/jaydenseric/apollo-upload-client/tree/v5.0.0).

## 1.0.0

Initial release.
