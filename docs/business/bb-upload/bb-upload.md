# Upload 上传

图片上传组件

## 文件上传

> 支持el-upload 原Attributes

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | 请选择上传文件 |
| uploadFileUrl | 上传地址 | string | - |
| placeholder | 输入框内文案 | string | 请选择上传文件 |
| autoUpload | 是否在选取文件后立即进行上传 | boolean | false |
| resetFlag | 初始化标识，当它的值改变时，文件上传表单就会被重置 | boolean | false |
| fileTypeLimit | 文件格式限制 | string | - |
| uploadData | 上传时附带的额外参数 | object, element UI 中的data | - |
| isHideDownloadTpl | 是否显示下载模板按钮 | boolean | - |
| multiple | 多选 | boolean | - |
| limit | 最大允许上传个数 | number | - |
| showFileList | 是否显示已上传文件列表 | boolean | true |
| fileKeyName | 上传的文件字段名 | string | - |

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


> 支持el-upload 原Attributes

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| viewer | 是否可以查看大图 | boolean | - | true |
| paste | 是否显示粘贴上传 | boolean | - | true |
| disabled | 禁用编辑 | boolean | - | false |
| limitSize | 限制文件大小 MB | number | - | - |
| fileTypeLimit | 限制文件类型 | string | - | - |

### Events

| Event Name | Description | Parameters |
|---------|--------|---------|
| update | 上传后调用 | - |
| upload-paste | 粘贴上传后调用 | - |