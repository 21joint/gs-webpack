const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

module.exports = merge(webpackConfig, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    port: 4040,
    hot: true,
    host: "0.0.0.0",
    open: true,
    publicPath: "/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
