import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('webmate-toolbar-panel-styles-renderer')
export class ToolbarPanelStylesRenderer extends LitElement {
  override render() {
    return html` <p>Options here</p> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-toolbar-panel-styles-renderer': ToolbarPanelStylesRenderer;
  }
}
