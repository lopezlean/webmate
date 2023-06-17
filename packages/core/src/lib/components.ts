import { ComponentRegisterInterface } from '../interfaces/component-register.interface.js';
import { BaseRegisterClass } from './base-register-class.js';

/**
 * Class for registering components.]
 * @public
 * @example
 * ```ts
 * Webmate.Components.register({
 *  name: 'webmate-button',
 * tag: 'webmate-button',
 * });
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Components extends BaseRegisterClass<ComponentRegisterInterface<any>>() {
  /**
   *
   * @override register
   *
   * It takes a componentRegister object, and adds it to the Components.componentsMap object
   * @param componentRegister - This is the component register
   * that you created in the previous step.
   */
  /**
   * @override registerMap
   * "Add a component map to the component map."
   *
   * The component map is a map of component names to component classes
   * @param  componentsMap - This is the map of components that you want to add to the
   * existing map.
   */
  /**
   * @override get
   * It returns the component from the map.
   * @param name - The name of the component.
   * @returns The component register for the given name.
   */
}
