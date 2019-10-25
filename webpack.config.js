const path = require("path");
const express = require('express')

module.exports = {
    entry: [
      './src/index.js',
      './src/index.css'
    ],
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
			}
		},
      ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 4200,
        hot: true
    },
  };

//   devServer: {
//     contentBase: path.join(__dirname, 'public'),
//     compress: true,
//     open: true,
//     port: 4200,
//     hotOnly: true
// },

``