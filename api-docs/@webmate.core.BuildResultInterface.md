# Interface: BuildResultInterface

[@webmate/core](../wiki/@webmate.core).BuildResultInterface

BuildResultInterface is the result of a build.

**`Param`**

true if the build was successful

**`Param`**

the error if the build was not successful

**`Param`**

the content of the build

**`Param`**

the styles of the build

**`Param`**

the memory files of the build

**`Param`**

the files of the build

## Table of contents

### Properties

- [content](../wiki/@webmate.core.BuildResultInterface#content)
- [error](../wiki/@webmate.core.BuildResultInterface#error)
- [files](../wiki/@webmate.core.BuildResultInterface#files)
- [memoryFiles](../wiki/@webmate.core.BuildResultInterface#memoryfiles)
- [page](../wiki/@webmate.core.BuildResultInterface#page)
- [styles](../wiki/@webmate.core.BuildResultInterface#styles)
- [success](../wiki/@webmate.core.BuildResultInterface#success)

## Properties

### content

• `Optional` **content**: `string`

#### Defined in

[interfaces/build-result.interface.ts:20](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/build-result.interface.ts#L20)

___

### error

• `Optional` **error**: `unknown`

#### Defined in

[interfaces/build-result.interface.ts:18](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/build-result.interface.ts#L18)

___

### files

• `Optional` **files**: [`FileInterface`](../wiki/@webmate.core.FileInterface)[]

#### Defined in

[interfaces/build-result.interface.ts:23](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/build-result.interface.ts#L23)

___

### memoryFiles

• `Optional` **memoryFiles**: [`MemoryFileInterface`](../wiki/@webmate.core.MemoryFileInterface)[]

#### Defined in

[interfaces/build-result.interface.ts:22](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/build-result.interface.ts#L22)

___

### page

• `Optional` **page**: [`PageInterface`](../wiki/@webmate.core.PageInterface)

#### Defined in

[interfaces/build-result.interface.ts:19](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/build-result.interface.ts#L19)

___

### styles

• `Optional` **styles**: `string`

#### Defined in

[interfaces/build-result.interface.ts:21](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/build-result.interface.ts#L21)

___

### success

• **success**: `boolean`

#### Defined in

[interfaces/build-result.interface.ts:17](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/build-result.interface.ts#L17)
