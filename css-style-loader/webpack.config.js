const path = require('path')

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/js/index.js')
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
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}