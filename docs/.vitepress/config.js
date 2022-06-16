const router = require('./router.config.ts')

module.exports = {
  title: "vue3-bbui",// 网站标题
  description: 'vue3组件库', //网站描述
  // 打包目录
  outDir: '../dist',
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: './favicon.ico' }] //docs/public/favicon.ico
  ],
  base: '/vue3', //  部署时的路径 默认 /  可以使用二级地址 /base/
  // lang: 'en-US', //语言
  repo: 'vuejs/vitepress',
  // 使用插件
  // plugins: [ // !这是vuepress的
  //   '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
  //   '@vuepress/back-to-top',          // 返回顶部插件
  //   '@vuepress/medium-zoom',          // 图片预览插件
  //   '@vuepress/nprogress',        //页面顶部进度条
  // ],
  // 主题配置
  themeConfig: {
    //smoothScroll: true,
    //   头部导航
    nav: [
      { text: '首页', link: '/' },
      // { text: '代码运行', link: '/runcode'}
    ],
    //   侧边导航
    sidebar: [
      ...router,
    ]
  },
  markdown: {
    config: (md) => {
      const {
        demoBlockPlugin
      } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss',
        // scriptImports: [
        //   "import * as ElementPlus from 'element-plus'"
        // ],
        scriptImports: ["import * as ElementPlus from 'element-plus'"],
        scriptReplaces: [
          // { searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
          //   replaceValue: 'const { defineComponent: _defineComponent } = Vue'
          // },
          { searchValue: /import ({.*}) from 'element-plus'/g,
            replaceValue: (s, s1) => `const ${s1} = ElementPlus`
          }
        ],
      })
    },
    lineNumbers: true
  },
}
