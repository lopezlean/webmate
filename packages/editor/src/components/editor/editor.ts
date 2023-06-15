import { provide } from '@lit-labs/context';
import { PropertyValues } from '@lit/reactive-element';
import { Remote, proxy, wrap } from 'comlink';
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import {
  BuildResultInterface,
  PageInterface,
  PageManager,
  ServiceWorkerInterface,
  ServiceWorkerMessageType,
  Webmate,
  createUniqueRuntimeID,
  ObservableInterface
} from '@webmate/core';
import '@webmate/ui/theme.js';
import '@webmate/controls/index.js';
import './top-nav.js';
import '../toolbar/toolbar.js';
import '../toolbar/left-task-bar.js';
import './preview.js';
import { EditorContextInterface, editorContext } from '@webmate/editor/context/editor-context.js';
import { pageContext } from '@webmate/ui';
import { WorkerInterface } from '@webmate/worker';

const fncObserver = (name: string) => (subject: unknown, value: unknown) => {
  console.log({ subject, value }, `new ${name} added`);
};
Webmate.Controls.observable.subscribe(fncObserver('control'));
Webmate.Components.observable.subscribe(fncObserver('component'));
//Webmate.Controls.map.detach(fncObserver);

/**
 *
 * The main editor component.
 * @public
 * @param src - The URL of the page to load.
 * @example
 * Example usage:
 * ```html
 * <webmate-editor src="/path/to/my/page.json"></webmate-editor>
 * ```
 */
@customElement('webmate-editor')
export class Editor extends LitElement {
  static override styles = css`
    :host #container {
      height: 100vh;
      width: 100vw;
      background-color: var(--spectrum-background-base-color);
      display: flex;
      flex-direction: column;
    }
    :host #document-container {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
    }
  `;

  private readonly _sessionId: string = createUniqueRuntimeID('session');

  private _serviceWorkerInstance?: Remote<ServiceWorkerInterface>;
  private _buildWorker?: Remote<WorkerInterface>;

  @property({ attribute: false, reflect: true })
  private _workerInit = false;

  /**
   *
   * The URL of the page to load.
   * @decorator {@link property}
   * @public
   */
  @property({ attribute: true, reflect: true })
  public src = '';

  @provide({ context: pageContext })
  @state()
  _pageManager: PageManager = new PageManager({ content: [] });

  @provide({ context: editorContext })
  @property()
  _editorContext: EditorContextInterface = {
    isSaved: true
  };

