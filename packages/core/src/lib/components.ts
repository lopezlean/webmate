import { ComponentRegisterInterface } from '../interfaces/component-register.interface';
import { BaseRegisterClass } from './base-register-class';

export abstract class Components extends BaseRegisterClass<ComponentRegisterInterface>() {
  /**
   * @method register
   * It takes a componentRegister object, and adds it to the Components.componentsMap object
   * @param {ComponentRegister} componentRegister - ComponentRegister - This is the component register
   * that you created in the previous step.
   */
  /**
   * @method registerMap
   * "Add a component map to the component map."
   *
   * The component map is a map of component names to component classes
   * @param {ComponentsMap} map - ComponentsMap - This is the map of components that you want to add to the
   * existing map.
   */
  /**
   * @method get
   * It returns the component from the map.
   * @param {string} name - The name of the component.
   * @returns The component register for the given name.
   */
}
