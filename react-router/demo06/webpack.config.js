
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path')

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: true,//清除HTML注释
                collapseWhitespace: true,//压缩HTML
                removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
                minifyJS: true,//压缩页面JS
                minifyCSS: true//压缩页面CSS
            }
        }),
        new UglifyJsPlugin() // 压缩js
    ],
    module: {
        rules: [
            { test: /\.jsx?$/, use: [ {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react'],
                    plugins: ['@babel/plugin-proposal-class-properties','@babel/plugin-syntax-dynamic-import']
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
