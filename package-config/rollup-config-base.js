/* eslint-disable @typescript-eslint/no-var-requires */
const { babel,getBabelOutputPlugin } = require("@rollup/plugin-babel"); // es6解析
const json = require("@rollup/plugin-json"); // json解析
const vuePlugin = require("rollup-plugin-vue"); // vue 解析
const typescript = require("rollup-plugin-typescript2"); // ts打包
const postcss = require("rollup-plugin-postcss"); // css 打包
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");  // 浏览器前缀
// const {terser} = require('rollup-plugin-terser'); // 代码压缩
const alias = require('rollup-plugin-alias');
const jsx = require("acorn-jsx");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");

const TYPE = {
  '全部': 'lib',
  '分包': 'lib-sub'
}

const override = (type) => ({
    compilerOptions: { 
      declaration: true,
      declarationDir: 'outputFile/' + type + '/type',
    }
  });

const baseConfig =  ({type = TYPE['全部']}) => ({
    plugins: [
      // terser(), // 代码压缩
      json(),
      typescript({ 
        tsconfigOverride: override(type),
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true,
       }),
      babel({
        exclude: "node_modules/**",
        //babelHelpers: "runtime",
      }),
      getBabelOutputPlugin({
        exclude: 'node_modules/**',
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          '@vue/babel-plugin-jsx'
        ],
        allowAllFormats: true
      }),
      vuePlugin({
        css: true,
        target: 'browser',
        compileTemplate: true,
        preprocessStyles: true,
      }),
      postcss({
        extensions: [ '.css','.sass' ],
        plugins: [
          cssnano,
          autoprefixer({ overrideBrowserslist: ["> 0.15% in CN"] }), // 自动添加css前缀
        ],
      }),
      alias({
        'vue': require.resolve('vue/dist/vue.esm-bundler.js')
      }),
      nodeResolve({ mainFields: ["module", "main", "browser"] }),
      commonjs({ sourceMap: true }),
    ],
    acornInjectPlugins: [jsx()],
    external: [
      //外部库， 使用'umd'文件时需要先引入这个外部库
      "vue",
      "element-plus",
    ],
  })

module.exports = {
  TYPE,
  baseConfig,
}
