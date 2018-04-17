const merge = require('webpack-merge');
const config = require('./webpack.config');
const path = require('path');

module.exports = merge(config, {
  output: {
    publicPath: 'http://localhost:2121/'
  },
  devServer: {
    publicPath: 'http://localhost:2121/',
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    port: 2121,
    open: true
  }
});
