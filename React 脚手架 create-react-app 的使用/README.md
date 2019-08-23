# react-create-app

它是一个 react 脚手架工具,类似Vue的 vue-cli

虽然官网 npm 上的说明不足,但是 guthub 上还是说的挺明白的。

附上地址： https://github.com/facebook/create-react-app

## 一、全局安装

npm i create-react-app -g 

## 二、查看帮助

create-react-app --h

他会告诉你如何使用命令行创建 reactapp 。

以下就是它输出的结果:

Please specify the project directory:
  create-react-app <project-directory>

For example:
  create-react-app my-react-app

Run create-react-app --help to see all options.

## 三、创建app

create-react-app my-app

这样就创建好了一个未安装 node_modules 的 app 。

## 四、安装依赖

```bash
cd ./my-app
```
使用 
```bash
npm i 
```

来安装依赖。

在中国这些包的安装会异常耗时，有时甚至会失败，原因是因为npm访问的是外国服务器经过了多次转发，以及需要经过防火长城(Great Firewall of China)的过滤。

解决方案有很多，提供一个 nrm 给大家用。

[nrm](https://github.com/PsChina/angularJS/blob/master/nrm/nrm.md) 是一个源管理工具

__到这一步基本环境已经搭建完成可以通过 npm start 打开项目__

## 五、打开 webpack 配置项

安装完依赖以后我们会发现它与 vue-cli 不一样看不到任何与 webpack 相关的配置文件

查阅资料后发现 webpack 的配置项需要命令行打开 

细心的朋友可能已经在 package.json 内看到了 4 个命令  

```json
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test --env=jsdom",
"eject": "react-scripts eject"
```
前三个分别是运行在开发环境、发布前打包和测试。

第四个就是用于打开 webpack 配置项的命令。

所以我们运行

```bash
npm run eject
```

如果遇到报错

Remove untracked files, stash or commit any changes, and try again.

解决方案是：

```bash
git add .
git commit -am "Save before ejecting"
```
然后再次尝试 npm run eject 。

成功以后会多一个 config 文件夹

其中 

env.js 用于获取项目运行环境。

paths.js 用于配置路径。

polyfills.js 用于补足浏览器内缺少的 Promise 和 Object.assign 。

webpack.config.dev.js 用于配置开发环境。

webpack.config.prod.js 用于配置如何打包发布。

webpackDevServer.config 用于配置服务。

## 六、配置 eslint

我们可以通过 airbnb 来快速为 react 项目配置 eslint 规范。

```bash
npm install --save-dev eslint-config-airbnb 
```

以上命令安装了已经包括了以下三个插件：
```
eslint-plugin-import
eslint-plugin-react 
eslint-plugin-jsx-a11y
```

安装好所需的包以后我们还需要新建 .eslintrc

.eslintrc

```json
{
    "extends": "airbnb",
}
```

在 .eslintrc 中添加 airbnb 约束.

有几个不合理的地方我们可以修改一下

比如:

1 airbnb 默认必须使用 function 定义无状态组件 代替所有组件，这显然是不合理的。

所以我们在自己的规则中关闭这个规则:

"react/prefer-stateless-function":"off",

2 airbnb 默认不能在 .js 文件中写 jsx 。 我们需要关闭。

"react/jsx-filename-extension":"off",

3 airbnb 默认不能使用为定义的变量，我们改为警告。

"no-undef":"warn"


所以最后 .eslintrc 的样子是:

.eslintrc
```json
{
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension":"off",
        "react/prefer-stateless-function":"off",
        "no-undef":"warn"
    }
}
```

eslint 提示级别

0 "off" 关闭

1 "warn" 警告

2 "error" 错误

## 七、更改打包路径

很简单的找到

webpack.config.prod.js

根据 webpack 的基本知识找到 output 发现它引用了 paths.js 内的 appBuild 属性。 默认值是 "build" 。

修改默认值即可。

## 八、设置 proxy 代理

找到

webpackDevServer.config.js

添加 proxy 字段格式如下：
```js
{
'/rest/bas/user/login': {
target: 'http://139.241.043.218:40000',
},
'/rest/ams/*':{
target: 'http://139.241.043.218:40004'
},
'/rest/tpms/package/pack':{
target: 'http://139.241.043.218:40004'
}
```

## 九、设置 mock 数据


在 src 下新建 mock 文件夹并且新建 mock.js 文件。

```bash
npm i mockjs axios-mock-adapter --save-dev
npm i axios --save
```

### 例如:
mock.js
```js
import Mock from "mockjs";
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const data = []

for( let i = 0 ; i < 200 ; i++ ) {
    data.push(
            {
                time:new Date('2018-5-1 8:30').getTime()+1000*60*60*24*i,
                customerName:Mock.Random.cname(),
                customerType:Mock.Random.integer( 0, 1 ),
                paymentContent:Mock.Random.cparagraph(1),
                orderAmount:Mock.Random.integer(1000,10000),
                paymentType:Mock.Random.integer( 0, 1 ),
                note:'备注',
                state:Mock.Random.integer( 0, 1 ),
                id:i       
            } 
        )
}

mock.onAny().reply(function(config){
    if( config.method.toUpperCase() === 'GET' ){
        const path = config.url.split('?')[0]
        switch(path){
            case '/aps/rest/orderlist':
            return [200,orderlist];
            case '/aps/rest/confirm/order':
            return [200,{success:true}];
            default :
            return [200,'ok'];
        }
    }else if( config.method.toUpperCase() === 'PATCH' ){
        const path = config.url.split('?')[0]
        switch(path){
            case '/aps/rest/confirm/order':
            return [200,{success:Mock.Random.boolean()}];
            default :
            return [200,{msg:'ok'}];
            case '/aps/rest/confirm/orders':
            return [200,{success:Mock.Random.boolean()}]
        }
    }
})
```

然后在 index.js 将该文件 import 即可。


## 十、 网络请求的封装
```bash
npm i antd utility pako --save
```
当然上面可能集成了你不需要的 ui 库 antd 。你可以去掉 因为他在这里仅仅用来，提示网络错误。

入口文件是 request.js 。

核心方法是 request 。

请查看 [http](https://github.com/PsChina/React/tree/master/React%20%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%20create-react-app%20%E7%9A%84%E4%BD%BF%E7%94%A8/http) 。


## 十一、 i18n与国际化
