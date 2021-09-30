const fs = require('fs')
const { getSiteUrl } = require('./src/theme-options')

function getLogoPath() {
  return fs.existsSync('images/logo-manifest.png')
    ? 'images/logo-manifest.png'
    : `${__dirname}/images/logo-manifest.png`
}

/**
 * Theme configuration.
 * @param {object} options
 * @param {string} options.name
 * @param {string} options.description
 * @param {string} [options.siteUrl]
 * @param {string} [options.shortName]
 * @param {string[]} [options.sections]
 * @param {{ title: string, url: string }[]} [options.navItems]
 * @param {string} [options.baseDirectory]
 * @param {string} [options.twitterAccount]
 * @param {string} [options.githubRepositoryURL]
 * @param {string} [options.githubDocRepositoryURL]
 * @param {string} [options.githubDefaultBranch]
 * @param {string} [options.author]
 * @param {string} [options.carbonAdsURL]
 * @param {{ apiKey: string, indexName: string }} [options.docSearch]
 * @param {object} [options.sitemap]
 */
module.exports = (options) => {
  const siteUrl = getSiteUrl(options)
  const logoPath = getLogoPath()

  return {
    siteMetadata: {
      title: options.name,
      githubRepositoryURL: options.githubRepositoryURL,
      sections: options.sections,
      navItems: options.navItems,
      carbonAdsURL: options.carbonAdsURL,
      description: options.description,
      twitterAccount: options.twitterAccount,
      siteUrl,
      author: options.author,
      docSearch: options.docSearch,
    },
    plugins: [
      // Build
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['smooth-doc'],
        },
      },
      {
        resolve: 'gatsby-plugin-styled-components',
        options: {
          topLevelImportPaths: ['@xstyled/styled-components'],
        },
      },
      'gatsby-remark-images',
      'gatsby-plugin-catch-links',
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: require.resolve(
                './src/plugins/gatsby-remark-autolink-headers',
              ),
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1200,
              },
            },
          ],
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      'gatsby-plugin-react-helmet',
      {
        resolve: require.resolve(
          './src/plugins/gatsby-remark-autolink-headers',
        ),
      },

      // Source
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/pages`,
          name: 'default-page',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/images`,
          name: 'default-image',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `./pages`,
          name: 'page',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `./images`,
          name: 'image',
        },
      },
      // SEO
      {
        resolve: 'gatsby-plugin-sitemap',
        options: options.sitemap || {},
      },
      'gatsby-plugin-meta-redirect',
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: options.name,
          short_name: options.name || options.shortName,
          start_url: '/',
          display: 'minimal-ui',
          icon: logoPath,
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          resolveEnv: () => process.env.CONTEXT || process.env.NODE_ENV,
          env: {
            production: {
              policy: [{ userAgent: '*' }],
            },
            'branch-deploy': {
              policy: [{ userAgent: '*', disallow: ['/'] }],
              sitemap: null,
              host: null,
            },
            'deploy-preview': {
              policy: [{ userAgent: '*', disallow: ['/'] }],
              sitemap: null,
              host: null,
            },
          },
        },
      },
    ],
  }
}
