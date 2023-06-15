import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ToolbarItemMixin } from '../mixins/toolbar-item-mixin.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-group.js';
import '@spectrum-web-components/divider/sp-divider.js';

import './header.js';
import './components-list.js';

@customElement('webmate-toolbar-panel-components')
export class ToolbarPanelComponents extends ToolbarItemMixin(
  LitElement,
  'webmate-toolbar-panel-components'
) {
  override renderPanel(): TemplateResult {
    return html`
      <webmate-toolbar-panel-header>Components</webmate-toolbar-panel-header>
      <webmate-toolbar-panel-components-list></webmate-toolbar-panel-components-list>
    `;
  }
  override renderAction(expanded: boolean): TemplateResult {
    const ret = this.renderActionButton(
      'Components',
      html`<sp-icon-group></sp-icon-group>`,
      expanded
    );
    return html`<sp-divider size=""></sp-divider>${ret}`;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.toolbarController?.addItem(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-toolbar-panel-components': ToolbarPanelComponents;
  }
}
