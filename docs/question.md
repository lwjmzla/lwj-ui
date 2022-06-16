# 问题汇总


## 安装问题

** You may need an appropriate loader to handle this file type **

原因是：没有解析到node_modules 里面的tsx写法

vue.config.js
```js
module.exports = {
  transpileDependencies: true,
}

```

babel.config.js
```js
module.exports = {
  ...
  plugins: [
    '@vue/babel-plugin-jsx',
  ],
};
```


