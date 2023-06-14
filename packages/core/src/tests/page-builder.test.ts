import { PAGE_MOCKUP } from './mockups/page.mockup';
import { PageInterface } from '@webmate/core/interfaces/page.interface';
import { PageBuilder } from '@webmate/core/lib/page-builder';

describe('Page Builder', () => {
  it('Can build the document a returns an string', () => {
    const pageBuilder = new PageBuilder(PAGE_MOCKUP);
    const result = pageBuilder.build();
    expect(result.success).toEqual(true);
  });

  it('Should have valid styles', () => {
    const pageBuilder = new PageBuilder(PAGE_MOCKUP);
    const result = pageBuilder.build();
    expect(result.styles).toBeDefined();
    // validate styels are valid
    //const styles = new CSSStyleSheet();
    //expect(styles.insertRule(result.styles as string)).not.toThrowError();
  });

  it('Should have a valid render', () => {
    const SIMPLE_DIV: PageInterface = {
      content: [
        {
          id: 'div-1',
          properties: {
            children: ['test', { id: 'sbcc', tag: 'custom-div' }]
          },
          tag: 'div'
        }
      ]
    };
    const EXPECTED =
      '<div class="div-div-1">test<custom-div class="custom-div-sbcc"></custom-div></div>';
    const pageBuilder = new PageBuilder(SIMPLE_DIV);
    const result = pageBuilder.build();

    expect(result.content).toEqual(EXPECTED);
  });

  it('Should return empty page on invalid json', () => {
    const pageBuilder = new PageBuilder('invalid' as unknown as PageInterface);
    const result = pageBuilder.build();
    expect(result.content).toBeUndefined();
  });
  it('Can build a layout', () => {
    const MOCKUP_WITH_LAYOUT: PageInterface = {
      ...PAGE_MOCKUP,
      ...{
        layout: {
          id: 'layout-1',
          tag: 'custom-layout',
          properties: {
            children: [
              {
                id: 'div-1',
                properties: {
                  children: [
                    'test',
                    { id: 'sbcc', tag: 'custom-div', properties: { slot: 'header' } }
                  ]
                },
                tag: 'div'
              }
            ]
          }
        }
      }
    };
    const pageBuilder = new PageBuilder(MOCKUP_WITH_LAYOUT);
    const result = pageBuilder.build();
    console.log(result.content);
    expect(result.content).toBeDefined();
  });
});
