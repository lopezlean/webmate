/* eslint-disable sort-keys */

import terser from '@rollup/plugin-terser';

const terserOptions = {
  warnings: true,
  ecma: 2017,
  compress: {
    unsafe: true,
    passes: 2
  },
  output: {
    // "some" preserves @license and @preserve comments
    comments: 'some',
    inline_script: false
  },
  mangle: {
    properties: false
  }
};

// eslint-disable-next-line no-undef
export const maybeTerser = process.env.NO_TERSER ? [] : [terser(terserOptions)];
