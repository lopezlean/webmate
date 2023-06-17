import { TemplateResult } from 'lit';

export interface TaskbarItem {
  taskbarID: string;
  icon: TemplateResult;
  component: string;
}
