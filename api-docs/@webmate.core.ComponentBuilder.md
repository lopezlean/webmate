# Class: ComponentBuilder

[@webmate/core](../wiki/@webmate.core).ComponentBuilder

ComponentBuilder is used to build a component from a ComponentInterface
and return a BuildResultInterface with the result.

**`See`**

BuildResultInterface

**`Param`**

the component to build

**`Param`**

the style collector to collect the styles

**`Example`**

```ts
const componentBuilder = new ComponentBuilder();
const result = componentBuilder.build(component);
if (result.success) {
// do something with the result
}
```

## Table of contents

### Constructors

- [constructor](../wiki/@webmate.core.ComponentBuilder#constructor)

### Properties

- [componentBuilderOptions](../wiki/@webmate.core.ComponentBuilder#componentbuilderoptions)

### Methods

- [build](../wiki/@webmate.core.ComponentBuilder#build)
- [buildAttributes](../wiki/@webmate.core.ComponentBuilder#buildattributes)

## Constructors

### constructor

• **new ComponentBuilder**(`componentBuilderOptions?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentBuilderOptions` | `ComponentBuilderOptions` |

#### Defined in

[lib/component-builder.ts:32](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/component-builder.ts#L32)

## Properties

### componentBuilderOptions

• `Private` **componentBuilderOptions**: `ComponentBuilderOptions`

#### Defined in

[lib/component-builder.ts:33](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/component-builder.ts#L33)

## Methods

### build

▸ **build**(`component`, `styleCollector`, `fileCollector`, `path`): [`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | [`ComponentInterface`](../wiki/@webmate.core.ComponentInterface) |
| `styleCollector` | [`StyleCollector`](../wiki/@webmate.core.StyleCollector) |
| `fileCollector` | [`FileCollector`](../wiki/@webmate.core.FileCollector) |
| `path` | `string` |

#### Returns

[`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)

#### Defined in

[lib/component-builder.ts:36](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/component-builder.ts#L36)

___

### buildAttributes

▸ **buildAttributes**(`attributes`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | `undefined` \| { `[key: string]`: `unknown`;  } |

#### Returns

`string`

#### Defined in

[lib/component-builder.ts:112](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/component-builder.ts#L112)
