export type ExtensionLocation = 'toolbar' | 'taskbar' | 'command' | 'build' | 'preview';

export interface ExtensionInterface {
  location: ExtensionLocation;
  activate: (context: unknown) => void;
}
