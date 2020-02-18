const path = require('path');
const MiniCSSExtractPluggin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js')
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: { // Lista de loader
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPluggin.loader
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPluggin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Plugins'
    })
  ]
}