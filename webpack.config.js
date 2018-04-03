const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');
const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');
const appHtmlTitle = 'GS Layouts';

const getNameFromDir = (dir) => {
  const lastSlash = dir.lastIndexOf('/');
  return dir.slice(lastSlash + 1);
};

const generateHTMLPlugins = () =>
    glob.sync('./app/*.html').map(function(dir) {

      return new HtmlWebpackPlugin({
        filename: getNameFromDir(dir), // Output
        template: dir, // Input
      });
    });

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    vendor: path.join(dirApp, 'scripts/vendor.js'),
    common: path.join(dirApp, 'scripts/common.js'),
    brandFindInfluencer: path.join(dirApp, 'scripts/brand-find-influencer.js'),
  },
  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets,
    ],
  },
  module: {
    rules: [
      {
        test: /\.js?x$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      // CSS / SASS
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets],
            },
          },
        ],
      },

      // IMAGES
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './images/',
            },
          },
        ],
      },
      // FONTS
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: './fonts/',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),
    new CopyWebpackPlugin([
      {
        from: './app/assets/',
        to: './',
      }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 7777,
  },
};
