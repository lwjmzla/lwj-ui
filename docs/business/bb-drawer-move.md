# Drawer Move 可控宽度抽屉

用于从右侧打开的的滑动窗，可拖拽调节宽度。

<ClientOnly>

:::demo
```vue
<template>
  <div>
    <el-button type="primary" @click="handleOpenDrawer">打开</el-button>
    <bb-drawer-move
      ref='testDrawer'
      :size='700'
      :before-close="hadnleCloseDrawer"
      cache="TEST_DRAWER"
    >
      <template #header>
        <div>123</div>
        <el-button @click="handleCloseDrawer">关闭</el-button>
      </template>
      <div>
        内容
      </div>
      <template #footer>
        <el-button>确认</el-button>
      </template>
    </bb-drawer-move>
  </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue';
// !后续直接从BBUI引入
interface BBDrawerMove {
  open(): void;
  close(): void;
  getCurrentWidth(): number;
}
export default defineComponent({
  setup() {
    const testDrawer = ref<BBDrawerMove>()
    const handleOpenDrawer = () => {
      testDrawer.value?.open();
    }
    const handleCloseDrawer = () => {
      testDrawer.value?.close();
    }
    return {
      testDrawer,
      handleOpenDrawer,
      handleCloseDrawer
    }
  }
})
</script>

<style></style>
```
:::

</ClientOnly>



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 抽屉宽度 | number | - | 500 |
| cache | 抽屉缓存标识 | string | - | UNIVERSAL |
| minSize | 自定义最小宽度 | number | - | 500 |
| loading | 是否展示loading | boolean | - | false |

