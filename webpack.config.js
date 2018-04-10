const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');
const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');
const dirScripts = path.join(__dirname, 'scripts');
const dirScss = path.join(dirAssets, 'scss');
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
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          includePaths: [dirApp],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /(app\/scripts\/)/,
        loader: 'babel-loader',
      },
      // SCSS
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEV,
                plugins: [
                  autoprefixer({browsers: ['last 3 versions', 'iOS 9']}),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,
                includePaths: [
                  dirApp,
                ],
              },
            }],
          // use style-loader in development
          fallback: {
            loader: 'style-loader',
          },
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
    ...generateHTMLPlugins(),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
    }),
  ],
  stats: {
    colors: true,
  },
};
