# Class: FileCollector

[@webmate/core](../wiki/@webmate.core).FileCollector

## Table of contents

### Constructors

- [constructor](../wiki/@webmate.core.FileCollector#constructor)

### Properties

- [\_files](../wiki/@webmate.core.FileCollector#_files)
- [\_filesNames](../wiki/@webmate.core.FileCollector#_filesnames)

### Methods

- [addFile](../wiki/@webmate.core.FileCollector#addfile)
- [addFiles](../wiki/@webmate.core.FileCollector#addfiles)
- [getFiles](../wiki/@webmate.core.FileCollector#getfiles)
- [removeFile](../wiki/@webmate.core.FileCollector#removefile)

## Constructors

### constructor

• **new FileCollector**()

## Properties

### \_files

• `Private` **\_files**: [`FileInterface`](../wiki/@webmate.core.FileInterface)[] = `[]`

#### Defined in

[lib/file-collector.ts:5](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/file-collector.ts#L5)

___

### \_filesNames

• `Private` **\_filesNames**: `Set`<`string`\>

#### Defined in

[lib/file-collector.ts:4](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/file-collector.ts#L4)

## Methods

### addFile

▸ **addFile**(`file`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`FileInterface`](../wiki/@webmate.core.FileInterface) |

#### Returns

`void`

#### Defined in

[lib/file-collector.ts:13](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/file-collector.ts#L13)

___

### addFiles

▸ **addFiles**(`_files`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_files` | [`FileInterface`](../wiki/@webmate.core.FileInterface)[] |

#### Returns

`void`

#### Defined in

[lib/file-collector.ts:7](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/file-collector.ts#L7)

___

### getFiles

▸ **getFiles**(): [`FileInterface`](../wiki/@webmate.core.FileInterface)[]

#### Returns

[`FileInterface`](../wiki/@webmate.core.FileInterface)[]

#### Defined in

[lib/file-collector.ts:28](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/file-collector.ts#L28)

___

### removeFile

▸ **removeFile**(`file`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`FileInterface`](../wiki/@webmate.core.FileInterface) |

#### Returns

`void`

#### Defined in

[lib/file-collector.ts:20](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/lib/file-collector.ts#L20)
