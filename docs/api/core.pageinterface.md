<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@webmate/core](./core.md) &gt; [PageInterface](./core.pageinterface.md)

## PageInterface interface

PageInterface is used to build a page

**Signature:**

```typescript
export interface PageInterface extends PageMetaInterface 
```
**Extends:** [PageMetaInterface](./core.pagemetainterface.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [content](./core.pageinterface.content.md) |  | [ComponentInterface](./core.componentinterface.md)<!-- -->\[\] |  |
|  [layout?](./core.pageinterface.layout.md) |  | [ComponentInterface](./core.componentinterface.md) | _(Optional)_ |
|  [register?](./core.pageinterface.register.md) |  | { components?: Record&lt;string, [ComponentRegisterInterface](./core.componentregisterinterface.md)<!-- -->&lt;unknown&gt;&gt;; controls?: Record&lt;string, [ControlRegisterInterface](./core.controlregisterinterface.md)<!-- -->&gt;; } | _(Optional)_ |
|  [template?](./core.pageinterface.template.md) |  | string | _(Optional)_ |
