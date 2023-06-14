import { Components as ComponentsClass } from './components';
import { Controls as ControlsClass } from './controls';

export abstract class Webmate {
  static get Components() {
    return ComponentsClass;
  }

  static get Controls() {
    return ControlsClass;
  }
}
