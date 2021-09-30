[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

# gatsby-plugin-meta-redirect

Generates meta redirect html files for redirecting on any static file host.

## Install

```sh
npm install --save gatsby-plugin-meta-redirect
```

or

```sh
yarn add gatsby-plugin-meta-redirect
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  `gatsby-plugin-meta-redirect` // make sure to put last in the array
];
```

### Redirects

You can create redirects using the [`createRedirect`](https://www.gatsbyjs.org/docs/bound-action-creators/#createRedirect) action.

An example:

```js
createRedirect({ fromPath: '/old-url', toPath: '/new-url', isPermanent: true });
createRedirect({ fromPath: '/url', toPath: '/zn-CH/url', Language: 'zn' });
```

That will generate the following html files:

### `/old-url/index.html`:

```html
<meta http-equiv="refresh" content="0; URL='/new-url/'" />
```

and

### `/url/index.html`:

```html
<meta http-equiv="refresh" content="0; URL='/zn-CH/url/'" />
```

[build-badge]: https://img.shields.io/travis/getchalk/gatsby-plugin-meta-redirect/master.png?style=flat-square
[build]: https://travis-ci.org/getchalk/gatsby-plugin-meta-redirect
[npm-badge]: https://img.shields.io/npm/v/gatsby-plugin-meta-redirect.png?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-plugin-meta-redirect
