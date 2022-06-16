# Condition Select 筛选查询

用于列表查询的时候，标签展示形式交互查询

<ClientOnly>

:::demo
  ```vue
<template>
  <bb-condition-select
    class="bb-condition-select"
    :conditionList="options"
    @conditionChange="handleOptions"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    setup() {
      const options = [
        {
          title: '筛选查询：',
          tags: [
            { label: '全部', value: '1' },
            { label: '查询1', value: '2' },
            { label: '查询2', value: '3' },
            { label: '查询3', value: '5' },
            { label: '查询4', value: '4' },
          ],
          defaultValue: '1',
          key: 'status',
        },
        {
          title: '筛选查询：',
          tags: [
            { label: '全部', value: '1' },
            { label: '查询1', value: '2' },
            { label: '查询2', value: '3' },
            { label: '查询3', value: '5' },
            { label: '查询4', value: '4' },
          ],
          defaultValue: '1',
          key: 'status1',
        },
      ];
      const handleOptions = ({ key, val }) => {
        // 筛选条件回调方法
        console.log(key, val);
      };
      return {
        options,
        handleOptions
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
| conditionList | 相关筛选参数 | string | - |

### Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| conditionChange | 在选中值变更时触发 | - |