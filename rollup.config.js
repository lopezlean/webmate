import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import sizes from 'rollup-plugin-sizes';

import pkg from './packages/editor/package.json' assert { type: 'json' };
import extensionsPkg from './packages/extensions/package.json' assert { type: 'json' };
import previewPkg from './packages/preview-indicators/package.json' assert { type: 'json' };

const externalDependencies = (pkg) =>
  Object.keys(pkg.dependencies)
    .concat(Object.keys(pkg.optionalDependencies || {}))
    .filter((item) => item !== 'tslib')
    .concat(Object.keys(pkg.peerDependencies || {}));

export default [
  {
    external: externalDependencies(pkg),
    input: ['packages/editor/dist/index.js'],
    output: {
      dir: 'dist',
      format: 'esm'
    },
    plugins: [
      // TODO: this means that dependencies like spectrum web components will not be included in the bundle
      resolve({
        //moduleDirectories: ['node_modules', 'dist']
      }),
      // preserve class names
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
    external: externalDependencies(previewPkg),
    input: 'packages/preview-indicators/dist/index.js',
    output: {
      file: 'dist/preview-indicators.js',
      format: 'esm'
    },
    plugins: [
      resolve({
        //moduleDirectories: ['dist']
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
  },
  {
    external: externalDependencies(extensionsPkg),
    input: 'packages/extensions/dist/index.js',
    output: {
      file: 'dist/extensions.js',
      format: 'esm'
    },
    plugins: [
      resolve({}),
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
