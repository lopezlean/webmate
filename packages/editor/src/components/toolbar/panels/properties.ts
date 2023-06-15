import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@spectrum-web-components/field-group/sp-field-group.js';

import { ToolbarItemMixin } from '../mixins/toolbar-item-mixin.js';
import './header.js';
import {
  ComponentPreviewInterface,
  ComponentRegisterInterface,
  Webmate,
  ControlRegisterInterface
} from '@webmate/core';

@customElement('webmate-toolbar-panel-properties')
export class ToolbarPanelProperties extends ToolbarItemMixin(
  LitElement,
  'toolbar-item-properties'
) {
  override renderPanel(
    currentComponent: ComponentPreviewInterface | undefined,
    currentComponentRegister: ComponentRegisterInterface | undefined
  ): TemplateResult {
    const controlTemplate = [];
    if (currentComponentRegister && currentComponentRegister.controls) {
      for (const control of currentComponentRegister.controls) {
        const registeredControl: ControlRegisterInterface =
          Webmate.Controls.get(control.tag) ||
          (Webmate.Controls.get(
            'input'
          ) as ControlRegisterInterface); /* fallback to input control*/
        if (registeredControl && control.tag !== registeredControl.tag) {
          console.log('Control not registered', control);
        }
        /* if control.tag has - is custom element */
        const isCustomElement = control.tag && control.tag.includes('-');

        const outputTag =
          isCustomElement && registeredControl ? registeredControl.tag : control.tag;
        const valuePath = currentComponent
          ? currentComponent.path + `.properties.${control.name}`
          : '';

        const tag = `<${outputTag} name="${valuePath}"></${outputTag}>`;
        console.log({ tag });
        controlTemplate.push(html`<sp-field-group vertical id="vertical">
          <p>${currentComponent?.id}${unsafeHTML(tag)}</p>
        </sp-field-group>`);
      }
    }

    return html`
      <webmate-toolbar-panel-header>Properties</webmate-toolbar-panel-header>
      <p>Options here</p>
      ${controlTemplate}
    `;
  }
  override renderAction(expanded: boolean): TemplateResult {
    return this.renderActionButton(
      'Properties',
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
    'webmate-toolbar-panel-properties': ToolbarPanelProperties;
  }
}
