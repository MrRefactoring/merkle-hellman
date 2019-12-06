import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const ENV = process.env.NODE_ENV || 'development';

const config: webpack.Configuration = {
  watch: ENV === 'development',
  target: 'web',
  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: '[name].js',
    publicPath:  ENV === 'development' ? '/' : './',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
      },
      {
        test: /\.(js|jsx|ts|tsx)/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      services: path.resolve(__dirname, 'src/services'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './src/index.html',
      inject: 'body',
      hash: ENV !== 'development',
      chunks: ['app'],
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]
};

switch (ENV) {
  case 'production':
    config.devtool = false;
    config.optimization = { minimize: true };
    break;
  case 'development':
    config.devtool = 'source-map';
    break;
  case 'test':
    config.devtool = 'source-map';
    delete config.entry;
    break;
  default:
    break;
}

export default config;
