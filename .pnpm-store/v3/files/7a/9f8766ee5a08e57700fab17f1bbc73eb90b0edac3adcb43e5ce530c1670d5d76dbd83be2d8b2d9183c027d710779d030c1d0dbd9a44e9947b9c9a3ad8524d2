postinstall-postinstall
===================

Run your app's `postinstall` npm script during this package's `postinstall` script.

## Why

Yarn runs the `postinstall` script after `yarn`, `yarn install` and `yarn add <package>` but not after `yarn remove <package>`. If you add this package to your project, it will execute your project's `postinstall` hook even after a `yarn remove <package>`. This requires your `postinstall` script to be idempotent, because it will be run twice for `yarn`, `yarn install`, and `yarn add <package>`
