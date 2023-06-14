import { ComponentPreviewInterface, PageInterface } from '../interfaces';

export const COMPONENT_CLICK_EVENT = '@webmate/editor/component/click';
export const EDITOR_SAVE_EVENT = '@webmate/editor/save';

interface CustomEventMap extends DocumentEventMap {
  [COMPONENT_CLICK_EVENT]: CustomEvent<ComponentPreviewInterface>;
  [EDITOR_SAVE_EVENT]: CustomEvent<PageInterface>;
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
