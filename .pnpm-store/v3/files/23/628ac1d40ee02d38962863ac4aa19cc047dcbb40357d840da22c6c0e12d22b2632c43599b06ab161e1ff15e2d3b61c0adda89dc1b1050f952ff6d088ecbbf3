# generate-robotstxt

[![NPM version](https://img.shields.io/npm/v/generate-robotstxt.svg)](https://www.npmjs.org/package/generate-robotstxt)
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/generate-robotstxt/master.svg?label=build)](https://travis-ci.org/itgalaxy/generate-robotstxt)
[![dependencies Status](https://david-dm.org/itgalaxy/generate-robotstxt/status.svg)](https://david-dm.org/itgalaxy/generate-robotstxt)
[![devDependencies Status](https://david-dm.org/itgalaxy/generate-robotstxt/dev-status.svg)](https://david-dm.org/itgalaxy/generate-robotstxt?type=dev)

Awesome generator robots.txt.

## Installation

```shell
npm install --save-dev generate-robotstxt
```

## Usage

```js
import robotstxt from "generate-robotstxt";

robotstxt({
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: "/search",
      crawlDelay: 2,
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      disallow: ["/admin", "/login"],
      crawlDelay: 2,
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/",
    },
  ],
  sitemap: "http://example.com/sitemap.xml",
  host: "http://example.com",
})
  .then((content) => {
    console.log(content);

    return content;
  })
  .catch((error) => {
    throw error;
  });
```

## File based configuration

**robots-txt.config.js**

```js
module.exports = {
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: ["/search"],
      crawlDelay: 2,
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      disallow: ["/admin", "/login"],
      crawlDelay: 2,
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/",
    },
  ],
  sitemap: "http://example.com/sitemap.xml",
  host: "http://example.com",
};
```

## CLI

```shell
Awesome generator robots.txt

  Usage generate-robotstxt [options] <dest>

  Options:
     --config  Path to a specific configuration file.
```

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
