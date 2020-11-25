// 注意：配置proxy之后，必须重启vue-cli脚手架才能生效。
// 注意： proxy只使用开发环境，打包压缩后会失效
module.exports = {
  devServer: {
    proxy: 'http://localhost:3003'
  }
}
