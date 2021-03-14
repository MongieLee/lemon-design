const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // mode: 'production',
  // mode: 'development',
  entry: {
    index: './lib/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist/lib'),
    library: 'lemonDesign',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.s([ac])ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'index.html',
  //   }),
  // ],
  // externals: {
  //   react: {
  //     commonjs: 'react',
  //     commonjs2: 'react',
  //     amd: 'react',
  //     root: 'React',
  //   },
  //   'react-dom': {
  //     commonjs: 'react-dom',
  //     commonjs2: 'react-dom',
  //     amd: 'react-dom',
  //     root: 'ReactDOM',
  //   },
  // },
  devtool: 'inline-source-map',
};
