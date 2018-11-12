const path = require("path");
const PKG = require("./package");
const args = require("yargs").argv;
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_DEV = process.env.NODE_ENV !== "production";
console.log(`Building ... mode: ${IS_DEV ? "development" : "production"}`);
const publicPath = "/";
const renderHtmlTemplates = () =>
  glob.sync("src/*.html").map(
    dir =>
      new HtmlWebpackPlugin({
        // Output
        filename: path.basename(dir),
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
        },
        template: dir,
        title: path.basename(dir)
      })
  );

/**
 * Webpack Configuration
 */

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    publicPath: publicPath
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },

      // SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: IS_DEV,
              plugins: [
                require("postcss-flexbugs-fixes"),
                require("autoprefixer")({
                  browsers: ["last 3 versions"]
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.join(__dirname, "src")]
            }
          }
        ]
      },

      // FONTS/IMAGES
      {
        test: /\.ttf|eot|otf|woff|woff2|svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader"
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jp(e?)g)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
          outputPath: "./",
          publicPath: publicPath
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: IS_DEV ? "[name].css" : "[name].[hash].css",
      chunkFilename: IS_DEV ? "[id].css" : "[id].[hash].css"
    }),
    ...renderHtmlTemplates()
  ]
};
