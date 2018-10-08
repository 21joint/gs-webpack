const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  devServer: {
    watchContentBase: true,
    port: 4040,
    hot: true,
    host: '127.0.0.1',
    open: true,
    publicPath: '/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map'

});
