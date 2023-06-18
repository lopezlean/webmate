// example extension to log all new components and controls
import { Webmate } from '@webmate/core';

const activateDebugger = () => {
  const fncObserver = (name: string) => (subject: unknown, value: unknown) => {
    console.log({ subject, value }, `new ${name} added`);
  };
  Webmate.Controls.observable.subscribe(fncObserver('control'));
  Webmate.Components.observable.subscribe(fncObserver('component'));
};

Webmate.Extensions.register('debugger', {
  activate: activateDebugger,
  location: 'toolbar',
  name: 'debugger'
});
