import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ComponentInterface } from '@webmate/core';
import { COMPONENT_CLICK_EVENT } from '@webmate/editor/constants/events.js';
@customElement('webmate-preview-indicators')
export class WebmatePreviewIndicators extends LitElement {
  static override styles = css`
    :host {
      background-color: var(--spectrum-alias-toolbar-background-color);
      position: relative;
      flex: 1 1 0%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  `;

  // handle webmate-card event
  private _handleComponentClick(event: Event) {
    const pointerEvent = event as PointerEvent;
    const currentTarget = pointerEvent.target as HTMLElement;
    /**
     * avoid more than one call when the parent is a custom element
     */
    if (this /* element */ !== currentTarget) {
      return;
    }

    try {
      const component = JSON.parse(
        currentTarget.dataset.webmateComponent as string
      ) as ComponentInterface;
      console.log({ component });
      // dispatch event to all parents
      window.parent.document.dispatchEvent(
        new CustomEvent<ComponentInterface>(COMPONENT_CLICK_EVENT, {
          detail: component
        })
      );
    } catch (e) {
      console.log(e);
      return;
    }
  }

  override firstUpdated() {
    // add event listener for webmate-container using query all
    const webmateContainer = document.querySelectorAll('[data-webmate-component]');
    webmateContainer.forEach((element) => {
      element.addEventListener('click', this._handleComponentClick, {
        capture: true
      });
    });
  }

  override render() {
    return html` <button>Preview Indicators</button> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-preview-indicators': WebmatePreviewIndicators;
  }
}
