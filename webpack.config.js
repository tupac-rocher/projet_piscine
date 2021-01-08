const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    view_event : './views/view_event.js',
    create_event: './views/create_event'
  },
  resolve: {
    extensions: [ '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } }
        ]
      }
    ]
  },
  watch:true,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public','dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}