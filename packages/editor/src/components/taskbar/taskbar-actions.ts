import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@spectrum-web-components/action-button/sp-action-button.js';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-project-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add-circle.js';

@customElement('webmate-taskbar-actions')
export class TaskbarActions extends LitElement {
  @property({ attribute: false })
  currentItem = '';

  @state()
  private _actions = [1];
  @property({
    reflect: true,
    type: Boolean
  })
  expanded = false;

  static override styles = css`
    :host {
      position: absolute;
      top: auto;
      right: 0;
      z-index: 2;
      background-color: var(--spectrum-alias-toolbar-background-color);
      border-left-color: var(--spectrum-alias-appframe-border-color);
      border-left-width: var(--spectrum-alias-border-size-thick);
      border-left-style: solid;
      height: calc(100vh - var(--spectrum-global-dimension-size-550));
    }

    .section-taskbar {
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: calc(
        var(--spectrum-global-dimension-size-5000) + var(--spectrum-global-dimension-size-2000)
      );
      padding: var(--spectrum-global-dimension-size-100) var(--spectrum-global-dimension-size-50) 0
        var(--spectrum-global-dimension-size-50);
      overflow: hidden;
    }
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

  public addAction() {
    this._actions.push(1);
  }

  private _getActions() {
    return html`
      ${this._actions.map(() => {
        return html`
          <sp-action-button
            quiet=""
            dir="ltr"
            size="m"
            role="button"
            focusable=""
            tabindex="0"
            selected=${true}
          >
            <sp-icon slot="icon" dir="ltr"
              ><sp-icon-project-edit dir="ltr"></sp-icon-project-edit
            ></sp-icon>
          </sp-action-button>
        `;
      })}
    `;
  }

  override render() {
    return html`
      <strong>${this.currentItem}</strong>
      <div class="section-taskbar">${this._getActions()}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar-actions': TaskbarActions;
  }
}
