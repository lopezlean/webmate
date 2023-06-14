# Class: StyleCollector

[@webmate/core](../wiki/@webmate.core).StyleCollector

StyleCollector is used to collect all styles from a page
and return a BuildResultInterface with the result.

**`See`**

BuildResultInterface

**`Param`**

the page to build

**`Example`**

```ts
const styleCollector = new StyleCollector();
const result = styleCollector.collect(component);
if (result.success) {
// do something with the result
}
```

## Table of contents

### Constructors

- [constructor](../wiki/@webmate.core.StyleCollector#constructor)

### Properties

- [\_collectedStyles](../wiki/@webmate.core.StyleCollector#_collectedstyles)

### Methods

- [buildStyle](../wiki/@webmate.core.StyleCollector#buildstyle)
- [collect](../wiki/@webmate.core.StyleCollector#collect)
- [getBreakpoint](../wiki/@webmate.core.StyleCollector#getbreakpoint)
- [getString](../wiki/@webmate.core.StyleCollector#getstring)

## Constructors

### constructor

• **new StyleCollector**()

## Properties

### \_collectedStyles

• `Private` **\_collectedStyles**: `string`[] = `[]`

#### Defined in

[lib/style-collector.ts:36](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/style-collector.ts#L36)

## Methods

### buildStyle

▸ **buildStyle**(`styles`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `styles` | [`StyleInterface`](../wiki/@webmate.core.StyleInterface) |

#### Returns

`string`

#### Defined in

[lib/style-collector.ts:43](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/style-collector.ts#L43)

___

### collect

▸ **collect**(`component`): [`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | [`ComponentInterface`](../wiki/@webmate.core.ComponentInterface) |

#### Returns

[`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)

#### Defined in

[lib/style-collector.ts:72](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/style-collector.ts#L72)

___

### getBreakpoint

▸ **getBreakpoint**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`string`

#### Defined in

[lib/style-collector.ts:38](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/style-collector.ts#L38)

___

### getString

▸ **getString**(): `string`

#### Returns

`string`

#### Defined in

[lib/style-collector.ts:68](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/style-collector.ts#L68)
