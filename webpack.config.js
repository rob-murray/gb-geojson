var path = require('path'),
  webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: { filename: './dist/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
