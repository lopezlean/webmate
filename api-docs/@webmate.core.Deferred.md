# Class: Deferred<T\>

[@webmate/core](../wiki/@webmate.core).Deferred

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](../wiki/@webmate.core.Deferred#constructor)

### Properties

- [\_reject](../wiki/@webmate.core.Deferred#_reject)
- [\_resolve](../wiki/@webmate.core.Deferred#_resolve)
- [promise](../wiki/@webmate.core.Deferred#promise)
- [settled](../wiki/@webmate.core.Deferred#settled)

### Methods

- [reject](../wiki/@webmate.core.Deferred#reject)
- [resolve](../wiki/@webmate.core.Deferred#resolve)

## Constructors

### constructor

• **new Deferred**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[deferred.ts:7](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/deferred.ts#L7)

## Properties

### \_reject

• `Private` **\_reject**: (`reason?`: `unknown`) => `void`

#### Type declaration

▸ (`reason?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `unknown` |

##### Returns

`void`

#### Defined in

[deferred.ts:4](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/deferred.ts#L4)

___

### \_resolve

• `Private` **\_resolve**: (`value`: `T`) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`

#### Defined in

[deferred.ts:3](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/deferred.ts#L3)

___

### promise

• `Readonly` **promise**: `Promise`<`T`\>

#### Defined in

[deferred.ts:2](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/deferred.ts#L2)

___

### settled

• **settled**: `boolean` = `false`

#### Defined in

[deferred.ts:5](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/deferred.ts#L5)

## Methods

### reject

▸ **reject**(`reason`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason` | `unknown` |

#### Returns

`void`

#### Defined in

[deferred.ts:19](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/deferred.ts#L19)

___

### resolve

▸ **resolve**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[deferred.ts:14](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/deferred.ts#L14)
