var path = require('path');
const webpack = require('webpack');

var jsName = 'bundle.js';

var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './src/index.jsx')
  ],
  output: {
      path: BUILD_DIR,
      filename: 'bundle.js',
      publicPath: '/public/',
      chunkFilename: '[name].bundle.js'
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  resolve: {
      extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svc|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
          loader: 'file-loader',
          options: {
              outputPath: 'img/',
              publicPath: 'img/'
           }
         }
        ]
      }
    ]
  },
  node: {
   fs: "empty"
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      MapboxAccessToken: 'pk.eyJ1Ijoib2xlZ2tsZWltYW4iLCJhIjoiY2puM251bDk1Mmc2djNrcWxlYWU2MWY4NyJ9.vyNX_-c-ax1erGoOkAuH0g'
    })
  ]

};

module.exports = config;
