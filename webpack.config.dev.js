const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 2121,
    open: true,
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths,
    publicPath: '/'
  }
});
