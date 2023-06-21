import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/action-button/sp-action-button.js';

import { TASKBAR_ACTION_CLICK_EVENT } from '@webmate/editor/constants/events.js';
import {
  TaskbarItemEventInterface,
  TaskbarItemPrivateInterface
} from '@webmate/editor/interfaces/taskbar-item.interface.js';

@customElement('webmate-taskbar-action')
export class TaskbarAction extends LitElement {
  @property({ type: Object })
  public item: TaskbarItemPrivateInterface | undefined;
  @property({
    reflect: true,
    type: Boolean
  })
  pressed = true;

  static override styles = css`
    sp-action-button {
      margin: var(--spectrum-global-dimension-size-50) 0;
    }
    sp-action-button sp-icon {
      margin-inline-start: calc(
        (
            var(--mod-actionbutton-edge-to-text, var(--spectrum-actionbutton-edge-to-text)) -
              var(
                --mod-actionbutton-edge-to-visual-only,
                var(--spectrum-actionbutton-edge-to-visual-only)
              )
          ) * -1
      );
    }
  `;

  private _onActionClick = () => {
    const item = this.item as TaskbarItemPrivateInterface;
    const pressed = (this.pressed = !this.pressed);
    document.dispatchEvent(
      new CustomEvent<TaskbarItemEventInterface>(TASKBAR_ACTION_CLICK_EVENT, {
        detail: { item, pressed }
      })
    );
  };
  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.pressed = this.item?.active ?? true;
  }

  override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    this.pressed = this.item?.active ?? true;
  }

  override render() {
    if (!this.item) {
      return html``;
    }
    return html`
      <sp-action-button
        quiet=""
        dir="ltr"
        size="m"
        role="button"
        focusable=""
        tabindex="0"
        aria-pressed=${this.pressed}
        title=${this.item.label}
        ?selected=${this.pressed}
        @click=${this._onActionClick}
      >
        <sp-icon slot="icon" dir="ltr"> ${this.item.action.icon()} </sp-icon>
      </sp-action-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar-action': TaskbarAction;
  }
}
