const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const glob = require('glob');
const pkg = require('./package');
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');
const project = {
  BASE_URL: 'https://eatdrinkslc.com/',
  title: pkg.description.split('|')[0],
  description: pkg.description,
  nodePath: 'node_modules',
  src: path.join(__dirname, 'src'),
  assets: path.join(__dirname, 'src/assets'),
  fonts: path.join(__dirname, 'src/assets/fonts'),
  images: path.join(__dirname, 'src/assets/images'),
  icons: path.join(__dirname, 'src/assets/icomoon/fonts'),
  port: process.env.PORT || 2121,
  publicPath: '/'
};

const generateHTMLPlugins = () =>
  glob.sync('./src/**/*.html')
    .map(dir => new HtmlWebpackPlugin({
      // Output
      filename: path.basename(dir),
      // Input,
      template: dir,
      title: pkg.description
    }));

/**
 * Webpack Configuration
 */

module.exports = {
  entry: {
    vendor: './src/vendor.js',
    common: './src/common.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  externals: [
    /^babel-runtime/
  ],
  resolve: {
    modules: [
      'node_modules',
      project.src
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
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
                minimize: !IS_DEV,
                sourceMap: IS_DEV
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEV,
                plugins: [
                  autoprefixer({
                    browsers: ['last 3 versions']
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV
              }
            }
          ]
        })
      },

      // FONTS
      {
        test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpe?g)$/i,
        use: [
          'url-loader?limit=1024&name=[folder]/[name].[ext]&fallback=file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.resolve(__dirname, 'src')
      }
    }),
    new webpack.DefinePlugin({
      IS_DEV
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/assets/**/*',
    //     to: '[folder]/[name].[ext]',
    //     test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpe?g)$/
    //   }]),
    ...generateHTMLPlugins(),
    new ExtractTextPlugin({
      filename: 'styles/[name].css'
    }),
    new ExtractTextPlugin({
      filename: '[name].html'
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'cheap-eval-source-map'
};
