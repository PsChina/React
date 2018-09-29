## React-router

React-router 用于管理众多的用户界面。

需要下载 react-router-dom

```bash
npm i react-router-dom -S
```
## 目录

1. [一级路由](#demo01-非嵌套路由)
1. [HashRouter](#hashrouter)
1. [Route](#route)
1. [Switch](#switch)
1. [Link](#link)
1. [多级嵌套](#demo02-嵌套路由)
1. [Link 标签选中状态](#demo03-选中状态)
1. [路由传参](#demo04-路由传参)
1. [编程式导航](#demo05-编程式导航)

## demo01 非嵌套路由:
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link } from 'react-router-dom'

const MainPage = ()=><div>主页</div>

const Page1 = ()=><div>页面一</div>

const Page2 = ()=><div>页面二</div>

const Page = props=><div>{props.content}</div>

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <HashRouter>
                <div>
                    <div>
                        <ul>
                            <li><Link to="/page1">page1</Link></li>
                            <li><Link to="/page2">page2</Link></li>
                            <li><Link to="/other">other</Link></li>
                        </ul>  
                    </div>
                    <Switch>
                        <Route exact path="/" component={MainPage}></Route>
                        <Route path="/page1" component={Page1}></Route>
                        <Route path="/page2" component={Page2}></Route>
                        <Route render={ ()=><Page content='Not Found.'/> }></Route>
                    </Switch>                    
                </div>
            </HashRouter>       
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))
```

![效果](https://github.com/PsChina/React/blob/master/images/router01.gif)

### HashRouter

对 Router 的一个封装

用 #/home #/page 等形式来切换路由 与之对应的是 `BrowserRouter`


### Route

Route 是路由的一个原材料，它是控制路径对应显示的组件。我们经常用的是 exact 、 path 以及 component 属性。

#### exact 

精确匹配 

例如：

```jsx
<Route exact path="/" component={Home}>
```
当且仅当路径为`/`的时候打开 Home 页面

#### path

路由路径

#### component

路由组件

### Switch
被 Switch 包裹的路由只能显示一个

假如有以下代码 
```jsx
<Switch>
    <Route path="/" component={Page1}/>
    <Route path="/page2" component={Page2}/>
</Switch>
```
当浏览器的 path 为 `/page2` 的时候

页面一和页面二都会被匹配但是 Switch 会选择第一个被匹配的所以页面显示 Page1

如果不用 Switch 包裹则显示 Page1 和 Page2

如果想 path 为 `/page2` 的时候显示 Page2 可以加上 `exact`

```jsx
<Switch>
    <Route exact path="/" component={Page1}/>
    <Route exact path="/page2" component={Page2}/>
</Switch>
```

### Link

基本用法

```jsx
<Link to={`/user`}>
</Link>
```

经过 Link 组件的处理后：

```html
<a href="#/user">
</a>
```
它与 a 链接的区别是 React 的 Link 标签不会产生不必要的刷新。


### react-router-dom 与 react-router 的区别

有时候我们看到如下的写法：

写法1:
```js
import {Swtich, Route, Router, HashHistory, Link} from 'react-router-dom';
```

写法2:
```js
import {Switch, Route, Router} from 'react-router';
import {HashHistory, Link} from 'react-router-dom';
```

`react-router` : 实现了路由的核心功能
`react-router-dom` : 基于 `react-router` ，加入了在浏览器运行环境下的一些功能，例如：Link 组件，会渲染一个 a 标签，Link 组件源码 a 标签行; BrowserRouter 和 HashRouter 组件，前者使用 pushState 和 popState 事件构建路由，后者使用 window.location.hash 和 hashchange 事件构建路由。

`react-router-native`: 基于 `react-router`，类似 `react-router-dom`，加入了 `react-native` 运行环境下的一些功能。

### HashRouter 与 BrowserRouter

HashRouter 和 BrowserRouter 是对 Router 的封装，传入 Router 的 history 对象不同。

两者分别对应 hashHistory 和 browserHistory 。

官方推荐使用 browserHistory

使用 hashHistory ,浏览器的 url 是这样的：/#/user/liuna?_k=adseis

使用 browserHistory ,浏览器的 url 是这样的：/user/liuna

这样看起来当然是 browerHistory 更好一些，但是它需要 server 端支持。

使用 hashHistory 时，因为有 # 的存在，浏览器不会发送 request， react-router 自己根据 url 去 render 相应的模块。

使用 browserHistory 时，从 / 到 /user/liuna， 浏览器会向 server 发送 request，所以 server 要做特殊请求，比如用的 express 的话，你需要 handle 所有的路由 app.get('*', (req, res) => { ... })，使用了 nginx 的话，nginx 也要做相应的配置。

## demo02 嵌套路由

这个 demo 演示的是二级路由，掌握了它，就能实现任意级的路由嵌套。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link } from 'react-router-dom'

const MainPage = ()=><div>主页</div>

const Page1 = ()=><div>页面一</div>

const Page2A = ()=><div>AAAA</div>

const Page2B = ()=><div>BBBB</div>

const Page2 = props=>
<div>
    页面二
    <ul>
        <li><Link to={`${props.match.url}/a`}>a</Link></li>
        <li><Link to={`${props.match.url}/b`}>b</Link></li>
    </ul>    
    <Switch>
        <Route exact path={`${props.match.url}/a`} component={Page2A}/>
        <Route exact path={`${props.match.url}/b`} component={Page2B}/>
    </Switch>
</div>

const Page = props=><div>{props.content}</div>

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <HashRouter>
                <div>
                    <div>
                        <ul>
                            <li><Link to="/page1">page1</Link></li>
                            <li><Link to="/page2">page2</Link></li>
                            <li><Link to="/other">other</Link></li>
                        </ul>  
                    </div>
                    <Switch>
                        <Route exact path="/" component={MainPage}></Route>
                        <Route path="/page1" component={Page1}></Route>
                        <Route path="/page2" component={Page2}></Route>
                        <Route render={ ()=><Page content='Not Found.'/> }></Route>
                    </Switch>                    
                </div>
            </HashRouter>       
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))
```

分解一下

一级路由部分
```jsx
<Switch>
    <Route exact path="/" component={MainPage}></Route>
    <Route path="/page1" component={Page1}></Route>
    <Route path="/page2" component={Page2}></Route> // 这个 Page2 内含有二级页面
    <Route render={ ()=><Page content='Not Found.'/> }></Route>
</Switch>   
```

二级路由部分

```jsx
// 定义第一个二级子页面
const Page2A = ()=><div>AAAA</div>
// 定义第二个二级子页面
const Page2B = ()=><div>BBBB</div>

// 定义 Page2
const Page2 = props=>
<div>
    页面二
    <ul>
        <li><Link to={`${props.match.url}/a`}>a</Link></li> // 定义按钮
        <li><Link to={`${props.match.url}/b`}>b</Link></li> // 定义按钮
    </ul>    
    <Switch> // 通过类似以及路由的形式 Switch 包裹多个二级页面
        <Route exact path={`${props.match.url}/a`} component={Page2A}/>
        <Route exact path={`${props.match.url}/b`} component={Page2B}/>
    </Switch>
</div>
```

### props.match.url

我们可以通过 `props.match.url` 获取对于当前子路由的相对路径，以便编写动态路由。

如果没有编写动态路由的需求可以用固定的常量来代替。

![效果](https://github.com/PsChina/React/blob/master/images/router02.gif)

## demo03 选中状态

### activeClassName

可以通过 `<NavLink/>` 的 `activeClassName` 属性给 link 标签添加选中样式。

不再 import `Link` ， 替换为 `NavLink` ， 如果不习惯可以用过 `as` 改名: `NavLink as Link` 。

```css
.active{
    color: green;
}
```

使用样例:
```jsx
import { NavLink as Link } from 'react-router-dom'

<Link activeClassName="active" to="/page1">page1</Link>
```

### activeStyle

如果不想写类名想用行内样式代替可以使用 `activeStyle`


## demo04 路由传参

Link 标签的 `to` 属性不仅仅可以是一个字符串，它还可以是一个对象，可以很方便的传递参数：

```jsx
import React, { Component } from 'react'

import { NavLink as Link } from 'react-router-dom'

class Page1 extends Component{
    constructor(){
        super()
    }
    componentWillMount(){ //要使用生命周期函数的话就不能定义纯函数组件。
        console.log('路由将要挂载参数是:',this.props.location)
    }
    render(){
        return <div>页面一</div>
    }
}

const Page2 = ()=><div>页面二</div>

// render 函数返回值(部分)
<ul>
    <li><Link activeClassName="active" to={{pathname:'/page1',search:'?keyword=name',hash:'#react-lesson',state:{like:true}}}>page1</Link></li>
    <li><Link activeClassName="active" to="/page2">page2</Link></li>
</ul>  
```

传递参数: 通过 `Link` 标签中中的 `to={{pathname:'/page1',search:'?keyword=name',hash:'#react-lesson',state:{like:true}}}` 传递参数。

获取参数: 通过 `componentWillMount` 中的 `this.props.location` 。

react-router4.0 以后就去掉了 onEnter 和 onLeave 这样的路由钩子，可以用 `componentWillMount` 和 `componentWillUnmount` 来代替。

## demo05 编程式导航

如何通过一个回调函数来触发导航呢？ 

答案是使用 `history.push(pathName,state)`

__第一个参数是路由的 pathname__

__第二个参数是路由的 state 可当做路由传参的接口__

如果使用的是 HashRouter 那么需要 
```js
import createHashHistory from 'history/createHashHistory'
```
BrowserRouter 对应  `history/createBrowserHistory`

MemoryRouter 对应 `history/createMemoryHistory`

以下是代码:
```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router as HashRouter, Route, Switch } from 'react-router-dom'
import createHashHistory from 'history/createMemoryHistory'
const history = createHashHistory()

class Page1 extends Component{
    constructor(){
        super()
    }
    componentWillMount(){
        console.log('路由将要挂载参数是:',this.props.location.state)
    }
    render(){
        return <div>页面一</div>
    }
}

const Page2 = ()=><div>页面二</div>


class App extends Component{
    constructor(){
        super()
        this.go = this.go.bind(this)
    }
    go(path){
        const state = {param1:'参数1'}
        this.props.history.push(path, state)
    }
    render(){
        return (
            <HashRouter history={history}>
                <div>
                    <div>
                        <input type="button" onClick={()=>this.go('/page1')} value="go Page1"/>
                        <input type="button" onClick={()=>this.go('/page2')} value="go Page2"/>
                    </div>
                    <Switch>
                        <Route path="/page1" component={Page1}></Route>
                        <Route path="/page2" component={Page2}></Route>
                    </Switch>                    
                </div>
            </HashRouter>       
        )
    }
}
ReactDOM.render(<App history={history}/>,document.getElementById('root'))
```