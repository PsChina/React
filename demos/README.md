我用的是手动搭建的react环境练习react语法，如果你觉得麻烦可以用[脚手架](https://github.com/PsChina/React/tree/master/React%20%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%20create-react-app%20%E7%9A%84%E4%BD%BF%E7%94%A8)。

# demo01: Hello World

react 的编写需要引入 react 以及 react-dom 这个两个js库。

react 是以一个一个组件的方式来编写应用的。

它定义组件的方式是：
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
上面的 render 方法是必须实现的它的返回值是一个用"()"小括号括起来的 jsx 就是你要编写的 ui 。

你不需要使用 new 关键字来获取组件，像使用 html 标签一样使用它, 就像: `<Component/>` 。

__需要注意的是原生标签小写,自定义组件标签需首字母大写。__

运行效果:

![helloworld](https://github.com/PsChina/React/blob/master/images/helloworld.png)

## 什么是jsx
react 推崇所有的功能都用js来实现包括 html css。

用js来表示html是可以办到的。

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
但是这样表示会带来不便于书写和阅读的问题。

解决办法就是jsx。

__允许在js中书写类似html标签的语法。__ (所有原生标签 + react 组件)

但实质上 jsx 会被 react 的环境转换成 js 对象 也就是说 __jsx 是上面那种 js 对象的语法糖。__

__jsx只能存在一个根元素。__

以下写法是不合法的：
```jsx
        render(){
            return (
                <div>Hello World!</div>
                <div>I'm shanshan</div>
            )
        }
```
正确写法是：
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
下面这个例子使用了 {} 表达式它用于在 jsx 中绑定 js 对象。

如果理解了 jsx 其实就是一个 js 对象那么上面的代码可以这样写：
```js
const HelloWorld = <div>Hello World!</div>

render(){
    return (
        <div>
            { HelloWorld }
        </div>
    )
}

// 如果 js 变量是一个数组 jsx 将合并所有的数组成员。
const arr = [
    <div>Hello</div>,
    <div>World</div>,
]

render(){
    return (
        <div>
            { arr }
        </div>
    )
}

// 等价于：

render(){
    return (
        <div>
            <div>Hello</div>
            <div>World</div>
        </div>
    )
}

// 这意味着可以使用map来使得非 jsx 数据变成 jsx 数据。

const myData = ['hello', 'world']

render(){
    return (
        <div>
            {myData.map( item=><div>{item}</div> )}
        </div>
    )
}

```


# demo02: 绑定事件和属性

如何在react组件上添加一个 click 事件，或者 class ？

__react中使用 {}  表达式在 jsx 中绑定 js 变量。__

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
用以上这种驼峰方式绑定 dom 事件。

__所有原生 dom 事件名改成驼峰写法即可绑定 dom 事件。__

react 内部对事件对象进行了封装是标准的事件对象不用考虑浏览器兼容也不会有 api 不一致的情况。

例如：

```jsx
<input onFocus={()=>{console.log('on focus.')}} />
```

点击 input 框的效果:
![onfocus](https://github.com/PsChina/React/blob/master/images/onfocus.png)

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
__className 和 htmlFor 与 js 关键字 class、for 冲突需要特别定义 className 和 htmlFor 其他的 html 属性正常使用。__

例如 style。

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

运行效果:

![orangeHelloWorld](https://github.com/PsChina/React/blob/master/images/orangeHelloWorld.png)

# demo03: 组件的组合嵌套以及组件树

```jsx
// 定义头部组件。
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
// 定义主要内容。
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
// 定义脚部组件。
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
// 定义根组件。
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
以上代码我们自定义了4个自定义标签 Header 、 Body 、Footer 、App 。

其中 App 这个标签是通过嵌套 Header 、 Body 、Footer 三个自定义标签组合而成的。

效果如下:

![运行效果](https://github.com/PsChina/React/blob/master/images/ui01.png)

他们也就构成了组件树:

![组件树](https://github.com/PsChina/React/blob/master/images/image01.png)

# demo04: props 属性

## this.props.[attribute]

组件可以拥有属性,可以使用 `this.props.[attribute]` 来获取，

就像 `this.props.name` 来获取组件 `<HelloMessage name="John" />` 的 name 属性的值 John 一样。

需要注意的是 __props是不可变的__ 如果尝试修改它的值，react 会抛出一个错误。

## static defaultProps

为了防止出现 props 为空的情况 可以通过 `static defaultProps` 为 props 设置默认值。

```jsx

class HelloMessage extends React.Component {
    static defaultProps = {
        name: 'world'
    }
    constructor(){
        super()
    }
    render(){
        return (
            <div>Hello {this.props.name}!</div>
        )
    }
}

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <HelloMessage />
                <HelloMessage name="Pan shan shan"/>
            </div>
        )
    }
}
```

上面的代码中为 name 添加默认值的代码:
```js
    static defaultProps = {
        name: 'world'
    }
```

运行效果: （__未传递值得组件会显示默认值，传递了值的组件会显示传递的props__）
![Hello Pan shanshan!](https://github.com/PsChina/React/blob/master/images/ui02.png)

__注意:__

静态属性是 js 的新特新需要安装 `@babel/plugin-proposal-class-properties`。
```bash
npm i @babel/plugin-proposal-class-properties -D
```

并且配置 webpack.config.js :

![config](https://github.com/PsChina/React/blob/master/images/static_plugins.png)

# demo05: react 子节点 this.props.children

React 使用 `this.props.children` 来获得组件的子节点。

```jsx
class NodeList extends React.Component{
    constructor(){
        super()
    }
    render(){
        console.log(this.props.children)
        return (
            <ul>
                { React.Children.map(this.props.children,item=><li>{item}</li>) }
            </ul>
        )
    }
}
class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <NodeList>
                <span>Hello</span>
                <span>world</span>
            </NodeList>
        )
    }
}

```

### React.Children.map

React 提供了一个 `React.Children.map` 函数来专门处理 `this.props.children`。

它的功能和 `Array.prototype.map` 几乎一样。

```
如果 children 是一个嵌套的对象或数组，它将被遍历。如果 children 是 null 或 undefined ，返回 null 或 undefined 而不是一个空数组。
```

为什么不直接使用 map ? 像这样  `this.props.children.map(item=><li>{item}</li>)`。

虽然这样写比较简洁但是由于 `this.props.children` 是一个不透明数据，也就是说你不知道它是不是数组，它可能是 `null` 或者 `undefined` 。

所以使用 `React.Children.map` 能确保程序的正常运行

运行效果:

![this.props.children](https://github.com/PsChina/React/blob/master/images/ui03.png)

# demo06: 