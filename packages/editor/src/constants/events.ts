import { ToolbarItem } from '@webmate/editor/components/toolbar';

export const TOOLBAR_ITEM_CHANGED = '@webmate/editor/toolbar/on-current-item-changed';
export const TOOLBAR_ITEM_CLICK = '@webmate/editor/toolbar/items/action/click';
export const TOOLBAR_ITEM_HOVER = '@webmate/editor/toolbar/left-task-bar/action/hover';

interface CustomEventMap extends DocumentEventMap {
  [TOOLBAR_ITEM_CHANGED]: CustomEvent<ToolbarItem>;
  [TOOLBAR_ITEM_CLICK]: CustomEvent<ToolbarItem>;
  [TOOLBAR_ITEM_HOVER]: CustomEvent<ToolbarItem>;
}

declare global {
  interface Document {
    //adds definition to Document, but you can do the same with HTMLElement
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): boolean;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      listener: (this: Document, ev: CustomEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void;
  }
}
