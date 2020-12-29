const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './views/fullCalendar.js',
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
    filename: 'mainFullCalendar.js',
    path: path.join(__dirname, 'public','dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'mainFullCalendar.css'
    })
  ]
}