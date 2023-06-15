import { createContext } from '@lit-labs/context';

import { ToolbarController } from '../controllers/toolbar-controller.js';

export const toolbarContext = createContext<ToolbarController>('toolbar');