  /**
   *   init service worker
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
   */
  private async _registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers are not supported in this browser.');
      return;
    }

    const registration = await navigator.serviceWorker.register(
      new URL('/service-worker.js', import.meta.url)
    );

    registration.addEventListener('updatefound', () => {
      // A new service worker is installing.
      // If there's an existing service worker, it's being replaced.
      // we should bind the files to the new service worker
      const newWorker = registration.installing;
      if (newWorker) {
        this._connectServiceWorker(newWorker);
      }
    });

    if (registration.active) {
      this._connectServiceWorker(registration.active);
    } else {
      console.warn('Service worker not active', registration);
    }
  }

  /**
   * Connects to the service worker and establishes a communication channel.
   *
   * @private
   * @param worker - The service worker to connect to.
   * @returns A promise that resolves when the connection is established.
   */
  private async _connectServiceWorker(worker: ServiceWorker) {
    return new Promise<void>((resolve) => {
      const { port1, port2 } = new MessageChannel();

      const onMessage = (e: MessageEvent) => {
        if (e.data.initComlink === ServiceWorkerMessageType.HANDSHAKE_RECEIVED) {
          port1.removeEventListener('message', onMessage);
          this._serviceWorkerInstance = wrap<ServiceWorkerInterface>(port1);
          this._workerInit = true;
          this._serviceWorkerInstance?.setBuildResult(
            proxy({
              getBuildResult: () => this._getBuildResult()
            }),
            this._sessionId
          );
          resolve();
        }
      };

      port1.addEventListener('message', onMessage);
      port1.start();
      worker.postMessage(
        {
          initComlink: ServiceWorkerMessageType.ESTABLISH_HANDSHAKE,
          port: port2
        },
        [port2]
      );
    });
  }
  private _buildResultPromise = Promise.resolve<BuildResultInterface | undefined>(undefined);

  /**
   * Retrieves the build result for the current page.
   * If a build worker is available, it is used to build the page.
   *
   * @private
   * @returns A promise that resolves with the build result.
   */
  private async _getBuildResult(): Promise<BuildResultInterface | undefined> {
    if (!this._buildWorker) {
      console.log('no build worker');
      return;
    }

    if ((await this._buildResultPromise) === undefined) {
      this._buildResultPromise = this._buildWorker.build(this._pageManager.page);
    }
    return this._buildResultPromise;
  }
  /**
   * Starts the builder worker used for building the page.
   * If the builder worker is not already created, it creates a new one.
   *
   * @private
   */
  private async _startBuilderWorker() {
    if (!this._buildWorker) {
      const worker = new Worker(new URL('/web-worker.js', import.meta.url));
      this._buildWorker = wrap<WorkerInterface>(worker);
    }
  }
  /**
   * Loads the page specified by the `src` property.
   * It fetches the page data and sets it in the page manager.
   *
   * @private
   */
  private async _loadPage() {
    const response = await fetch(this.src);
    const page = await response.json();
    this._pageManager.page = page;
    this.requestUpdate('_pageManager');
    this._pageManager.observable.subscribe(this._onPageChanged);
  }

  override async firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._loadPage();
    await this._startBuilderWorker();

    await this._registerServiceWorker();
  }

  override update(changedProperties: PropertyValues) {
    console.log('update 2', changedProperties);
    super.update(changedProperties);
  }
  /**
   * Event handler for when the page changes in the page manager.
   * It updates the editor context and requests an update.
   *
   * @private
   * @param _page - The observable page object.
   */
  _onPageChanged = (_page: ObservableInterface<PageInterface>) => {
    console.log('page changed', _page);
    this._editorContext = { ...this._editorContext, isSaved: false };
    this.requestUpdate('_pageManager');
  };

  /**
   * Sets the `isSaved` property of the editor context to `true`.
   * This method can be used as an event handler for a "save" button or
   * similar functionality in the editor.
   *
   * @public
   *
   * @example
   * ```html
   * const editor = document.querySelector('webmate-editor');
   * document.addEventListener('@webmate/editor/save', (event) => {
   *   fetch('/api/page/save', {
   *     method: 'POST',
   *     headers: {
   *       'Content-Type': 'application/json'
   *     },
   *     body: JSON.stringify(event.detail)
   *   });
   *   editor.onSave();
   * });
   * ```
   */
  onSave = () => {
    this._editorContext = { ...this._editorContext, isSaved: true };
  };

  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._pageManager.observable.unsubscribe(this._onPageChanged);
  }

  private _buildResult(): Promise<BuildResultInterface | undefined> {
    return this._buildWorker?.build(this._pageManager.page) ?? Promise.resolve(undefined);
  }
  /**
   * Renders the preview of the page.
   * If the worker is not initialized, it shows a loading message.
   *
   * @private
   * @returns The HTML template for rendering the preview.
   */
  private _renderPreview() {
    if (!this._workerInit) {
      return html`<div>loading...</div>`;
    }
    console.error('render preview');

    return html`
      <webmate-preview
        sessionID=${this._sessionId}
        .buildResult=${until(this._buildResult(), { success: false })}
      ></webmate-preview>
    `;
  }

  override render() {
    return html`
      <webmate-theme theme="spectrum" color="dark" scale="medium">
        <div id="container">
          <webmate-top-nav></webmate-top-nav>
          <div id="document-container">
            <webmate-toolbar></webmate-toolbar>
            ${this._renderPreview()}
          </div>
        </div>
      </webmate-theme>
    `;
  }
}
