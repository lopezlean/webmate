import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { TaskbarItemPrivateInterface } from '@webmate/editor/interfaces/taskbar-item.interface.js';

import './taskbar-action.js';

@customElement('webmate-taskbar-actions')
export class TaskbarActions extends LitElement {
  @property({ attribute: true, type: Array })
  public items: TaskbarItemPrivateInterface[] = [];
  @property({
    reflect: true,
    type: Boolean
  })
  expanded = false;

  static override styles = css`
    :host {
      position: absolute;
      top: auto;
      right: 0;
      z-index: 2;
      background-color: var(--spectrum-alias-toolbar-background-color);
      border-left-color: var(--spectrum-alias-appframe-border-color);
      border-left-width: var(--spectrum-alias-border-size-thick);
      border-left-style: solid;
      height: calc(100vh - var(--spectrum-global-dimension-size-550));
    }

    .section-taskbar {
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: calc(
        var(--spectrum-global-dimension-size-5000) + var(--spectrum-global-dimension-size-2000)
      );
      padding: var(--spectrum-global-dimension-size-100) var(--spectrum-global-dimension-size-50) 0
        var(--spectrum-global-dimension-size-50);
      overflow: hidden;
    }
  `;

  override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    // update if items changed
    if (_changedProperties.has('items')) {
      this.requestUpdate();
    }
  }

  private _getActions() {
    // order actions by weight
    const orderedActions = this.items.sort((a, b) => {
      if (a.action.weight === undefined) {
        a.action.weight = 100;
      }
      if (b.action.weight === undefined) {
        b.action.weight = 100;
      }
      return a.action.weight - b.action.weight;
    });

    return html`
      ${orderedActions.map((item) => {
        return html`<webmate-taskbar-action .item=${item}></webmate-taskbar-action>`;
      })}
    `;
  }

  override render() {
    return html` <div class="section-taskbar">${this._getActions()}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar-actions': TaskbarActions;
  }
}
