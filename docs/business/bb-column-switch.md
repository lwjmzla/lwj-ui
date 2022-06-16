# Column Switch 列设置

用于配合 el-table组件控制显示隐藏列,状态缓存在本地

# 使用示例

<ClientOnly>

:::demo
```vue
<template>
  <div>
    <bb-column-switch
      name="TEST_TABLE"
      v-model:columns="tableColumns"
    ></bb-column-switch>

    <div class="cover-space-20"></div>

    <el-table border :height="500" :data="new Array(20).fill({})">
      <el-table-column label="ID">
        <template #default>
          <el-button type="text">668329</el-button>
        </template>
      </el-table-column>
      <el-table-column label="名称" v-if="tableColumns.名称"></el-table-column>
      <el-table-column label="创建时间" v-if="tableColumns.创建时间"></el-table-column>
      <el-table-column label="更新时间" v-if="tableColumns.更新时间"></el-table-column>
      <el-table-column label="操作" v-if="tableColumns.操作">
        <template #default>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  export default defineComponent({
    name: 'column-switch',
    setup() {
      const tableColumns = ref({
        名称: true,
        创建时间: true,
        更新时间: true,
        操作: true,
      })
      return {
        tableColumns,
      }
    }
  })
</script>
```
:::
</ClientOnly>

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name | 为列设置标识，需唯一 | string | - |
| v-model:columns | 控制对应的列 | object | - |

### Slot

默认插槽，如示例
