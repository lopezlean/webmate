import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('webmate-button')
export class WebmateButton extends LitElement {
  static override styles = css`
    :host {
      background-color: var(--spectrum-alias-toolbar-background-color);
      position: relative;
      flex: 1 1 0%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  `;

  override render() {
    return html` <button>Preview</button> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-button': WebmateButton;
  }
}
