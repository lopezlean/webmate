import * as fs from 'fs';
import bodyParser from 'koa-bodyparser';

import { PAGE_MOCKUP } from './dist/@webmate/core/tests/mockups/page.mockup.js';

export default {
  appIndex: 'index.html',
  middleware: [
    bodyParser(), // Add the bodyParser middleware
    // serve index.html for all unknown requests to support SPA routing
    (ctx, next) => {
      if (ctx.url === '/api/page/save' && ctx.method === 'POST') {
        const body = ctx.request.body.page;

        // save post body to page.json
        fs.writeFileSync('./data/page.json', JSON.stringify(body));
        ctx.body = { success: true };
        ctx.status = 200;
        return;
      }
      if (ctx.url === '/api/page/get' && ctx.method === 'GET') {
        // response json success
        // read file packages/core/src/tests/mockups/page.mockup.ts
        const fileName = './data/page.json';
        // check if file exists
        if (fs.existsSync(fileName)) {
          const data = fs.readFileSync(fileName, 'utf8');
          ctx.body = data;
        } else {
          ctx.body = PAGE_MOCKUP;
        }

        ctx.status = 200;
        return;
      }
      return next();
    }
  ],
  nodeResolve: {
    exportConditions: ['development'],
    moduleDirectories: ['./node_modules', './dist']
  },
  open: false,
  preserveSymlinks: true,
  // in a monorepo you need to set the root dir to resolve modules
  rootDir: './dist',

  watch: true
};
