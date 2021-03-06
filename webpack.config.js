const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    clean: true,
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to: 'assets/images',
        },
      ],
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
