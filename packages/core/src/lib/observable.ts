import { ObservableInterface, ObserverInterface } from '../interfaces/observer.interface.js';

export class Observable<T> implements ObservableInterface<T> {
  constructor(private _value: T) {}

  get value(): T {
    return this._value;
  }
  set value(value: T) {
    this._value = value;
    this.notify();
  }

  private observers: ObserverInterface<T>[] = [];

  public subscribe(observer: ObserverInterface<T>): () => void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log('Subject: Observer has been attached already.');
      return () => null;
    }

    this.observers.push(observer);

    return () => this.unsubscribe(observer);
  }

  public unsubscribe(observer: ObserverInterface<T>): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }
    this.observers.splice(observerIndex, 1);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer(this, this.value);
    }
  }
}
