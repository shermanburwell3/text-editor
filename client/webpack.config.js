const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates an HTML file from a template
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      // Generates a manifest.json file for PWA
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Txt Edit',
        description: 'A web-based text editor',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('logo'),
          },
        ],
      }),
      // Injects the service worker into the build
      new InjectManifest({
        swSrc: './src-sw.js', // Path to service worker
        swDest: 'sw.js', // Output path for service worker
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'images/',
              },
            },
          ],
        },
      ],
    },
  };
};