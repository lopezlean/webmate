import { consume } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@spectrum-web-components/action-button/sp-action-button.js';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-project-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add-circle.js';

import { toolbarContext } from './context/toolbar-context.js';
import { ToolbarController } from './controllers/toolbar-controller.js';
import {
  TOOLBAR_ITEM_CHANGED,
  TOOLBAR_ITEM_CLICK,
  TOOLBAR_ITEM_HOVER
} from '@webmate/editor/constants/events.js';

@customElement('webmate-toolbar-items')
export class ToolbarItems extends LitElement {
  @consume({ context: toolbarContext })
  @property({ attribute: false })
  public toolbarController!: ToolbarController;

  @property({
    reflect: true,
    type: Boolean
  })
  expanded = false;

  static override styles = css`
    :host {
      position: absolute;
      z-index: 2;
      background-color: var(--spectrum-alias-toolbar-background-color);
      border-right-color: var(--spectrum-alias-appframe-border-color);
      border-right-width: var(--spectrum-alias-border-size-thick);
      border-right-style: solid;
      height: calc(100vh - var(--spectrum-global-dimension-size-550));
    }
    :host([expanded]) {
      animation: slidein var(--spectrum-global-animation-duration-2000)
        var(--spectrum-global-animation-ease-out);
      box-shadow: 4px 0 var(--spectrum-global-dimension-size-125)
        var(--spectrum-alias-dropshadow-color);
    }
    .section-toolbar {
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
    :host([expanded]) sp-action-button {
      justify-content: left;
    }
    @keyframes slidein {
      0% {
        max-width: var(--spectrum-global-dimension-size-500);
      }
      100% {
        max-width: 100%;
      }
    }
  `;

  private expand = () => {
    this.expanded = true;
  };
  private collapse = () => {
    this.expanded = false;
  };

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseover', this.expand);
    this.addEventListener('mouseout', this.collapse);
    document.addEventListener(TOOLBAR_ITEM_CHANGED, this.collapse);
    this.addEventListener(TOOLBAR_ITEM_CLICK, this.collapse);
    document.addEventListener(TOOLBAR_ITEM_HOVER, this.expand);
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseover', this.expand);
    this.removeEventListener('mouseout', this.collapse);
    document.removeEventListener(TOOLBAR_ITEM_CHANGED, this.collapse);
    this.removeEventListener(TOOLBAR_ITEM_CLICK, this.collapse);
    document.removeEventListener(TOOLBAR_ITEM_HOVER, this.expand);
  }

  private renderItems() {
    const items = this.toolbarController.items || [];
    return items.map((item) => {
      return item.renderAction(this.expanded);
    });
  }
  override render() {
    return html` <div class="section-toolbar">${this.renderItems()}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-toolbar-items': ToolbarItems;
  }
}
