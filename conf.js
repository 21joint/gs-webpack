const Pkg = require('./package');

module.exports = {
  BASE_URL: 'https://eatdrinkslc.com/',
  title: Pkg.name,
  description: Pkg.description,
  paths: {
    nodePath: 'node_modules',
    src: 'src',
    assets: 'src/assets',
    fonts: 'src/assets/fonts',
    images: 'src/assets/images',
    icons: 'src/assets/icomoon/fonts',
    dist: 'dist',
    publicPath: '/'
  }
};
