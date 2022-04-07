/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Outp0st',
  tagline: 'Modern Terra dApp development experience for teams',
  url: 'https://outp0st.vercel.app',
  baseUrl: '/',
  favicon: 'outpost/hatchful/favicon.png',
  organizationName: 'outp0st',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  projectName: 'outp0st',
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    'my-loaders',
    [
      'docusaurus2-dotenv',
      {
        safe: false, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
        systemvars: true, // Set to true if you would rather load all system variables as well (useful for CI purposes)
        silent: false, //  If true, all warnings will be suppressed
        expand: false, // Allows your variables to be "expanded" for reusability within your .env file
        defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
      },
    ],
  ], // loader required for .svg
  themeConfig: {
    autoCollapseSidebarCategories: false,
    hideableSidebar: false,
    // algolia: {
    //   appId: 'ZHDU6KMIP0',
    //   apiKey: '0ae4d340c3561222aa86622a1b3e34b6',
    //   indexName: 'outp0st-vercel',
    // },
    navbar: {
      logo: {
        alt: 'Outp0st',
        src: 'outpost/hatchful/logo_short.svg',
        srcDark: 'outpost/hatchful/logo_short_inv.svg',
      },
      title: '',
      hideOnScroll: false,
      items: [
        {
          label: 'Documentation',
          to: 'docs/overview',
          position: 'right',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/genolis/outp0st',
          position: 'right',
        },
        {
          label: 'App ➡️',
          href: 'https://app.outp0st.io',
          position: 'right',
        },
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    // announcementBar: {
    //   id: 'supportus',
    //   content:
    //     '⭐️ If you like DocSearch, give it a star on <a target="_blank" rel="noopener noreferrer" href="">GitHub</a>! ⭐️',
    // },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: 'docs/overview',
            },
            {
              label: 'Quick start',
              to: 'docs/quickstart',
            },
            {
              label: 'Payload',
              to: 'docs/payload/anatomy',
            },
            {
              label: 'Rover',
              to: 'docs/rover',
            },
          ],
        },
        {
          title: 'Outp0st',
          items: [
            {
              label: 'Issues',
              to: '/issues',
            },
            {
              label: 'Payload',
              to: '/tree/main/apps/payload',
            },
            {
              label: 'Rover',
              to: '/tree/main/apps/rover',
            },
            {
              label: 'Disclaimer and privacy',
              to: 'https://www.algolia.com/policies/privacy/',
            },
          ],
        },
        {
          title: 'Genolis',
          items: [
            {
              label: 'Web site',
              to: 'https://genolis.com.au/',
            },
            {
              label: 'Blockchain page',
              href: 'https://genolis.com.au/services/blockchain-development/',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/unicon-software',
            },
          ],
        },
        // {
        //   title: 'Social',
        //   items: [
        //     {
        //       label: 'GitHub',
        //       to: 'https://github.com/algolia/docsearch',
        //     },
        //     {
        //       label: 'Twitter',
        //       to: 'https://twitter.com/docsearch_',
        //     },
        //     {
        //       label: 'Algolia Blog',
        //       to: 'https://blog.algolia.com/',
        //     },
        //   ],
        // },
      ],
      logo: {
        alt: 'Outp0st',
        src: 'outpost/hatchful/logo_short.svg',
      },
      copyright: `Outp0st 2022-now • Built by <a href="mailto:dima.v@genolis.com.au">dimkk</a> @ <a href="https://genolis.com.au">genolis.com.au</a>
      `,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
