import { ComponentPreviewInterface, PageInterface } from '@webmate/core';
import { ToolbarItem } from '@webmate/editor/components/toolbar/interfaces/toolbar-item';
import { TaskbarItemEventInterface } from '@webmate/editor/interfaces/taskbar-item.interface';

export const TOOLBAR_ITEM_CHANGED = '@webmate/editor/toolbar/on-current-item-changed';
export const TOOLBAR_ITEM_CLICK = '@webmate/editor/toolbar/items/action/click';
export const TOOLBAR_ITEM_HOVER = '@webmate/editor/toolbar/left-task-bar/action/hover';

export const COMPONENT_CLICK_EVENT = '@webmate/editor/component/click';
export const EDITOR_SAVE_EVENT = '@webmate/editor/save';

export const TASKBAR_ACTION_CLICK_EVENT = '@webmate/editor/taskbar/action/click';

interface CustomEventMap extends DocumentEventMap {
  [COMPONENT_CLICK_EVENT]: CustomEvent<ComponentPreviewInterface>;
  [EDITOR_SAVE_EVENT]: CustomEvent<PageInterface>;

  [TOOLBAR_ITEM_CHANGED]: CustomEvent<ToolbarItem>;
  [TOOLBAR_ITEM_CLICK]: CustomEvent<ToolbarItem>;
  [TOOLBAR_ITEM_HOVER]: CustomEvent<ToolbarItem>;
  [TASKBAR_ACTION_CLICK_EVENT]: CustomEvent<TaskbarItemEventInterface>;
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
