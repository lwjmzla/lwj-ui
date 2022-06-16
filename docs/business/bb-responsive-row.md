# Responsive Row 表单布局

表单格式模板，优化row的表单布局

<ClientOnly>

:::demo
  ```vue
  <template>
    <el-form
      label-width="100px"
      ref="ruleForm"
    >            
      <bb-responsive-row  
        :col="{ xs: 24, sm: 12, md: 8, lg: 6, xl: 4 }"
      >
        <el-form-item label="采购商编码">
          {{ '-'}}
        </el-form-item>

        <el-form-item label="创建时间">
          {{ '-' }}
        </el-form-item>
        <el-form-item label="创建时间">
          {{ '-' }}
        </el-form-item> 
        <el-form-item label="创建时间">
          {{ '-' }}
        </el-form-item> 
        <el-form-item label="创建时间">
          {{ '-' }}
        </el-form-item>
      </bb-responsive-row >

    </el-form>
  </template>
  ```
:::
</ClientOnly>

### Row 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|gutter |	栅格间隔 |	number |	— |	0 |
|justify |	flex 布局下的水平排列方式 |	string |	start/end/center/space-around/space-between/|space-evenly |	start |
|align |	flex 布局下的垂直排列方式 |	string |	top/middle/bottom |	top |
|tag |	自定义元素标签 |	string |	* |	div |


### Col 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| span |	栅格占据的列数 |	number |	— |	24 |
| offset |	栅格左侧的间隔格数 |	number |	— |	0 |
| push |	栅格向右移动格数 |	number |	— |	0 |
| pull |	栅格向左移动格数 |	number |	— |	0 |
| xs |	<768px 响应式栅格数或者栅格属性对象 |	number/object (例如 {span: 4, offset: 4}) |	— |	— |
| sm |	≥768px 响应式栅格数或者栅格属性对象 |	number/object (例如 {span: 4, offset: 4}) |	— |	— |
| md |	≥992px 响应式栅格数或者栅格属性对象 |	number/object (例如 {span: 4, offset: 4}) |	— |	— |
| lg |	≥1200px 响应式栅格数或者栅格属性对象 |	number/object (例如 {span: 4, offset: 4}) |	— |	— |
| xl |	≥1920px 响应式栅格数或者栅格属性对象 |	number/object (例如 {span: 4, offset: 4}) |	— |	— |
| tag |	自定义元素标签 |	string |	* |	div |
