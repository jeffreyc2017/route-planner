const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = (env) => {
  const environment = env.environment;
  const envConfig = require(`./src/components/map/config.${environment}.js`);
  const envFirebaseConfig = require(`./src/components/signup/firebase_config.${environment}.js`);
  return {
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
      new webpack.DefinePlugin({
        'process.env.CONFIG': JSON.stringify(envConfig),
        'process.env.FIREBASE_CONFIG': JSON.stringify(envFirebaseConfig),
      }),
    ],
  }
};
