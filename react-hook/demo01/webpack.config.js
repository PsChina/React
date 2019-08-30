const path = require('path')
const resolve = dir => path.resolve(__dirname,dir)
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:'./app.jsx',
  output:{
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.jsx?$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets:[
                '@babel/env',
                '@babel/react'
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use:['html-loader']
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)/,
        use:[{
          loader:'url-loader',
          options:{
            limit:10000
          }
        }]
      }
    ],
  },
  devServer:{
    contentBase:__dirname,
    port:3000,
    open:true,
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ]
}