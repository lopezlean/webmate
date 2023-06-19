import { Components as ComponentsClass } from './components.js';
import { Controls as ControlsClass } from './controls.js';
import { Extensions as ExtensionsClass } from './extensions.js';
import { PageManager } from './page-manager.js';

/**
 * The main entry point for the Webmate library.
 */
export abstract class Webmate {
  /**
   * The components module of the Webmate library.
   */
  static get Components() {
    return ComponentsClass;
  }

  /**
   * The controls module of the Webmate library.
   */
  static get Controls() {
    return ControlsClass;
  }

  /**
   * The extensions module of the Webmate library.
   */
  static get Extensions() {
    return ExtensionsClass;
  }

  private static _pageManager: PageManager;

  /**
   * The page manager instance used by the Webmate library.
   */
  static get PageManager() {
    return this._pageManager;
  }

  /**
   * Sets the page manager instance for the Webmate library.
   * @param pageManager - The page manager instance to set.
   */
  static set PageManager(pageManager: PageManager) {
    this._pageManager = pageManager;
  }
}

declare global {
  interface Window {
    Webmate: typeof Webmate;
  }
}
