import { TemplateResult } from 'lit';

import { ToolbarController } from '../controllers/toolbar-controller.js';
import { ComponentPreviewInterface, ComponentRegisterInterface } from '@webmate/core';

export interface ToolbarItem {
  toolbarID: string;
  toolbarController: ToolbarController;
  renderPanel(
    currentComponent: ComponentPreviewInterface | undefined,
    currentComponentRegister: ComponentRegisterInterface | undefined
  ): TemplateResult;
  renderAction(expanded: boolean): TemplateResult;
  renderActionButton(text: string, icon: TemplateResult, expanded: boolean): TemplateResult;
}
