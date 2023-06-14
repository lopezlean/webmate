# Interface: PageInterface

[@webmate/core](../wiki/@webmate.core).PageInterface

PageInterface is used to build a page

**`Param`**

The content of the page

**`Param`**

The layout component to use for this page. For example the html layout.
the content will be wrapped in this component:
<layout-component><content></content></layout-component>
if no layout is provided the content will be returned as is

**`Param`**

posiblity to build from a html template string for example in wordpress
note that this will not override the layout and content it will just wrap it
note there is a layout with html and body tag there will be a conflict
the webmate-builder tag will be replaced with the content and is required if you want to use this approach
example:
<html>
<body>
  <h1>My Page</h1>
  <p>This is my template header</p>
  <webmate-builder>
   <layout> <!-- PageInterface.layout -->
     <content></content> <!-- PageInterface.content -->
   </layout>
  </webmate-builder>
</body>
</html>

## Hierarchy

- [`PageMetaInterface`](../wiki/@webmate.core.PageMetaInterface)

  ↳ **`PageInterface`**

## Table of contents

### Properties

- [author](../wiki/@webmate.core.PageInterface#author)
- [content](../wiki/@webmate.core.PageInterface#content)
- [description](../wiki/@webmate.core.PageInterface#description)
- [id](../wiki/@webmate.core.PageInterface#id)
- [keywords](../wiki/@webmate.core.PageInterface#keywords)
- [layout](../wiki/@webmate.core.PageInterface#layout)
- [register](../wiki/@webmate.core.PageInterface#register)
- [scripts](../wiki/@webmate.core.PageInterface#scripts)
- [slug](../wiki/@webmate.core.PageInterface#slug)
- [styles](../wiki/@webmate.core.PageInterface#styles)
- [template](../wiki/@webmate.core.PageInterface#template)
- [title](../wiki/@webmate.core.PageInterface#title)
- [url](../wiki/@webmate.core.PageInterface#url)

## Properties

### author

• `Optional` **author**: `string`

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[author](../wiki/@webmate.core.PageMetaInterface#author)

#### Defined in

[interfaces/page.interface.ts:10](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L10)

___

### content

• **content**: [`ComponentInterface`](../wiki/@webmate.core.ComponentInterface)[]

#### Defined in

[interfaces/page.interface.ts:52](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L52)

___

### description

• `Optional` **description**: `string`

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[description](../wiki/@webmate.core.PageMetaInterface#description)

#### Defined in

[interfaces/page.interface.ts:8](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L8)

___

### id

• `Optional` **id**: `string` \| `number`

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[id](../wiki/@webmate.core.PageMetaInterface#id)

#### Defined in

[interfaces/page.interface.ts:6](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L6)

___

### keywords

• `Optional` **keywords**: `string`

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[keywords](../wiki/@webmate.core.PageMetaInterface#keywords)

#### Defined in

[interfaces/page.interface.ts:9](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L9)

___

### layout

• `Optional` **layout**: [`ComponentInterface`](../wiki/@webmate.core.ComponentInterface)

#### Defined in

[interfaces/page.interface.ts:54](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L54)

___

### register

• `Optional` **register**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components?` | `Record`<`string`, [`ComponentRegisterInterface`](../wiki/@webmate.core.ComponentRegisterInterface)<`unknown`\>\> |
| `controls?` | `Record`<`string`, [`ControlRegisterInterface`](../wiki/@webmate.core.ControlRegisterInterface)\> |

#### Defined in

[interfaces/page.interface.ts:48](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L48)

___

### scripts

• `Optional` **scripts**: `string`[]

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[scripts](../wiki/@webmate.core.PageMetaInterface#scripts)

#### Defined in

[interfaces/page.interface.ts:13](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L13)

___

### slug

• `Optional` **slug**: `string`

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[slug](../wiki/@webmate.core.PageMetaInterface#slug)

#### Defined in

[interfaces/page.interface.ts:11](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L11)

___

### styles

• `Optional` **styles**: `string`[]

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[styles](../wiki/@webmate.core.PageMetaInterface#styles)

#### Defined in

[interfaces/page.interface.ts:14](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L14)

___

### template

• `Optional` **template**: `string`

#### Defined in

[interfaces/page.interface.ts:56](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L56)

___

### title

• `Optional` **title**: `string`

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[title](../wiki/@webmate.core.PageMetaInterface#title)

#### Defined in

[interfaces/page.interface.ts:7](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L7)

___

### url

• `Optional` **url**: `string`

#### Inherited from

[PageMetaInterface](../wiki/@webmate.core.PageMetaInterface).[url](../wiki/@webmate.core.PageMetaInterface#url)

#### Defined in

[interfaces/page.interface.ts:12](https://gitlab.com/ligrila/webmate-lit/-/blob/4b99057/packages/core/src/interfaces/page.interface.ts#L12)
