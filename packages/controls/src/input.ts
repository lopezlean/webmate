import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ControlBase } from './mixin/control-base.js';

@customElement('webmate-control-input')
export class Input extends ControlBase {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: var(--spectrum-global-dimension-size-100);
      background-color: var(--spectrum-alias-background-color);
      border-color: var(--spectrum-alias-border-color);
      border-width: var(--spectrum-alias-border-size-thin);
      border-style: solid;
      border-radius: var(--spectrum-alias-border-radius-medium);
      margin: var(--spectrum-global-dimension-size-100);
    }
  `;

  override render() {
    console.log({ value: this.value }, 'input value');
    return html`<label>a<input
    @input=${this.onValueChange}
    .value=${this.value}
    ></input></input>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-control-input': Input;
  }
}
