# 自定义主题

默认主题配置与 `element-ui` 一致，如有需要需自行编译好 `element-ui` 样式进行引入。

## 在项目中改变 SCSS 变量

`bb-ui` 的 `theme-chalk` 使用 `SCSS` 编写，如果你的项目也使用了 `SCSS`，那么可以直接在项目中改变 `bb-ui` 的样式变量。新建一个样式文件，例如 `bb-ui-variables.scss`，写入以下内容：

> 请注意，这种方式会将所有样式全部引入

```scss
// 版本1.0.2-beta.71
@forward 'element-plus/packages/theme-chalk/src/var.scss' with (
  $--colors: (
    'primary': (
      'base': #409eff,
    ),
    'success': (
      'base': #67c23a,
    ),
    'warning': (
      'base': #e6a23c,
    ),
    'danger': (
      'base': #f56c6c,
    ),
    'error': (
      'base': #f56c6c,
    ),
    'info': (
      'base': #909399,
    ),
  ),
);

// 最新版本
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': #409eff,
    ),
    'success': (
      'base': #67c23a,
    ),
    'warning': (
      'base': #e6a23c,
    ),
    'danger': (
      'base': #f56c6c,
    ),
    'error': (
      'base': #f56c6c,
    ),
    'info': (
      'base': #909399,
    ),
  ),
);
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 `bb-ui` 编译好的 CSS 文件）：

```js
import Vue from 'vue'
import bbui from 'bb-ui'
import './bbui-variables.scss'

Vue.use(bbui)
```

