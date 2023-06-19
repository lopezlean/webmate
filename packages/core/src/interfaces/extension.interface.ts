export type ExtensionLocation = 'toolbar' | 'taskbar' | 'command' | 'build' | 'preview';

export type TaskbarContextType = {
  actions: HTMLElement;
};

export interface ExtensionInterfacePrivate {
  id: string;
  isActivated: boolean;
}
export interface ExtensionInterface<ContextType = unknown> {
  location: ExtensionLocation;
  activate: (context: ContextType) => void;
}
