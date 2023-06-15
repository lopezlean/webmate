import { convertToDomAttribute } from './convert-to-dom-attribute.js';
import { FileCollector } from './file-collector.js';
import { StyleCollector } from './style-collector.js';
import { BuildResultInterface } from '@webmate/core/interfaces/build-result.interface.js';
import { ComponentInterface } from '@webmate/core/interfaces/component.interface.js';

interface ComponentBuilderOptions {
  debug?: boolean;
  preview?: boolean;
}

const PROPERTIES_REPLACEMENT_MAP: { [key: string]: string } = {
  //className should be replaced with class
  className: 'class'
};

/**
 *
 * ComponentBuilder is used to build a component from a ComponentInterface
 * and return a BuildResultInterface with the result. @see BuildResultInterface
 * @param component the component to build
 * @param styleCollector the style collector to collect the styles
 * @returns BuildResultInterface
 * @example
 * const componentBuilder = new ComponentBuilder();
 * const result = componentBuilder.build(component);
 * if (result.success) {
 * // do something with the result
 * }
 */
export class ComponentBuilder {
  constructor(
    private componentBuilderOptions: ComponentBuilderOptions = { debug: false, preview: false }
  ) {}

  build(
    component: ComponentInterface,
    styleCollector: StyleCollector,
    fileCollector: FileCollector,
    path: string
  ): BuildResultInterface {
    const result: BuildResultInterface = {
      success: true
    };
    try {
      // add files to file collector
      if (component.files) {
        fileCollector.addFiles(component.files);
      }
      let slots = '';
      if (component.properties && component.properties.children) {
        if (Array.isArray(component.properties.children)) {
          for (let i = 0; i < component.properties.children.length; i++) {
            const currentPath = `${path}.properties.children.${i}`;
            const child = component.properties.children[i];
            // check if children has ComponentInterface implemented
            if (typeof child === 'object' && Object.prototype.hasOwnProperty.call(child, 'tag')) {
              const childResult = this.build(child, styleCollector, fileCollector, currentPath);
              if (!childResult.success && this.componentBuilderOptions.debug) {
                return childResult;
              }
              slots += childResult.content;
            } else {
              // if child is a object, we need to stringify it
              slots += typeof child === 'object' ? JSON.stringify(child) : child;
            }
          }
        } else {
          slots +=
            typeof component.properties.children === 'object'
              ? JSON.stringify(component.properties.children)
              : component.properties.children;
        }
      }
      // build styles

      if (component.styles) {
        const styleResult = styleCollector.collect(component);
        if (!styleResult.success && this.componentBuilderOptions.debug) {
          return styleResult;
        }
        result.styles = styleResult.styles;
      }

      // add ids as className to component

      if (component.properties && component.properties.className) {
        component.properties.className += ` .${component.id}`;
      } else {
        if (component.properties === undefined) {
          component.properties = {};
        }
        component.properties.className = `${component.tag}-${component.id}`;
      }
      const previewComponent = { ...component, path };
      const previewAttributes = this.componentBuilderOptions.preview
        ? { 'data-webmate-component': previewComponent }
        : {};
      result.content = `<${component.tag}${this.buildAttributes({
        ...component.properties,
        ...previewAttributes
      })}>${slots}</${component.tag}>`;
    } catch (error) {
      return {
        error,
        success: false
      };
    }
    return result;
  }

  buildAttributes(attributes: { [key: string]: unknown } | undefined): string {
    if (!attributes) {
      return '';
    }
    let result = '';
    for (const key in attributes) {
      if (key === 'children') {
        continue;
      }
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        const markupKey = Object.prototype.hasOwnProperty.call(PROPERTIES_REPLACEMENT_MAP, key)
          ? PROPERTIES_REPLACEMENT_MAP[key]
          : convertToDomAttribute(key);
        const value = attributes[key];

        // if value is an object, we need to stringify it
        result += ` ${markupKey}='${
          ['object', 'array'].includes(typeof value) ? JSON.stringify(value) : value
        }'`;
      }
    }
    return result;
  }
}
