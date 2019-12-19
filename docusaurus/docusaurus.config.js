/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'React Use Gesture',
  tagline: `The only gesture hook you'll need`,
  url: 'https://use-gesture.netlify.com',
  baseUrl: '/',
  organizationName: 'react-spring', // Usually your GitHub org/user name.
  projectName: 'react-use-gesture', // Usually your repo name.
  favicon:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/232/raised-back-of-hand_1f91a.png',
  // themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl')
    },
    navbar: {
      title: 'React Use Gesture',
      logo: {
        alt: 'React Use Gesture logo',
        src:
          'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/232/raised-back-of-hand_1f91a.png'
      },
      links: [
        { to: 'docs/introduction', label: 'Docs', position: 'right' },
        { to: 'docs/hooks', label: 'API', position: 'right' },
        {
          href: 'https://github.com/react-spring/react-use-gesture',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: 'docs/introduction' },
            { label: 'Motivation', to: 'docs/motivation' }
          ]
        },
        {
          title: 'API Reference',
          items: [
            { label: 'Available hooks', to: 'api/hooks' },
            { label: 'Gesture state', to: 'api/state' },
            { label: 'Gesture options', to: 'api/options' },
            { label: 'Utilities', to: 'api/utilities' }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Spectrum',
              href: 'https://spectrum.chat/react-spring'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Spring. Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
