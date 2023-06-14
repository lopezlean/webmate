import { createContext } from '@lit-labs/context';

import { PageManager } from '@webmate/core';

export const pageContext = createContext<PageManager>(Symbol('page'));
