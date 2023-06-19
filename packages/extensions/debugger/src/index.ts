// example extension to log all new components and controls
import { Webmate } from '@webmate/core';

const activateDebugger = () => {
  console.log('Extensions: debugger activated');
  const fncObserver = (name: string) => (subject: unknown, value: unknown) => {
    console.log({ subject, value }, `new ${name} added`, 'Extensions: debugger ');
  };
  Webmate.Controls.observable.subscribe(fncObserver('control'));
  Webmate.Components.observable.subscribe(fncObserver('component'));
};
console.log('Extensions: debugger registered', Webmate.Extensions.observable.value);
Webmate.Extensions.register('debugger', {
  activate: activateDebugger,
  location: 'toolbar',
  name: 'debugger'
});
