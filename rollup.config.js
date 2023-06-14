import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import sizes from 'rollup-plugin-sizes';

export default [
  {
    input: 'dist/@webmate/editor/index.js',
    output: {
      dir: 'dist',
      format: 'esm'
    },
    plugins: [
      // TODO: this means that dependencies like spectrum web components will not be included in the bundle
      resolve({
        moduleDirectories: ['dist']
      }),
      terser({
        compress: {
          passes: 2,
          unsafe: true
        },
        ecma: 2017,
        mangle: {
          properties: false
        },
        output: {
          comments: 'some'
        },
        warnings: true
      }),

      sizes(),
      copy({
        targets: [
          {
            dest: './dist',
            src: './index.html'
          }
        ]
      })
    ]
  },
  {
    input: 'dist/@webmate/preview-indicators/index.js',
    output: {
      file: 'dist/preview-indicators.js',
      format: 'esm'
    },
    plugins: [
      resolve({
        moduleDirectories: ['dist']
      }),
      terser({
        compress: {
          passes: 2,
          unsafe: true
        },
        ecma: 2017,
        mangle: {
          properties: false
        },
        output: {
          comments: 'some'
        },
        warnings: true
      })
    ]
  }
];
