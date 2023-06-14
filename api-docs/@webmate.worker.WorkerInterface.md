# Interface: WorkerInterface

[@webmate/worker](../wiki/@webmate.worker).WorkerInterface

## Table of contents

### Properties

- [build](../wiki/@webmate.worker.WorkerInterface#build)

## Properties

### build

• **build**: (`page`: [`PageInterface`](../wiki/@webmate.core.PageInterface), `options?`: [`BuildOptions`](../wiki/@webmate.worker#buildoptions)) => `Promise`<[`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)\>

#### Type declaration

▸ (`page`, `options?`): `Promise`<[`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `page` | [`PageInterface`](../wiki/@webmate.core.PageInterface) |
| `options?` | [`BuildOptions`](../wiki/@webmate.worker#buildoptions) |

##### Returns

`Promise`<[`BuildResultInterface`](../wiki/@webmate.core.BuildResultInterface)\>

#### Defined in

[worker-interface.ts:4](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/worker/src/worker-interface.ts#L4)
