import { FileInterface } from './file.interface';
import { PropertyInterface } from './property.interface';
import { StyleInterface } from './style.interface';

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
