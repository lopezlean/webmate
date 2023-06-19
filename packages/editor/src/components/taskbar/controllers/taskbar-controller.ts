import { ReactiveController, ReactiveControllerHost } from 'lit';

import { TaskbarActionInterface, TaskbarItemInterface } from '@webmate/editor';

export class TaskbarController implements ReactiveController {
  host: ReactiveControllerHost;

  public items: TaskbarItemInterface[] = [];
  public currentItem: TaskbarItemInterface | undefined;

  get actions(): TaskbarActionInterface[] {
    return this.items.map((item) => item.action);
  }

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  addItem(item: TaskbarItemInterface) {
    this.items.push(item);
    this.host.requestUpdate();
  }

  hostConnected() {
    // nothing
  }
  hostDisconnected() {
    // nothing
  }
}
