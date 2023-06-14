import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';

@customElement('webmate-theme')
export class Theme extends LitElement {
  override render() {
    return html`
      <sp-theme color="dark" scale="medium">
        <slot></slot>
      </sp-theme>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-theme': Theme;
  }
}
