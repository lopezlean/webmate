import { consume } from '@lit-labs/context';
import { LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

import { PageManager } from '@webmate/core';
import { pageContext } from '@webmate/ui';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T;

export interface ControlInterface {
  value: string;
  name?: string | undefined;
  getPageManager(): PageManager;
  onValueChange: (event: Event) => void;
  changeValue: (value: unknown) => void;
  registerControl: (control: ControlInterface) => void;
}

export const ControlBaseMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  abstract class ControlBaseMixinBase extends superClass {
    @property({ type: String })
    name: string | undefined = undefined;
    @state()
    value = '';

    @consume({ context: pageContext })
    @state()
    page?: PageManager;

    getPageManager = (): PageManager => {
      if (!this.page) {
        throw new Error('PageManager not found');
      }
      return this.page;
    };

    override firstUpdated(_changedProperties: PropertyValues) {
      if (this.name) {
        this.value = this.getPageManager().getNode(this.name) as unknown as string;
        console.log('value', this.value, this.name);
      }

      super.firstUpdated(_changedProperties);
    }

    public onValueChange = (event: Event): void => {
      console.log('onValueChange', event);
      const value = (event.target as HTMLInputElement).value;
      this.changeValue(value);

      //this.getPageManager().setNodeValue(this.name,true,);
    };
    public changeValue = (value: unknown): void => {
      if (this.name) {
        console.log('changeValue', value);
        this.getPageManager().setNodeValue(this.name, true, value);
      }
    };
  }
  // Cast return type to your mixin's interface intersected with the superClass type
  return ControlBaseMixinBase as unknown as Constructor<ControlInterface> & T;
};

export abstract class ControlBase extends ControlBaseMixin(LitElement) {}
