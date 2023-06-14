import { createContext } from '@lit-labs/context';

export interface EditorContextInterface {
  isSaved: boolean;
}

export const editorContext = createContext<EditorContextInterface>(Symbol('editor'));
