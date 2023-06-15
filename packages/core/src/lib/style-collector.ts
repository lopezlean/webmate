import { convertToDomAttribute } from './convert-to-dom-attribute.js';
import { BuildResultInterface } from '@webmate/core/interfaces/build-result.interface.js';
import { ComponentInterface } from '@webmate/core/interfaces/component.interface.js';
import { StyleInterface } from '@webmate/core/interfaces/style.interface.js';

const ALL_BREAKPOINT = 'all';

interface Breakpoints {
  [key: string]: string;
}

// TODO: make this configurable
const BREAKPOINTS: Breakpoints = {
  lg: '992px',
  md: '768px',
  sm: '576px',
  xl: '1200px',
  xs: '0px',
  xxl: '1400px'
};

/**
 *
 * StyleCollector is used to collect all styles from a page
 * and return a BuildResultInterface with the result. @see BuildResultInterface
 * @param page the page to build
 * @returns BuildResultInterface
 * @example
 * const styleCollector = new StyleCollector();
 * const result = styleCollector.collect(component);
 * if (result.success) {
 * // do something with the result
 * }
 */
export class StyleCollector {
  private _collectedStyles: string[] = [];

  getBreakpoint(key: keyof Breakpoints): string {
    const breakpoint = BREAKPOINTS[key];
    return `@media (min-width: ${breakpoint})`;
  }

  buildStyle(styles: StyleInterface): string {
    let result = '';

    for (const key in styles) {
      const value = styles[key];
      if (typeof value === 'object') {
        if (key === ALL_BREAKPOINT) {
          result += this.buildStyle(value as StyleInterface);
          continue;
        }
        const styles = this.buildStyle(value as StyleInterface);
        // if is a valid breakpoint
        if (Object.prototype.hasOwnProperty.call(BREAKPOINTS, key)) {
          const breakpoint = this.getBreakpoint(key);
          result += `${breakpoint} {${styles}}`;
        } else {
          result += `${convertToDomAttribute(key)} {${styles}}`;
        }
      } else {
        result += `${convertToDomAttribute(key)}: ${value};`;
      }
    }
    return result;
  }

  getString(): string {
    return this._collectedStyles.join('');
  }

  collect(component: ComponentInterface): BuildResultInterface {
    if (!component.styles) {
      // ignore if component has no styles
      return {
        success: true
      };
    }
    const result: BuildResultInterface = {
      success: true
    };

    try {
      // build styles
      const stylesString = `.${component.tag}-${component.id}{${this.buildStyle(
        component.styles as StyleInterface
      )}}`;
      // add styles to result
      result.styles = stylesString;
      this._collectedStyles.push(stylesString);
    } catch (error) {
      result.success = false;
      result.error = error;
    }
    return result;
  }
}
