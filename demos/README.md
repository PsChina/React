# react 语法

这个文档大部分是学习阮一峰老师的 [React demos](https://github.com/ruanyf/react-demos) 的学习笔记，还有一些[react 小书](http://huziketang.mangojuice.top/books/react/)的内容。

## 目录

1. [渲染 jsx](#demo01-hello-world)
1. [绑定事件和属性](#demo02-绑定事件和属性)
1. [组件的组合嵌套以及组件树](#demo03-组件的组合嵌套以及组件树)
1. [组件的属性 props](#demo04-props-属性)
1. [组件子节点](#demo05-react-组件子节点)
1. [验证 props](#demo06-props-验证-proptypes)
1. [操作 dom](#demo07-在-react-组件中查找一个-dom-节点)
1. [组件的状态 state](#demo08-react-组件状态)
1. [Form 表单](#demo09-表单)
1. [组件生命周期](#demo10-组件生命周期)
1. [Ajax](#demo11-ajax)
1. [组件间通讯之状态提升](#demo12-状态提升)
1. [纯函数组件与函数式编程](#纯函数组件与函数式编程)
1. [上下文 context](#demo14-context-上下文)
1. [入门技能检验项目](#project)

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

__需要注意的是原生标签小写,自定义组件标签需首字母大写__。

运行效果:

![helloworld](https://github.com/PsChina/React/blob/master/images/helloworld.png)

### 什么是jsx

react 推崇所有的功能都用 js 来实现，包括 html css。

用 js 来表示 html 是可以办到的。 ([虚拟 dom](https://github.com/PsChina/React/tree/master/vNode))

举个例子:

```js
const HelloWorld = {
    nodeName:'div',
//    attrs:{
//        className:'',
//    },
//    css:{
//    },
//    events:{
//        onclick:()=>{}
//    },
    childrens:[
        {
            nodeName:'text',
            attrs:{
                innerText:'HelloWorld',
            },
        }
    ]
}
```

但是这样表示会带来不便于书写和阅读的问题。

解决办法就是jsx。

__允许在js中书写类似html标签的语法。__ (所有原生标签 + react 组件)

但实质上 jsx 会被 react 的环境转换成 js 对象 也就是说 __jsx 是上面那种 js 对象的语法糖。__

__jsx只能存在一个根元素__。

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

__react中使用 {}  表达式在 jsx 中绑定 js 变量__。

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

__所有原生 dom 事件名改成驼峰写法即可绑定 dom 事件__。

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

__className 和 htmlFor 与 js 关键字 class、for 冲突需要特别定义 className 和 htmlFor 其他的 html 属性正常使用__。

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

```text
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

如果传递了参数，并且类型是正确的（ `<MyTitle title="标题" />` ）效果如下:

![right](https://github.com/PsChina/React/blob/master/images/right.png)

如果传递了参数，但是类型不对，例如上面的 MyTitle 组件要求字符串但是传递的是数字 123 （ `<MyTitle title={123} />` ） 则会出现以下报错:
![type_error](https://github.com/PsChina/React/blob/master/images/type_error.png)

```log
Warning: Failed prop type: Invalid prop `title` of type `number` supplied to `MyTitle`, expected `string`.
    in MyTitle (created by App)
    in App
```

`不成功的属性类型：无效的 number 属性 title 提供给了 MyTitle 预期是 string。`

如果没有传递参数（ `<MyTitle />` ），则会出现以下报错:
![no_val](https://github.com/PsChina/React/blob/master/images/no_val.png)

```log
Warning: Failed prop type: The prop `title` is marked as required in `MyTitle`, but its value is `undefined`.
    in MyTitle (created by App)
    in App
```

`不成功的属性类型：title 属性在 MyTitle 中被标记为必需的，但是它的值是 undefined 。`

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

__如果想在 React 中操作 dom 可以事先在 jsx 内写上 ref 属性，然后可以在组件内部的任意位置通过 this.refs.[value] 来获取__。

上面的代码中 click 函数内使用了 this 关键字，注意在绑定 click 函数的时候使用`bind`函数绑定`this`。

这样点击按钮置之后就能操作 input 使得它获得焦点了。

效果:

![refs](https://github.com/PsChina/React/blob/master/images/refs.gif)

## demo08: react 组件状态

React 将组件视为状态机，同时用 `this.state` 保存组件状态，`this.setState()` 更新 `this.state` 和重新渲染组件。

### 实例：(点赞按钮)

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

## demo10: 组件生命周期

组件的生命周期主要包括三部分：`插入dom`、`更新`、`从dom中卸载`，React 提供进入这几部分的钩子函数。 `will` 函数将会在某个动作开始前调用，`did` 函数将会在某个动作发生后调用。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
    constructor(){
        super()
        this.state = {
            opacity: 1
        }
    }
    componentDidMount(){
        let {opacity} = this.state
        this.timer = setInterval(()=>{
            opacity -= .5
            if(opacity<0.1){
                opacity = 1
            }
            this.setState({
                opacity,
            })
        },100)
    }
    render(){
        return (
            <div style={ {opacity:this.state.opacity} }>Hello {this.props.name}</div>
        )
    }
}


ReactDOM.render(<Hello name="World"/>,document.getElementById('root'))
```

以下是 React 组件生命周期函数的全部清单:

- **componentWillMount()**: [组件即将挂载] 仅触发一次，在初始渲染之前调用。对消息监听器进行连接的好地方，`this.setState` 在这里无法使用。

- **componentDidMount()**: [组件已经挂载] 仅触发一次，在初始渲染之后调用。可以在这里使用 React 提供的获取 dom 节点的函数。

- **componentWillUpdate(object nextProps, object nextState)**: [组将即将更新] 在组件的更新被发送到 dom 之后触发。

- **componentDidUpdate(object prevProps, object prevState)**: [组件已经更新] 在组件的更新被刷新到 dom 之后立即调用。初始渲染不会触发该方法。当组件已经更新时可以使用该函数作为一个操作 dom 的机会。

- **componentWillUnmount()**: [组件即将卸载] 在组件从 dom 卸载之前立即触发，消除消息监听器，或者做一般性的清理的好地方。

- **componentWillReceiveProps(object nextProps)**: [组件将要接收属性] 当一个组件接收到新的属性值时触发，你也许想要根据不同的`nextProps.[prop]` 做 `this.setState` 。

- **shouldComponentUpdate(object nextProps, object nextState)**: [组件按需更新] 在接收新的属性值 `props` 或者状态 `states` 时触发。如果你知道这是一个不必要的更新你可以 `return false` 否则 `return true`。

## demo11: Ajax

如何从服务器或者一个接口提供者获取组件数据？答案是使用 Ajax 在 `componentDidMount` 的事件处理程序中获取数据。当服务器响应到达时，使用 `this.setState()` 存储数据，以触发UI的重新渲染。

axios 是一个代替$.ajax的库。

```bash
npm i axios -S
```

以下功能是一个通过输入作者名称和仓库名称查询仓库ssh地址的demo

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class AjaxDemo extends React.Component {
    constructor(){
        super()
        this.state = { //默认state
            ssh_url: '',
            author: 'PsChina',
            repositorie: 'React'
        }
    }
    setAuthor(event){
        this.setState({
            author:event.target.value
        })
    }
    setRepositorieName(event){
        this.setState({
            repositorie:event.target.value
        })
    }
    getAddressData() {
        axios({
            url: `${this.props.url}/${this.state.author}/${this.state.repositorie}`,
            method: 'GET'
        }).then(res=>{
            const {ssh_url} = res.data
            this.setState({
                ssh_url
            })
        })
    }
    componentDidMount() {
        this.getAddressData()
    }
    render(){
        return (
            <div>
                <div>输入作者和仓库名查询仓库ssh地址:</div>
                <input type="text" placeholder="作者" value={this.state.author} onChange={this.setAuthor.bind(this)}/>
                <input type="text" placeholder="仓库名" value={this.state.repositorie} onChange={this.setRepositorieName.bind(this)}/>
                <button onClick={this.getAddressData.bind(this)}>查询</button>
                <div>结果:{this.state.ssh_url}</div>
            </div>
        )
    }
}

ReactDOM.render(<AjaxDemo url="https://api.github.com/repos" />, document.getElementById('root'))
```

## demo12: 状态提升

在react中是单向数据流的设计， 即只有父组件可以传递数据给子组件，而没有子组件传递数据给父组件的概念。 以正确的技术说明，是拥有者组件可以设置被拥有者组件中的资料，也就是主人与仆人的关系。

那么子组件要传递数据给父组件该如何沟通呢?

换句话说就是， react 如何将子组件的值暴露让父组件获取到?

可以采用一种迂回的方法， 在父组件中设置一个方法(函数)， 将其通过 props 传递给子组件， 然后在子组件中更新 state 的状态，并调用父组件中传过来的方法， 将 state 数据作为参数传递给父组件。 这样， 改变父组件的状态，从而改变受父组件控制的所有子组件的状态。 这就是状态提升的概念。 用官方的原话就是: “共享 state(状态) 是通过将其移动到需要它的组件的最接近的共同祖先组件来实现的。 这被称为 ‘状态提升(Lifting State Up)’。”

与 demo09 类似，不过 demo09 过于简单。

例如:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Input extends React.Component {
    constructor(){
        super()
    }
    handerChange(event){ // onchange 事件会触发 handerChange 回调。
        this.props.updateMessage(event.target.value) // 回调函数内部调用父组件传递过来的函数更新 message 。
    }
    render(){
        return (
            <input value={this.props.message} onChange={this.handerChange.bind(this)}/>
        )
    }
}

class View extends React.Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>Input value:{this.props.message}</div>
        )
    }
}

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            message: 'Hello' // 共享状态 message
        }
    }
    changeMessage(message){ // 定义修改 message 的方法
        this.setState({
            message
        })
    }
    render(){
        // 将 message 分别传递给 input 和 view 两个子组件，将修改 message 的函数传递给 input 。
        return (
            <div>
                <Input message={this.state.message} updateMessage={this.changeMessage.bind(this)}/>
                <View message={this.state.message}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

运行效果:

![状态提升](https://github.com/PsChina/React/blob/master/images/ui12.gif)

### 相关知识

由于 `this.props` 是不可变的所以不能直接修改 `props`。

也就是说必须通过 `this.setState` 来修改父组件的 `state`。

这涉及到两种修改数据的两种方式 `直接修改` `替换修改` , React 采用的是 `替换修改`。

直接修改数据:

```js
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

替换修改数据:

```js
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// 或者使用最新的对象分隔符语法，你可以这么写：
// var newPlayer = {...player, score: 2};
```

两种方式的结果是一样的，但是第二种并没有改变之前已有的数据。通过这样的方式，我们可以得到以下几点好处：

#### 很轻松地实现 撤销/重做以及时间旅行

运用不可变性原则可以让我们很容易实现一些复杂的功能。例如我们在这个教程中会实现的，通过点击列表中的某一项直接返回当某一步棋时的状态。不改变已有的数据内容可以让我们在需要的时候随时切换回历史数据。

#### 记录变化

在我们直接修改一个对象的内容之后，是很难判断它哪里发生了改变的。我们想要判断一个对象的改变，必须拿当前的对象和改变之前的对象相互比较，遍历整个对象树，比较每一个值，这样的操作复杂度是非常高的。

而运用不可变性原则之后则要轻松得多。因为我们每次都是返回一个新的对象，所以只要判断这个对象被替换了，那么其中数据肯定是改变了的。

在 React 当中判定何时重新渲染
运用不可变性原则给 React 带来最大的好处是，既然我们现在可以很方便地判断对象数据是否发生改变了，那么也就很好决定何时根据数据的改变重新渲染组件。尤其是当我们编写的都属于 纯组件 pure components 的时候，这种好处的效果更为明显。

## 纯函数组件与函数式编程

React 的核心思想 - View 是 state 的输出。

```js
View = f(state)
```

上式中， `f` 表示对应关系。只要 State 发生变化，对应的 View 也会随之变化。

类似 y = f(x)

x 是输入 y 是输出

而 React 根据不同的 state 组件所展示的状态也不一样。

__React 的本质是将图形界面（GUI）函数化__。

这就需要用到纯函数组件。

有个很好用的工具箭头函数能够简洁的表达：

```js
const double = input => input*2

double(2)
// 结果是 4
```

而 react 的纯函数组件就是这样的：

把 `state` 转换成 `UI`

```js
const Title = props => <h1>{props.text}</h1>
```

箭头函数 `const f = x => y` 可以理解为 x 经过函数 f 的处理得到了 y 。

```js
const f = x => y
```

它的更加常见的形式是：

```js
const Component = props => {
    // Do something.
    return (
        // Some jsx.
    )
}
```

`Redux 要求 UI 的渲染组件都是纯组件，即不包含任何状态（this.state）的组件。`

所以学会它能帮我们更好的使用 react 。

用起来的效果是这样的

```jsx
import React from 'react'
import ReactDOM from 'react-dom'


const Title = props => <h1>{props.text}</h1>

const Body = props => <div>{ React.Children.map(props.children,item=>item)}</div>

class App extends React.Component{
    constructor(){
        super()
        this.state={
            title:"纯函数组件",
            defaultText:'随便写点什么吧'
        }
    }
    render(){
        return (
            <div>
                <Title text={this.state.title}/>
                <Body>
                    <div>{this.state.defaultText}</div>
                </Body>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))
```

效果:

![purefunctioncomponent](https://github.com/PsChina/React/blob/master/images/purefunctioncomponent.png)

[函数式编程-百度百科](https://baike.baidu.com/item/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/4035031?fr=aladdin)

# demo14 context 上下文

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

## 何时使用 Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：


demo14 使用 [create-react-app](https://github.com/facebook/create-react-app#readme) 生成。

App.js
```javascript
// 这里使用 react hooks 请先阅读 hooks 相关的知识。
import React,{ useState } from 'react';
import './App.css';
import Child from './ChildComponent';
import { themes, ThemeContext } from './theme-context';

function App() {
  const [appTheme, setAppTheme] = useState(themes.dark);
  return (
    <ThemeContext.Provider value={{
      appTheme, // 默认皮肤
      toggleTheme(){ // 实现换肤功能
        setAppTheme(appTheme === themes.dark ? themes.light : themes.dark);
      }
    }} >
      <div className="App">
        <div style={{ background: appTheme.background,color: appTheme.foreground }}>222</div>
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```

使用 context, 我们可以避免通过中间元素传递 props：

ChildComponent.jsx
```javascript
import React from 'react';
import { ThemeContext } from './theme-context';

export default function Child(props) {
    return (
            <ThemeContext.Consumer>
                { ({appTheme,toggleTheme})=>(<div>
                    <div style={{background: appTheme.background, color: appTheme.foreground}}>child component</div>
                    <button onClick={toggleTheme}>
                        changeTheme
                    </button>                      
                </div>) }
            </ThemeContext.Consumer>
            )
}
```

下面是 theme-context 的实现

theme-context.js
```javascript
import React from 'react';

export const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

export const ThemeContext = React.createContext({
    theme:themes.light,
    toggleTheme(){} // 这里不需要写具体实现只需要提供默认值
});
```

[官方教程](https://zh-hans.reactjs.org/docs/context.html#gatsby-focus-wrapper)


## project

`增` `删` `改` `查` 是我们常见的需求。

现在我们用学到的 react 知识实现一个增删改查的功能。

[在线浏览项目效果](https://pschina.github.io/#/react/homework)

[项目源码](https://github.com/PsChina/React/tree/master/demos/exercise-project/App)

尚未完成表单验证以及css样式所以有一些不足请谅解。

```js



























```

end
