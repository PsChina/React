# React
这个仓库用于记录我的react使用笔记，以及和大家分享。

## 从无到有搭建react项目环境
如果不想这么麻烦可以使用[脚手架](https://github.com/PsChina/React/tree/master/React%20%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%20create-react-app%20%E7%9A%84%E4%BD%BF%E7%94%A8)。

## 前言

react不像jquery一样能通过src直接使用它需要一系列的辅助工具的支持，我们在学习react之前需要初步了解 nodejs [webpack](https://github.com/PsChina/Vue/tree/master/webpack) 以及 babel。

另外还需要掌握 [es6](https://github.com/PsChina/Vue/tree/master/es6) jsx 函数式编程 等知识。

## 1、
安装[nodejs](https://nodejs.org/en/)。

## 2、

新建项目文件夹 例如这个仓库下的 demos/环境搭建。

## 3、

安装 react、react-dom 包。

```bash
npm i react react-dom -S
```

## 4、
新建react项目入口文件 app.js 。

新建项目主页 index.html 。

新建 webpack 配置文件 webpack.config.js 。

app.js
```js
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>Hello World!</div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))
```
在 html 中需要一个元素来作为 react dom 树的根节点，当然你也可以直接用 body 。

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

webpack.config.js
```js

var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = requre('path')

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
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.html$/, use: ['html-loader'] },
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
```
### 注意
webpack.config.js 中增加了 bable env react html-laoder style-loader css-laoder url-loader 等。

所以我们需要把这些依赖下来下来。

__下载 es6 转 es5、jsx 转 js 的工具:__

```bash
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react -D
```

__下载将 css 转 js 的工具:__

```bash
npm i css-loader style-loader -D
```

__下载将 html 引入 webpack 的工具:__

```bash
npm i html-loader -D
```

__下载装载文件的工具:__

```bash
npm i url-loader -D
```

__下载装载 html 的工具:__ (将bundle.js自动加入html。)

```bash
npm i html-webpack-plugin -D
```

__下载启动本地服务的工具:__

```bash
npm i webpack webpack-dev-server -D -g
```

__下载 webpack :__

```bash
npm i webpack -D
```

下载完别忘了 npm init 。

运行一下。

```bash
webpack-dev-server --mode development
```


## 5、
其他配置:

### sass
```
npm i sass-loader node-sass -D
```

webpack.config.js
```js

var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = requre('path')

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
            // ...
        ]
    },
    // ...
}
```
新建 app.scss。
```scss
$green : green;
.green {
    color: $green;
}
```

app.js
```js
import './app.scss' // 在app.js 引入sass
```

### 压缩js css

```js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // ...
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
    // ...
}
```
### 抽离公共 js 单独抽取 css 等等

请查看weboack [plugin内容](https://github.com/PsChina/Vue/blob/master/webpack/s-Day7%203-webpack-plugin.md)


### scripts

如果觉得每次运行项目都需要输入 webpack-dev-server --mode development 太麻烦的话可以在 package.json 中的 scripts 字段下添加cmd命令。

package.json
```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --mode development"
  },
}
```
就可以通过 `npm run dev` 来运行项目啦。

### 学习react语法

如果想进一步了解react语法可以点击链接 [react语法](https://github.com/PsChina/React/tree/master/demos)。