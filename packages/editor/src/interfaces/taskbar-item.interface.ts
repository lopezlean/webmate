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
  active?: boolean;
}

export interface TaskbarItemPrivateInterface
  extends TaskbarItemInterface,
    TaskbarItemLocalStorePropertiesInterface {}

export interface TaskbarItemEventInterface {
  item: TaskbarItemInterface;
  pressed: boolean;
}
