import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Webmate } from '@webmate/core';

@customElement('webmate-toolbar-panel-components-list')
export class ToolbarPanelStylesRenderer extends LitElement {
  override render() {
    const components = JSON.stringify(Webmate.Components.observable.value);
    return html`<p>Options here ${components}</p> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-toolbar-panel-components-list': ToolbarPanelStylesRenderer;
  }
}
