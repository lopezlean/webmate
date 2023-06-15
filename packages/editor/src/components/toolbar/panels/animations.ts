import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ToolbarItemMixin } from '../mixins/toolbar-item-mixin.js';

import './header.js';

@customElement('webmate-toolbar-panel-animations')
export class ToolbarPanelAnimations extends ToolbarItemMixin(
  LitElement,
  'webmate-toolbar-panel-animations'
) {
  override renderPanel(): TemplateResult {
    return html`
      <webmate-toolbar-panel-header>Animations</webmate-toolbar-panel-header>
      <p>animations here</p>
    `;
  }
  override renderAction(expanded: boolean): TemplateResult {
    return this.renderActionButton(
      'Animations',
      html`<svg
        role="img"
        fill="currentColor"
        viewBox="0 0 18 18"
        id="SQuickActions18N-icon"
        width="18"
        height="18"
        aria-hidden="true"
        aria-label=""
        focusable="false"
      >
        <polygon
          fill-rule="evenodd"
          points="6.14231 2.3894 7.57124 6.92744 11.66189 8.52176 7.57124 10.11699 6.14231 14.65504 4.70706 10.11699 .62182 8.52176 4.70706 6.92744 6.14231 2.3894"
        ></polygon>
        <polygon
          fill-rule="evenodd"
          points="13.36558 .43355 14.31639 3.15673 17.045 4.11297 14.31639 5.06378 13.36558 7.79329 12.40844 5.06378 9.68616 4.11297 12.40844 3.15673 13.36558 .43355"
        ></polygon>
        <polygon
          fill-rule="evenodd"
          points="13.4424 10.25257 14.39321 12.97575 17.12182 13.93199 14.39321 14.88912 13.4424 17.61231 12.48527 14.88912 9.76298 13.93199 12.48527 12.97575 13.4424 10.25257"
        ></polygon>
      </svg>`,
      expanded
    );
  }

  override connectedCallback() {
    super.connectedCallback();
    this.toolbarController?.addItem(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-toolbar-panel-animations': ToolbarPanelAnimations;
  }
}
