import { ComponentInterface } from './component.interface';
export type ChildrenType = string | Array<ComponentInterface | string>;
export class PropertyInterface {
  children?: ChildrenType;
  [key: string]: unknown | undefined;
}
