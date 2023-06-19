import { TemplateResult } from 'lit-html';

export interface TaskbarActionInterface {
  weight?: number;
  icon: () => string | TemplateResult;
}
