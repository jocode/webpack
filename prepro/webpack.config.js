const path = require('path');
const MiniCSSExtractPluggin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    hot: true,
    open: true,
    port: 9000
  },
  module: { // Lista de loader
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/, // Para evitar que cargue esos archivos
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // Con esto le indica que primero haga el trabajo postcss-loader
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 90000 // Cuenta los bytes de los elementos a importar
          }
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-dev-server',
      template: path.resolve(__dirname, 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}