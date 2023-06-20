import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import {
  COMPONENT_CLICK_EVENT,
  ComponentPreviewInterface,
  ComponentRegisterInterface,
  Webmate
} from '@webmate/core';

@customElement('webmate-taskbar-panel-components-list')
export class ToolbarPanelStylesRenderer extends LitElement {
  @state()
  private _currentComponent: ComponentPreviewInterface | undefined = undefined;
  @state()
  private _currentComponentRegister: ComponentRegisterInterface | undefined = undefined;

  override render() {
    const components = JSON.stringify(this._currentComponentRegister);
    return html`<p>Options here ${components}</p> `;
  }

  override connectedCallback() {
    super.connectedCallback();
    this._init();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._destroy();
  }

  private _onComponentClick = (event: CustomEvent<ComponentPreviewInterface>) => {
    if (event.detail) {
      this._currentComponent = event.detail;
      this._currentComponentRegister = Webmate.Components.get(this._currentComponent.tag);
    }
  };

  private _init() {
    document.addEventListener(COMPONENT_CLICK_EVENT, this._onComponentClick);
  }
  private _destroy() {
    document.removeEventListener(COMPONENT_CLICK_EVENT, this._onComponentClick);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-taskbar-panel-components-list': ToolbarPanelStylesRenderer;
  }
}
