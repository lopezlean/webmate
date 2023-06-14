import { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 *
 * This controller is used to manage the page state.
 *
 */
export class PageController implements ReactiveController {
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    host;
  }

  hostConnected() {
    // nothing
  }
  hostDisconnected() {
    // nothing
  }
}
