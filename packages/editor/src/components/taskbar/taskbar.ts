import { LitElement, html, css, PropertyValues, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { TaskbarController } from './controllers/taskbar-controller.js';
import { TaskbarItem } from './taskbar-item';
import { Webmate } from '@webmate/core';
import { TASKBAR_ACTION_CLICK_EVENT } from '@webmate/editor/constants/events.js';
import { TaskbarItemEventInterface } from '@webmate/editor/interfaces/taskbar-item.interface.js';

import './taskbar-actions.js';
import './taskbar-item.js';

@customElement('webmate-taskbar')
export class Taskbar extends LitElement {
  public controller = new TaskbarController(this);

  @query('#taskbar') private _taskbar!: HTMLDivElement;
  @query('webmate-taskbar-actions') private _taskbarActions!: HTMLElement;
  static override styles = css`
    :host {
      display: flex;
      overflow: hidden;
      background-color: var(--spectrum-alias-toolbar-background-color);
      border-left-color: var(--spectrum-alias-appframe-border-color);
      border-left-width: var(--spectrum-alias-border-size-thick);
      border-left-style: solid;
      width: calc(3 * var(--spectrum-global-dimension-size-1250));
      color: var(--spectrum-global-color-gray-800);
    }

    #container {
      padding: var(--spectrum-global-dimension-size-25, 4px);
    }
    webmate-taskbar-item {
      border-bottom: solid var(--app-frame-borders-width, 2px) transparent;
      border-top: solid var(--app-frame-borders-width, 2px) transparent;
    }
    webmate-taskbar-item.highlighted-top {
      border-top: solid var(--app-frame-borders-width, 2px) var(--spectrum-global-color-blue-600);
    }
    webmate-taskbar-item.highlighted-bottom {
      border-bottom: solid var(--app-frame-borders-width, 2px) var(--spectrum-global-color-blue-600);
    }

    #taskbar {
      --margin-right: calc(
        var(--spectrum-global-dimension-size-500) + var(--spectrum-global-dimension-size-25)
      );
      display: flex;
      flex-direction: column;
      position: relative;
      margin-right: var(--margin-right);
      height: calc(
        100vh - var(--spectrum-global-dimension-size-500) - var(--spectrum-global-dimension-size-25)
      );
      overflow: hidden;
      width: calc(var(--margin-right) - calc(3 * var(--spectrum-global-dimension-size-1250)));
      min-width: calc(
        var(--spectrum-global-dimension-size-3000) + var(--spectrum-global-dimension-size-225)
      );
    }
  `;

  private _getNextPrevSibling = (event: DragEvent) => {
    let nextSibling: HTMLElement | null | undefined = null;
    let prevSibling: HTMLElement | null | undefined = null;
    if (event.dataTransfer?.types.includes('taskbar-item')) {
      // get other taskbarItems
      const taskbarItems = [
        ...this._taskbar.querySelectorAll(`webmate-taskbar-item:not([dragging])`)
      ] as HTMLElement[];

      nextSibling = taskbarItems.find((sibling) => {
        return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
      });

      prevSibling = taskbarItems.reverse().find((sibling) => {
        return event.clientY >= sibling.offsetTop + sibling.offsetHeight / 2;
      });
    }
    return { nextSibling, prevSibling };
  };

  private _onDrop = (event: DragEvent) => {
    event.preventDefault();
    setTimeout(this._removeItemsHighlight, 100);

    if (event.dataTransfer?.types.includes('taskbar-item')) {
      event.preventDefault();
      event.stopPropagation();
      const data = event.dataTransfer.getData('taskbar-item');
      const taskbarItem = this._taskbar.querySelector(`webmate-taskbar-item[key="${data}"]`);
      if (taskbarItem) {
        const { nextSibling, prevSibling } = this._getNextPrevSibling(event);
        let orderChanged = false;
        if (nextSibling) {
          this._taskbar.insertBefore(taskbarItem, nextSibling);
          orderChanged = true;
        } else {
          if (prevSibling) {
            this._taskbar.insertBefore(taskbarItem, prevSibling.nextSibling);
            orderChanged = true;
          }
        }
        if (orderChanged) {
          // save positions in toolbarcontroller
          const taskbarItems = [
            ...this._taskbar.querySelectorAll(`webmate-taskbar-item`)
          ] as TaskbarItem[];
          const taskbarItemsData = taskbarItems.map((taskbarItem) => taskbarItem.item);
          this.controller.updateTaskbarItems(taskbarItemsData);
          this.controller.saveItemProperties();
        }
      }
    }
  };

  private _removeItemsHighlight = () => {
    const taskbarItems = [
      ...this._taskbar.querySelectorAll(`webmate-taskbar-item:not([dragging])`)
    ] as HTMLElement[];

    if (taskbarItems) {
      taskbarItems.forEach((taskbarItem) => {
        taskbarItem.classList.remove('highlighted-top');
        taskbarItem.classList.remove('highlighted-bottom');
      });
    }
  };
  private _highlightTimeout: NodeJS.Timeout | undefined;

  private _onDragOver = (event: DragEvent) => {
    event.preventDefault();
    (event.dataTransfer as DataTransfer).effectAllowed = 'move';
    // wait for the timeout to finish
    if (this._highlightTimeout) {
      return;
    }

    // remove hightlighted classes using a timeout
    const { nextSibling, prevSibling } = this._getNextPrevSibling(event);
    this._highlightTimeout = setTimeout(() => {
      this._removeItemsHighlight();
      if (nextSibling) {
        nextSibling.classList.remove('highlighted-bottom');
        nextSibling.classList.add('highlighted-top');
      } else if (prevSibling) {
        prevSibling.classList.remove('highlighted-top');
        prevSibling.classList.add('highlighted-bottom');
      }
      clearTimeout(this._highlightTimeout);
      this._highlightTimeout = undefined;
    }, 100);
  };

  override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    const context = {
      taskbar: this,
      taskbarActions: this._taskbarActions
    };
    Webmate.Extensions.load('taskbar', context);
    Webmate.Extensions.observable.subscribe(() => {
      Webmate.Extensions.load('taskbar', context);
    });
  }

  private _onTaskbarActionClick = (e: CustomEvent<TaskbarItemEventInterface>) => {
    console.log('taskbar action click', e);
    const item = e.detail.item;

    let properties = this.controller.getItemProperties(item);
    if (!properties) {
      properties = {};
    }

    properties.active = e.detail.pressed;
    this.controller.setItemProperties(item, properties);
    this.controller.saveItemProperties();
  };

  private _getItems(): TemplateResult[] {
    const items: TemplateResult[] = [];
    this.controller.items.forEach((item) => {
      // if active is boolean and false, don't show the item
      if (typeof item.active === 'boolean' && !item.active) {
        console.log('item is not active', item);
        return;
      }
      items.push(html`<webmate-taskbar-item .item=${item}></webmate-taskbar-item>`);
    });
    return items;
  }

  private _getTaskbarActions(): TemplateResult {
    const items = this.controller.items;
    if (items.length === 0) {
      return html``;
    }
    return html` <webmate-taskbar-actions .items=${items}></webmate-taskbar-actions>`;
  }

  override connectedCallback() {
    super.connectedCallback();

    document.addEventListener(TASKBAR_ACTION_CLICK_EVENT, this._onTaskbarActionClick);
  }
  override disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(TASKBAR_ACTION_CLICK_EVENT, this._onTaskbarActionClick);
  }
  public override render() {
    return html`
      <div id="container">
        ${this._getTaskbarActions()}
        <div id="taskbar" @drop=${this._onDrop} @dragover=${this._onDragOver}>
          ${this._getItems()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar': Taskbar;
  }
}
