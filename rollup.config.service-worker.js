import resolve from '@rollup/plugin-node-resolve';

import { maybeTerser } from './rollup.config.common.js';

export default [
  {
    input: 'packages/service-worker/dist/service-worker.js',
    output: {
      exports: 'none',
      file: 'dist/service-worker.js',
      format: 'iife'
    },
    plugins: [resolve(), ...maybeTerser]
  }
];
