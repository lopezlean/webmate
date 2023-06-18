export type ExtensionLocation = 'toolbar' | 'taskbar' | 'command' | 'build' | 'preview';

export interface ExtensionInterface {
  name: string;
  location: ExtensionLocation;
  activate: () => void;
}
