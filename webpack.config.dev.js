//require our dependencies
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: '#cheap-module-eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/dev/js/index'
  ],

  
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name]-dev.js',
    publicPath: '/'
  },

  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
  },

  resolve: {
    modules: ["node_modules"],
    alias: {
      'SRC': path.resolve(__dirname, 'src/'),
      'BUILD': path.resolve(__dirname, 'build/'),
      'IMG': path.resolve(__dirname, 'src/assets/img'),
      'FONT': path.resolve(__dirname, 'src/assets/font'),
      'SASS': path.resolve(__dirname, 'src/dev/sass'),
      'STORE': path.resolve(__dirname, 'src/dev/js/Store'),
      'APP': path.resolve(__dirname, 'src/dev/js/App')
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, 
        include: path.join(__dirname, './src/dev'),
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        loader: 'file-loader?name=./img/[name]-[hash:4].[ext]',
        include: path.join(__dirname, './src/assets/img')
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]',
        include: path.join(__dirname, './src/assets/font')
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
}