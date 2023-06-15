/**  TypeScript implementation of a deferred promise that can be resolved or
 * rejected at a later time.
 * @public
 */
export class Deferred<T> {
  readonly promise: Promise<T>;
  private _resolve!: (value: T) => void;
  private _reject!: (reason?: unknown) => void;
  settled = false;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value: T) {
    this.settled = true;
    this._resolve(value);
  }

  reject(reason: unknown) {
    this.settled = true;
    this._reject(reason);
  }
}
