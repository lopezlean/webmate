import * as fs from 'fs';
import bodyParser from 'koa-bodyparser';

//import { PAGE_MOCKUP } from './dist/core/tests/mockups/page.mockup.js';
//import { PAGE_MOCKUP } from './packages/core/dist/tests/mockups/page.mockup.js';
const PAGE_MOCKUP = {};

export default {
  appIndex: 'index.html',
  middleware: [
    bodyParser(), // Add the bodyParser middleware
    // serve index.html for all unknown requests to support SPA routing
    (ctx, next) => {
      if (ctx.url === '/api/page/save' && ctx.method === 'POST') {
        const body = ctx.request.body.page;
        // create data dir if not exists
        if (!fs.existsSync('./data')) {
          fs.mkdirSync('./data');
        }
        // save post body to page.json
        fs.writeFileSync('./data/page.json', JSON.stringify(body, undefined, 2));
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
    moduleDirectories: ['./node_modules', './packages']
  },
  open: false,
  preserveSymlinks: true,
  // in a monorepo you need to set the root dir to resolve modules
  rootDir: './dist',

  watch: true
};
