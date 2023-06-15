import { ComponentRegisterControlInterface } from './component-register-control.interface.js';

export interface ComponentRegisterInterface<P = unknown> {
  group?: string;
  name: string;
  displayName: string;
  hide?: boolean; // don't show in the component list
  isContainer?: boolean; // allow to insert components inside the component
  tag: string;
  controls?: ComponentRegisterControlInterface<P>[];
  defaultProperties?: {
    [key: string]: unknown;
  };
}
