import { createContext } from '@lit-labs/context';

import { ToolbarController } from '../controllers/toolbar-controller';

export const toolbarContext = createContext<ToolbarController>('toolbar');
