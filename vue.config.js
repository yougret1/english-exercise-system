const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  devServer: {
    proxy: {
      '/baiduFanyi': {
        target: 'https://fanyi-api.baidu.com/api/trans/vip/translate', // 需要代理的后端接口
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        pathRewrite: {
          // 重写匹配的字段，如果不需要在请求路径上，重写为""
          '^/baiduFanyi': ''
        }
      }
    }
  }
}
