import { BuildResultInterface, PageInterface } from '@webmate/core';

export interface WorkerInterface {
  build: (page: PageInterface, options?: BuildOptions) => Promise<BuildResultInterface>;
}

export type BuildOptions = {
  debug?: boolean;
};
