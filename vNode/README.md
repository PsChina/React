# 虚拟 dom (virtual DOM)

这篇文档用于书写我对虚拟 dom 的一些自己的见解。

## 什么是虚拟 dom

虚拟 dom 是相对于浏览器所渲染出来的真实 dom 的，在react，vue等技术出现之前，我们要改变页面展示的内容只能通过遍历查询 dom 树的方式找到需要修改的 dom 然后修改样式行为或者结构，来达到更新 ui 的目的。

这种方式相当消耗计算资源，因为每次查询 dom 几乎都需要遍历整颗 dom 树，如果建立一个与 dom 树对应的虚拟 dom 对象（ js 对象），以对象嵌套的方式来表示 dom 树，那么每次 dom 的更改就变成了 js 对象的属性的更改，这样一来就能查找 js 对象的属性变化要比查询 dom 树的性能开销小。

## 为什么操作 dom 性能开销大

其实并不是查询 dom 树性能开销大而是 dom 树的实现模块和 js 模块是分开的这些跨模块的通讯增加了成本，以及 dom 操作引起的浏览器的回流和重绘，使得性能开销巨大，原本在 pc 端是没有性能问题的，因为 pc 的计算能力强，但是随着移动端的发展，越来越多的网页在智能手机上运行，而手机的性能参差不齐，会有性能问题。

## 新技术如何解决性能问题

angular，react，vue 等框架的出现就是为了解决这个问题的。

他们的思想是每次更新 dom 都尽量避免刷新整个页面，而是有针对性的去刷新那被更改的一部分，来释放掉重复渲染没有发生任何更改的UI占用的 gpu，cup 性能。

### angular

angular 采用的机制是 脏值检测查机制 所有使用了 ng 指令的 scope data 和 {{}} 语法的 scope data 都会被加入脏检测的队列

### vue

vue 是通过重写 setter ， getter 实现观察者监听 data 属性的变化生成新的虚拟 dom 通过 h 函数创建真实 dom 替换掉dom树上对应的旧 dom。当然Vue在后来也引入了 diff 算法来实现 dom 更新。 

### react

react 也是通过虚拟 dom 和 setState 更改 data 生成新的虚拟 dom 以及 diff 算法来计算和生成需要替换的 dom 做到局部更新的。

### 一个虚拟 dom 例子

这个虚拟 dom 是我自己实现的不是 vue 或者 react 的内部实现。

```js
const HelloWorld = {
    nodeName:'div',
    attrs:{
        className:'',
    },
    css:{
        width: '100px',
        height: '40px',
        color: 'green'
    },
    events:{
        onclick:()=>{ console.log('Hello virtual DOM') }
    },
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

下面我们来尝试实现一个解析虚拟 dom 的 render 函数。

### 如何解析这个虚拟 dom

```js
function render(vNode) {
    // 创建dom
    const dom = document.createElement(vNode.nodeName)
    const { attrs, css, events, childrens } = vNode

    // 添加属性
    for(const attrName in attrs){
        dom[attrName] = attrs[attrName]
    }

    // 添加行内样式
    for(const attrName in css){
        dom.style[attrName] = css[attrName]
    }

    // 添加事件
    for(const eventName in events){
        dom[eventName] = events[eventName]
    }

    if(childrens){
        for(const children of childrens) {
            // 生成子节点
            const childrenNode = render(children)
            // 绑定子节点
            dom.append(childrenNode)
        }
    }

    return dom
}
```

大家可以将这段代码复制到浏览器测试一下。

```js
const dom = render(HelloWorld)
document.body.append(dom)
```
