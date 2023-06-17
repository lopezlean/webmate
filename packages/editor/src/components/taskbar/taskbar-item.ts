import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('webmate-taskbar-item')
export class TaskbarItem extends LitElement {
  // select grabber

  @query('#grabber') private _grabber!: HTMLElement;

  public override draggable = true;

  private _dragging = false;

  static override styles = css`
    :host {
      animation: 0.2s linear 0s 1 normal none running fadein;
      box-sizing: border-box;
      contain: strict;
      overflow: hidden;
      position: absolute;
      top: 0px;
      height: 290px;
      width: 258px;
      right: 0px;
    }

    :host([dragging]) {
      opacity: 0.1;
    }

    #container {
      background-color: var(--spectrum-alias-toolbar-background-color);
      contain: strict;
      display: flex;
      flex-direction: column;
      inset: 0px;
      overflow: hidden;
      position: absolute;
    }

    #grabber {
      align-self: center;
      cursor: grab;
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: calc(var(--spectrum-global-dimension-size-75, 6px) * -1);
      padding: var(--spectrum-global-dimension-size-75, 6px);
      padding-bottom: calc(var(--spectrum-global-dimension-size-75, 6px) * 2);
      pointer-events: auto;
      z-index: 1;
    }
    #grabber:active::before {
      cursor: grabbing;
    }
    #grabber:hover::before {
      background-color: var(--spectrum-global-color-gray-500);
    }

    #grabber:before {
      background-color: var(--spectrum-global-color-gray-400);
      border-radius: var(--spectrum-alias-border-radius-regular);
      content: '';
      display: block;
      height: var(--spectrum-global-dimension-size-50);
      width: var(--spectrum-global-dimension-size-550);
    }

    .taskbar-item-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 var(--spectrum-global-dimension-size-50) 0 0;
    }
    .taskbar-item-title {
      font-size: var(--spectrum-global-dimension-font-size-200);
      margin: 0 0 var(--spectrum-global-dimension-size-50) 0;
      padding: var(--spectrum-global-dimension-size-125) var(--spectrum-global-dimension-size-200);
      color: var(--spectrum-global-color-gray-800);
    }
  `;

  private _onPointerDown = (event: PointerEvent) => {
    // allow drag only from grabber
    if (event.target !== this._grabber) {
      return;
    }

    this._dragging = true;
  };

  private _onPointerUp = (_event: PointerEvent) => {
    this._dragging = false;
  };

  private _onDragStart = (_event: DragEvent) => {
    if (!this._dragging) {
      _event.preventDefault();
      return;
    }

    (_event.dataTransfer as DataTransfer).effectAllowed = 'move';

    // add dragging attribute to host
    this.setAttribute('dragging', '');
    _event.dataTransfer?.setData('text', (_event.target as HTMLDivElement).id);
  };

  private _onDragEnd = (_event: DragEvent) => {
    console.log('drag end');
    _event.preventDefault();
    this._dragging = false;
    // remove dragging attribute from host
    this.removeAttribute('dragging');
  };

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dragstart', this._onDragStart);
    this.addEventListener('dragend', this._onDragEnd);
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dragstart', this._onDragStart);
    this.removeEventListener('dragend', this._onDragEnd);
  }

  public override render() {
    return html`
      <div id="container">
        <div id="grabber" @pointerdown=${this._onPointerDown} @pointerup=${this._onPointerUp}></div>
        <div class="taskbar-item-header">
          <h4 class="taskbar-item-title">Layers</h4>
        </div>
      </div>
    `;
  }
}
