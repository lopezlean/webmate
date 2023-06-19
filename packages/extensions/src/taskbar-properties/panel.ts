import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('webmate-taskbar-properties-panel')
export class TaskbarPropertiesPanel extends LitElement {
  override render() {
    return html`<div>Properties</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar-properties-panel': TaskbarPropertiesPanel;
  }
}
