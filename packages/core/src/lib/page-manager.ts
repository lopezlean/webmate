import { Observable } from './observable';
import { PageInterface } from '@webmate/core/interfaces/page.interface';

interface PageManagerCurrentNode {
  [key: string]: unknown;
}

/**
 *
 * PageManager is a helper class to manage the page interface.
 * It provides methods to get and set nodes in the page interface.
 * It also provides methods to move nodes in the page interface.
 *  @example
 * const pageManager = new PageManager(PAGE_MOCKUP);
 * const node = pageManager.getNode('content.0.properties.children.0');
 * console.log(node);
 * // { tag: 'h1', properties: { children: 'Hello World' } }
 */
export class PageManager {
  private _page: Observable<PageInterface>;

  constructor(page: PageInterface) {
    this._page = new Observable(page);
  }

  get observable(): Observable<PageInterface> {
    return this._page;
  }

  get page(): PageInterface {
    return this._page.value;
  }
  set page(page: PageInterface) {
    this._page.value = page;
  }

  getNode(path: string, create = true, defaultValue: unknown = {}) {
    const pathParts = path.split('.');
    let current: PageManagerCurrentNode = this._page.value;
    for (const part of pathParts) {
      if (current[part] === undefined) {
        if (create) {
          current[part] = defaultValue;
        } else {
          return undefined;
        }
      }
      current = current[part] as PageManagerCurrentNode;
    }
    return current;
  }
  moveNodeChildren(path: string, oldIndex: number, newIndex: number): boolean {
    const current = this.getNode(path, false);

    if (current instanceof Array) {
      // don't allow moving outside the bounds of the array
      if (newIndex >= current.length) {
        return false;
      }
      const item = current.splice(oldIndex, 1)[0];
      current.splice(newIndex, 0, item);
      this._page.notify();
      return true;
    }
    return false;
  }

  moveNode(path: string, steps: number): boolean {
    const pathParts = path.split('.');
    const nodeKey = pathParts.pop() as string;
    const nodeParentPath = pathParts.join('.');
    const nodeParentValue = this.getNode(nodeParentPath, false);

    if (!nodeParentValue || !Array.isArray(nodeParentValue)) {
      return false;
    }

    const ret = this.moveNodeChildren(
      nodeParentPath,
      nodeParentValue.indexOf(nodeParentValue[nodeKey]),
      nodeParentValue.indexOf(nodeParentValue[nodeKey]) + steps
    );

    this._page.notify();
    return ret;
  }

  moveNodeUp(path: string): boolean {
    return this.moveNode(path, -1);
  }
  moveNodeDown(path: string): boolean {
    return this.moveNode(path, 1);
  }

  setNodeValue(path: string, create = true, value: unknown = {}) {
    const pathParts = path.split('.');
    const nodeKey = pathParts.pop() as string;
    const nodeParentPath = pathParts.join('.');
    const nodeParent = this.getNode(nodeParentPath, create);

    if (nodeParent) {
      const ret = (nodeParent[nodeKey] = value);
      this._page.notify();
      return ret;
    }
    return undefined;
  }
}
