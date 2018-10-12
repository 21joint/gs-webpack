const path = require("path");
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  mode: "development",
  devServer: {
    watchContentBase: true,
    port: 3000,
    hot: true,
    host: 'localhost',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
