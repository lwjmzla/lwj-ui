# Tooltip 文字提示

简单的文字提示气泡框。

## 基础用法

默认只有在溢出时才展示 tooltip，你可以通过设置 `ellipsis` 为 `false` 关闭。

> 设置  `ellipsis` 为 `true` 将会开启溢出时展示效果（主要节点需要为文本），默认会添加 `...` 的效果，点击下方切换效果。

<ClientOnly>

::: demo 

```vue
<template>
  <div class="box">
    是否只在溢出时展示：
    <el-switch v-model="ellipsis" />
    <p>
      <bb-tooltip
        class="tip-item"
        content="溢出时展示溢出时展示溢出时展示"
        placement="right"
        :ellipsis="ellipsis"
      >
        <span>溢出时展示溢出时展示溢出时展示</span>
      </bb-tooltip>
    </p>
    <p>
      <bb-tooltip
        class="tip-item"
        content="无溢出情况"
        placement="right"
        :ellipsis="ellipsis"
      >
        <span>无溢出情况</span>
      </bb-tooltip>
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const ellipsis = ref(true)
    return {
      ellipsis
    };
  }
})
</script>
<style>
.tip-item {
  display: block;
  width: 120px;
}
</style>
```

:::
</ClientOnly>

## 位置

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

> 使用 content 属性来决定 hover 时的提示信息。由 placement 属性决定展示效果：placement 属性值为：方向-对齐位置；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。如 placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<ClientOnly>

::: demo 

```vue
<template>
  <div class="box">
    <div class="top">
      <bb-tooltip
        class="item"
        effect="dark"
        content="Top Left 提示文字"
        placement="top-start"
        :ellipsis="false"
      >
        <bb-button>上左</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Top Center 提示文字"
        placement="top"
        :ellipsis="false"
      >
        <bb-button>上边</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Top Right 提示文字"
        placement="top-end"
        :ellipsis="false"
      >
        <bb-button>上右</bb-button>
      </bb-tooltip>
    </div>
    <div class="left">
      <bb-tooltip
        class="item"
        effect="dark"
        content="Left Top 提示文字"
        placement="left-start"
        :ellipsis="false"
      >
        <bb-button>左上</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Left Center 提示文字"
        placement="left"
        :ellipsis="false"
      >
        <bb-button>左边</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Left Bottom 提示文字"
        placement="left-end"
        :ellipsis="false"
      >
        <bb-button>左下</bb-button>
      </bb-tooltip>
    </div>

    <div class="right">
      <bb-tooltip
        class="item"
        effect="dark"
        content="Right Top 提示文字"
        placement="right-start"
        :ellipsis="false"
      >
        <bb-button>右上</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Right Center 提示文字"
        placement="right"
        :ellipsis="false"
      >
        <bb-button>右边</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Right Bottom 提示文字"
        placement="right-end"
        :ellipsis="false"
      >
        <bb-button>右下</bb-button>
      </bb-tooltip>
    </div>
    <div class="bottom">
      <bb-tooltip
        class="item"
        effect="dark"
        content="Bottom Left 提示文字"
        placement="bottom-start"
        :ellipsis="false"
      >
        <bb-button>下左</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Bottom Center 提示文字"
        placement="bottom"
        :ellipsis="false"
      >
        <bb-button>下边</bb-button>
      </bb-tooltip>
      <bb-tooltip
        class="item"
        effect="dark"
        content="Bottom Right 提示文字"
        placement="bottom-end"
        :ellipsis="false"
      >
        <bb-button>下右</bb-button>
      </bb-tooltip>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.box {
  width: 400px;
}
.box .top {
  text-align: center;
}

.box .left {
  float: left;
  width: 60px;
}

.box .right {
  float: right;
  width: 60px;
}

.box .bottom {
  clear: both;
  text-align: center;
}

.box .item {
  margin: 4px;
}

.box .left .m-tooltip__popper,
.box .right .m-tooltip__popper {
  padding: 8px 10px;
}
</style>
```

:::
</ClientOnly>

## 主题

tooltip 组件提供了两个不同的主题：dark 和 light。

> 通过设置 effect 属性来改变主题，默认为 dark。

<ClientOnly>

::: demo 

```vue
<template>
  <div>
    <bb-tooltip content="Top center" placement="top" :ellipsis="false">
      <bb-button>Dark</bb-button>
    </bb-tooltip>
    <bb-tooltip
      content="Bottom center"
      placement="bottom"
      effect="light"
      :ellipsis="false"
    >
      <bb-button>Light</bb-button>
    </bb-tooltip>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
```

:::
</ClientOnly>

## 更多 Content

展示多行文本或者是设置文本内容的格式。

> 用具名 slot 分发 content，替代 tooltip 中的 content 属性。

<ClientOnly>

::: demo 

```vue
<template>
  <div>
    <bb-tooltip placement="top" :ellipsis="false">
      <template v-slot:content>
        <div>
          多行信息
          <br />
          第二行信息
        </div>
      </template>
      <bb-button>Top center</bb-button>
    </bb-tooltip>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
```

:::

::: warning
tooltip 内不支持 router-link 组件，请使用 vm.\$router.push 代替。

tooltip 内不支持 disabled form 元素，参考 MDN，请在 disabled form 元素外层添加一层包裹元素。
:::
</ClientOnly>

## API

| 参数 | 说明 | 类型   | 可选值                        | 默认值 |
| ---- | ---- | ------ | ----------------------------- | ------ |
|ellipsis|只在溢出时展示|Boolean|—|true|
|effect|默认提供的主题|String|dark/light|dark|
|content|显示的内容，也可以通过 slot#content 传入 DOM|String|—|—|
|placement|Tooltip 的出现位置|String|top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end|bottom|
|value / v-model|状态是否可见|Boolean|—|false|
|disabled|Tooltip 是否可用|Boolean|—|false|
|offset|出现位置的偏移量|Number|—|0|
|transition|定义渐变动画|String|—|el-fade-in-linear|
|visible-arrow|是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper)|Boolean|—|true|
|popper-options|[popper.js](https://popper.js.org/documentation.html) 的参数|Object|参考 [popper.js](https://popper.js.org/documentation.html) 文档|'{ boundariesElement: 'body', gpuAcceleration: false }'
open-delay|延迟出现，单位毫秒|Number|—|0|
|manual|手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效|Boolean|—|false|
|popper-class|为 Tooltip 的 popper 添加类名|String|—|—|
|enterable|鼠标是否可进入到 tooltip 中|Boolean|—|true|
|hide-after|Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏|number|—|0|
|tabindex|Tooltip 组件的 tabindex|number|—|0|
