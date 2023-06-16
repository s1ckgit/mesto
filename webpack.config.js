const path = require('node:path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {index: './pages/index.js'},
  output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: '[path][name][ext]'
  },
  devServer: {
      port: 8080,
      hot: false,
      liveReload: true,
      static: path.resolve(__dirname, './dist'),
      open: true
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader']
          },
          {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
          },
          {
              test: /\.(png|jpg|svg|gif|ttf|woff|woff(2)?|eot)$/,
              type: 'asset/resource'
          },
      ]
  },
  plugins: [
      new HTMLWebpackPlugin({
          template: './index.html',
          filename: 'index.html',
          minify: {
              collapseWhitespace: true
          },
          chunks: ['index']
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
          filename: '[name].css'
      })
  ]

}
