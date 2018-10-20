const PKG = require("./package");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpackConfig = require("./webpack.config");
const args = require("yargs").argv;

let publicPath = args.git ? "/" + PKG.name + "/" : "/";
let dist = args.git ? "docs" : "dist";

module.exports = merge(webpackConfig, {
  mode: "production",
  target: "web",
  output: {
    path: path.join(__dirname, dist),
    filename: "[name].[chunkhash].js",
    publicPath: publicPath
  },
  plugins: [new CleanWebpackPlugin([dist])]
});
