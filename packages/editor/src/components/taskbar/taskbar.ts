import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import './taskbar-actions.js';
import './taskbar-item.js';

@customElement('webmate-taskbar')
export class Toolbar extends LitElement {
  @query('#taskbar') private _taskbar!: HTMLDivElement;
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

    #taskbar {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-right: calc(
        var(--spectrum-global-dimension-size-500) + var(--spectrum-global-dimension-size-25)
      );
      height: calc(
        100vh - var(--spectrum-global-dimension-size-500) - var(--spectrum-global-dimension-size-25)
      );
      overflow: hidden;
      min-width: calc(
        var(--spectrum-global-dimension-size-3000) + var(--spectrum-global-dimension-size-225)
      );
    }
  `;

  private _onDrop = (event: DragEvent) => {
    event.preventDefault();
    // allow taskbar-item type to be dropped
    console.log('data', event);
    if (event.dataTransfer?.types.includes('taskbar-item')) {
      event.preventDefault();
      event.stopPropagation();
      const data = event.dataTransfer.getData('taskbar-item');
      console.log('data', data);
      const taskbarItem = document.getElementById(data);
      if (taskbarItem) {
        this._taskbar.appendChild(taskbarItem);
      }
    }
  };

  private _onDragOver = (event: DragEvent) => {
    event.preventDefault();
    (event.dataTransfer as DataTransfer).effectAllowed = 'move';
  };

  override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
  }
  public override render() {
    return html`
      <div id="container">
        <webmate-taskbar-actions></webmate-taskbar-actions>
        <div id="taskbar" @drop=${this._onDrop} @dragover=${this._onDragOver}>
          <webmate-taskbar-item></webmate-taskbar-item>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar': Toolbar;
  }
}
