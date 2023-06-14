import { PAGE_MOCKUP } from './mockups/page.mockup';
import { PageManager } from '@webmate/core/lib/page-manager';

describe('Document Editor', () => {
  const pageManager = new PageManager(PAGE_MOCKUP);

  it('Can get a path', () => {
    const content = pageManager.getNode('content');
    expect(content).toEqual(PAGE_MOCKUP.content);
  });

  it('Can get a property', () => {
    const content = pageManager.getNode('content.0.properties.children');
    expect(content).toEqual(PAGE_MOCKUP.content[0].properties?.children);
  });

  it('Can create a property if empty', () => {
    const defaultValue = {
      id: 'not-exists-id'
    };
    const content = pageManager.getNode('content.0.properties.notExist', true, defaultValue);
    expect(content).toEqual(PAGE_MOCKUP.content[0].properties?.notExist);
    expect(defaultValue).toEqual(PAGE_MOCKUP.content[0].properties?.notExist);
  });

  it('Can create a property if empty and fill it with an array', () => {
    const defaultValue = [
      {
        id: 'not-exists-id'
      }
    ];
    const content = pageManager.getNode('content.0.properties.anotherNotExist', true, defaultValue);
    expect(content).toEqual(PAGE_MOCKUP.content[0].properties?.anotherNotExist);
    expect(defaultValue).toEqual(PAGE_MOCKUP.content[0].properties?.anotherNotExist);
  });

  it('Can create assing a new property', () => {
    const value = pageManager.getNode('content.0.properties');
    if (!value) {
      return;
    }
    const TEXT = "I'm a new property";
    value.propertyToAssign = TEXT;

    expect(TEXT).toEqual(PAGE_MOCKUP.content[0].properties?.propertyToAssign);
  });

  it('Can create replace document path value many times', () => {
    const newValue = {
      id: 'new-id',
      name: 'new-name'
    };

    pageManager.setNodeValue('content.1.properties', true, newValue);

    const content = pageManager.getNode('content.1.properties');

    const replaceAgain = { other: 'other' };
    pageManager.setNodeValue('content.1.properties', true, replaceAgain);

    const content2 = pageManager.getNode('content.1.properties');

    expect(newValue).toEqual(content);
    expect(replaceAgain).toEqual(content2);
  });

  it('Can move a page node childrens', () => {
    const item0 = PAGE_MOCKUP.content[0];
    const item1 = PAGE_MOCKUP.content[1];
    const item2 = PAGE_MOCKUP.content[2];

    const moved = pageManager.moveNodeChildren('content', 2, 0);

    expect(moved).toBe(true);

    expect(PAGE_MOCKUP.content[0]).toEqual(item2);
    expect(PAGE_MOCKUP.content[1]).toEqual(item0);
    expect(PAGE_MOCKUP.content[2]).toEqual(item1);
  });

  it('Can move up a component', () => {
    const item0 = PAGE_MOCKUP.content[0];
    const item1 = PAGE_MOCKUP.content[1];
    const item2 = PAGE_MOCKUP.content[2];

    const moved = pageManager.moveNodeUp('content.1');

    expect(moved).toBe(true);

    expect(PAGE_MOCKUP.content[0]).toEqual(item1);
    expect(PAGE_MOCKUP.content[1]).toEqual(item0);
    expect(PAGE_MOCKUP.content[2]).toEqual(item2);
  });

  it('Can move down a component', () => {
    const item0 = PAGE_MOCKUP.content[0];
    const item1 = PAGE_MOCKUP.content[1];
    const item2 = PAGE_MOCKUP.content[2];

    const moved = pageManager.moveNodeDown('content.1');

    expect(moved).toBe(true);

    expect(PAGE_MOCKUP.content[0]).toEqual(item0);
    expect(PAGE_MOCKUP.content[1]).toEqual(item2);
    expect(PAGE_MOCKUP.content[2]).toEqual(item1);
  });

  it("Cannot move node's childrens  out of bounds", () => {
    const item0 = PAGE_MOCKUP.content[0];
    const item1 = PAGE_MOCKUP.content[1];
    const item2 = PAGE_MOCKUP.content[2];

    const moved = pageManager.moveNodeChildren('content', 2, 100);

    expect(moved).toBe(false);

    expect(PAGE_MOCKUP.content[0]).toEqual(item0);
    expect(PAGE_MOCKUP.content[1]).toEqual(item1);
    expect(PAGE_MOCKUP.content[2]).toEqual(item2);
  });

  it('Cannot move a properties beacuse its are objects. Ex: properties', () => {
    const moved = pageManager.moveNodeChildren('content.0.properties', 2, 1);
    expect(moved).toBe(false);

    // invalid document
    const moved2 = pageManager.moveNodeUp('content.1.properties');
    expect(moved2).toBe(false);
  });
});
