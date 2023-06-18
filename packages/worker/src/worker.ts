import { expose } from 'comlink';

import { WorkerInterface } from './worker-interface';
import { BuildResultInterface } from '@webmate/core/interfaces';
import { PageBuilder } from '@webmate/core/lib/page-builder';

const obj: WorkerInterface = {
  async build(page) {
    return new Promise<BuildResultInterface>((resolve) => {
      const pageBuilder = new PageBuilder(page, { debug: true, preview: true });
      //console.log('building...');
      resolve(pageBuilder.build());
    });
  }
};

expose(obj);
