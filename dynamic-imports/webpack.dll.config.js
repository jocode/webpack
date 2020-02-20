const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    modules: [ // Dependencias Core
      'react',
      'react-dom'
    ]
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    library: '[name]', // Globales
  },
  devServer: {
    hot: true,
    open: true,
    port: 9000
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name]-manifest.json')
    })
  ],
}