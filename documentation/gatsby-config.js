module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-pnpm',
      options: {
        include: ['smooth-doc']
      }
    },
    {
      resolve: 'smooth-doc',
      options: {
        name: '@use-gesture',
        siteUrl: 'https://use-gesture.netlify.app',
        description: `@use-gesture allows you to implement advanced UI interactions with just a few lines of code.`,
        author: 'David Bismut',
        sections: ['About', 'Reference', 'More'],
        navItems: [
          { title: 'Docs', url: '/docs/' },
          { title: 'API', url: '/docs/gestures/' }
        ],
        docSearch: {
          apiKey: '03ac4140f84a905c678b2501a118eb94',
          appId: '1UFCYC8N2G',
          indexName: 'use-gesture'
        },
        twitterAccount: 'pmndrs',
        githubRepositoryURL: 'https://github.com/pmndrs/use-gesture',
        carbonAdsURL: '//cdn.carbonads.com/carbon.js?serve=CEAI42QM&placement=use-gesturenetlifyapp'
      }
    },

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-162749258-1'
      }
    }
  ]
}
