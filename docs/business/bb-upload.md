# Upload 上传


## 文件上传

<ClientOnly>

:::demo
```vue
<template>
  <div>
    <bb-file-upload
      fileTypeLimit="png|zip"
      isHideDownloadTpl
    >
    </bb-file-upload>
  </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue';

export default defineComponent({
  setup() {
    return {
    }
  }
})
</script>

<style></style>

```
:::
</ClientOnly>

> 支持el-upload 原Attributes

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | - | 请选择上传文件 |
| uploadFileUrl | 上传地址 | string | - | - |
| placeholder | 输入框内文案 | string | - | 请选择上传文件 |
| autoUpload | 是否在选取文件后立即进行上传 | boolean - | | false |
| resetFlag | 当它的值改变时，文件上传表单就会被重置 | boolean | - | false |
| fileTypeLimit | 文件格式限制 | string | - | - |
| uploadData | 上传时附带的额外参数 | object, element UI 中的data | - | - |
| isHideDownloadTpl | 是否显示下载模板按钮 | boolean | - | - |
| multiple | 多选 | boolean | - | false |
| limit | 最大允许上传个数 | number | - | - |
| showFileList | 是否显示已上传文件列表 | boolean | - | false |
| fileKeyName | 上传的文件字段名 | string | - | - |

### Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| download-err-excel | 下载错误原因 | - |
| error | 上传失败 | - |
| download-tpl | 下载模板 | - |
| cancel | 取消 | - |
| beforeUpload | 上传之前 | - |
| success | 上传成功 | - |

## 图片上传

<ClientOnly>

:::demo
```vue
<template>
  <div>
    <bb-image-upload
      :value="imagesValue"
      :limit="5"
      :size="0.5"
      @update="handleUpdate"
    ></bb-image-upload>
  </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue';

export default defineComponent({
  setup() {
    const imagesValue = ref(['https://img.ibaibu.com/baibu_9717ef59543444c7bae1f6b257fcf1d4.png'])
    const handleUpdate = (images:string[]) => {
      console.log(images)
    }
    return {
      imagesValue,
      handleUpdate
    }
  }
})
</script>

<style></style>

```
:::
</ClientOnly>

> 支持el-upload 原Attributes

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 需要初始化的图片 | array | - | [] |
| size | 图片大小MB | number | - | 5 |
| uploadFileUrl | 上传地址 | string | - | - |
| fileKeyName | 上传的文件字段名 | string | - | - |
| limit | 限制张数 | number | - | 5 |
| resetFlag | 当它的值改变时，文件上传表单就会被重置 | boolean | - | false |

### Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| update | 返回图片数组 | - |

