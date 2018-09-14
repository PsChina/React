我用的是手动搭建的react环境练习react语法，如果你觉得麻烦可以用[脚手架](https://github.com/PsChina/React/tree/master/React%20%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%20create-react-app%20%E7%9A%84%E4%BD%BF%E7%94%A8)

# demo1

hello world

react 的编写需要引入 react 以及 react-dom 这个两个js库

react 是以一个一个组件的方式来编写应用的

它定义组件的方式是
```jsx
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
react 推崇所有的功能都用js来实现包括 html css。

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

__允许在js中书写类似html标签的语法__ (所有原生标签 + react 组件)

但实质上jsx会被react的环境转换成 js 对象 也就是说 __jsx 是上面那种js对象的语法糖。__

__jsx只能存在一个根元素__

以下写法是不合法的
```jsx
        render(){
            return (
                <div>Hello World!</div>
                <div>I'm shanshan</div>
            )
        }
```
正确写法是
```jsx
        render(){
            return (
                <div>
                    <div>Hello World!</div>
                    <div>I'm shanshan</div>
                </div>
            )
        }
```

### 扩展 

如果理解了 jsx 其实就是一个js对象那么上面的代码可以这样写

下面这个例子涉及到 {} 表达式稍后讲解
```js
const HelloWorld = <div>Hello World!</div>

    render(){
        return (
            <div>
                { HelloWorld }
            </div>
        )
    }
```


# demo2
dom 事件 和 属性

如何在react组件上添加一个 click 事件，或者 class ？

__react中使用 {}  表达式在 jsx 中绑定 js 变量__

绑定事件:
```jsx
class App extends React.Component{
    constructor(){
        super()
    }
    click(){
        console.log('on click')
    }
    render(){
        return (
            <div onClick={this.click}>Hello World!</div>
        )
    }
}
```
用以上这种驼峰方式绑定dom事件

__所有原生dom事件名改成驼峰写法即可绑定dom事件__

react内部对事件对象进行了封装是标准的事件对象不用考虑浏览器兼容也不会有api不一致的情况

例如

```jsx
<input onFocus={()=>{console.log('on focus.')}} />
```

绑定属性:

app.css
```css
.orange{
    color: 'orange'
}
```

app.jsx
```jsx
import './app.css'
const myClass = 'orange'

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div className={myClass}>Hello World!</div>
        )
    }
}
```
除了 className 和 htmlFor 与 js 关键字 class、for 冲突需要特别定义的 className 和 htmlFor 来代替之外其他的html属性正常使用。

例如 style

```jsx
class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div style={ {color: 'orange'} }>Hello World!</div>
        )
    }
}
```

# demo3

组件的组合嵌套以及组件树

```jsx
// 定义头部组件
class Header extends React.Component{
    constructor() {
        super()
    }
    render(){
        return (
            <h1>Header</h1>
        )
    }
}
// 定义主要内容
class Body extends React.Component{
    constructor() {
        super()
    }
    render(){
        return (
            <div>React学习笔记</div>
        )
    }
}
// 定义脚部组件
class Footer extends React.Component{
    constructor() {
        super()
    }
    render(){
        return (
            <div>Footer</div>
        )
    }
}
// 定义根组件
class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))
```

