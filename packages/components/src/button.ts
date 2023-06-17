import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ComponentRegisterInterface, Webmate } from '@webmate/core';

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

  public static registerComponent() {
    const data: ComponentRegisterInterface<ButtonProperties> = {
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

    Webmate.Components.register('webmate-button', data);
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
