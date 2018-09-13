
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.jsx?$/, use: [ {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react'],
                }
            } ] },
            { test: /\.html$/, use: ['html-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$/, use: [ { 
                loader: 'url-loader', 
                options: {
                    limit: 10000
                } 
            } ]}
        ]
    },
    devServer: {
        contentBase: __dirname,
        port: 8080,
        open: 'http://localhost:8080'
    }
}
