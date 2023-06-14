import { ComponentRegisterInterface } from './component-register.interface';
import { ComponentInterface } from './component.interface';
import { ControlRegisterInterface } from './control-register.interface';

export interface PageMetaInterface {
  id?: string | number;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  slug?: string;
  url?: string;
  scripts?: string[];
  styles?: string[];
  [key: string]: unknown | undefined;
}

/**
 * PageInterface is used to build a page
 * @param content
 * The content of the page
 * @param layout
 * The layout component to use for this page. For example the html layout.
 * the content will be wrapped in this component:
 * <layout-component><content></content></layout-component>
 * if no layout is provided the content will be returned as is
 *
 * @param template
 * posiblity to build from a html template string for example in wordpress
 * note that this will not override the layout and content it will just wrap it
 * note there is a layout with html and body tag there will be a conflict
 * the webmate-builder tag will be replaced with the content and is required if you want to use this approach
 * example:
 * <html>
 * <body>
 *   <h1>My Page</h1>
 *   <p>This is my template header</p>
 *   <webmate-builder>
 *    <layout> <!-- PageInterface.layout -->
 *      <content></content> <!-- PageInterface.content -->
 *    </layout>
 *   </webmate-builder>
 * </body>
 * </html>
 */
export interface PageInterface extends PageMetaInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: {
    components?: Record<string, ComponentRegisterInterface<unknown>>;
    controls?: Record<string, ControlRegisterInterface>;
  };
  content: ComponentInterface[];

  layout?: ComponentInterface;

  template?: string;
}
