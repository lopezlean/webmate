import { BuildResultInterface } from '@webmate/core/interfaces/build-result.interface';

export const enum ServiceWorkerMessageType {
  ESTABLISH_HANDSHAKE,
  HANDSHAKE_RECEIVED
}

export interface ServiceWorkerInterface {
  setBuildResult(buildResult: BuildResultProxyInterface, sessionID: string): void;
}

export interface BuildResultProxyInterface {
  getBuildResult(name: string): Promise<BuildResultInterface | undefined>;
}
