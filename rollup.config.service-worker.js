import resolve from '@rollup/plugin-node-resolve';

import { maybeTerser } from './rollup.config.common.js';

export default [
  {
    input: 'dist/@webmate/service-worker/service-worker.js',
    output: {
      exports: 'none',
      file: 'dist/service-worker.js',
      format: 'iife'
    },
    plugins: [resolve(), ...maybeTerser]
  }
];
