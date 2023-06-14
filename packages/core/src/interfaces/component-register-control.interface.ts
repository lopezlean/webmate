export type ComponentRegisterControlConditionTerms<P> = {
  operator:
    | '=='
    | '==='
    | '!='
    | '!=='
    | '>'
    | '<'
    | '>='
    | '<='
    | 'in'
    | '!in'
    | 'contains'
    | '!contains';
  name: keyof P;
  value: string;
};
export type ComponentRegisterControlCondition<P> = {
  type: 'AND' | 'OR'; // default AND
  terms: ComponentRegisterControlConditionTerms<P>[];
};

export type ComponentRegisterControlConditions<P> = ComponentRegisterControlCondition<P>[];

export interface ComponentRegisterControlInterface<P = unknown> {
  /**
   * The name of the property to control.
   * this can contain a dot notation to access nested properties.
   * e.g. 'properties.transition.duration'
   */
  name: string;
  title: string;
  tag: string;
  defaultValue?: string | unknown;
  properties?: Partial<P> | undefined;
  /**
   *
   * It's a flag to tell the editor that this control is responsive.
   * If it's true, the editor will add a responsive button to the control.
   *
   */
  responsive?: boolean;
  /*
   * get value from document
   * @param v value
   * example if it came from background-image property and we only want the image url:
   * getValue: (value: string) => value.trim().slice(4, -1).replace(/"/g, ''),
   */
  getValue?: (v: P) => unknown;
  /*
   * set value to document
   * @param v value
   * example if it's a background-image:
   *  setValue: (value: string) => `url(${value})`
   */
  setValue?: (v: P) => unknown;

  conditions?: ComponentRegisterControlConditions<P>;
}
