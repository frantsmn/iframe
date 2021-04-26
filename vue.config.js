const webpack = require('webpack')
const path = require("path")

module.exports = {
  outputDir: path.resolve(__dirname, "../public/widget-dist/"),
  assetsDir: '',
  publicPath: '',
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
    },
  filenameHashing: false,
  runtimeCompiler: true
}
