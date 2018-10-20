const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpackConfig = require("./webpack.config");
const args = require("yargs").argv;
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob");

const publicPath = args.git ? "" : "/";
const dist = args.git ? "docs" : "dist";

module.exports = merge(webpackConfig, {
  target: "web",
  output: {
    path: path.join(__dirname, dist),
    filename: "scripts/[name].[chunkhash].js",
    publicPath: publicPath
  },
  plugins: [new CleanWebpackPlugin([dist])],
  devtool: "inline-source-map"
});
