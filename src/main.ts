import ElementPlus from "element-plus";
import 'element-plus/theme-chalk/index.css';
import "../packages/theme-chalk/src/index.scss";
import './theme.scss'
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElIcons from '@element-plus/icons-vue';
import Viewer from '@sufangyu/v-viewer';
import 'viewerjs/dist/viewer.css';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import{BBColumnSwitch}from "../lib/bbui.esm.js"; // 按需
import BBUI from "../lib/index" // !这样意味着每次改动都需要重新打包才能测试。
const app = createApp(App);

// const component = require.context('../packages', true, /\.(vue|tsx)$/)
// // @ts-ignore
// component.keys().map(component).forEach(({ default: item }) => {
//   app.component(item.name, item)
// })

for (const iconName in ElIcons) {
  // @ts-ignore
  app.component(iconName, ElIcons[iconName]);
}

app
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(BBUI)
  // @ts-ignore
  .use(Viewer)
  .mount("#app");

export default app;
