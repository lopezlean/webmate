import { provide } from '@lit-labs/context';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { toolbarContext } from './context/toolbar-context.js';
import { ComponentPreviewInterface, ComponentRegisterInterface, Webmate } from '@webmate/core';
import { ToolbarController } from '@webmate/editor/components/toolbar/controllers/toolbar-controller.js';
import './panels';
import './toolbar-items.js';
import { COMPONENT_CLICK_EVENT } from '@webmate/editor/constants/events.js';

@customElement('webmate-toolbar')
export class Toolbar extends LitElement {
  @provide({ context: toolbarContext })
  @state()
  public toolbarController = new ToolbarController(this);

  @state()
  private _currentComponent: ComponentPreviewInterface | undefined = undefined;
  @state()
  private _currentComponentRegister: ComponentRegisterInterface | undefined = undefined;

  static override styles = css`
    :host {
      display: flex;
      overflow: hidden;
      background-color: var(--spectrum-alias-toolbar-background-color);
      border-right-color: var(--spectrum-alias-appframe-border-color);
      border-right-width: var(--spectrum-alias-border-size-thick);
      border-right-style: solid;
      width: calc(3 * var(--spectrum-global-dimension-size-1250));
      color: var(--spectrum-global-color-gray-800);
    }

    #container {
      padding: var(--spectrum-global-dimension-size-25, 4px);
    }

    #toolbar {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-left: calc(
        var(--spectrum-global-dimension-size-500) + var(--spectrum-global-dimension-size-25)
      );
      height: calc(
        100vh - var(--spectrum-global-dimension-size-500) - var(--spectrum-global-dimension-size-25)
      );
      overflow: hidden;
      min-width: calc(
        var(--spectrum-global-dimension-size-3000) + var(--spectrum-global-dimension-size-225)
      );
    }
  `;

  public override render() {
    return html`
      <div id="container">
        <webmate-toolbar-items></webmate-toolbar-items>
        <div id="toolbar">
          <webmate-toolbar-panel-properties></webmate-toolbar-panel-properties>
          <webmate-toolbar-panel-styles></webmate-toolbar-panel-styles>
          <webmate-toolbar-panel-animations></webmate-toolbar-panel-animations>
          <webmate-toolbar-panel-components></webmate-toolbar-panel-components>
          ${this.toolbarController.renderPanel(
            this._currentComponent,
            this._currentComponentRegister
          )}
        </div>
      </div>
    `;
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
    'webmate-toolbar': Toolbar;
  }
}
