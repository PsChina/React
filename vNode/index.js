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