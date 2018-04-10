const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const path = require('path');

module.exports = merge(webpackConfig, {

  devtool: 'eval',
  output: {
    publicPath: 'http://localhost:2121/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 2121,
    open: true
  },
});
