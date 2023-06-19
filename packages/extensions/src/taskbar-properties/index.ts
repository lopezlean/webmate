import { PropertiesIcon } from '@spectrum-web-components/icons-workflow';
import { html } from 'lit';

import { Webmate, ExtensionInterface } from '@webmate/core';
import { TaskbarItemContextInterface } from '@webmate/editor';

import './panel.js';

const renderPanel = () => {
  return html` <webmate-taskbar-properties-panel></webmate-taskbar-properties-panel>`;
};
const activateDebugger = (context: TaskbarItemContextInterface) => {
  console.log('Extensions: taskbar.properties activated', context);

  context.taskbar.controller.addItem({
    action: {
      icon: PropertiesIcon,
      weight: 0
    },
    id: 'properties',
    label: 'Properties',
    render: renderPanel
  });
  context.taskbar.controller.addItem({
    action: {
      icon: PropertiesIcon,
      weight: 0
    },
    id: 'properties2',
    label: 'Properties2',
    render: renderPanel
  });

  /*   context.taskbarActions.addAction({
    icon: PropertiesIcon,
    //render: renderPanel,
    //id: 'properties',
    //label: 'Properties',
    weight: 0
  }); */
};
console.log('Extensions: taskbar.properties registered', Webmate.Extensions.observable.value);

const extensionRegister: ExtensionInterface<TaskbarItemContextInterface> = {
  activate: activateDebugger,
  location: 'taskbar'
};
Webmate.Extensions.register('taskbar.properties', extensionRegister);
