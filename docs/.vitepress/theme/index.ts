import Demo from '../../../src/components/demo-block/Demo.vue'
import DemoBlock from '../../../src/components/demo-block/DemoBlock.vue'
import RunCode from "../../../src/views/run-code.vue";
// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default'
import ElementPlus from "element-plus";
import * as ElIcons from '@element-plus/icons-vue';
import Viewer from '@sufangyu/v-viewer';
import 'viewerjs/dist/viewer.css';
//import BBUI from "../../../lib/bbui.esm";
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
import 'element-plus/theme-chalk/index.css';

import "../../../packages/theme-chalk/src/index.scss";
/**
 * register-components.js使用脚本自动创建
 * // package.json
 * "scripts": {
    "register:components": "vitepress-rc"
    }
 */

// interface Theme {
//   Layout: Component;
//   NotFound?: Component;
//   enhanceApp?: (ctx: EnhanceAppContext) => void;
// }
// interface SiteData<ThemeConfig = any> {
//   base: string
//   lang: string
//   title: string
//   description: string
//   head: HeadConfig[]
//   themeConfig: ThemeConfig
//   locales: Record<string, LocaleConfig>
//   langs: xx
// }

export default {
  ...Theme,
  enhanceApp({ app, router, siteData }) {
    app.component('RunCode', RunCode)
    app.use(ElementPlus)
    app.use(Viewer)
    //app.use(BBUI)
    // @ts-ignore
    const componentVueObj = import.meta.globEager('../../../packages/**/*.vue');
    // @ts-ignore
    const componentTsxObj = import.meta.globEager('../../../packages/**/*.tsx');
    // @ts-ignore
    const componentColorsObj = import.meta.globEager('../../../src/components/colors/*.vue');
    // @ts-ignore
    const componentIconsObj = import.meta.globEager('../../../src/components/icons/*.vue');

    const componentObj = {
      ...componentTsxObj,
      ...componentVueObj,
      ...componentColorsObj,
      ...componentIconsObj,
    };

    for (let key in componentObj) {
      const item = componentObj[key]['default']
      app.component(item.name, item)
    }
    for (const iconName in ElIcons) {
      app.component(iconName, ElIcons[iconName]);
    }
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  }
}
