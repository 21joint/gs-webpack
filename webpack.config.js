const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');
const dirNode = path.join(__dirname, 'node_modules');
const dirSrc = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'src/assets');
const dirScripts = path.join(__dirname, 'src/scripts');
const dirSCSS = path.join(__dirname, 'src/scss');
const appHtmlTitle = 'GS Layouts';

const getNameFromDir = (dir) => {
  const lastSlash = dir.lastIndexOf('/');
  return dir.slice(lastSlash + 1);
};

const generateHTMLPlugins = () =>
    glob.sync('./src/*.html').map(function(dir) {

      return new HtmlWebpackPlugin({
        filename: getNameFromDir(dir), // Output
        template: dir, // Input
      });
    });

/**
 * Webpack Configuration
 */

module.exports = {
  node: {
    fs: 'empty',
  },
  target: 'web',
  entry: {
    vendor: './src/vendor.js',
    common: './src/common.js',
    brand: './src/brand.js',
  },
  resolve: {
    modules: [
      dirNode,
      dirSrc,
      dirAssets,
    ],
    alias: {
      '~': path.join(__dirname, 'node_modules'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /(app\/scripts\/)/,
        loader: 'babel-loader',
      },
      // SCSS
      {
        test: /\.(scss|css)$/,

        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: !IS_DEV,
                sourceMap: IS_DEV,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEV,
                plugins: [
                  require('autoprefixer')({
                    browsers: ['last 2 versions'],
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,

              },
            },
          ],
        }),
      },
      // IMAGES
      {
        test: /\.(gif|png|jpeg|jpg|svg)?$/i,
        include: /(images)/,
        use: [
          'file-loader?name=[name].[ext]&outputPath=./images/',
        ],
      },
      // FONTS
      {
        test: /\.(ttf|woff|woff2|eot|svg)?$/i,
        include: /(fonts|icomoon)/,
        use: [
          'file-loader?name=[name].[ext]&outputPath=./fonts/',
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ...generateHTMLPlugins(),
    new ExtractTextPlugin('styles/[name].css'),
  ],
  stats: {
    colors: true,
  },
  devtool: 'eval',
};
