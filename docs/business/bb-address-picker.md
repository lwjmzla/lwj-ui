# Address Picker省市区筛选

省市区公共组件

> 需在el-form中使用

### 用法示例

<ClientOnly>

:::demo
```vue
<template>
  <div>
    <el-form :model="ruleForm" ref="formRef">
      <el-form-item required>
        <bb-address-picker
          v-model:province="ruleForm.province"
          v-model:city="ruleForm.city"
          v-model:area="ruleForm.area"
          :propList="['province', 'city', 'area']"
        />
      </el-form-item>
      <el-form-item style="display: flex;justify-content: center;">
        <el-button @click="handleSubmit" type="primary">
          省市必填校验
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref} from 'vue';
import { ElForm } from 'element-plus';
export default defineComponent({
  setup() {
    type FormInstance = InstanceType<typeof ElForm>
    const formRef = ref<FormInstance>()
    const ruleForm = reactive({
      province: '',
      city: '',
      area: '',
    })
    const handleSubmit = () => {
      formRef.value?.validate();
    }
    return {
      formRef,
      ruleForm,
      handleSubmit
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
| showType | 传入需要显示的组合规则，['province', 'city', 'area'] | array | ['province', 'city', 'area'] |
| gutter | 间隔,单位px,是margin-left来着 | number | 10 |
| span | 栅格布局 | array | [8,8,8] |
| propList | 是否需要检查的字段(数组里传引用表单里省-市-区的字段名字, 为空数组时不校验)； | array | - |
| automatic | 是否自动选择下级地区（默认选择第一个）； | boolean | false |
| province | 省 | string | - |
| city | 市 | string | - |
| area | 区 | string | - |


### Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| change | 在 Input 值改变时触发 | - |
| provinceChange | 省份更新时触发 | - |
| cityChange | 市更新时触发  | - |
| areaChange | 区更新时触发  | - |
