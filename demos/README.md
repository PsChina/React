这个文档是学习阮一峰老师的 [React demos](https://github.com/ruanyf/react-demos) 的学习笔记。

## 目录

1. [渲染 jsx](#demo01-hello-world)
1. [绑定事件和属性](#demo02-绑定事件和属性)
1. [组件的组合嵌套以及组件树](#demo03-组件的组合嵌套以及组件树)
1. [this.props](#demo04-props-属性)
1. [组件子节点](#demo05-react-组件子节点)
1. [props 验证](#demo06-props-验证-proptypes)
1. [操作 dom](#demo07-在-react-组件中查找一个-dom-节点)
1. [this.state](#demo08-react-组件状态)
1. [form表单](#demo09-表单)
## demo01: Hello World

react 的编写需要引入 react 以及 react-dom 这个两个 js 库。

react 是以一个一个组件的方式来编写应用的。

它定义组件的方式是：
```jsx
import React from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<Component />,document.getElementById('root'))
```
上面的 render 方法是必须实现的它的返回值是一个用"()"小括号括起来的 jsx 就是你要编写的 ui 。

你不需要使用 new 关键字来获取组件，像使用 html 标签一样使用它, 就像: `<Component/>` 。

__需要注意的是原生标签小写,自定义组件标签需首字母大写。__

运行效果:

![helloworld](https://github.com/PsChina/React/blob/master/images/helloworld.png)

### 什么是jsx
react 推崇所有的功能都用 js 来实现，包括 html css。

用 js 来表示 html 是可以办到的。

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

#### 扩展 
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


## demo02: 绑定事件和属性

如何在react组件上添加一个 click 事件，或者 class ？

__react中使用 {}  表达式在 jsx 中绑定 js 变量。__

绑定事件:
```jsx
import React from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<App />,document.getElementById('root'))
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
import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(<App />,document.getElementById('root'))
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

## demo03: 组件的组合嵌套以及组件树

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<App />,document.getElementById('root'))
```
以上代码我们自定义了4个自定义标签 Header 、 Body 、Footer 、App 。

其中 App 这个标签是通过嵌套 Header 、 Body 、Footer 三个自定义标签组合而成的。

效果如下:

![运行效果](https://github.com/PsChina/React/blob/master/images/ui01.png)

他们也就构成了组件树:

![组件树](https://github.com/PsChina/React/blob/master/images/image01.png)

## demo04: props 属性

### this.props.[attribute]

组件可以拥有属性,可以使用 `this.props.[attribute]` 来获取，

就像 `this.props.name` 来获取组件 `<HelloMessage name="John" />` 的 name 属性的值 John 一样。

需要注意的是 __props是不可变的__ 如果尝试修改它的值，react 会抛出一个错误。

### static defaultProps

为了防止出现 props 为空的情况 可以通过 `static defaultProps` 为 props 设置默认值。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<App />,document.getElementById('root'))
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

如果配置不成功可以使用 `HelloMessage.defaultProps` 代替 `static defaultProps` 。

例如:
```js
class HelloMessage extends React.Component{
    //...
}
HelloMessage.defaultProps = {
    name: 'world'
}
```

## demo05: react 组件子节点

React 使用 `this.props.children` 来获得组件的子节点。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<App />,document.getElementById('root'))
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

## demo06: props 验证 PropTypes

为了保证传递的参数的类型是确定的，以及参数是否为必传参数 React 提供了 PropTypes 供我们使用。

需要 `import PropTypes from 'prop-types`。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class MyTitle extends React.Component{
    static propTypes = {
        title: PropTypes.string.isRequired // 规定必须含有字符串类型的 title 属性。
    }
    constructor(){
        super()
    }
    render(){
        return (
            <h1>{this.props.title}</h1>
        )
    }
}

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <MyTitle title="标题"/>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))
```
如果传递了参数，并且类型是正确的效果如下:

![right](https://github.com/PsChina/React/blob/master/images/right.png)

如果传递了参数，但是类型不对，例如上面的 MyTitle 组件要求字符串但是传递的是数字 123 则会出现以下报错:
![type_error](https://github.com/PsChina/React/blob/master/images/type_error.png)

如果没有传递参数，则会出现以下报错:
![no_val](https://github.com/PsChina/React/blob/master/images/no_val.png)

如果参数是可选的可以将以上代码改写为:
```jsx
// 新特新写法: (class 内部)
static propTypes = {
    title: PropTypes.string // 可选属性 title 类型必须是 string 。
}
// 非新特新写法: (用过class静态属性添加)
MyTitle.propTypes = {
    title: PropTypes.string // 可选属性 title 类型必须是 string 。
}
```
### typelist

```js
MyComponent.propTypes = {
    Array: PropTypes.array,     // 数组
    Bool: PropTypes.bool,       // 布尔
    Func: PropTypes.func,       // 函数
    Number: PropTypes.number,   // 数值
    Object: PropTypes.object,   // 对象
    String: PropTypes.string,   // 字符串
    Symbol: PropTypes.symbol,   // symbol
    Node: PropTypes.node,       // 任何可被渲染的元素（包括数字、字符串、子元素或数组）。
    Element: PropTypes.element, // 一个 React 元素
    Message: PropTypes.instanceOf(Message), // 某个类的实例
    Enum: PropTypes.oneOf(['News', 'Photos']), // 某个特定值之一
    Union: PropTypes.oneOfType([ // 列举类型之一
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Message)
    ]),
    // 一个指定元素类型的数组
    ArrayOf: PropTypes.arrayOf(PropTypes.number),

    // 一个指定类型的对象
    ObjectOf: PropTypes.objectOf(PropTypes.number),

    // 一个指定属性及其类型的对象
    ObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),
    // 你也可以在任何 PropTypes 属性后面加上 `isRequired` 
    // 后缀，这样如果这个属性父组件没有提供时，会打印警告信息
    requiredFunc: PropTypes.func.isRequired,

    // 任意类型的数据
    requiredAny: PropTypes.any.isRequired,

    // 你也可以指定一个自定义验证器。它应该在验证失败时返回
    // 一个 Error 对象而不是 `console.warn` 或抛出异常。
    // 不过在 `oneOfType` 中它不起作用。
    customProp: function(props, propName, componentName) {
        if (!/matchme/.test(props[propName])) {
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        );
        }
    },

    // 不过你可以提供一个自定义的 `arrayOf` 或 `objectOf` 
    // 验证器，它应该在验证失败时返回一个 Error 对象。 它被用
    // 于验证数组或对象的每个值。验证器前两个参数的第一个是数组
    // 或对象本身，第二个是它们对应的键。
    customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
        if (!/matchme/.test(propValue[key])) {
        return new Error(
            'Invalid prop `' + propFullName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        );
        }
    })
}
// 看到这么丰富的props验证器是不是感觉有种想用 typscript 的冲动?
```

## demo07: 在 react 组件中查找一个 dom 节点

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class MyComponent  extends React.Component{
    constructor(){
        super()
    }
    handerClick(){
        this.refs.myInput.focus()
    }
    render(){
        return (
            <div>
                <div>
                    <input ref="myInput" type="text"/>
                </div> 
                <button onClick={this.handerClick.bind(this)}>Click here to focus the input</button>
            </div>
        )
    }
}

ReactDOM.render(<MyComponent />,document.getElementById('root'))
```
__如果想在 React 中操作 dom 可以事先在 jsx 内写上 ref 属性，然后可以在组件内部的任意位置通过 this.refs.[value] 来获取。__

上面的代码中 click 函数内使用了 this 关键字，注意在绑定 click 函数的时候使用`bind`函数绑定`this`。

这样点击按钮置之后就能操作 input 使得它获得焦点了。

效果:

![refs](https://github.com/PsChina/React/blob/master/images/refs.gif)

## demo08: react 组件状态

React 将组件视为状态机，同时用 `this.state` 保存组件状态，`this.setState()` 更新 `this.state` 和重新渲染组件。

#### 实例：(点赞按钮)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './iconfont/iconfont.css'

class LikeButton extends React.Component {
    constructor(){
        super()
        this.state = { // 初始化state
            like: false
        }
    }
    handleClick(){
        this.setState({
            like:!this.state.like
        })
    }
    render(){
        return (
            <div onClick={this.handleClick.bind(this)}>
              <span style={ { color: this.state.like ? 'red' : 'black' } } className="iconfont icon-zan"></span>
              <span>{ this.state.like ? '取消':'赞' }</span>
            </div>
        )
    }
}

class App  extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <LikeButton/>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))
```

运行效果:

![likebutton](https://github.com/PsChina/React/blob/master/images/likebutton.gif)

## demo09: 表单

根据 React 的设计哲学 `this.state` 描述组件的状态并且通过与用户交互改变它，

而 `this.props` 描述组件的属性并且是稳定的和不可变的。

所以，表单组件的 `value` 属性，如 `<input>` ，`<textarea>` 和 `<option>` ，不受任何用户输入的影响，如果想要访问或更新响应用户输入的值，可以使用 onChange 事件。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Input  extends React.Component{
    constructor(){
        super()
        this.state = {
            value: 'hello'
        }
    }
    handerChange(event){
        this.setState({
            value: event.target.value
        })
    }
    render(){
        const { value } = this.state
        return (
            <div>
                <input type="text" value={ value } onChange={this.handerChange.bind(this)} />
                <div>{value}</div>
            </div>
        )
    }
}

ReactDOM.render(<Input />,document.getElementById('root'))
```

运行效果:
![Input](https://github.com/PsChina/React/blob/master/images/ui09.gif)
