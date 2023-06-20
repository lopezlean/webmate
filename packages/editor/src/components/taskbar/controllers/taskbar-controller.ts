import { ReactiveController, ReactiveControllerHost } from 'lit';

import {
  TaskbarActionInterface,
  TaskbarItemInterface,
  TaskbarItemLocalStorePropertiesInterface,
  TaskbarItemPrivateInterface
} from '@webmate/editor';

export const TASKBAR_LOCAL_STORAGE_KEY = 'webmate-taskbar-layout';
export class TaskbarController implements ReactiveController {
  host: ReactiveControllerHost;

  private _items: TaskbarItemPrivateInterface[] = [];

  private _itemProperties: Map<string, TaskbarItemLocalStorePropertiesInterface> | undefined =
    undefined;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);

    // load _itemProperties from localStorage
    try {
      this._itemProperties = new Map<string, TaskbarItemLocalStorePropertiesInterface>(
        JSON.parse(localStorage.getItem(TASKBAR_LOCAL_STORAGE_KEY) || '[]')
      );
    } catch (e) {
      console.log('TaskbarController::constructor', e);
    }

    console.log('this._itemProperties', this._itemProperties);
  }

  get items(): TaskbarItemInterface[] {
    // order items by weight
    const orderedItems = this._items.sort((a, b) => {
      const aWeight =
        this._itemProperties?.get(a.id)?.row || this._items.findIndex((i) => i.id === a.id);
      const bWeight =
        this._itemProperties?.get(b.id)?.row || this._items.findIndex((i) => i.id === b.id);
      return aWeight - bWeight;
    });
    return orderedItems;
  }

  get actions(): TaskbarActionInterface[] {
    return this._items.map((item) => item.action);
  }

  public getItemProperties(id: string): TaskbarItemLocalStorePropertiesInterface | undefined {
    if (this._itemProperties) {
      return this._itemProperties.get(id);
    }
    return undefined;
  }

  public saveItemProperties() {
    if (this._itemProperties) {
      localStorage.setItem(
        TASKBAR_LOCAL_STORAGE_KEY,
        JSON.stringify(Array.from(this._itemProperties.entries()))
      );
    }
  }

  addItem(item: TaskbarItemInterface) {
    this._items.push(item as TaskbarItemPrivateInterface);
    this.host.requestUpdate();
  }

  hostConnected() {
    // nothing
  }
  hostDisconnected() {
    // nothing
  }
}
