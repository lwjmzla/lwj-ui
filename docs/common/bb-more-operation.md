# More Operation 更多按钮

用于按钮比较多的列表或者详情，可以进行按钮的下拉隐藏

<ClientOnly>

:::demo
```vue
<template>
  <div>
    <bb-more-operation
      :split-button="true"
    >
      <el-button
        type="danger"
        style="margin-right: 5px;"
        @click="moreAction('DELETE')"
      >
        删除
      </el-button>
      <el-button
        type="primary"
        style="margin-bottom: 5px;"
        @click="moreAction('MOVE')"
      >
        移动
      </el-button>
      <el-button
        type="primary"
        style="margin-bottom: 5px;"
        @click="moreAction('SHARE')"
      >
        共享
      </el-button>
      <el-button
        type="primary"
        @click="moreAction('RENAME')"
      >
        重命名
      </el-button>
    </bb-more-operation>
  </div>
</template>
<script lang="ts">
import {defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const moreAction = (type: any) => {
      console.log(type);
    }
    return {
      moreAction
    }
  }
})
</script>
<style scoped lang="scss">
</style>
```
:::
</ClientOnly>
