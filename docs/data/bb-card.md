# Card 卡片 

将信息聚合在卡片容器中展示。

<ClientOnly>

:::demo

```vue
<template>
  <div>
    <bb-card
      title="卡片标题"
      subtitle="卡片副标题"
      shadow="hover"
    >
      <template v-slot:extra>
        <div style="display: flex;align-items:center;">
          <div style="margin-right: 20px;">位于右侧内容, slot extra</div>
          <el-button type="primary">按钮</el-button>
        </div>
      </template>
    </bb-card>
  </div>
</template>

<style>
</style>
```

:::
</ClientOnly>

### Attributes

> 在el-card的基础上，新增了gray、bottom、borderDisabled、subtitle属性, **移除了header slot**

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | - |
| subtitle | 副标题 | string | - |
| body-style | 设置 body 的样式| object| — | '{ padding: 20px }' |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |
| gray | 是否显示灰色背景标题 | boolean | false |
| bottom | 是否启用底部间距 | boolean | false |
| borderDisabled | 是否不显示标题边线 | boolean | false |

### Slots

| Name    | 说明         |
|---------|-------------|
| extra  | header 右侧内容 |