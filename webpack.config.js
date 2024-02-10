const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js', // Your main JavaScript file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
        },
        },
    },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 8080,
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
  ],
};
