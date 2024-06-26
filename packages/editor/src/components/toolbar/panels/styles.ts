import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ToolbarItemMixin } from '../mixins/toolbar-item-mixin.js';
import { ComponentPreviewInterface, ComponentRegisterInterface } from '@webmate/core';
import './header.js';
import './styles-renderer.js';

@customElement('webmate-toolbar-panel-styles')
export class ToolbarPanelStyles extends ToolbarItemMixin(
  LitElement,
  'webmate-toolbar-panel-styles'
) {
  override renderPanel(
    currentComponent: ComponentPreviewInterface | undefined,
    currentComponentRegister: ComponentRegisterInterface | undefined
  ): TemplateResult {
    return html`
      <webmate-toolbar-panel-header>Styles</webmate-toolbar-panel-header>
      <p>Options here</p>
      <webmate-toolbar-panel-styles-renderer
        .currentcomponent=${currentComponent}
        .currentcomponentregister=${currentComponentRegister}
      ></webmate-toolbar-panel-styles-renderer>
    `;
  }
  override renderAction(expanded: boolean): TemplateResult {
    return this.renderActionButton(
      'Styles',
      html`<sp-icon-project-edit></sp-icon-project-edit>`,
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
    'webmate-toolbar-panel-styles': ToolbarPanelStyles;
  }
}
