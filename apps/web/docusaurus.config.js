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
        path: './.env', // The path to your environment variables.
        safe: false, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
        systemvars: true, // Set to true if you would rather load all system variables as well (useful for CI purposes)
        silent: false, //  If true, all warnings will be suppressed
        expand: false, // Allows your variables to be "expanded" for reusability within your .env file
        defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
      },
    ],
  ], // loader required for .svg
  themeConfig: {
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
          href: 'https://github.com/dimkk/terra-outpost-mono',
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
    //     '⭐️ If you like DocSearch, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/dimkk/terra-outpost-mono">GitHub</a>! ⭐️',
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
              label: 'Examples',
              to: 'docs/examples',
            },
            {
              label: 'Payload',
              to: 'docs/payload',
            },
            {
              label: 'How to use',
              to: 'docs/how-to-use.md',
            },
          ],
        },
        {
          title: 'Outp0st',
          items: [
            {
              label: 'Issues',
              to: 'https://github.com/dimkk/terra-outpost-mono/issues',
            },
            {
              label: 'Payload',
              to: 'https://github.com/dimkk/terra-outpost-mono/tree/main/apps/payload',
            },
            {
              label: 'Rover',
              to: 'https://github.com/dimkk/terra-outpost-mono/tree/main/apps/rover',
            },
            {
              label: 'Privacy',
              to: 'https://www.algolia.com/policies/privacy/',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Apply',
        //       to: 'apply',
        //     },
        //     {
        //       label: 'Forum',
        //       href: 'https://discourse.algolia.com/tags/docsearch',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discord.gg/tXdr5mP',
        //     },
        //   ],
        // },
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
      copyright: `Outp0st 2022-now • Built by dimkk @ <a href="https://genolis.com.au">genolis.com.au</a>, powered by 
        <a href="https://www.npmjs.com/package/@algolia/ui-library">
          algolia ui lib
        </a>
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
