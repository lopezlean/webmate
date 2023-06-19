import { consume } from '@lit-labs/context';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@spectrum-web-components/top-nav/sp-top-nav.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-device-preview.js';

import '@spectrum-web-components/divider/sp-divider.js';

import { EDITOR_SAVE_EVENT, PageManager, PageMetaInterface } from '@webmate/core';
import { EditorContextInterface, editorContext } from '@webmate/editor/context/editor-context.js';
import { pageContext } from '@webmate/ui';

@customElement('webmate-top-nav')
export class TopNav extends LitElement {
  @consume({ context: pageContext })
  _pageManager!: PageManager;

  @consume({ context: editorContext, subscribe: true })
  _editorContext!: EditorContextInterface;

  static override styles = css`
    :host {
      background: var(--spectrum-alias-toolbar-background-color);
      height: var(--spectrum-global-dimension-size-500, 40px);
      margin-bottom: var(--spectrum-global-dimension-size-25, 2px);
      display: block;
    }
    #container {
      padding: var(--spectrum-global-dimension-size-50, 4px);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--spectrum-global-dimension-size-50, 4px);
      height: calc(
        var(--spectrum-global-dimension-size-500, 40px) -
          (var(--spectrum-global-dimension-size-50, 4px) * 2)
      );
    }
    #logo {
      font-size: var(--spectrum-global-dimension-size-200);
      font-weight: var(--spectrum-global-font-weight-bold);
      color: var(--spectrum-alias-text-color);
    }
    sp-button {
      margin-inline-start: auto;
    }
  `;

  onSave = () => {
    // emit event to all parents
    const event = new CustomEvent<PageMetaInterface>(EDITOR_SAVE_EVENT, {
      bubbles: true,
      composed: true,
      detail: {
        page: this._pageManager.page
      }
    });
    this.dispatchEvent(event);
  };

  override render() {
    return html`
      <div id="container">
        <div id="logo">Webmate</div>

        <sp-button size="s" @click=${this.onSave} ?disabled=${this._editorContext.isSaved}
          >Save</sp-button
        >
        <sp-divider vertical size="s"></sp-divider>
        <sp-action-menu selects="single" quiet>
          <sp-icon-device-preview slot="icon"></sp-icon-device-preview>

          <sp-menu-item selected> All </sp-menu-item>
          <sp-menu-item> Desktop </sp-menu-item>
          <sp-menu-item> Mobile </sp-menu-item>
          <sp-menu-item> Tablet </sp-menu-item>
        </sp-action-menu>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-top-nav': TopNav;
  }
}
