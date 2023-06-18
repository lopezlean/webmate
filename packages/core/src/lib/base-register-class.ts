import { Observable } from './observable.js';

/**
 *
 * @param initValue - The initial value of the observable.
 * @returns A class that extends the `BaseRegisterClass` class.
 * @public
 * The `BaseRegisterClass` class is a generic class that is used for Webmate register, ie: Controls, Components, Breakpoints,etc.
 * The generic type parameter `TInterface` is used to define the type of the value that will be registered
 * in the observable. The class also has a static property `observable` of type `Observable`, which is
 * an instance of the `Observable` class. The `observable` property is initialized with an empty object
 * `{}` as the initial value.
 *
 */
export const BaseRegisterClass = <TInterface>(initValue = {}) => {
  return class {
    /**
     *
     * The property is an instance of the `Observable` class, which takes
     * a generic type parameter of `{ [key: string]: TInterface }`. This means that the observable will
     * hold a dictionary-like object where the keys are strings and the values are of type
     * `TInterface`. The initial value of the observable is an empty object `{}`.
     *  */

    public static observable = new Observable<{ [key: string]: TInterface }>(initValue);

    /**
     * This function registers a value with a given name in a observable.
     * @param name - A string representing the name of the value being registered in the observable.
     * @param value - TInterface, which is a generic type parameter representing the type of
     * the value being registered. It could be any type, depending on how the class or function using this
     * method is defined.
     */
    public static register(name: string, value: TInterface) {
      this.observable.value[name] = value;
      this.observable.notify();
    }

    public static get(name: string): TInterface | undefined {
      return this.observable.value[name];
    }

    /**
     * This function registers a observable of type TInterface to the current object.
     * @param observable - The parameter `observable` is of type `IntefaceMap<TInterface>`, which means it is an object
     * that observables keys of type `string` to values of type `TInterface`. The function `registerMap` takes
     * this `observable` object and merges it with the existing `observable`
     */
    public static registerMap(map: { [key: string]: TInterface }) {
      return (this.observable.value = { ...this.observable.value, ...map });
    }
  };
};
