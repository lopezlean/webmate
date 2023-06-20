import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('webmate-taskbar-panel-header')
export class ToolbarPanelHeader extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      margin-top: var(--spectrum-global-dimension-font-size-50);
      position: relative;
      padding-left: var(--spectrum-global-dimension-size-200);
      font-size: var(--spectrum-global-dimension-font-size-200);
      color: var(--spectrum-global-color-gray-800);
    }
  `;

  override render() {
    return html` <h4><slot></slot></h4>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar-panel-header': ToolbarPanelHeader;
  }
}
