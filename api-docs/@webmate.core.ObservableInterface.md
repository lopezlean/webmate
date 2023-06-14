# Interface: ObservableInterface<T\>

[@webmate/core](../wiki/@webmate.core).ObservableInterface

The ObservableInterface interface declares a set of methods for managing subscribers.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [notify](../wiki/@webmate.core.ObservableInterface#notify)
- [subscribe](../wiki/@webmate.core.ObservableInterface#subscribe)
- [unsubscribe](../wiki/@webmate.core.ObservableInterface#unsubscribe)

## Methods

### notify

▸ **notify**(): `void`

#### Returns

`void`

#### Defined in

[interfaces/observer.interface.ts:18](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/observer.interface.ts#L18)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ObserverInterface`](../wiki/@webmate.core#observerinterface)<`T`\> |

#### Returns

`void`

#### Defined in

[interfaces/observer.interface.ts:12](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/observer.interface.ts#L12)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ObserverInterface`](../wiki/@webmate.core#observerinterface)<`T`\> |

#### Returns

`void`

#### Defined in

[interfaces/observer.interface.ts:15](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/observer.interface.ts#L15)
