import { consume } from '@lit-labs/context';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { toolbarContext } from '../context/toolbar-context.js';
import { ToolbarController } from '../controllers/toolbar-controller.js';
import { ToolbarItem } from '../interfaces/toolbar-item.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T;

export const ToolbarItemMixin = <T extends Constructor<LitElement>>(superClass: T, id: string) => {
  class ToolbarItemClass extends superClass {
    toolbarID: string = id;

    @property({ attribute: false })
    selected = false;

    @consume({ context: toolbarContext })
    toolbarController?: ToolbarController;

    protected onActionHover = () => {
      if (this.toolbarController?.currentItem === (this as unknown as ToolbarItem)) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent('@webmate/editor/toolbar/left-task-bar/action/hover', {
          bubbles: true,
          composed: true,
          detail: this
        })
      );
    };

    protected onActionClick = () => {
      this.dispatchEvent(
        new CustomEvent('@webmate/editor/toolbar/left-task-bar/action/click', {
          bubbles: true,
          composed: true,
          detail: this
        })
      );
      if (this.toolbarController?.currentItem === (this as unknown as ToolbarItem)) {
        return;
      }
      this.toolbarController?.setCurrentItem(this as unknown as ToolbarItem);
    };

    protected renderActionButton(text: string, icon: TemplateResult, expanded: boolean) {
      this.selected = this.toolbarController?.currentItem === (this as unknown as ToolbarItem);

      // add slot to icon
      icon = html`<sp-icon slot="icon" dir="ltr">${icon}</sp-icon>`;
      return html`
        <sp-action-button
          quiet
          ?emphasized=${this.selected}
          ?selected=${this.selected}
          @click=${this.onActionClick}
          @mouseover=${this.onActionHover}
        >
          ${icon} ${expanded ? text : nothing}
        </sp-action-button>
      `;
    }
  }
  // Cast return type to your mixin's interface intersected with the superClass type
  return ToolbarItemClass as unknown as Constructor<ToolbarItem> & T;
};
