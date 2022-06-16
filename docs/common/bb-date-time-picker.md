# Date Time Picker 日期范围选择组件

 1. 和Elemen-ui 中的 BBDateTimePicker 日期时间选择器 在用法上达到无差别使用；
 2. 可以快速切换年份和月份及开始时间、结束时间；
 3. 因为Elemen-ui 中的 BBDateTimePicker 日期时间选择器 已经广泛使用，更换起来更便捷，不用变更原来业务代码；
 > 注：交互上和Elemen-ui 中的 BBDateTimePicker 日期时间选择器 不同
 
 ### 默认用法

 默认whole类型, 整体显示

<ClientOnly>

 ::: demo

```vue
<template>
  <div>
    <el-row>
      <bb-date-time-picker
        v-model="dateValue"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="至"
        start-placeholder="Start date"
        end-placeholder="End date"
        :shortcuts="shortcuts"
        @change="handleChange"
      >
      </bb-date-time-picker>
    </el-row>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue'
export default defineComponent({
  name: 'date-time-picker',
  setup() {
    const dateValue = ref(['',''])
    const shortcuts = [{
      text: '最近一周',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
    }, {
      text: '最近一个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end]
      },
    }, {
      text: '最近三个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end]
      },
    }]

    const handleChange = (e: any) => {
      console.log(e, 'change');
    }
    return {
      dateValue,
      shortcuts,
      handleChange,
    }
  },
})
</script>
<style scoped>
</style>
```

:::
</ClientOnly>

### 切割显示

cut类型，切割显示

<ClientOnly>

 ::: demo

```vue
<template>
  <div>
    <el-row>
      <bb-date-time-picker
        v-model="dateValue"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="至"
        start-placeholder="Start date"
        end-placeholder="End date"
        style-type="cut"
        :shortcuts="shortcuts"
        @change="handleChange"
      >
      </bb-date-time-picker>
    </el-row>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue'
export default defineComponent({
  setup() {
    const dateValue = ref(['',''])
    const shortcuts = [{
      text: '最近一周',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
    }, {
      text: '最近一个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end]
      },
    }, {
      text: '最近三个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end]
      },
    }]

    const handleChange = (e: any) => {
      console.log(e, 'change');
    }
    return {
      dateValue,
      shortcuts,
      handleChange,
    }
  },
})
</script>
<style scoped>
</style>
```

:::
</ClientOnly>


### 时分秒显示

默认时分秒显示

<ClientOnly>

 ::: demo

```vue
<template>
  <div>
    <el-row>
      <bb-date-time-picker
        v-model="dateValue"
        type="datetimerange"
        value-format="YYYY-MM-DD HH:mm:ss"
        :shortcuts="shortcuts"
        range-separator="至"
        start-placeholder="Start date"
        end-placeholder="End date"
        :default-time="defaultTimeArr"
        @change="handleChange"
      >
      </bb-date-time-picker>
    </el-row>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue'
export default defineComponent({
  setup() {
    const defaultTimeArr = [
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 1, 1, 23, 59, 59),
    ];
    const dateValue = ref(['',''])
    const shortcuts = [{
      text: '最近一周',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
    }, {
      text: '最近一个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end]
      },
    }, {
      text: '最近三个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end]
      },
    }]

    const handleChange = (e: any) => {
      console.log(e, 'change');
    }
    return {
      dateValue,
      shortcuts,
      handleChange,
      defaultTimeArr
    }
  },
})
</script>
<style scoped>
</style>
```

:::
</ClientOnly>

### Attributes

和Element-ui 中的 [BBDateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) 日期时间选择器用法一致,新增`style-type`属性

| 参数                  | 说明                                                                     | 类型                                 | 可选值 | 默认值 |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------------ | ------ | ------ |
| style-type                |  `style-type` 属性，`whole`: 整体显示；`cut`：分开显示，用于控制组件的开始时间、结束时间是分开显示，还是整体显示；默认：`whole`；                                     | `string`                               | `whole`，`cut`      | `whole`  |


> 注：其中 placeholder、time-arrow-control、validate-event、unlink-panels 属性不可用，本组件已去掉，原因是目前封装组件内没用处（后期可看情况迭代）


### Shortcuts

和Element-ui 中的 [BBDateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) 日期时间选择器用法一致

### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 `value-format` 控制 |
| startChange | 用户确认开始时间的值时触发 | - |
| endChange | 用户确认结束时间的值时触发 | - |

### Slots
| Name    | 说明         |
|---------|-------------|
| range-separator  | 自定义分隔符 |
