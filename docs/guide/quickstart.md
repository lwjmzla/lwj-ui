# 快速上手

本节将介绍如何在项目中使用 `bb-ui`, bb-ui基于element-plus使用前需要安装`element-plus`

## 完整引入

在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import bbui from 'bb-ui'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";

const app = createApp(App);

app
  .use(BBUI)
  .use(ElementPlus, { size: "small", locale: zhCn })
  .mount("#app");

```

以上代码便完成了 `bb-ui-vue3` 的引入。

## 按需引入

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import { Button, Select } from 'bb-ui-vue3'
import App from './App.vue'

const app = createApp(App);

app
  .component(Button.name, Button)
  .component(Select.name, Select)
  .mount("#app");
/* 或写为
 * app.use(Button)
 * app.use(Select)
 */

```

## 开始使用

至此，已经搭建完毕，现在就可以编写代码了。

您可以从现在起启动您的项目。 对于每个组件的用法，请参考单个组件对应的文档。

