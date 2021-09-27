# gatsby-plugin-compile-es6-packages

[![npm version](https://img.shields.io/npm/v/gatsby-plugin-compile-es6-packages.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-plugin-compile-es6-packages)
[![npm downloads](https://img.shields.io/npm/dt/gatsby-plugin-compile-es6-packages.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-plugin-compile-es6-packages)

Allows you to easily specify npm modules to be included in transpiling with babel.

This plugin works with Gatsby V2+

Discussion of this issue at https://github.com/gatsbyjs/gatsby/issues/3780

## Install

`npm install --save gatsby-plugin-compile-es6-packages`

or

`yarn add gatsby-plugin-compile-es6-packages`

## How to use

Add the plugin to your `gatsby-config.js`.
Specify the npm modules containing ES6 code that require transpilation.

```javascript
plugins: [
  {
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
      modules: [`query-string`]
    }
  }
];
```

### Options

| Option    | Explanation                                                            | Default   | Required |
| --------- | ---------------------------------------------------------------------- | --------- | -------- |
| `modules` | Specify the npm modules containing ES6 code that require transpilation | `[]`      | YES      |
| `test`    | Adjusts the regex for the webpack rule                                 | `/\.js$/` | NO       |

You may also need to use other plugins to handle any specific babel config to transpile the es6 code (i.e. `gatsby-plugin-flow`)
