module.exports = {
  stories: ['../**/*.stories.mdx', '../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: true, // type-check stories during Storybook build
  },
}
