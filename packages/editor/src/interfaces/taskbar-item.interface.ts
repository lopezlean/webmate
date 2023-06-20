import { TemplateResult } from 'lit-html';

import { TaskbarActionInterface } from './taskbar-action.interface';

export interface TaskbarItemInterface {
  id: string;
  label: string;
  render: () => string | TemplateResult;
  action: TaskbarActionInterface;
}

export interface TaskbarItemLocalStorePropertiesInterface {
  row?: number;
  height?: number;
}

export interface TaskbarItemPrivateInterface
  extends TaskbarItemInterface,
    TaskbarItemLocalStorePropertiesInterface {}
