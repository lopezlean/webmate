import {
  ExtensionInterface,
  ExtensionInterfacePrivate,
  ExtensionLocation
} from '../interfaces/extension.interface.js';
import { BaseRegisterClass } from './base-register-class.js';
import { Observable } from './observable.js';

type ExtensionMap = { [key in ExtensionLocation]?: string[] };

export abstract class Extensions extends BaseRegisterClass<
  ExtensionInterface & ExtensionInterfacePrivate
>() {
  public static observableLocations = new Observable<ExtensionMap>({});
  /**
   * This function registers a value with a given name in a observable.
   * @param name - A string representing the name of the value being registered in the observable.
   * @param value - TInterface, which is a generic type parameter representing the type of
   * the value being registered. It could be any type, depending on how the class or function using this
   * method is defined.
   */
  public static override register(name: string, _value: ExtensionInterface<never>) {
    // if extension is already registered, do nothing
    if (this.observable.value[name]) {
      console.warn(`Extensions: ${name} already registered`);
      return;
    }
    const value = _value as ExtensionInterface & ExtensionInterfacePrivate;
    value.id = name;
    this.observable.value[name] = value;
    this.observableLocations.value[value.location]
      ? this.observableLocations.value[value.location]?.push(name)
      : (this.observableLocations.value[value.location] = [name]);
    this.observable.notify();
  }
  public static getByLocation(
    location: ExtensionLocation
  ): (ExtensionInterface & ExtensionInterfacePrivate)[] | undefined {
    return this.observableLocations.value[location]?.map((name) => this.observable.value[name]);
  }

  public static load(location: ExtensionLocation, context: unknown): void {
    const extensions = this.getByLocation(location);
    console.log('Extensions: load', location, extensions, this.observableLocations.value);
    if (extensions) {
      extensions
        .filter((extension) => !extension.isActivated)
        .forEach((extension) => {
          try {
            extension.activate(context);
            extension.isActivated = true;
          } catch (e) {
            console.error(e);
          }
        });
    }
  }
}
