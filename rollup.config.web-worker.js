import resolve from '@rollup/plugin-node-resolve';

import { maybeTerser } from './rollup.config.common.js';

export default [
  {
    input: 'dist/@webmate/worker/worker.js',
    output: {
      exports: 'none',
      file: 'dist/web-worker.js',
      format: 'iife'
    },
    plugins: [
      resolve({
        moduleDirectories: ['node_modules', 'dist']
      }),
      ...maybeTerser
    ]
  }
];
