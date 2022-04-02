module.exports = {
  extends: ['prettier'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    'react/display-name': 'off',
    'react/jsx-key': 'off',
  },
};
