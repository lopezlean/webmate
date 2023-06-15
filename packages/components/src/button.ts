import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ComponentRegisterInterface } from '@webmate/core';

interface ButtonProperties {
  children?: string;
}

@customElement('webmate-button')
export class Button extends LitElement {
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

  public static registerComponent(): ComponentRegisterInterface<ButtonProperties> {
    return {
      controls: [
        {
          defaultValue: 'Button text',
          name: 'children',
          tag: 'webmate-input',
          title: 'Children'
        }
      ],
      displayName: 'Button',
      name: 'button',
      tag: 'webmate-button'
    };
  }

  override render() {
    return html` <button>Preview</button> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-button': Button;
  }
}
