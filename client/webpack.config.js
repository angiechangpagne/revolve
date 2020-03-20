const path, { join } = require('path');
const lodash = require('lodash');
// const webpack = require('webpack');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlguin = require('extract-text-webpack')
const outputDirectory = './dist/js/';

module.exports = {
  entry: path.join(__dirname, './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlguin.extract([
          fallback: 'style-loader', 
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap : true
            }
          }, 'sass-loader'],
        }),
      
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3005,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    // new ProgressBarPlugin({
    //   format: 
    //     ' build [:bar] ' +
    //     chalk.green.bold(':percent') +
    //     ' (:elapsed seconds)',
    // }),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/public/index.html'),
      favicon: 'public/favicon.ico'
    }),
  ],
  watch: true,
};