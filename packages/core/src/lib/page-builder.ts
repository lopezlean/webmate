/**
 *
 * Convert a page interface to a html page string.
 *
 */

import { ComponentInterface } from '../interfaces/component.interface.js';
import { ComponentBuilder } from './component-builder.js';
import { FileCollector } from './file-collector.js';
import { StyleCollector } from './style-collector.js';
import { BuildResultInterface } from '@webmate/core/interfaces/build-result.interface.js';
import { PageInterface } from '@webmate/core/interfaces/page.interface.js';
import { Webmate } from './webmate.js';

interface PageBuilderOptions {
  debug?: boolean;
  preview?: boolean;
}

/**
 *
 * PageBuilder is used to build a page from a PageInterface
 * and return a BuildResultInterface with the result. @see BuildResultInterface
 * @param page the page to build
 * @param options options for the page builder
 * @returns BuildResultInterface
 * @example
 * const pageBuilder = new PageBuilder(page);
 * const result = pageBuilder.build();
 * if (result.success) {
 *  // do something with the result
 * }
 *
 */
export class PageBuilder {
  private _page: PageInterface;
  private _options: PageBuilderOptions;
  private _componentBuilder: ComponentBuilder;
  private _styleCollector: StyleCollector;
  private _fileCollector: FileCollector;

  constructor(page: PageInterface, options: PageBuilderOptions = { debug: false, preview: false }) {
    {
      this._page = page;
      this._options = options || {};
      this._componentBuilder = new ComponentBuilder(this.options);
      this._styleCollector = new StyleCollector();
      this._fileCollector = new FileCollector();
    }
  }

  get page(): PageInterface {
    {
      return this._page;
    }
  }

  get options(): PageBuilderOptions {
    {
      return this._options;
    }
  }

  get componentBuilder(): ComponentBuilder {
    {
      return this._componentBuilder;
    }
  }

  get styleCollector(): StyleCollector {
    return this._styleCollector;
  }
  get fileCollector(): FileCollector {
    return this._fileCollector;
  }

  /*   private templateWrap(content: string): string {
    if (this.page.template) {
      // replace <webmate-builder></webmate-builder> with content using regex to find open and close tags
      content = this.page.template.replace(/<webmate-builder><\/webmate-builder>/g, content);
    }
    return content;
  } */

  build(): BuildResultInterface {
    const result: BuildResultInterface = {
      page: this.page,
      success: true
    };

    try {
      // if has register we need to register all components
      if (this.page.register && this.page.register.components) {
        Webmate.Components.registerMap(this.page.register.components);
      }
      if (this.page.register && this.page.register.controls) {
        Webmate.Controls.registerMap(this.page.register.controls);
      }
      //get content and build each tag in a string
      let content = this.page.content as ComponentInterface[];
      // if we have a layout we need to use it as content and put content inside the layout property children
      if (this.page.layout) {
        const layout = this.page.layout;
        if (typeof layout.properties !== 'object') {
          layout.properties = {};
        }
        // add slot body to all children of content
        for (const child of content) {
          if (typeof child.properties !== 'object') {
            child.properties = {};
          }
          if (typeof child.properties.slot !== 'string') {
            child.properties.slot = 'body';
          }
        }
        layout.properties.children = content;
        content = [layout];
        console.log(layout);
      }

      if (content) {
        result.content = '';
        result.styles = '';
        for (const [index, component] of Object.entries(content)) {
          // create a path reference
          const path = `content.${index}`;

          // build component
          const componentResult = this.componentBuilder.build(
            component,
            this.styleCollector,
            this.fileCollector,
            path
          );

          if (!componentResult.success) {
            return componentResult;
          }
          // add component to result
          result.content += componentResult.content;
        }
      }
    } catch (error) {
      result.success = false;
      result.error = error;
    }

    result.styles = this.styleCollector.getString();
    result.files = this.fileCollector.getFiles();

    return result;
  }
}
