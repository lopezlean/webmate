import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import './header.js';
import './components-list.js';

@customElement('webmate-taskbar-properties')
export class TaskbarPropertiesPanel extends LitElement {
  override render(): TemplateResult {
    return html`
      <webmate-taskbar-panel-header>Components</webmate-taskbar-panel-header>
      <webmate-taskbar-panel-components-list></webmate-taskbar-panel-components-list>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar-properties': TaskbarPropertiesPanel;
  }
}
