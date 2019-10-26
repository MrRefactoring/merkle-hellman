import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';

const ENV: 'production' | 'development' = process.env.NODE_ENV as 'development' || 'production';

const config: webpack.Configuration = {
  devtool: 'source-map',
  entry: './src/index.tsx',
  mode: ENV,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './out'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  watch: ENV === 'development',
};

export = config;
