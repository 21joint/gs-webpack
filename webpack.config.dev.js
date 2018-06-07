const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    host: '0',
    port: 5000,
    open: true,
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths,
    publicPath: '/'
<<<<<<< HEAD
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
=======
  }
>>>>>>> f8b509bd2881ff7c99ca8b8b5f5d6777f1cfac7f
});
