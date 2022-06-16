# Input Number 数字输入

用于控制数字输入

<ClientOnly>

# 使用示例
:::demo
```vue
<template>
  <div>
     <bb-input-number
        v-model="inputNumber"
        :precision="1"
        :min="1"
        :max="99999"
        @input="handleInput"
      />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  export default defineComponent({
    setup() {
      const inputNumber = ref()

      const handleInput = (e) => {
        console.log(e)
      }
      return {
        inputNumber,
        handleInput,
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
| v-model | 绑定的值 | object | - |
| precision | 精确小数点 | number | 0 |
| min | 允许输入最小值 | number | - |
| max | 允许输入最大值 | number | - |
| disabled | 是否禁用 | boolean | - |
| placeholder | 输入框默认 placeholder | string | - |



