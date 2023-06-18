import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { BuildResultInterface, Webmate } from '@webmate/core';

@customElement('webmate-preview')
export class Preview extends LitElement {
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

  @property({ attribute: true, reflect: true })
  sessionID = '';

  @property({ attribute: true, reflect: false })
  buildResult: BuildResultInterface = { success: false };

  @property({ attribute: false, reflect: false })
  buildDocument: Document = document.implementation.createHTMLDocument('');

  @query('iframe')
  private _iframe!: HTMLIFrameElement;

  reload() {
    this._iframe.contentWindow?.location.reload();
  }

  private _buildDocument(): Document {
    if (!this.buildResult || !this.buildResult.success) {
      return document.implementation.createHTMLDocument('New Document');
    }

    const title = this.buildResult.page?.title || 'New Document';
    const buildDocument: Document = document.implementation.createHTMLDocument(title);
    if (this.buildResult.page?.template) {
      buildDocument.open();
      buildDocument.write(this.buildResult.page?.template);
      buildDocument.close();
    }

    // if have register
    if (this.buildResult.page?.register) {
      console.log('register', window);
      if (this.buildResult.page?.register.components) {
        Webmate.Components.registerMap(this.buildResult.page?.register.components);
      }
      if (this.buildResult.page?.register.controls) {
        Webmate.Controls.registerMap(this.buildResult.page?.register.controls);
      }
    }

    // find webmate-builder tag and replace with content
    const webmateBuilder = buildDocument.querySelector('webmate-builder') || buildDocument.body;
    if (webmateBuilder) {
      webmateBuilder.innerHTML = this.buildResult.content as string;
      if (this.buildResult.page?.template && webmateBuilder.tagName !== 'webmate-builder') {
        console.log('webmate-builder tag not found in template, body has been replaced.');
      }
    }

    // add headers from files
    if (Array.isArray(this.buildResult.files)) {
      for (const file of this.buildResult.files) {
        if (file.mimetype === 'text/javascript') {
          const script = buildDocument.createElement('script');
          script.type = file.type ? file.type : 'text/javascript';
          script.src = file.path;
          buildDocument.head.appendChild(script);
        }
      }
    }

    // add preview-indicators script
    const script = buildDocument.createElement('script');
    script.type = 'module';
    script.src = './preview-indicators.js';

    buildDocument.head.appendChild(script);

    // add preview-indicators tag
    const previewIndicators = buildDocument.createElement('webmate-preview-indicators');
    buildDocument.body.appendChild(previewIndicators);

    // add inline styles
    const style = buildDocument.createElement('style');
    style.innerHTML = this.buildResult.styles as string;
    buildDocument.head.appendChild(style);

    this.buildDocument = buildDocument;
    return buildDocument;
  }

  // on update of document, reload iframe
  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('buildDocument')) {
      const destDocument = this._iframe.contentDocument;
      if (destDocument) {
        destDocument.open();
        destDocument.write(this.buildDocument.documentElement.outerHTML);
        destDocument.close();
      }
    }
    if (changedProperties.has('buildResult')) {
      this._buildDocument();
    }
  }

  override render() {
    console.log({ document: this.buildDocument });
    // create and iframe with build resu)lts data
    return html` <iframe frameborder="0" style="flex: 1 1 0%;"></iframe> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'webmate-preview': Preview;
  }
}
