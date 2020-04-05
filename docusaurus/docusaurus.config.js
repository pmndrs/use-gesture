/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'React Use Gesture',
  tagline: `The only gesture hook you'll need`,
  url: 'https://use-gesture.netlify.app',
  baseUrl: '/',
  organizationName: 'react-spring',
  projectName: 'react-use-gesture',
  favicon:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/232/raised-back-of-hand_1f91a.png',
  // themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-162749258-1'
    },
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
            { label: 'Available hooks', to: 'docs/hooks' },
            { label: 'Gesture state', to: 'docs/state' },
            { label: 'Gesture options', to: 'docs/options' },
            { label: 'Utilities', to: 'docs/utilities' }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/react-spring/react-use-gesture/'
            },
            {
              label: 'Spectrum',
              href: 'https://spectrum.chat/react-spring'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Spring. Built with Docusaurus. Illustrations by Vijay Verma.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/react-spring/react-use-gesture/edit/v7/docusaurus/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
