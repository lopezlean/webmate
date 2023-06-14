# Module: @webmate/core

## Table of contents

### Enumerations

- [ServiceWorkerMessageType](../wiki/@webmate.core.ServiceWorkerMessageType)

### Classes

- [ComponentBuilder](../wiki/@webmate.core.ComponentBuilder)
- [Deferred](../wiki/@webmate.core.Deferred)
- [FileCollector](../wiki/@webmate.core.FileCollector)
- [PageBuilder](../wiki/@webmate.core.PageBuilder)
- [PageManager](../wiki/@webmate.core.PageManager)
- [PropertyInterface](../wiki/@webmate.core.PropertyInterface)
- [StyleCollector](../wiki/@webmate.core.StyleCollector)
- [Webmate](../wiki/@webmate.core.Webmate)

### Interfaces

- [BuildResultInterface](../wiki/@webmate.core.BuildResultInterface)
- [BuildResultProxyInterface](../wiki/@webmate.core.BuildResultProxyInterface)
- [ComponentInterface](../wiki/@webmate.core.ComponentInterface)
- [ComponentPreviewInterface](../wiki/@webmate.core.ComponentPreviewInterface)
- [ComponentRegisterInterface](../wiki/@webmate.core.ComponentRegisterInterface)
- [ControlRegisterInterface](../wiki/@webmate.core.ControlRegisterInterface)
- [FileInterface](../wiki/@webmate.core.FileInterface)
- [MemoryFileInterface](../wiki/@webmate.core.MemoryFileInterface)
- [ObservableInterface](../wiki/@webmate.core.ObservableInterface)
- [PageInterface](../wiki/@webmate.core.PageInterface)
- [PageMetaInterface](../wiki/@webmate.core.PageMetaInterface)
- [ServiceWorkerInterface](../wiki/@webmate.core.ServiceWorkerInterface)
- [StyleInterface](../wiki/@webmate.core.StyleInterface)

### Type Aliases

- [ChildrenType](../wiki/@webmate.core#childrentype)
- [ObserverInterface](../wiki/@webmate.core#observerinterface)

### Variables

- [COMPONENT\_CLICK\_EVENT](../wiki/@webmate.core#component_click_event)
- [EDITOR\_SAVE\_EVENT](../wiki/@webmate.core#editor_save_event)
- [VERSION](../wiki/@webmate.core#version)

### Functions

- [convertToDomAttribute](../wiki/@webmate.core#converttodomattribute)
- [createUniqueRuntimeID](../wiki/@webmate.core#createuniqueruntimeid)

## Type Aliases

### ChildrenType

Ƭ **ChildrenType**: `string` \| ([`ComponentInterface`](../wiki/@webmate.core.ComponentInterface) \| `string`)[]

#### Defined in

[interfaces/property.interface.ts:2](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/property.interface.ts#L2)

___

### ObserverInterface

Ƭ **ObserverInterface**<`T`\>: (`subject`: [`ObservableInterface`](../wiki/@webmate.core.ObservableInterface)<`T`\>, `value`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`subject`, `value`): `void`

The Observer interface declares the update method, used by subjects.

##### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | [`ObservableInterface`](../wiki/@webmate.core.ObservableInterface)<`T`\> |
| `value` | `T` |

##### Returns

`void`

#### Defined in

[interfaces/observer.interface.ts:5](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/observer.interface.ts#L5)

## Variables

### COMPONENT\_CLICK\_EVENT

• `Const` **COMPONENT\_CLICK\_EVENT**: ``"@webmate/editor/component/click"``

#### Defined in

[constants/events.ts:3](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/constants/events.ts#L3)

___

### EDITOR\_SAVE\_EVENT

• `Const` **EDITOR\_SAVE\_EVENT**: ``"@webmate/editor/save"``

#### Defined in

[constants/events.ts:4](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/constants/events.ts#L4)

___

### VERSION

• `Const` **VERSION**: ``"0.0.1"``

#### Defined in

[version.ts:4](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/version.ts#L4)

## Functions

### convertToDomAttribute

▸ **convertToDomAttribute**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[lib/convert-to-dom-attribute.ts:1](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/convert-to-dom-attribute.ts#L1)

___

### createUniqueRuntimeID

▸ **createUniqueRuntimeID**(`prefix?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `prefix` | `string` | `''` |

#### Returns

`string`

#### Defined in

[lib/create-unique-runtime-id.ts:2](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/create-unique-runtime-id.ts#L2)
