import { ReactiveController, ReactiveControllerHost, TemplateResult, nothing } from 'lit';

import { ComponentPreviewInterface, ComponentRegisterInterface, PageManager } from '@webmate/core';
import { ToolbarItem } from '@webmate/editor/src/components/toolbar/interfaces/toolbar-item.js';

export class ToolbarController implements ReactiveController {
  host: ReactiveControllerHost;

  public items: ToolbarItem[] = [];
  public currentItem: ToolbarItem | undefined;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    host;
  }

  public renderPanel(
    currentComponent: ComponentPreviewInterface | undefined,
    currentComponentRegister: ComponentRegisterInterface | undefined,
    pageManager: PageManager
  ): TemplateResult | typeof nothing {
    if (this.currentItem === undefined) {
      return nothing;
    }
    return this.currentItem.renderPanel(currentComponent, currentComponentRegister, pageManager);
  }

  public renderAction(expanded: boolean): TemplateResult | typeof nothing {
    if (this.currentItem === undefined) {
      return nothing;
    }
    return this.currentItem.renderAction(expanded);
  }

  public addItem(item: ToolbarItem) {
    this.items.push(item);
    //this.host.requestUpdate();
  }
  removeItem(item: ToolbarItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    //this.host.requestUpdate();
  }

  setCurrentItem(item: ToolbarItem) {
    if (this.currentItem === item) {
      return;
    }
    this.currentItem = item;
    this.host.requestUpdate();
    // emit @webmate/editor/toolbar/on-current-item-changed event
    document.dispatchEvent(
      new CustomEvent('@webmate/editor/toolbar/on-current-item-changed', {
        bubbles: true,
        composed: true,
        detail: item
      })
    );
  }

  hostConnected() {
    // nothing
  }
  hostDisconnected() {
    // nothing
  }
}