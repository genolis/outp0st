/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: {
    'Getting Started': ['overview', 'quickstart', 'examples'],
    Modules: [
      {
        Payload: [
          'payload/anatomy',
          {
            Interface: [
              'payload/ui/header',
              'payload/ui/contract',
              'payload/ui/messages',
              'payload/ui/message',
            ],
          },
          {
            Config: [
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
    'Guides and FAQ': ['how-to-use', 'faq'],
    Roadmap: ['roadmap'],
  },
};
