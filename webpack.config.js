const webpack = require('webpack');
const path = require('path');
// const lodash = require('lodash');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const chalk = require('chalk');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlguin = require('extract-text-webpack')
// const outputDirectory = './dist/js/';

module.exports = {
  entry: [
    //entry point to app
    './client/src/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    //Docker host required
    // host: '0.0.0.0',
    //host: localhost, port for the webpack dev server
    port: 8080,
    //match output path
    contentBase: path.resolve(__dirname,'dist'),
    //enable of hot module reload
    hot: true,
    //match output 'publicPath'
    publicPath: '/',
    //fallback to root for other urls
    historyApiFallback: true, 
    inline: true, 
    headers: { 'Access-Control-Allow-Origin': '*'},
    //proxy necessary to make api calls to express server while using hot-reload webpack server
    //route api axios requests from localhost:3001/api/* (webpack dev server) to localhost:3001/api/* where Express
    proxy: {
      '/api/**': {
        target: 'http://localhost:3001/',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3001/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      { 
        test: /.(js|jsx)$/, 
        // include: path.resolve(__dirname, 'index'), 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', },
      },
      { 
        test: /\.(css|scss)$/, 
        exclude: /node_modules/,
        // include: path.resolve(__dirname, 'index'), 
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new ProgressBarPlugin({
    //   format: 
    //     ' build [:bar] ' +
    //     chalk.green.bold(':percent') +
    //     ' (:elapsed seconds)',
    // }),
    new webpack.HotModuleReplacementPlugin({
      template: './client/public/index.html',
    }),
    // new OpenBrowserPlugin({ url: `http://localhost:3001` })
  ],
  resolve: {
    //enable import jsx files
    extensions: ['.js', '.jsx'],
  },
};