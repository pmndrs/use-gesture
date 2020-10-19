module.exports = {
  plugins: [
    {
      resolve: 'smooth-doc',
      options: {
        name: 'React UseGesture',
        siteUrl: 'https://use-gesture.netlify.app',
        description: `React UseGesture allows you to implement advanced UI interactions with just a few lines of code.`,
        author: 'David Bismut',
        sections: ['About', 'Reference', 'More'],
        navItems: [{ title: 'Docs', url: '/docs/' }],
        twitterAccount: 'pmndrs',
        githubRepositoryURL: 'https://github.com/pmndrs/react-use-gesture',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-162749258-1',
      },
    },
  ],
}
