const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
    vendor: ['jquery']
  },
  output: {
    filename: '[name].[chunkhash:6].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract(['css-loader'])
    }]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'head'
    }),
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin([ 'dist' ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new Dotenv({
      path: './.env'
    })
  ]
}
