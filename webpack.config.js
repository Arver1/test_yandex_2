const PATH = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const PATHS = {
  source: PATH.join(__dirname, 'js'),
  build: PATH.join(__dirname, 'js')
};

module.exports = {

  context: PATHS.source,

  entry: {
    index: './index.js',
  },

  output: {
    filename: 'main.js',
    path: PATHS.build
  },

  plugins: [
    new CaseSensitivePathsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devtool: 'eval'
};

