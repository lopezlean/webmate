# Class: PageManager

[@webmate/core](../wiki/@webmate.core).PageManager

PageManager is a helper class to manage the page interface.
It provides methods to get and set nodes in the page interface.
It also provides methods to move nodes in the page interface.

**`Example`**

```ts
const pageManager = new PageManager(PAGE_MOCKUP);
const node = pageManager.getNode('content.0.properties.children.0');
console.log(node);
// { tag: 'h1', properties: { children: 'Hello World' } }
```

## Table of contents

### Constructors

- [constructor](../wiki/@webmate.core.PageManager#constructor)

### Properties

- [\_page](../wiki/@webmate.core.PageManager#_page)

### Accessors

- [observable](../wiki/@webmate.core.PageManager#observable)
- [page](../wiki/@webmate.core.PageManager#page)

### Methods

- [getNode](../wiki/@webmate.core.PageManager#getnode)
- [moveNode](../wiki/@webmate.core.PageManager#movenode)
- [moveNodeChildren](../wiki/@webmate.core.PageManager#movenodechildren)
- [moveNodeDown](../wiki/@webmate.core.PageManager#movenodedown)
- [moveNodeUp](../wiki/@webmate.core.PageManager#movenodeup)
- [setNodeValue](../wiki/@webmate.core.PageManager#setnodevalue)

## Constructors

### constructor

• **new PageManager**(`page`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | [`PageInterface`](../wiki/@webmate.core.PageInterface) |

#### Defined in

[lib/page-manager.ts:22](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L22)

## Properties

### \_page

• `Private` **\_page**: `Observable`<[`PageInterface`](../wiki/@webmate.core.PageInterface)\>

#### Defined in

[lib/page-manager.ts:20](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L20)

## Accessors

### observable

• `get` **observable**(): `Observable`<[`PageInterface`](../wiki/@webmate.core.PageInterface)\>

#### Returns

`Observable`<[`PageInterface`](../wiki/@webmate.core.PageInterface)\>

#### Defined in

[lib/page-manager.ts:26](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L26)

___

### page

• `get` **page**(): [`PageInterface`](../wiki/@webmate.core.PageInterface)

#### Returns

[`PageInterface`](../wiki/@webmate.core.PageInterface)

#### Defined in

[lib/page-manager.ts:30](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L30)

• `set` **page**(`page`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | [`PageInterface`](../wiki/@webmate.core.PageInterface) |

#### Returns

`void`

#### Defined in

[lib/page-manager.ts:33](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L33)

## Methods

### getNode

▸ **getNode**(`path`, `create?`, `defaultValue?`): `undefined` \| `PageManagerCurrentNode`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | `string` | `undefined` |
| `create` | `boolean` | `true` |
| `defaultValue` | `unknown` | `{}` |

#### Returns

`undefined` \| `PageManagerCurrentNode`

#### Defined in

[lib/page-manager.ts:37](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L37)

___

### moveNode

▸ **moveNode**(`path`, `steps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `steps` | `number` |

#### Returns

`boolean`

#### Defined in

[lib/page-manager.ts:68](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L68)

___

### moveNodeChildren

▸ **moveNodeChildren**(`path`, `oldIndex`, `newIndex`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `oldIndex` | `number` |
| `newIndex` | `number` |

#### Returns

`boolean`

#### Defined in

[lib/page-manager.ts:52](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L52)

___

### moveNodeDown

▸ **moveNodeDown**(`path`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Defined in

[lib/page-manager.ts:91](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L91)

___

### moveNodeUp

▸ **moveNodeUp**(`path`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Defined in

[lib/page-manager.ts:88](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L88)

___

### setNodeValue

▸ **setNodeValue**(`path`, `create?`, `value?`): `unknown`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | `string` | `undefined` |
| `create` | `boolean` | `true` |
| `value` | `unknown` | `{}` |

#### Returns

`unknown`

#### Defined in

[lib/page-manager.ts:95](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-manager.ts#L95)
