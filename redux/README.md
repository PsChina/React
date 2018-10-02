## 目录

1. [为什么要使用 redux](#为什么要使用-redux)
1. [flux 思想是如何解决问题的](#flux-思想是如何解决问题的)
1. [redux](#redux)
1. [store](#store)
1. [dispatch](#dispatch)
1. [action](#action)
1. [reduce](#reduce)
1. [react-redux](#react-redux)
1. [connect](#connect)
1. [mapStateToProps](#mapstatetoprops)
1. [mapDispatchToProps](#mapdispatchtoprops)
1. [Provider](#provider)

## 为什么要使用 Redux

React 没有解决的问题:

1.-架构：大型应用程序应该如何组织代码？

2.-通信：组件之间如何通信？


redux 解决了架构问题。

redux 配合 react-redux 则解决了通信和架构问题。

如果你不知道是否需要 Redux，那就是不需要它。

只有遇到 React 实在解决不了的问题，你才需要 Redux 。

需要用到 redux 的项目:
```
用户的使用方式复杂

不同身份的用户有不同的使用方式（比如普通用户和管理员）

多个用户之间可以协作

与服务器大量交互，或者使用了WebSocket

View要从多个来源获取数据
```

## flux 思想是如何解决问题的

flux: __单向数据流__

flux 思想解决的问题是当多个组件共享同一个数据并且对同一个数据进行修改的时候，容易出现数据难以同步的情况。

问题如图:

![without flux](https://github.com/PsChina/React/blob/master/images/whitout-flux.png)

fulx 解决问题的思路是组件可以有修改数据的权限，但是不能随意修改必须用过唯一的方法 `dispatch` 修改，

用户的操作 `action` 在触发 dispatch 以后 dispatch 会修改数据源 store 。

store 的改变会被刷新到引用它的各个视图。

这种单向的数据流动保证的数据的同步，也就是所谓的可预测。 这和 react 采用的的函数式编程思想不谋而合

因为对于同一个 state 纯组件渲染之后得到的一定相同的结果，意思是知道了 state 就能预测出 view ，

反之亦然。

__flux 数据流__ :

![flux](https://github.com/PsChina/React/blob/master/images/flux.png)


## redux

redux 是 flux 思想的一种实现。

![redux](https://github.com/PsChina/React/blob/master/images/redux.png)

redux 需要解决的问题是当多个组件使用同一份数据的时如何同步。

答案是采用flux思想，使用单向数据流，即组件获得的数据是 __只读的__ 。

数据被统一管理在 `store` 内。

那组件要修改数据怎么办？ ---提供唯一修改数据的方式 `dispatch` 来派发事件，store 在接收到不同的事件后会根据事件的类型调用相应的处理函数 reduce 来获取新 store ，从而达到修改数据的目的。

### store

redux 用于存储数据的工具。

```js
import { createStore } from 'redux'
const store = createStore(reducer)
```

### dispatch

（派发事件函数）

组件如果要修改数据可以通过派发事件的方式来做到，这就避免了数据被随意修改的风险。

### action

修改数据要大张旗鼓的通过事件 `action` 修改，

action含有 事件类型- `type` 以及要修改的数据- `payload` （ type是必须实现的 payload 可选项名字可以自定义） 。

```js
{
    type: 'TODO_SOME_THING',
    payload: newState
}
```

### reduce

 （修改并更新store的函数）

reduce 函数接收两个参数：

第一个参数是旧的 state

第二个参数是被派发的事件 action

reducers 会根据不同的事件类型调用不同的 reduce 。
```js
export default (state, action)=>{
    switch(action.type){
        case 'TYPE_A':
            return {
                ...state,
                ...action.payload
            }
        case 'TYPE_B':
            return {
                ...state,
                number: state.number - 1
            }
        default:
        return {
            ...state
        }
    }
}
```

## react-redux

redux 只是 fulx 思想的一种实现它通过每次都返回新 store 的方式来更新 store ， 但是如何与 react 结合起来是一个问题， react-redux 正好解决了这个问题。

是这样的 redux 将数据都保存在了 store 那么就要求 react 组件的数据只能是通过 props 获取 store 内的数据。否则 react 能轻易的更改 state 。无法避免的会发生状态难以同步。

但是如果只使用 redux 由于 react 没有提供良好的组件通讯数据需要一层一层的通过 props 传递， 也是一件让人心累的事。

所以如果任意组件都能直接从 store 中获取数据就好了。

react-redux 提供了一个高阶组件 connect 实现了它。

将要传递的数据在 connect 中获取好传递给组件之后再返回一个已经接收了数据的组件。

connect 不仅包装了获取 store 中 state 的方法，而且还包装了修改 store 的方法，他们分别是

mapStateToProps 和 mapDispatchToProps

用起来是这样的：
```jsx
import React from 'react'
import { connect } from 'react-redux'

const ComponentA = props=> <div style={{botder:'solid red 1px'}}>
    <div>{props.number}</div>
    <button onClick={()=>{ props.changeNumber(props.number+1) }}>add</button>
</div>

ComponentA.defaultProps = {
    number:0,
    changeNumber:()=>false
}

function mapStateToProps(state){
    const {number} = state
    return {
        number,
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeNumber(number){
            dispatch({
                type:'CHANGE_NUMBER',
                payload:{
                    number,
                }
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentA)
```

### connect

connect 是一个高阶组件, 它接收一个普通组件并且返回一个已经包装好 store 中数据和修改 store 的方法的结合了 redux 的组件。

为了告诉 connect 从 store 中获取正确的 state 还需要传递一个名为 mapStateToProps 的参数

为了告诉 connect 如何修改 store 可以传递一个名为 mapDispatchToProps 的参数

```jsx
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)
```

### mapStateToProps

mapStateToProps 接收一个 state 参数他就是 store 中所有的 state

我们可以解构出我们需要的 state 作为返回值即可。

例如 我需要传递 title 这个 state 给某个组件

可以这样定义 mapStateToProps

```js
function mapStateToProps({title}){
    return { title }
}
```

### mapDispatchToProps


mapDispatchToProps 接收一个 dispatch 参数他是修改store的唯一方法。

我们可以利用 dispatch 定义修改 store 的 action 。

```js
function mapDispatchToProps(dispatch){
    return {
        changeNumber(number){ // 回调函数会被当做 props 传递给被包装的组件
            dispatch({
                type:'CHANGE_NUMBER',
                payload:{
                    number,
                }
            })
        }
    }
}
```

### Provider

Provider 是一个承载 store 的组件，所有被 connect 包装过的组件必须是 Provider 的子组件。

```jsx
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
,document.getElementById('root'))
```



### demo01 效果

demo01 演示的效果是共用了同一个 number 数据的两个组件，同时能够更改这个 number 。

组件 A 显示的是1倍的 number

组件 B 显示的是2倍的 number

组件 A 的按钮点击一下 number 加一。

组件 B 的按钮点击一下 number 减一。

![demo01](https://github.com/PsChina/React/blob/master/images/redux.gif)







### redux 与 flux 的不同

![different](https://github.com/PsChina/React/blob/master/images/redux.jpg)








