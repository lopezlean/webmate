# Class: PageBuilder

[@webmate/core](../wiki/@webmate.core).PageBuilder

PageBuilder is used to build a page from a PageInterface
and return a BuildResultInterface with the result.

**`See`**

BuildResultInterface

**`Param`**

the page to build

**`Param`**

options for the page builder

**`Example`**

```ts
const pageBuilder = new PageBuilder(page);
const result = pageBuilder.build();
if (result.success) {
 // do something with the result
}
```

## Table of contents

### Constructors

- [constructor](../wiki/@webmate.core.PageBuilder#constructor)

### Properties

- [\_componentBuilder](../wiki/@webmate.core.PageBuilder#_componentbuilder)
- [\_fileCollector](../wiki/@webmate.core.PageBuilder#_filecollector)
- [\_options](../wiki/@webmate.core.PageBuilder#_options)
- [\_page](../wiki/@webmate.core.PageBuilder#_page)
- [\_styleCollector](../wiki/@webmate.core.PageBuilder#_stylecollector)

### Accessors

- [componentBuilder](../wiki/@webmate.core.PageBuilder#componentbuilder)
- [fileCollector](../wiki/@webmate.core.PageBuilder#filecollector)
- [options](../wiki/@webmate.core.PageBuilder#options)
- [page](../wiki/@webmate.core.PageBuilder#page)
- [styleCollector](../wiki/@webmate.core.PageBuilder#stylecollector)

### Methods

- [build](../wiki/@webmate.core.PageBuilder#build)

## Constructors

### constructor

• **new PageBuilder**(`page`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | [`PageInterface`](../wiki/@webmate.core.PageInterface) |
| `options` | `PageBuilderOptions` |

#### Defined in

[lib/page-builder.ts:42](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L42)

## Properties

### \_componentBuilder

• `Private` **\_componentBuilder**: [`ComponentBuilder`](../wiki/@webmate.core.ComponentBuilder)

#### Defined in

[lib/page-builder.ts:38](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L38)

___

### \_fileCollector

• `Private` **\_fileCollector**: [`FileCollector`](../wiki/@webmate.core.FileCollector)

#### Defined in

[lib/page-builder.ts:40](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L40)

___

### \_options

• `Private` **\_options**: `PageBuilderOptions`

#### Defined in

[lib/page-builder.ts:37](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L37)

___

### \_page

• `Private` **\_page**: [`PageInterface`](../wiki/@webmate.core.PageInterface)

#### Defined in

[lib/page-builder.ts:36](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L36)

___

### \_styleCollector

• `Private` **\_styleCollector**: [`StyleCollector`](../wiki/@webmate.core.StyleCollector)

#### Defined in

[lib/page-builder.ts:39](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L39)

## Accessors

### componentBuilder

• `get` **componentBuilder**(): [`ComponentBuilder`](../wiki/@webmate.core.ComponentBuilder)

#### Returns

[`ComponentBuilder`](../wiki/@webmate.core.ComponentBuilder)

#### Defined in

[lib/page-builder.ts:64](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L64)

___

### fileCollector

• `get` **fileCollector**(): [`FileCollector`](../wiki/@webmate.core.FileCollector)

#### Returns

[`FileCollector`](../wiki/@webmate.core.FileCollector)

#### Defined in

[lib/page-builder.ts:73](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L73)

___

### options

• `get` **options**(): `PageBuilderOptions`

#### Returns

`PageBuilderOptions`

#### Defined in

[lib/page-builder.ts:58](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L58)

___

### page

• `get` **page**(): [`PageInterface`](../wiki/@webmate.core.PageInterface)

#### Returns

[`PageInterface`](../wiki/@webmate.core.PageInterface)

#### Defined in

[lib/page-builder.ts:52](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L52)

___

### styleCollector

• `get` **styleCollector**(): [`StyleCollector`](../wiki/@webmate.core.StyleCollector)

#### Returns

[`StyleCollector`](../wiki/@webmate.core.StyleCollector)

#### Defined in

[lib/page-builder.ts:70](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L70)

## Methods

### build

▸ **build**(): [`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)

#### Returns

[`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)

#### Defined in

[lib/page-builder.ts:85](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/page-builder.ts#L85)
