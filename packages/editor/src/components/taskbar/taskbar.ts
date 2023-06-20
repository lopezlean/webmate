import { LitElement, html, css, PropertyValues, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import './taskbar-actions.js';
import './taskbar-item.js';
import { TaskbarController } from './controllers/taskbar-controller.js';
import { Webmate } from '@webmate/core';

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
  private _highlightTimeout: NodeJS.Timeout | undefined;
  private _getNextPrevSibling = (event: DragEvent) => {
    let nextSibling: HTMLElement | null | undefined = null;
    let prevSibling: HTMLElement | null | undefined = null;
    if (event.dataTransfer?.types.includes('taskbar-item')) {
      // get other taskbarItems
      const taskbarItems = [
        ...this._taskbar.querySelectorAll(`webmate-taskbar-item:not([dragging])`)
      ] as HTMLElement[];

      if (this._highlightTimeout) {
        clearTimeout(this._highlightTimeout);
      }
      // remove hightlighted classes using a timeout

      this._highlightTimeout = setTimeout(() => {
        taskbarItems.forEach((taskbarItem) => {
          taskbarItem.classList.remove('highlighted-top');
          taskbarItem.classList.remove('highlighted-bottom');
        });
      }, 500);

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
    if (event.dataTransfer?.types.includes('taskbar-item')) {
      event.preventDefault();
      event.stopPropagation();
      const data = event.dataTransfer.getData('taskbar-item');
      const taskbarItem = this._taskbar.querySelector(`webmate-taskbar-item[key="${data}"]`);
      if (taskbarItem) {
        const { nextSibling, prevSibling } = this._getNextPrevSibling(event);
        if (taskbarItem) {
          if (nextSibling) {
            this._taskbar.insertBefore(taskbarItem, nextSibling);
          } else {
            if (prevSibling) {
              this._taskbar.insertBefore(taskbarItem, prevSibling.nextSibling);
            }
          }
        }
      }
    }
  };

  private _onDragOver = (event: DragEvent) => {
    event.preventDefault();
    (event.dataTransfer as DataTransfer).effectAllowed = 'move';
    const { nextSibling, prevSibling } = this._getNextPrevSibling(event);

    //console.log(event, taskbarItem, nextSibling, prevSibling);
    if (nextSibling) {
      nextSibling.classList.remove('highlighted-bottom');
      nextSibling.classList.add('highlighted-top');
    } else if (prevSibling) {
      prevSibling.classList.remove('highlighted-top');
      prevSibling.classList.add('highlighted-bottom');
    }
  };

  override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    const context = {
      taskbar: this,
      taskbarActions: this._taskbarActions
    };
    Webmate.Extensions.load('taskbar', context);
    Webmate.Extensions.observable.subscribe(() => {
      console.log('changed');
      Webmate.Extensions.load('taskbar', context);
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
  }

  private _getItems(): TemplateResult[] {
    const items: TemplateResult[] = [];
    this.controller.items.forEach((item) => {
      items.push(html`<webmate-taskbar-item .item=${item}></webmate-taskbar-item>`);
    });
    return items;
  }

  public override render() {
    return html`
      <div id="container">
        <webmate-taskbar-actions .actions=${this.controller.actions}></webmate-taskbar-actions>
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
