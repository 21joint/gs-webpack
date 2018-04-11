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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
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
                    browsers: ['last 3 versions', 'iOS 9'],
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
        test: /\.(gif|png|jpe?g|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
          {
            loader: 'file-loader',
            options: {
              outputPath: './images/',
              filename: '[name].[ext]',
            },
          },
        ],
      },
      // FONTS
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
          {
            loader: 'file-loader',
            options: {
              outputPath: './fonts/',
              filename: '[name].[ext]',
            },
          },
        ],
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
    new CopyWebpackPlugin([
      {
        from: dirAssets,
        to: './',
      }]),
    ...generateHTMLPlugins(),
    new ExtractTextPlugin('styles/[name].css'),
  ],
  stats: {
    colors: true,
  },
  devtool: 'cheap-module-eval-source-map',
};
