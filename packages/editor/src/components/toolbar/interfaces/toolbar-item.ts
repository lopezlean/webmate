import { TemplateResult } from 'lit';

import { ToolbarController } from '../controllers/toolbar-controller';
import { ComponentPreviewInterface, ComponentRegisterInterface, PageManager } from '@webmate/core';

export interface ToolbarItem {
  toolbarID: string;
  toolbarController: ToolbarController;
  renderPanel(
    currentComponent: ComponentPreviewInterface | undefined,
    currentComponentRegister: ComponentRegisterInterface | undefined,
    pageManager: PageManager
  ): TemplateResult;
  renderAction(expanded: boolean): TemplateResult;
  renderActionButton(text: string, icon: TemplateResult, expanded: boolean): TemplateResult;
}
