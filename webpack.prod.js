const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: {
    main: './src/main.ts'
  },
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: 'graphql-import-loader' }]
      }
    ],
  },
  mode: 'production',
  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true,
    concatenateModules: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [new HardSourceWebpackPlugin(), new webpack.NamedChunksPlugin()],
  output: {
    path: path.join(__dirname, 'build'),
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
};
