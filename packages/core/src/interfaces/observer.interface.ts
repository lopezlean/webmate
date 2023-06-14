/**
 * The Observer interface declares the update method, used by subjects.
 */

export type ObserverInterface<T> = (subject: ObservableInterface<T>, value: T) => void;

/**
 * The ObservableInterface interface declares a set of methods for managing subscribers.
 */
export interface ObservableInterface<T> {
  // Attach an observer to the subject.
  subscribe(observer: ObserverInterface<T>): void;

  // Detach an observer from the subject.
  unsubscribe(observer: ObserverInterface<T>): void;

  // Notify all observers about an event.
  notify(): void;
}
