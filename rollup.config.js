/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json'); // const json = require("@rollup/plugin-json"); // json解析
const base = require('./package-config/rollup-config-base');

export default {
  input: "./packages/index.ts",
  output: [
    { file: 'outputFile/' + pkg.cjs, format: 'cjs',exports: 'named',name: 'BBUI' },
    { file: 'outputFile/' + pkg.esm, format: 'esm',exports: 'named',name: 'BBUI' },
    { file: 'outputFile/' + pkg.main, format: 'umd' ,exports: 'named',name: 'BBUI'},
  ],
  globals: {
    "vue": "vue",
    "ElementPlus": "element-plus"
  },
  ...base.baseConfig({type: base.TYPE['全部']}),
};
