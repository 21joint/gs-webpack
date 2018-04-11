const merge = require('webpack-merge');
const config = require('./webpack.config');
const path = require('path');

module.exports = merge(config, {
  devServer: {
    watchContentBase: true,
    port: 2121,
    open: true,
    compress: true
  },
});