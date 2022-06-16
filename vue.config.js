module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue3/' : '/',
  runtimeCompiler: true,
  productionSourceMap: false,
  
  configureWebpack: {
    module: {
      exprContextCritical: false,
      noParse: [
        require.resolve('typescript/lib/typescript.js')
      ], // !解决ts模块报错，Module not found: Can't resolve 'perf_hooks'，https://github.com/microsoft/TypeScript/issues/39436
    }
  }
};
