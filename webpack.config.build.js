const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(webpackConfig, {
  target: 'web',
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'scripts/[name].[chunkhash].js',
    publicPath: ''
  },

  plugins: [
    new CleanWebpackPlugin(['docs']),
  ],
  devtool: 'source-map'

});
