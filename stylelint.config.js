/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { findConfig } = require('browserslist');

const { defaults: browsers } = findConfig(__dirname);

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-prettier/recommended'
  ], // prettier MUST be last to override
  overrides: [
    {
      customSyntax: '@stylelint/postcss-css-in-js',
      files: ['**/*.{js,ts,jsx,tsx}']
    }
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-browser-hacks/lib',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order'
  ],
  rules: {
    'comment-empty-line-before': null,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-newline-after': null,
    'function-no-unknown': [true, { ignoreFunctions: ['/^theme./', '${'] }],
    'order/properties-alphabetical-order': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-browser-hacks': [
      true,
      {
        browsers
      }
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers,
        ignore: [
          'css-appearance',
          'css-clip-path',
          'css-font-stretch',
          'css-masks',
          'flexbox',
          'outline',
          'viewport-units'
        ]
      }
    ],
    'value-keyword-case': null,
    'value-list-max-empty-lines': null
  },
  syntax: 'css-in-js'
};
