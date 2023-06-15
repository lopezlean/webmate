import { FileInterface } from './file.interface.js';
import { PropertyInterface } from './property.interface.js';
import { StyleInterface } from './style.interface.js';

export interface ComponentInterface {
  id: string;
  tag: string;
  properties?: PropertyInterface;
  styles?: StyleInterface;
  // TODO
  animations?: PropertyInterface;
  // files to be added to the build in the FileCollector
  files?: FileInterface[];
}
