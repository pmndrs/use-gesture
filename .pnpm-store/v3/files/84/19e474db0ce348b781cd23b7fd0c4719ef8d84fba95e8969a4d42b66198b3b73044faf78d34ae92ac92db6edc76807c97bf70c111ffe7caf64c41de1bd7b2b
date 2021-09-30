# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.3] - 2019-09-15

### Fixed

- Bug with nested async rules ([#161](https://github.com/imbrn/v8n/issues/161))

## [1.3.2] - 2019-05-20

### Fixed

- Bug with `optional` rule that ignores the `string` rule when validating

## [1.3.1] - 2019-05-20

### Fixed

- Bug with `optional` rule that ignores validation when an empty string is passed ([#149](https://github.com/imbrn/v8n/issues/149))

## [1.3.0] - 2019-05-19

### Added

- Rule `instanceOf()` to check inheritance of prototypes.
- Rule `numeric()` to check for strings containing numbers

### Changed

- Rule `optional` now supports a flag to consider trimmed empty strings valid (`considerTrimmedEmptyString`) ([#140](https://github.com/imbrn/v8n/issues/140))

## [1.2.3] - 2018-10-03

### Fixed

- Bug with `schema` rule when working with array-based modifiers ([#127](https://github.com/imbrn/v8n/issues/127))

## [1.2.2] - 2018-08-29

### Fixed

- Bug with polyfill for `integer` rule
- Bug with `Infinity` values in range-based rules

## [1.2.1] - 2018-08-17

### Changed

- Rename `ValidationException` to `ValidationError`

### Fixed

- Wrong example in the README file

## [1.2.0] - 2018-07-31

### Added

- Rule `passesAnyOf()` to perform branching validation.
- Rule `optional()` for validation of optional values.

### Changed

- Rule `number()` now supports a flag to make it return `false` for infinite numbers ([#76](https://github.com/imbrn/v8n/issues/76))

### Fixed

- `testAsync()` nesting causes for failed validation.

### Deprecated

- From **v2.0.0**: Rule `number()` will return `false` for infinite values by default

## [1.1.2] - 2018-07-26

### Fixed

- Issue with `schema()` not validating at deeper levels properly.

## [1.1.0] - 2018-07-25

### Added

- Ability to receive all validation errors for a value with `testAll()`.
- Ability to create and test asynchronous rules with `testAsync()`.
- Rule `object()` to check whether a value is an object.
- Rule `schema()` to validate the schema of an object.
- Modifier `some` to verify that at least one value in an array passes a rule.
- Modifier `every` to verify that all values in an array pass a rule.

### Changed

- Made `ValidationException` inherit from JavaScript's built-in `Error`.
- Rewrote documentation and moved it from the README to a website using VuePress.
- Made the validation object immutable.

### Fixed

- Build process now properly transpiles modules from ES6 to ES5. ([#44](https://github.com/imbrn/v8n/issues/44))

[unreleased]: https://github.com/imbrn/v8n/compare/v1.3.3...HEAD
[1.3.3]: https://github.com/imbrn/v8n/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/imbrn/v8n/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/imbrn/v8n/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/imbrn/v8n/compare/v1.2.3...v1.3.0
[1.2.3]: https://github.com/imbrn/v8n/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/imbrn/v8n/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/imbrn/v8n/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/imbrn/v8n/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/imbrn/v8n/compare/v1.1.1...v1.1.2
[1.1.0]: https://github.com/imbrn/v8n/compare/v0.0.1...v1.1.0
