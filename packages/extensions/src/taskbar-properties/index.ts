// example extension to log all new components and controls
import { Webmate } from '@webmate/core';

const activateDebugger = (context: any) => {
  console.log('Extensions: taskbar.properties activated', context);
  context.actions.currentItem = 'test';
  context.actions.addAction();
};
console.log('Extensions: taskbar.properties registered', Webmate.Extensions.observable.value);

Webmate.Extensions.register('taskbar.properties', {
  activate: activateDebugger,
  location: 'taskbar'
});
