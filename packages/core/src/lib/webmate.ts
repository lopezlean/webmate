import { Components as ComponentsClass } from './components.js';
import { Controls as ControlsClass } from './controls.js';

export abstract class Webmate {
  static get Components() {
    return ComponentsClass;
  }

  static get Controls() {
    return ControlsClass;
  }
}
