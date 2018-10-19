const Conf = require('./conf');
const path = require('path');
const Pkg = require('./package');
const args = require('yargs').argv;
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_DEV = (process.env.NODE_ENV !== 'production');
const renderHtmlTemplates = () =>
  glob.sync('src/*.html')
    .map(dir => new HtmlWebpackPlugin({
      // Output
      filename: path.basename(dir),
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: dir,
      title: path.basename(dir)
    }));

/**
 * Webpack Configuration
 */

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      // JS
      {
        test: /\.jsx$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: path.resolve(__dirname, 'src'),
        use: [
          'babel-loader'
        ]
      },

      // SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          {
            loader: "postcss-loader",

            options: {
              sourceMap: IS_DEV,
              plugins: [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  browsers: ['last 3 versions']
                })
              ]
            }
          },
          'sass-loader',
        ],
      },

      // FONTS/IMAGES
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg|gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name(file) {
                if (file.indexOf('fonts') > -1) {
                  return 'fonts/[name].[ext]';
                }
                else {
                  return 'images/[name].[ext]';
                }
              },
              fallback: 'file-loader',
              outputPath: './',
              publicPath: args.git ? '/gs-webpack/' : '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    ...renderHtmlTemplates(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: IS_DEV ? '[name].css' : '[name].[hash].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css',
    })
  ]
};
