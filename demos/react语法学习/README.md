我用的是手动搭建的react环境练习react语法，如果你觉得麻烦可以用[脚手架](https://github.com/PsChina/React/tree/master/React%20%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%20create-react-app%20%E7%9A%84%E4%BD%BF%E7%94%A8)

# demo1

hello world

react 的编写需要引入 react 以及 react-dom 这个两个js库

react 是以一个一个组件的方式来编写应用的

它定义组件的方式是
```js
    class Component extends React.Component{
        constructor(){
            super()
        }
        render(){
            return (
                <div>Hello World!</div>
            )
        }
    }
```
上面的 render 方法是必须实现的它的返回值是 一个用"()"小括号括起来的 jsx 就是你要编写的ui

## 什么是jsx
react 推崇所有的都用js来实现包括 html css。

用js来表示html是可以办到的

举个例子:
```js
const HelloWorld = {
    nodeName:'div',
    // attrs:{
    //     className:'',
    // },
    // events:{
    //     onclick:()=>{}
    // },
    children:[
        {
            nodeName:'text',
            innrtHtml:'HelloWorld'
        }
    ]
}
```
但是这样表示会带来不便于书写和阅读的问题

解决办法就是jsx

__允许在js中书写类似html标签的语法__

但实质上jsx会被react的环境转换成 js 对象 也就是说 __jsx 是上面那种js对象的语法糖。__

## className 和 onClick

