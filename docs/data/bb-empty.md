# Empty 空状态

空状态时的展示占位图。

## 基础用法

简单的展示，默认基于父容器垂直居中展示（需要设置父容器为 `position: relative`），你也可以设置 `center` 属性为 `false` 去除。

<ClientOnly>

::: demo

```vue
<template>
  <div style="display: flex">
    <div class="box">
      <bb-empty />
    </div>
    <div class="box">
      <bb-empty :center="false" />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.box {
  position: relative;
  display: block;
  height: 300px;
  width: 50%;
}
</style>
```

:::
</ClientOnly>

## 自定义

自定义图片链接、图片大小、描述、附属内容。

<ClientOnly>

::: demo

```vue
<template>
  <div>
    <div class="box">
      <bb-empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        :imageStyle="{ height: 60 }"
        description="这是一段数据为空的描述"
      />
    </div>
    <div class="box">
      <bb-empty>
        <template v-slot:text>
          <span>
            点击
            <a href="/">返回首页</a>
          </span>
        </template>
      </bb-empty>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.box {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>
```

:::
</ClientOnly>

## 无描述展示

<ClientOnly>

::: demo

```vue
<template>
  <div class="box">
    <bb-empty :description="false" />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.box {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>
```

:::
</ClientOnly>

## API

| 参数        | 说明                                           | 类型    | 可选值 | 默认值   |
| ----------- | ---------------------------------------------- | ------- | ------ | -------- |
| center      | 相对于父容器居中                               | boolean | —      | true     |
| description | 自定义描述内容                                 | string  | —      | 暂无数据 |
| image       | 设置显示图片，为 string 时表示自定义图片地址。 | string  | —      | —        |
| imageStyle  | 图片样式                                       | object  | —      | —        |

## Slots

| name | 说明               |
| ---- | ------------------ |
| —    | Empty 的内容       |
| text | Empty 文本区的内容 |

## 内置图片

- Empty.PRESENTED_IMAGE_DEFAULT
