[![NPM version](https://img.shields.io/npm/v/gatsby-plugin-robots-txt.svg)](https://www.npmjs.org/package/gatsby-plugin-robots-txt)
[![Actions Build Status](https://github.com/mdreizin/gatsby-plugin-robots-txt/workflows/CI/badge.svg)](https://github.com/mdreizin/gatsby-plugin-robots-txt/actions)
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/ow75w9pjm7kf3wps/branch/master?svg=true)](https://ci.appveyor.com/project/mdreizin/gatsby-plugin-robots-txt/branch/master)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=gatsby-plugin-robots-txt&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=gatsby-plugin-robots-txt)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gatsby-plugin-robots-txt&metric=coverage)](https://sonarcloud.io/dashboard?id=gatsby-plugin-robots-txt)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmdreizin%2Fgatsby-plugin-robots-txt.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmdreizin%2Fgatsby-plugin-robots-txt?ref=badge_shield)

# gatsby-plugin-robots-txt

> Create `robots.txt` for your Gatsby site.

## Install

`yarn add gatsby-plugin-robots-txt`

or

`npm install --save gatsby-plugin-robots-txt`

## How To Use

`gatsby-config.js`

```js
module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.example.com'
  },
  plugins: ['gatsby-plugin-robots-txt']
};
```

## Options

This plugin uses [`generate-robotstxt`](https://github.com/itgalaxy/generate-robotstxt#usage) to generate content of `robots.txt` and it has the following options:

|     Name     |    Type    |                Default                |                                  Description                                   |
| :----------: | :--------: | :-----------------------------------: | :----------------------------------------------------------------------------: |
|    `host`    |  `String`  |       `${siteMetadata.siteUrl}`       |                               Host of your site                                |
|  `sitemap`   |  `String` / `String[]`  | `${siteMetadata.siteUrl}/sitemap.xml` |                             Path(s) to `sitemap.xml`                              |
|   `policy`   | `Policy[]` |                 `[]`                  | List of [`Policy`](https://github.com/itgalaxy/generate-robotstxt#usage) rules |
| `configFile` |  `String`  |              `undefined`              |                          Path to external config file                          |
|   `output`   |  `String`  |             `/robots.txt`             |                     Path where to create the `robots.txt`                      |

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.example.com',
        sitemap: 'https://www.example.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    }
  ]
};
```

### `env`-option


`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.example.com',
        sitemap: 'https://www.example.com/sitemap.xml',
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    }
  ]
};
```

The `env` key will be taken from `process.env.GATSBY_ACTIVE_ENV` first (see [Gatsby Environment Variables](https://www.gatsbyjs.org/docs/environment-variables/) for more information on this variable), falling back to `process.env.NODE_ENV`. When this is not available then it defaults to `development`.

You can resolve the `env` key by using `resolveEnv` function:

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.example.com',
        sitemap: 'https://www.example.com/sitemap.xml',
        resolveEnv: () => process.env.GATSBY_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    }
  ]
};
```

### `configFile`-option

You can use the `configFile` option to set specific external configuration:

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: 'robots-txt.config.js'
      }
    }
  ]
};
```

`robots-txt.config.js`

```js
module.exports = {
  host: 'https://www.example.com',
  sitemap: 'https://www.example.com/sitemap.xml',
  policy: [{ userAgent: '*' }]
};
```

#### Netlify

If you would like to disable crawlers for [deploy-previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) you can use the following snippet:

`gatsby-config.js`

```js
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.example.com',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    siteUrl
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }]
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    }
  ]
};
```

### `query`-option

By default the site URL will come from the Gatsby node `site.siteMeta.siteUrl`. Like in [Gatsby's sitemap plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/) an optional GraphQL query can be used to provide a different value from another data source as long as it returns the same shape:

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        query: `{
          site: MyCustomDataSource {
            siteMetadata {
              siteUrl
            }
          }
        }`
      }
    }
  ]
};
```

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmdreizin%2Fgatsby-plugin-robots-txt.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmdreizin%2Fgatsby-plugin-robots-txt?ref=badge_large)
