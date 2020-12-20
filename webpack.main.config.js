const { webpackAlias } = require('./webpack.alias');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/services/electron.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    alias: webpackAlias,
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
};