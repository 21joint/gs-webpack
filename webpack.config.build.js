const PKG = require("./package");
const path = require("path");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackConfig = require("./webpack.config");
const args = require("yargs").argv;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

console.log(args);

let publicPath = args.git ? "/" + PKG.name + "/" : "/levon/";
let dist = args.git ? "docs" : "dist";

module.exports = merge(webpackConfig, {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    path: path.join(__dirname, dist),
    filename: "[name].[chunkhash].js",
    publicPath: publicPath
  },
  plugins: [
    new CleanWebpackPlugin([dist]),
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets", force: true }])
  ]
});
