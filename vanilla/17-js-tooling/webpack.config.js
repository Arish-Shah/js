const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts')
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [new CleanPlugin.CleanWebpackPlugin()]
};
