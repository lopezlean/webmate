import resolve from '@rollup/plugin-node-resolve';

import { maybeTerser } from './rollup.config.common.js';

export default [
  {
    input: 'packages/worker/dist/worker.js',
    output: {
      exports: 'none',
      file: 'dist/web-worker.js',
      format: 'iife'
    },
    plugins: [
      resolve({
        moduleDirectories: ['node_modules']
      }),
      ...maybeTerser
    ]
  }
];
