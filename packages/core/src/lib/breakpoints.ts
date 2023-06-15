import { BaseRegisterClass } from './base-register-class.js';

interface BreakpointsInterface {
  [key: string]: string;
}

const DEFAULT_BREAKPOINTS: BreakpointsInterface = {
  lg: '992px',
  md: '768px',
  sm: '576px',
  xl: '1200px',
  xs: '0px',
  xxl: '1400px'
};

export abstract class Breakpoints extends BaseRegisterClass<BreakpointsInterface>(
  DEFAULT_BREAKPOINTS
) {}
