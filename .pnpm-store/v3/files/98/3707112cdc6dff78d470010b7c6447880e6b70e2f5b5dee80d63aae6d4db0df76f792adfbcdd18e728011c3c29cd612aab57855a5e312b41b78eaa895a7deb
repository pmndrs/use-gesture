# @preconstruct/hook

## 0.4.0

### Minor Changes

- [`cfe7d95`](https://github.com/preconstruct/preconstruct/commit/cfe7d9537c0b08f9f127929d62fa97b24d4c31ae) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Add no-op file to `@preconstruct/hook` that will be imported by bundlers instead of the real require hook so that the `preconstruct dev` output will work in bundlers without a module build or bundler config changes(including for React Native's bundler, Metro)

## 0.3.0

### Minor Changes

- [`5ad1c73`](https://github.com/preconstruct/preconstruct/commit/5ad1c73c3615ac1742b7beb8abb15680be5ad0e4) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Correctly only compile files within the package directory in the require hook for `preconstruct dev`

## 0.2.0

### Minor Changes

- [`b8d1906`](https://github.com/preconstruct/preconstruct/commit/b8d19066e6fa520f153497ee403d6dcd76c8edec) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Only compile files within the package directory in the require hook for `preconstruct dev`

## 0.1.0

### Minor Changes

- [`f02cce5`](https://github.com/preconstruct/preconstruct/commit/f02cce5b05650485da522f29dd7758b290505986) [#163](https://github.com/preconstruct/preconstruct/pull/163) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Remove automatic inclusion of `@babel/plugin-transform-runtime`.

  Preconstruct no longer automatically includes `@babel/plugin-transform-runtime` to reduce confusion where code works when built with Preconstruct but fails if built using another tool which directly uses a project's Babel config. You should **include `@babel/plugin-transform-runtime`** in your Babel config unless it is already included.

  ```js
  {
    "plugins": ["@babel/plugin-transform-runtime"]
  }
  ```

## 0.0.5

### Patch Changes

- [aefeb4f](https://github.com/preconstruct/preconstruct/commit/aefeb4f55c11a847217a5f868e132bd20a373711) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use TypeScript internally

## 0.0.4

### Patch Changes

- [19d36a4](https://github.com/preconstruct/preconstruct/commit/19d36a4) - Build preconstruct with preconstruct

## 0.0.3

### Patch Changes

- [9efd990](https://github.com/preconstruct/preconstruct/commit/9efd990) - Fix source map support

## 0.0.2

### Patch Changes

- [aea0c36](https://github.com/preconstruct/preconstruct/commit/aea0c36) - Only install source map support when the require hook is actually run

## 0.0.1

### Patch Changes

- [698fe38](https://github.com/preconstruct/preconstruct/commit/698fe38) [#53](https://github.com/preconstruct/preconstruct/pulls/53) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Move require hook into a package
