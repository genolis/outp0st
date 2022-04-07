/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: [
    {
      type: 'category',
      collapsed: false,
      label: 'Getting Started',
      items: ['overview', 'quickstart', 'examples'],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Modules',
      items: [
        {
          type: 'category',
          collapsed: false,
          label: 'Payload',
          items: [
            'payload/anatomy',
            {
              type: 'category',
              collapsed: false,
              label: 'Interface',
              items: [
                'payload/ui/header',
                'payload/ui/contract',
                'payload/ui/messages',
                'payload/ui/message',
              ],
            },
            {
              type: 'category',
              collapsed: false,
              label: 'Config',
              items: [
                'payload/config/anatomy',
                'payload/config/state',
                'payload/config/settings',
                'payload/config/storage',
              ],
            },
          ],
        },
        'rover',
      ],
    },
  ],
};
