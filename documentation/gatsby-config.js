module.exports = {
  plugins: [
    {
      resolve: 'smooth-doc',
      options: {
        name: 'React UseGesture',
        siteUrl: 'https://use-gesture.netlify.app',
        description: `The only gesture hook you'll need`,
        author: 'David Bismut',
        sections: ['About', 'Reference', 'More'],
        navItems: [{ title: 'Docs', url: '/docs/' }],
        twitterAccount: 'pmndrs',
        githubRepositoryURL: 'https://github.com/pmndrs/react-use-gesture',
      },
    },
  ],
}
